import React from "react";

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
