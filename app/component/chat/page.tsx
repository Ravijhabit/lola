"use client"
import { useCallback } from "react";
import Talk from "talkjs";
import { Session, Chatbox } from "@talkjs/react";
import styles from './chat.module.css';
import { Users } from "../constant";

function ChatComponent({sellerId}:{sellerId: string}) {
  const syncUser = useCallback(
    () =>
    // this is the user - hence data should be coming from seller
      new Talk.User(Users[0]),
    [],
  );

  const syncConversation = useCallback((session) => {
    // JavaScript SDK code here
    const conversation = session.getOrCreateConversation("welcome");
    // need to map another with the seller.
    const other = new Talk.User(Users[1]);
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);

  return (
    <Session appId="tbfixmcv" syncUser={syncUser} >
      <Chatbox
        syncConversation={syncConversation}
        style={{ width: "100%", height: "500px" }}
      />
    </Session>
  );
}

export default ChatComponent;