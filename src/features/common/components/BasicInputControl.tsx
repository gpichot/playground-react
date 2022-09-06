import React from "react";
import { useFormState } from "react-hook-form";
import classnames from "classnames";

import styles from "./BasicInputControl.module.scss";

export type InputProps = {
  /**
   * The label for the input.
   *
   * @default ''
   */
  label: string;
  /**
   * The name of the input.
   */
  name: string;
} & React.ComponentPropsWithRef<"input">;

export const InputControl = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { id: idProp, name, label, className, ...rest } = props;
    const id = React.useId();

    const { errors } = useFormState({ name });
    const inputId = idProp || `${id}-${name}`;
    const error = errors[name] as { message: string } | undefined;
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
        {error?.message && <div className={styles.error}>{error?.message}</div>}
      </div>
    );
  }
);
InputControl.displayName = "InputControl";

export default InputControl;
