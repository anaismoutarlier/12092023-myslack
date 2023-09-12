import { RaisedButton } from "../components";

export default function Login({ signin }) {
  return (
    <div className="login container">
      <RaisedButton onClick={() => signin("google")}>GOOGLE LOGIN</RaisedButton>
      <RaisedButton onClick={() => signin("facebook")}>
        FACEBOOK LOGIN
      </RaisedButton>
    </div>
  );
}
