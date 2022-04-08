import React from "react";

/**
 * TODO-EXO(exo-context)
 * Ceci est votre premier exercice.
 * Il s'agit de créer un contexte qui permettent de gérer des messages de
 * notifications.
 *
 * Exemple d'utilisation:
 * ```javascript
 * function App() {
 *   return (
 *     <MessagesProvider>
 *      <MessageHub />
 *      { / * Other components * / }
 *     </MessagesProvider>
 *   )
 * }
 *
 * function MyComponent() {
 *  const messages = useMessages();
 *  const onClick = () => messages.success("Hello World!");
 *
 *  return (
 *    <Button onClick={onClick}>Show success message</Button>
 *  )
 * }
 * ```
 */

// TODO(exo-context): 1. Créer le contexte

export function MessagesProvider({ children }) {
  // TODO(exo-context): 2. Créer le provider
  return <>{children}</>;
}

export function useMessages() {
  // TODO(exo-context): 3. Récupérer le consumer
  return {
    error: () => {},
    success: () => {},
    // TODO(exo-context): 4. Ajouter les méthodes de messages
  };
}
