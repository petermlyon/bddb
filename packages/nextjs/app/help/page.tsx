"use client";

import { NextPage } from "next";

const Edit: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "80%",
        alignItems: "center",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <img style={{ width: "400pt" }} src="./chained.png"></img>
      <p>
        Your Telegram username is never stored by ChainedIn, it is hashed on the client side such that your personal
        contact doesn&apos;t end up on the blockchain.
      </p>
      <p>
        Once you&apos;ve added yourself to ChainedIn, click the Telegram links to connect to the Telegram bot. You can
        log in with your ChainedIn username - no password required.
      </p>
      <p>
        You can then initiate chats with other ChainedIn users via /chat. All ChainedIn chats will occur inside the
        ChainedIn bot chat, to get messages to a specific user you must reply to a message you have received from them,
        or to the /chat initiation message.
      </p>
    </div>
  );
};

export default Edit;
