import React, { useState } from "react";
import DynamicInput from "./DynamicInput";
import {
    validateRequired,
    validateEmail,
    validateNumber,
    validateMinLength,
    validateMaxLength
} from "../utils/validation";

const formConfig = [
    { type: "text", label: "Full Name", name: "name", validation: { required: true }, value: "" },
    { type: "email", label: "Email", name: "email", validation: { required: true, email: true }, value: "" },
    { type: "number", label: "Age", name: "age", validation: { required: true, number: true }, value: "" },
    {
        type: "dropdown",
        label: "Gender",
        name: "gender",
        options: ["Male", "Female"],
        validation: { required: true },
        value: "",
    },
];

const DynamicForm = () => {
    const [formValues, setFormValues] = useState(formConfig.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}));
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleBlur = (name, errorMessage) => {
        setFormErrors({ ...formErrors, [name]: errorMessage });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        const errors = {};

        formConfig.forEach((field) => {
            const errorMessage = validateField(field, formValues[field.name]);
            if (errorMessage) {
                errors[field.name] = errorMessage;
                valid = false;
            }
        });

        setFormErrors(errors);
        if (valid) {
            alert("Form Submitted Successfully!");
            // Proceed with form submission (e.g., send data to a backend)
        }
    };

    const validateField = (field, value) => {
        const { name, validation } = field;
        if (validation.required && !validateRequired(value)) {
            return "This field is required.";
        }
        if (validation.email && !validateEmail(value)) {
            return "Please enter a valid email address.";
        }
        if (validation.number && !validateNumber(value)) {
            return "Please enter a valid number.";
        }
        if (validation.minLength && !validateMinLength(value, validation.minLength)) {
            return `Minimum length is ${validation.minLength} characters.`;
        }
        if (validation.maxLength && !validateMaxLength(value, validation.maxLength)) {
            return `Maximum length is ${validation.maxLength} characters.`;
        }
        return "";
    };

    return (
        <form onSubmit={handleSubmit}>
            {formConfig.map((inputConfig, index) => (
                <DynamicInput
                    key={index}
                    inputConfig={inputConfig}
                    value={formValues[inputConfig.name]}
                    onChange={(value) => handleInputChange(inputConfig.name, value)}
                    onBlur={handleBlur}
                    error={formErrors[inputConfig.name]}
                />
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default DynamicForm;
