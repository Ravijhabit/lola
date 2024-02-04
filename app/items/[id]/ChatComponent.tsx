"use client"
import { useCallback } from "react";
import Talk from "talkjs";
import { Session, Chatbox } from "@talkjs/react";
import { Users } from "../../component/constant";

function ChatComponent({sellerId}:{sellerId: string}) {
  const syncUser = useCallback(
    () =>
    // this is the user
      new Talk.User(Users[0]),
    [],
  );

  const syncConversation = useCallback((session) => {
    // JavaScript SDK code here
    const conversation = session.getOrCreateConversation("welcome");
    // need to map another with the seller. (requires Seller Id)
    const other = new Talk.User(Users[1]);
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);

  return (
    <Session appId={process.env.NEXT_PUBLIC_APP_ID} syncUser={syncUser} >
      <Chatbox
        syncConversation={syncConversation}
        style={{ width: "100%", height: "500px" }}
      />
    </Session>
  );
}

export default ChatComponent;