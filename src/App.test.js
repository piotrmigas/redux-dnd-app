import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

it("app renders", () => {
  const { getByText } = render(<App />);
  const header = getByText(/lista/i);
  expect(header).toBeInTheDocument();
});
