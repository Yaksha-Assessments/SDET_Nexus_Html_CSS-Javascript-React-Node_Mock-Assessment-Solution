import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DynamicForm from "../../components/DynamicForm";
import DynamicInput from "../../components/DynamicInput";
import '@testing-library/jest-dom/extend-expect';

jest.mock("../../components/DynamicInput", () => ({ inputConfig, value, onChange, onBlur, error }) => (
    <div>
        <label htmlFor={inputConfig.name}>{inputConfig.label}</label>
        <input
            id={inputConfig.name}
            type={inputConfig.type}
            name={inputConfig.name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => onBlur(inputConfig.name, error)}
            data-testid={inputConfig.name}
        />
        {error && <span>{error}</span>}
    </div>
));

describe("boundary", () => {
    test("DynamicFormComponent boundary renders the form with all inputs", () => {
        render(<DynamicForm />);

        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    });

    test("DynamicFormComponent boundary updates input values on change", () => {
        render(<DynamicForm />);

        fireEvent.change(screen.getByTestId("name"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByTestId("email"), { target: { value: "john.doe@example.com" } });
        fireEvent.change(screen.getByTestId("age"), { target: { value: "30" } });

        expect(screen.getByTestId("name").value).toBe("John Doe");
        expect(screen.getByTestId("email").value).toBe("john.doe@example.com");
        expect(screen.getByTestId("age").value).toBe("30");
    });

    test("DynamicFormComponent boundary submits the form successfully with valid inputs", () => {
        render(<DynamicForm />);

        fireEvent.change(screen.getByTestId("name"), { target: { value: "John Doe" } });
        fireEvent.change(screen.getByTestId("email"), { target: { value: "john.doe@example.com" } });
        fireEvent.change(screen.getByTestId("age"), { target: { value: "30" } });
        fireEvent.change(screen.getByTestId("gender"), { target: { value: "Male" } });

        fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

        expect(window.alert).toHaveBeenCalledWith("Form Submitted Successfully!");
    });

    test("DynamicFormComponent boundary shows validation error on form submit with invalid inputs", () => {
        render(<DynamicForm />);

        fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

        const validationMessages = screen.getAllByText((content, element) => {
            return element.textContent === "This field is required.";
        });

        expect(validationMessages.length).toBe(4); // One for each field
    });
});

beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });
});

afterAll(() => {
    jest.restoreAllMocks();
});