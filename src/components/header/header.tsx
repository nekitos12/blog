import React, {useState} from 'react';
import './app.css';
import SingInForm from "../sign-in-form";
import SignUpForm from "../sign-up-form";

export default function App() {
  const [isRegistr, setRegistr] = useState(false)

  return (
    <div className="app">
      {isRegistr ? <SingInForm /> : <SignUpForm />}
      <button onClick={()=>setRegistr(!isRegistr)}>Поменять</button>
    </div>
  );
}
