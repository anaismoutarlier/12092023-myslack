import { RaisedButton } from "../components";
import { FirebaseContext } from "../firebase";
import { useContext } from "react";

export default function Login() {
  const { signin } = useContext(FirebaseContext);
  return (
    <div className="login container">
      <RaisedButton onClick={() => signin("google")}>GOOGLE LOGIN</RaisedButton>
      <RaisedButton onClick={() => signin("facebook")}>
        FACEBOOK LOGIN
      </RaisedButton>
    </div>
  );
}
