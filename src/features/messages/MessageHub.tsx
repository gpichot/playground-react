import React from "react";
import { Alert } from "@mui/material";

import { useMessages } from "./context";
import { MessageType } from "./types";

export function MessageHub() {
  const messages = useMessages() as { messages: MessageType[] };
  const messageList = messages.messages || [];
  return (
    <div>
      {messageList.map(message => (
        <Alert key={message.id} severity={message.kind}>
          <p>{message.text}</p>
        </Alert>
      ))}
    </div>
  );
}
