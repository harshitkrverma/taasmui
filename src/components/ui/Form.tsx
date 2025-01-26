import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Form() {
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
        <TextField
            id="filled-helperText"
            label="Helper text"
            defaultValue=" "
            helperText="Some important text"
            variant="filled"
        />
        </Box>
    );
}
