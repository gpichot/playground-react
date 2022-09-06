import React from "react";
import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";

import SignInForm from "./SignInForm";

export default {
  title: "Auth/Forms/SignInForm",
  component: SignInForm,
  argTypes: {
    onSubmit: { action: "submit" },
  },
} as ComponentMeta<typeof SignInForm>;

const Template: ComponentStory<typeof SignInForm> = (
  args: React.ComponentProps<typeof SignInForm>
) => <SignInForm {...args} />;

export const Default = Template.bind({});
Default.args = {};
Default.play = async ({ args, canvasElement }) => {
  const screen = within(canvasElement);
  const emailInput = screen.getByLabelText("Email", {
    selector: "input",
  });

  await userEvent.type(emailInput, "admin@test.com", {
    delay: 100,
  });

  const passwordInput = screen.getByLabelText("Password", {
    selector: "input",
  });

  await userEvent.type(passwordInput, "admin", {
    delay: 100,
  });

  const submitButton = screen.getByRole("button");

  await userEvent.click(submitButton);

  await waitFor(async () => {
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
  });
};
