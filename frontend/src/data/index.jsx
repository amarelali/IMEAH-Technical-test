export const formLogInFields = [
    {
        name: "email",
        label: "Email",
        variant: "outlined",
        type: "email",
        required: true,
        validation: /\S+@\S+\.\S+/,
        validationMessage: "Enter a valid email",
    },
    {
        name: "password",
        label: "Password",
        variant: "outlined",
        type: "password",
        required: true,
        validation: /.{6,}/,
        validationMessage: "Password must be at least 6 characters long"
    }
];

export const formSignUpFields = [
    {
        name: "name",
        label: "Name",
        variant: "outlined",
        type: "text",
        required: true
    },
    ...formLogInFields
]; 