"use client";

import { useRouter } from "next/navigation";
import { NextPage } from "next";

const Edit: NextPage = () => {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        maxWidth: "400pt",
        alignItems: "center",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <img style={{ width: "400pt" }} src="./chained.png"></img>
      <p>Thanks for setting up your profile!</p>
      <p>
        Now if you{" "}
        <a href="https://t.me/chainedin_bot" target="_blank">
          <u>Connect to the Telegram Bot</u>
        </a>{" "}
        and sign in using your username, people will be able to contact you and vice-versa.
      </p>
      <button
        style={{
          backgroundColor: "#00000080",
          width: "200pt",
          height: "50pt",
          borderRadius: "10pt",
          marginTop: "50pt",
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        Browse Profiles
      </button>
    </div>
  );
};

export default Edit;
