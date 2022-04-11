import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { screen, userEvent } from "@storybook/testing-library";

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
Default.play = async () => {
  const emailInput = screen.getByLabelText("Email", {
    selector: "input",
  });

  await userEvent.type(emailInput, "admin@test.com", {
    delay: 10,
  });

  const passwordInput = screen.getByLabelText("Password", {
    selector: "input",
  });

  await userEvent.type(passwordInput, "admin", {
    delay: 10,
  });

  const submitButton = screen.getByRole("button");

  await userEvent.click(submitButton);
};
