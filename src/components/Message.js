import React from "react";

export default function Message({ sender, sentAt, content }) {
  return (
    <div className="message">
      <img src={sender.photoURL} alt="" className="avatar" />
      <div>
        <h6>{content}</h6>
        <p>
          {sentAt.toDate().getHours()}h{sentAt.toDate().getMinutes()}
        </p>
      </div>
    </div>
  );
}
