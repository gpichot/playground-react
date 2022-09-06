import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@mui/material";

export interface InputControlProps extends React.ComponentProps<typeof Input> {
  name: string;
}

const InputControl = (props: InputControlProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field }) => <Input {...props} {...field} />}
    />
  );
};
InputControl.displayName = "InputControl";

export default InputControl;
