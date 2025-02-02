import Box from "@mui/material/Box";
import ConstructionIcon from '@mui/icons-material/Construction';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function NotFound() {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1>404 - Page Not Found</h1>
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
                <Box>
                    <ConstructionIcon fontSize={"large"} />
                </Box>
                <Typography>
                    The page you're looking for doesn't exist or is under construction.
                </Typography>
            </Box>
        </Container>
    );
}