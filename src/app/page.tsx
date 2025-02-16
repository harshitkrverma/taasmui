"use client"

import DynamicForm from '../utils/DynamicForm';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {autoForm, executorForm, healthCheck} from "@/model/formStructure";
import Typography from "@mui/material/Typography";

export default function Home() {
    const handleSubmit = (formData: Record<string, any>) => {
        console.log('Form Data Submitted:', formData);
    };
    const handleHealthCheck = async (formData: Record<string, any>) => {
        let url = formData.clusterURL + '/auth/healthcheck.hlt'
        console.log('Form Data Submitted:', formData.clusterURL);

        console.log('Form Data Submitted:', url);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
            mode: 'no-cors',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Get the raw HTML text
        const htmlText = await response.text();
        console.log('Raw HTML:', htmlText);

        // Parse the HTML string into a DOM object
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(htmlText, 'text/html');

        // Extract data from the parsed HTML
        const title = htmlDoc.querySelector('title')?.textContent;
        const bodyContent = htmlDoc.querySelector('body')?.innerHTML;

        console.log('Title:', title);
        console.log('Body Content:', bodyContent);

        return { title, bodyContent };
    };

    const handleAutoForm= (formData : Record<string, any>)=> {
        console.log(formData);
    }

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    // display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" fontWeight="bold">
                    TAAS Executor
                </Typography>
                <DynamicForm formStructure={executorForm} onSubmit={handleSubmit} />
            </Box>
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <DynamicForm formStructure={healthCheck} onSubmit={handleHealthCheck} />
            </Box>
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <DynamicForm formStructure={autoForm} onSubmit={handleAutoForm} />
            </Box>
        </Container>
    );
}
