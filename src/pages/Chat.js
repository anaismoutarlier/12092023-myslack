import { RaisedButton, Message } from "../components";

export default function Chat({ user, signout }) {
  return (
    <div className="chat container">
      <div className="sider">
        <div>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="sider-avatar"
          />
          <h2>{user.displayName}</h2>
          <h3>{user.email}</h3>
        </div>
        <RaisedButton onClick={signout}>LOGOUT</RaisedButton>
      </div>
      <div className="content">
        <div className="message-container">
          <Message />
        </div>
        <form className="input-container">
          <input />
          <RaisedButton type="submit">SEND</RaisedButton>
        </form>
      </div>
    </div>
  );
}
