"use client"
import { useCallback } from "react";
import Talk from "talkjs";
import { Session, Chatbox } from "@talkjs/react";

function ChatComponent() {
  const syncUser = useCallback(
    () =>
    // this is the user - hence data should be coming from seller
      new Talk.User({
        id: "nina",
        name: "Nina",
        email: "nina@example.com",
        photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
        welcomeMessage: "Hsaaaaaafsasi!",
        role: "default",
      }),
    [],
  );

  const syncConversation = useCallback((session) => {
    // JavaScript SDK code here
    const conversation = session.getOrCreateConversation("welcome");
    // need to map another with the seller.
    const other = new Talk.User({
      id: "frank",
      name: "Frank",
      email: "frank@example.com",
      photoUrl: "https://talkjs.com/new-web/avatar-8.jpg",
      welcomeMessage: "Hey, how can I help?",
      role: "default",
    });
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);

  return (
    <Session appId="tbfixmcv" syncUser={syncUser}>
      <Chatbox
        syncConversation={syncConversation}
        style={{ width: "100%", height: "500px" }}
      />
    </Session>
  );
}

export default ChatComponent;