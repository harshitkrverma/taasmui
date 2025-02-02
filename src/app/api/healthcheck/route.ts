// app/api/healthcheck/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { clusterURL } = await request.json();

        if (!clusterURL) {
            return NextResponse.json(
                { error: "Cluster URL is required" },
                { status: 400 }
            );
        }

        const uris = ['auth', 'home', 'pay', 'contact', 'loda'];
        const results = await Promise.all(
            uris.map(async (uri) => {
                try {
                    const url = `http://${clusterURL}/${uri}/healthcheck.hlt`;
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 5000);

                    const response = await fetch(url, {
                        signal: controller.signal,
                        redirect: 'follow'
                    });

                    clearTimeout(timeout);
                    const text = await response.text();

                    return {
                        uri,
                        healthy: text.includes('I am alive'),
                        status: response.status,
                        error: null
                    };
                } catch (error) {
                    return {
                        uri,
                        healthy: false,
                        status: 500,
                        error: error instanceof Error ? error.message : 'Request failed'
                    };
                }
            })
        );

        return NextResponse.json({ results });

    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}