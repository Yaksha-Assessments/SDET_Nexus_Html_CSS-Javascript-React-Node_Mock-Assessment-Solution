import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DynamicInput from "../../components/DynamicInput";
import '@testing-library/jest-dom/extend-expect';

const mockValidation = jest.fn();

describe("boundary", () => {
    const inputConfig = {
        type: "text",
        label: "Full Name",
        name: "name",
        validation: { required: true },
    };

    const setup = (value = "", error = "") => {
        const utils = render(
            <DynamicInput
                inputConfig={inputConfig}
                value={value}
                onChange={mockValidation}
                onBlur={mockValidation}
                error={error}
            />
        );
        const input = utils.container.querySelector(`input[name="${inputConfig.name}"]`);
        return {
            input,
            ...utils,
        };
    };

    test("DynamicInputComponent boundary renders the input with label", () => {
        const { input } = setup();
        expect(input).toBeInTheDocument();
    });

    test("DynamicInputComponent boundary calls onChange function when input value changes", () => {
        const { input } = setup();
        fireEvent.change(input, { target: { value: "John Doe" } });
        expect(mockValidation).toHaveBeenCalledWith("John Doe");
    });

    test("DynamicInputComponent boundary calls onBlur function when input loses focus", () => {
        const { input } = setup();
        fireEvent.blur(input);
        expect(mockValidation).toHaveBeenCalledWith(inputConfig.name, "This field is required.");
    });

    test("DynamicInputComponent boundary displays error message when error prop is passed", () => {
        setup("", "This field is required.");
        expect(screen.getByText("This field is required.")).toBeInTheDocument();
    });

    test("DynamicInputComponent boundary renders a dropdown when type is 'dropdown'", () => {
        const dropdownConfig = {
            type: "dropdown",
            label: "Gender",
            name: "gender",
            options: ["Male", "Female"],
            validation: { required: true },
        };
        render(
            <DynamicInput
                inputConfig={dropdownConfig}
                value=""
                onChange={mockValidation}
                onBlur={mockValidation}
                error=""
            />
        );
        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();
        expect(select).toHaveAttribute("name", "gender");
    });
});
