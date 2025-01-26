"use client";

import React, { useState } from 'react';
import {
    TextField,
    Checkbox,
    Button,
    FormControlLabel,
    FormHelperText,
    Box,
} from '@mui/material';

interface FormField {
    type: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'button';
    label: string;
    name: string;
    defaultValue?: string | number | boolean;
    required?: boolean;
    hint?: string;
    options?: { label: string; value: string }[];
}

interface DynamicFormProps {
    formStructure?: FormField[]; // Make the prop optional
    onSubmit: (formData: Record<string, any>) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formStructure = [], onSubmit }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {formStructure.map((field) => {
                    switch (field.type) {
                        case 'text':
                        case 'email':
                        case 'password':
                        case 'number':
                            return (
                                <TextField
                                    key={field.name}
                                    label={field.label}
                                    name={field.name}
                                    type={field.type}
                                    value={formData[field.name] || field.defaultValue || ''}
                                    onChange={handleChange}
                                    required={field.required}
                                    fullWidth
                                    helperText={field.hint}
                                />
                            );
                        case 'checkbox':
                            return (
                                <FormControlLabel
                                    key={field.name}
                                    control={
                                        <Checkbox
                                            name={field.name}
                                            checked={formData[field.name] || field.defaultValue || false}
                                            onChange={handleChange}
                                        />
                                    }
                                    label={field.label}
                                />
                            );
                        case 'button':
                            return (
                                <Button key={field.name} type="submit" variant="contained">
                                    {field.label}
                                </Button>
                            );
                        default:
                            return null;
                    }
                })}
            </Box>
        </form>
    );
};

export default DynamicForm;