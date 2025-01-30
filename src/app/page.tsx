// import * as React from 'react';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import NextLink from 'next/link';
// import Executor from "@/components/Executor";
// import Form from "@/components/ui/Form";
// import DynamicForm from "@/components/commons/DynamicForm";
//
// export default function Home() {
//     const handleSubmit = (formData: Record<string, any>) => {
//         console.log('Form Data Submitted:', formData);
//         // Perform form submission logic here
//     };
//   return (
//     <Container maxWidth="lg">
//       <Box
//         sx={{
//           my: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
//           Material UI - Next.js App Router example in TypeScript
//         </Typography>
//         <Link href="/about" color="secondary" component={NextLink}>
//           Go to the about page
//         </Link>
//       </Box>
//         <Executor/>
//         <Form/>
//         <DynamicForm formStructure={formStructure} onSubmit={handleSubmit} />
//     </Container>
//   );
// }
"use client"

import DynamicForm from '../components/commons/DynamicForm';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {executorForm, healthCheck} from "@/model/formStructure";

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
        // const result = await response.text();
        // console.log(result)
        // alert(result);
        // Check if the response is OK
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
            <h1>TAAS Executor</h1>
            <DynamicForm formStructure={executorForm} onSubmit={handleSubmit} />
        </Box>
            <Box
                sx={{
                    my: 4,
                    // display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <DynamicForm formStructure={healthCheck} onSubmit={handleHealthCheck} />
            </Box>
        </Container>
    );
}
