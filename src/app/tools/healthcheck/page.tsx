"use client"
import { useState } from "react";
import Container from "@mui/material/Container";
import { Box, CircularProgress, Paper, Alert, Chip, Grid2 } from "@mui/material";
import Typography from "@mui/material/Typography";
import { healthCheck } from "@/model/formStructure";
import DynamicForm from "@/utils/DynamicForm";

interface HealthResult {
    uri: string;
    healthy: boolean;
    error: string | null;
    status: number;
}

export default function HealthCheck() {
    const [results, setResults] = useState<HealthResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: Record<string, any>) => {
        const clusterURL = formData.clusterURL?.trim();
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/healthcheck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ clusterURL })
            });

            if (!response.ok) {
                throw new Error(`Health check failed: ${response.status}`);
            }

            const data = await response.json();
            setResults(data.results);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to perform health checks');
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="h4" fontWeight="bold">
                    Cluster Health Check
                </Typography>

                <DynamicForm
                    formStructure={healthCheck}
                    onSubmit={handleSubmit}
                    disabled ={isLoading}
                />

                {isLoading && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CircularProgress size={24} />
                        <Typography>Checking cluster endpoints...</Typography>
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                )}

                {results.length > 0 && (
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Grid2 container spacing={3}>
                            {results.map((result) => (
                                <Grid2 size={4} key={result.uri}>
                                    <Box sx={{
                                        p: 2,
                                        border: 1,
                                        borderRadius: 1,
                                        borderColor: result.healthy ? 'success.main' : 'error.main',
                                        bgcolor: result.healthy ? 'success.light' : 'error.light'
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <Typography variant="subtitle1">
                                                {result.uri.toUpperCase()}
                                            </Typography>
                                            <Chip
                                                label={result.healthy ? 'Healthy' : 'Unhealthy'}
                                                color={result.healthy ? 'success' : 'error'}
                                                size="small"
                                            />
                                        </Box>

                                        {/*{!result.healthy && (*/}
                                        {/*    <Typography variant="body2" sx={{ mt: 1, color: 'error.dark' }}>*/}
                                        {/*        {result.error || `Status: ${result.status}`}*/}
                                        {/*    </Typography>*/}
                                        {/*)}*/}
                                    </Box>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Paper>
                )}
            </Box>
        </Container>
    );
}