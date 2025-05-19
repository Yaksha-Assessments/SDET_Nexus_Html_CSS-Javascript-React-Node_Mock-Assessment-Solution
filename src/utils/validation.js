export const validateRequired = (value) => {
    return value.trim() !== "";
};

export const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(value);
};

export const validateNumber = (value) => {
    const numberPattern = /^[0-9]+$/;
    return numberPattern.test(value);
};

export const validateMinLength = (value, minLength) => {
    return value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
    return value.length <= maxLength;
};
