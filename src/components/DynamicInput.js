import React from "react";
import { validateRequired, validateEmail, validateNumber, validateMinLength, validateMaxLength } from "../utils/validation";

const DynamicInput = ({ inputConfig, value, onChange, onBlur, error }) => {
    const handleValidation = (value) => {
        const { validation } = inputConfig;
        let isValid = true;

        if (validation.required && !validateRequired(value)) {
            isValid = false;
            return "This field is required.";
        }
        if (validation.email && !validateEmail(value)) {
            isValid = false;
            return "Please enter a valid email address.";
        }
        if (validation.number && !validateNumber(value)) {
            isValid = false;
            return "Please enter a valid number.";
        }
        if (validation.minLength && !validateMinLength(value, validation.minLength)) {
            isValid = false;
            return `Minimum length is ${validation.minLength} characters.`;
        }
        if (validation.maxLength && !validateMaxLength(value, validation.maxLength)) {
            isValid = false;
            return `Maximum length is ${validation.maxLength} characters.`;
        }

        return isValid ? "" : "Invalid input.";
    };

    const handleBlur = () => {
        if (onBlur) {
            const errorMessage = handleValidation(value);
            onBlur(inputConfig.name, errorMessage);
        }
    };

    return (
        <div className="input-container">
            <label>{inputConfig.label}</label>
            {inputConfig.type === "dropdown" ? (
                <select
                    name={inputConfig.name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={handleBlur}
                >
                    {inputConfig.options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={inputConfig.type}
                    name={inputConfig.name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={handleBlur}
                />
            )}
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default DynamicInput;
