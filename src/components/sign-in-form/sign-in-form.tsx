import React from 'react';
import './sign-in-form.scss';
import UserSettingsForm from "../user-settings-form";

export default function SignInForm() {
  const inputField = [
    {
      label: "Email address",
      name: "email",
    },
    {
      label: "Password",
      name: "password",
    },
  ];
  return (
      <UserSettingsForm submitText="Login" header="sign in" inputField={inputField} footer={["Don’t have an account?", "Sign Up."]} />
  );
}
