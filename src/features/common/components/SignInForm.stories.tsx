import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

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
