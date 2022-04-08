import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Form, Ref } from "semantic-ui-react";

export type InputControlProps = React.ComponentProps<typeof Form.Input>;

const InputControl = (props: InputControlProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field }) => <Form.Input fluid {...props} {...field} />}
    />
  );
};
InputControl.displayName = "InputControl";

export default InputControl;
