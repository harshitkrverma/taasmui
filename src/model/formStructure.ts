"use client"

interface FormField {
    type: 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'button' | 'select';
    label: string;
    name: string;
    defaultValue?: string | number | boolean;
    required?: boolean;
    hint?: string;
    options?: { label: string; value: string }[]; // For dropdowns or radio buttons
}

export const executorForm: FormField[] = [
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
        type: 'select',
        label: 'Gender',
        name: 'gender',
        defaultValue: '',
        required: true,
        hint: 'Select a Gender',
        options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
        ],
    },
    {
        type: 'checkbox',
        label: 'Subscribe to Newsletter',
        name: 'subscribe',
        defaultValue: false,
        required: true,
    },
    {
        type: 'button',
        label: 'Submit',
        name: 'submit',
    },
];

export const healthCheck: FormField[] = [
    {
        type: 'text',
        label: 'Cluster URL',
        name: 'clusterURL',
        defaultValue: '',
        required: true,
        hint: 'Enter Cluster URL',
    },
    {
        type: 'button',
        label: 'Submit',
        name: 'submit',
    },
];