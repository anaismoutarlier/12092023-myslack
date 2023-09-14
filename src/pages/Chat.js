import { RaisedButton, Message } from "../components";
import { FirebaseContext } from "../firebase";
import { useContext, useState } from "react";

export default function Chat() {
  const { user, messages, signout, sendMessage } = useContext(FirebaseContext);
  const [messageText, setMessageText] = useState("");

  const handleChange = e => setMessageText(e.target.value);

  const handleSendMessage = async e => {
    e.preventDefault();
    if (!messageText) return;

    const newMessage = {
      content: messageText,
      sentAt: new Date(),
      sender: {
        uid: user.uid,
        photoURL: user.photoURL,
      },
    };
    await sendMessage(newMessage);
    setMessageText("");
  };
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
          {messages.map(message => (
            <Message key={message.id} {...message} />
          ))}
        </div>
        <form className="input-container" onSubmit={handleSendMessage}>
          <input value={messageText} onChange={handleChange} />
          <RaisedButton type="submit">SEND</RaisedButton>
        </form>
      </div>
    </div>
  );
}
