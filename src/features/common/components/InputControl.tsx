import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export type InputControlProps = React.ComponentProps<typeof TextField> & {
  name: string;
  label?: string;
};

const InputControl = (props: InputControlProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={props.name}
      render={({ field }) => <TextField {...props} {...field} />}
    />
  );
};
InputControl.displayName = "InputControl";

export default InputControl;
