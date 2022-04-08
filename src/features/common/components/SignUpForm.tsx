import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import BasicInputControl from "./BasicInputControl";

export type SignUpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password1: string;
  password2: string;
};

const SignUpSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password1: yup.string().required(),
  password2: yup
    .string()
    .required()
    .oneOf([yup.ref("password1"), ""], "Passwords must match"),
});

export type SignUpFormInitialValues = Omit<
  SignUpFormData,
  "password1" | "password2"
>;

export type SignUpFormProps = React.ComponentProps<"form"> & {
  onSubmit?: (payload: SignUpPayload) => void;
  initialValues?: SignUpFormInitialValues;
};

function useSignUpForm(initialValues?: SignUpFormInitialValues) {
  return useForm<SignUpFormData>({
    defaultValues: {
      firstName: initialValues?.firstName || "",
      lastName: initialValues?.lastName || "",
      email: initialValues?.email || "",
      password1: "",
      password2: "",
    },
    resolver: yupResolver(SignUpSchema),
  });
}

export default function SignUpForm({
  onSubmit,
  initialValues,
  ...props
}: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignUpForm(initialValues);

  const onSubmitHandler = (payload: SignUpFormData) => {
    console.log(payload);
    onSubmit?.({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password1,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} {...props} noValidate>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && <span>{errors.firstName?.message}</span>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && <span>{errors.lastName?.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>{errors.email?.message}</span>}
      </div>
      <div>
        <label htmlFor="password1">Password</label>
        <input
          id="password1"
          type="password"
          {...register("password1", { required: true })}
        />
        {errors.password1 && <span>{errors.password1?.message}</span>}
      </div>
      <div>
        <label htmlFor="password2">Confirm Password</label>
        <input
          id="password2"
          type="password"
          {...register("password2", { required: true })}
        />
        {errors.password2 && <span>{errors.password2?.message}</span>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export function SignUpFormWithBasicInputControl({
  onSubmit,
  initialValues,
  ...props
}: SignUpFormProps) {
  const form = useSignUpForm(initialValues);
  const { handleSubmit, control, register } = form;

  const onSubmitHandler = (payload: SignUpFormData) => {
    console.log(payload);
    onSubmit?.({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password1,
    });
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmitHandler)} {...props} noValidate>
        <BasicInputControl
          {...register("firstName")}
          label="First Name"
          type="text"
        />
        <BasicInputControl
          {...register("lastName")}
          label="Last Name"
          type="text"
        />
        <BasicInputControl {...register("email")} label="Email" type="email" />
        <BasicInputControl
          {...register("password1")}
          label="Password"
          type="password"
        />
        <BasicInputControl
          {...register("password2")}
          label="Confirm Password"
          type="password"
        />
        <button type="submit">Sign Up</button>
      </form>
      <DevTool control={control} />
    </FormProvider>
  );
}
