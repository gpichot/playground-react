import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ComponentMeta, Story } from "@storybook/react";
import * as yup from "yup";

import InputControl from "./BasicInputControl";

export default {
  title: "InputControl",
  component: InputControl,
  argTypes: {
    onSubmit: { action: "submit" },
  },
} as ComponentMeta<typeof InputControl>;

const Schema = yup.object().shape({
  firstName: yup.string().required(),
});

const Template: Story<
  React.ComponentProps<typeof InputControl> & {
    onSubmit: (data: unknown) => void;
  }
> = ({ onSubmit, ...args }) => {
  const form = useForm({
    defaultValues: {
      firstName: "",
    },
    resolver: yupResolver(Schema),
  });

  const { register, handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: "300px" }}>
          <InputControl {...args} {...register("firstName")} />
        </div>
      </form>
    </FormProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  placeholder: "Placeholder",
};

export const FilledDefault = Template.bind({});
FilledDefault.args = {
  label: "Label",
  placeholder: "Placeholder",
  value: "test",
};
