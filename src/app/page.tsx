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

const formStructure = [
    {
        type: 'text',
        label: 'Full Name',
        name: 'fullName',
        defaultValue: '',
        required: true,
        hint: 'Enter your full name',
    },
    {
        type: 'email',
        label: 'Email',
        name: 'email',
        defaultValue: '',
        required: true,
        hint: 'Enter your email address',
    },
    {
        type: 'text',
        label: 'Tag',
        name: 'Tag',
        defaultValue: '',
        required: true,
        hint: 'Enter your email address',
    },
    {
        type: 'password',
        label: 'Password',
        name: 'password',
        defaultValue: '',
        required: true,
        hint: 'Enter a strong password',
    },
    {
        type: 'checkbox',
        label: 'Subscribe to Newsletter',
        name: 'subscribe',
        defaultValue: false,
        required: false,
    },
    {
        type: 'button',
        label: 'Submit',
        name: 'submit',
    },
];

export default function Home() {
    const handleSubmit = (formData: Record<string, any>) => {
        console.log('Form Data Submitted:', formData);
    };

    return (
        <Container maxWidth="sm">

        <Box
            sx={{
                          my: 4,

                display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
        >
            <h1>TAAS Executor</h1>
            <DynamicForm formStructure={formStructure} onSubmit={handleSubmit} />
        </Box>
        </Container>
    );
}
