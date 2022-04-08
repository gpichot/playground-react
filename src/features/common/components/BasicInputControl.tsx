import React from "react";
import { useFormState } from "react-hook-form";
import classnames from "classnames";

import styles from "./BasicInputControl.module.scss";

export type InputProps = {
  label: string;
  name: string;
} & React.ComponentPropsWithRef<"input">;

export const InputControl = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { id: idProp, name, label, className, ...rest } = props;
    const id = React.useId();

    const { errors } = useFormState({ name });
    const inputId = idProp || `${id}-${name}`;
    const error = errors[name];
    return (
      <div
        className={classnames(styles.control, {
          [styles.errored]: errors[name],
        })}
      >
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          name={name}
          className={classnames(className, styles.input)}
          {...rest}
        />
        {error && <div className={styles.error}>{error?.message}</div>}
      </div>
    );
  }
);
InputControl.displayName = "InputControl";

export default InputControl;
