import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ComponentMeta, Story } from "@storybook/react";
import { Form } from "semantic-ui-react";

import InputControl from "./InputControl";

export default {
  title: "ControlledInputControl",
  component: InputControl,
  argTypes: {
    onSubmit: { action: "submit" },
  },
} as ComponentMeta<typeof InputControl>;

const Template: Story<
  React.ComponentProps<typeof InputControl> & {
    onSubmit: () => void;
  }
> = args => {
  const { onSubmit, ...props } = args;
  const form = useForm({
    defaultValues: {
      firstName: "",
    },
  });
  const { register } = form;

  return (
    <div style={{ maxWidth: 300 }}>
      <FormProvider {...form}>
        <form className="ui form" onSubmit={form.handleSubmit(onSubmit)}>
          <InputControl {...props} name="firstName" />
        </form>
      </FormProvider>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  name: "firstName",
};
