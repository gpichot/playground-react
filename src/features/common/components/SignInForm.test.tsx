import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "@/test/utils";

import { SignInFormWithBasicInputControl as SignInForm } from "./SignInForm";

describe("NFTCard", () => {
  it("submit user data", async () => {
    const user = userEvent.setup();

    const onSubmit = jest.fn();
    render(<SignInForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email"), "admin@test.com");

    await user.type(screen.getByLabelText("Password"), "1234");

    await user.click(screen.getByText("Sign In"));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());

    expect(onSubmit).toHaveBeenCalledWith({
      email: "admin@test.com",
      password: "1234",
    });
  });
});
