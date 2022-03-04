import React from "react";
import { Message } from "semantic-ui-react";
import { MessageType } from "./types";
import { useMessages } from "./context";

export function MessageHub() {
  const messages = useMessages() as { messages: MessageType[] };
  const messageList = messages.messages || [];
  return (
    <div>
      {messageList.map(message => (
        <Message
          key={message.id}
          negative={message.kind === "error"}
          positive={message.kind === "success"}
        >
          <p>{message.text}</p>
        </Message>
      ))}
    </div>
  );
}
