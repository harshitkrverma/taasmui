"use client"

interface FormField {
    type: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'button';
    label: string;
    name: string;
    defaultValue?: string | number | boolean;
    required?: boolean;
    hint?: string;
    options?: { label: string; value: string }[]; // For dropdowns or radio buttons
}

const formStructure: FormField[] = [
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