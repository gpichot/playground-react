import React from "react";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import { Button } from "semantic-ui-react";

import { AuthProvider, useAuthContext } from "./context";

export default {
  title: "Auth/Context",
  component: Button,
} as ComponentMeta<typeof Button>;

type Credentials = {
  email: string;
  password: string;
};

function SignInButton(props: Credentials) {
  const { signIn } = useAuthContext();
  const { email, password } = props;
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState(false);
  return (
    <>
      {error && <div>{error.message}</div>}
      <Button
        onClick={() => {
          setError(null);
          setLoading(true);
          signIn(email, password)
            .catch(err => {
              console.log(err);
              setError(err);
            })
            .finally(() => setLoading(false));
        }}
        disabled={loading}
      >
        Sign in
      </Button>
    </>
  );
}

function SignOutButton() {
  const { signOut } = useAuthContext();
  return <Button onClick={() => signOut()}>Sign out</Button>;
}

function AuthStatus() {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return <div>Authenticated as {user?.id}</div>;
}

export const Example: Story<Credentials> = ({
  email,
  password,
}: Credentials) => {
  return (
    <AuthProvider>
      <SignInButton email={email} password={password} />
      <SignOutButton />
      <AuthStatus />
    </AuthProvider>
  );
};

Example.args = {
  email: "admin@test.com",
  password: "admin",
};
