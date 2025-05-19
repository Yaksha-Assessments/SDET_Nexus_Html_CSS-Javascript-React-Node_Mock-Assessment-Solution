import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import DynamicForm from "../components/DynamicForm";
import '@testing-library/jest-dom/extend-expect';

jest.mock("../components/DynamicForm", () => () => <div>Mock Dynamic Form</div>);  // Mock implementation

describe("boundary", () => {
  test("AppComponent boundary renders the App component without crashing", () => {
    render(<App />);
  });

  test("AppComponent boundary displays the correct heading", () => {
    render(<App />);
    const headingElement = screen.getByRole("heading", { name: /dynamic form with custom validation/i });
    expect(headingElement).toBeInTheDocument();
  });

  test("AppComponent boundary renders the DynamicForm component", () => {
    render(<App />);
    const dynamicFormElement = screen.getByText(/mock dynamic form/i);
    expect(dynamicFormElement).toBeInTheDocument();
  });
});
