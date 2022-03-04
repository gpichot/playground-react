import { MessageType } from "./types";
export type MessagesContext = {
  messages: MessageType[];
  success: (text: string) => void;
  error: (text: string) => void;
};
export function useMessages(): MessagesContext;
export function MessagesProvider(props: {
  children: React.ReactNode;
}): JSX.Element;
