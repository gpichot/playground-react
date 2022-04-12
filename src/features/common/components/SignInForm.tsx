import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BasicInputControl from "./BasicInputControl";

type SignInPayload = {
  email: string;
  password: string;
};

export function SignInForm({
  onSubmit,
  ...props
}: React.ComponentProps<"form"> & {
  onSubmit: (credentials: SignInPayload) => void;
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    console.log(`email: ${email} password: ${password}`);
    onSubmit?.({ email, password });
  };
  return (
    <form {...props}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Sign In
      </button>
    </form>
  );
}

export default function UncontrolledSignInForm({
  onSubmit,
  ...props
}: React.ComponentProps<"form"> & {
  onSubmit: (credentials: SignInPayload) => void;
}) {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    console.log(`email: ${email} password: ${password}`);
    onSubmit?.({ email, password });
  };
  return (
    <form {...props}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordRef} />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Sign In
      </button>
    </form>
  );
}

const SignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function useSignInForm(initialValues?: Partial<SignInPayload>) {
  return useForm<SignInPayload>({
    defaultValues: {
      email: initialValues?.email ?? "",
      password: initialValues?.password ?? "",
    },
    resolver: yupResolver(SignInSchema),
  });
}

export function SignInFormWithBasicInputControl({
  onSubmit,
  initialValues,
  hideActions,
  ...props
}: React.ComponentProps<"form"> & {
  onSubmit: (credentials: SignInPayload) => void;
  initialValues?: Partial<SignInPayload>;
  hideActions?: boolean;
}) {
  const form = useSignInForm(initialValues);
  const { handleSubmit, register } = form;
  const onSubmitHandler = (payload: SignInPayload) => {
    console.log(payload);
    onSubmit?.(payload);
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmitHandler)} {...props} noValidate>
        <BasicInputControl label="Email" {...register("email")} type="email" />
        <BasicInputControl
          label="Password"
          {...register("password")}
          type="password"
        />
        {!hideActions && <button type="submit">Sign In</button>}
      </form>
    </FormProvider>
  );
}
