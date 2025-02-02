// import * as React from 'react';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
// import NextLink from 'next/link';
// import {Skeleton} from "@mui/material";
//
// export default function Home() {
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
//           <Typography>
//
//               What is Lorem Ipsum?
//               Lorem Ipsum is simply dummy text of the printing and typesetting industry.
//               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
//               when an unknown printer took a galley of type and scrambled it to make a type specimen book.
//               It has survived not only five centuries, but also the leap into electronic typesetting,
//               remaining essentially unchanged. It was popularised in the 1960s with the release of
//               Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
//           </Typography>
//           <Skeleton animation="wave" variant="rectangular" width={210} height={118} />
//           <Skeleton animation="wave" variant="rectangular" width={210} height={118} />
//           <Skeleton animation="wave" variant="rectangular" width={210} height={118} />
//           <Skeleton animation="wave" variant="rectangular" width={210} height={118} />
//           <Skeleton animation="wave" variant="rectangular" width={210} height={118} />
//
//       </Box>
//     </Container>
//   );
// }
"use client"

import DynamicForm from '../utils/DynamicForm';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {executorForm, healthCheck} from "@/model/formStructure";
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
                display: 'flex',
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
        </Container>
    );
}
