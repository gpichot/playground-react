import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import SignUpForm, { SignUpFormWithBasicInputControl } from "./SignUpForm";

export default {
  title: "Auth/Forms/SignUpForm",
  component: SignUpForm,
  argTypes: {
    onSubmit: { action: "submit" },
  },
} as ComponentMeta<typeof SignUpForm>;

const Template: ComponentStory<typeof SignUpForm> = args => (
  <SignUpForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  initialValues: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@test.com",
  },
};

const TemplateWithBasicInputControl: ComponentStory<
  typeof SignUpFormWithBasicInputControl
> = args => (
  <div style={{ maxWidth: 300 }}>
    <SignUpFormWithBasicInputControl {...args} />
  </div>
);

export const WithBasicInputControl = TemplateWithBasicInputControl.bind({});
WithBasicInputControl.args = {
  initialValues: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@test.com",
  },
};
