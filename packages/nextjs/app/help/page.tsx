"use client";

import { NextPage } from "next";

const Edit: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        maxWidth: "600pt",
        alignItems: "center",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <img style={{ width: "400pt" }} src="./chained.png"></img>
      <div
        style={{
          flexDirection: "column",
          borderRadius: "50pt",
          padding: "50pt",
          marginTop: "50pt",
          fontSize: "16pt",
          backgroundColor: "#00000077",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <p>
          Your Telegram ID is never stored by ChainedIn, it is hashed on your computer such that your personal contact
          doesn&apos;t end up being public (on the blockchain).
        </p>
        <p>
          Once you&apos;ve added yourself to ChainedIn, you can chat with other users. Click the Telegram link on each
          business card to connect to the ChainedIn Telegram bot. You will be asked to provide your ChainedIn username.
        </p>
        <p>
          You can then initiate chats with other ChainedIn users via /chat. All ChainedIn chats will occur inside the
          ChainedIn bot chat, to send messages to a specific user you must reply to a message you have received from
          them, or to the /chat initiation message.
        </p>
      </div>
    </div>
  );
};

export default Edit;
