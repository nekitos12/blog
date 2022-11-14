import React from 'react';
import './sign-up-form.scss'
import UserSettingsForm from "../user-settings-form";

export default function SignUpForm() {
    const inputField = [
        {
            label: "Username",
            name: "username",
        },
        {
            label: "Email",
            name: "email",
        },
        {
            label: "Password",
            name: "password",
        },
        {
            label: "Repeat Password",
            name: "repeatPassword",
        }
    ];
  return (
      <div className="sign-up-form">
          <UserSettingsForm divider submitText="Create" header="Create new account" inputField={inputField} checkboxText="I agree to the processing of my personal information" footer={["Already have an account?", "Sign In." ]}/>
      </div>


  );
}
