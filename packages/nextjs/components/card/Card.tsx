import { useEffect, useState } from "react";
import MD5 from "crypto-js/md5";
import { useEnsAvatar, useEnsName } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type CardProps = {
  index: number;
  filter: string;
};

export const Card = ({ index, filter }: CardProps) => {
  const { data: walletAddress } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "addressArray",
    args: [index as unknown as bigint],
  });

  const { data: userData } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "userData",
    args: [walletAddress],
  });
  const [hidden, setHidden] = useState(false);

  const { data: ensName } = useEnsName({
    address: walletAddress,
    chainId: 1,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ? ensName : "",
    chainId: 1,
  });

  useEffect(() => {
    let newHidden = true;
    if (filter != "") {
      for (let i = 1; i < 5; i++) {
        if (userData?.[i].toUpperCase().includes(filter.toUpperCase())) {
          newHidden = false;
        }
      }
    } else {
      newHidden = false;
    }

    setHidden(newHidden);
  }, [filter, userData]);

  return hidden ? (
    <></>
  ) : (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        width: "min(400px, 100%)",
        color: "black",
        borderRadius: "50pt",
        paddingLeft: "50pt",
        paddingRight: "50pt",
        paddingBottom: "50pt",
        paddingTop: "20pt",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          lineHeight: 1.8,
          textAlign: "center",
          position: "relative",
        }}
      >
        <img
          style={{ position: "relative", width: "80pt", borderRadius: "40pt", marginBottom: "20pt" }}
          src={
            ensAvatar
              ? ensAvatar
              : `https://gravatar.com/avatar/${MD5(walletAddress ? walletAddress : "placeholder").toString()}?d=retro`
          }
        />
        {ensName && (
          <img
            style={{ position: "absolute", width: "40pt", transform: "translate(30pt, -50pt)" }}
            src={`./tick.png`}
          />
        )}
        {ensName && (
          <span>
            <b>Ens Name: </b>
            {ensName}{" "}
          </span>
        )}
        <span>
          <b>ChainedIn Username: </b>
          {userData?.[1]}
        </span>
        <span>
          <b>Description: </b>
          {userData?.[2]}
        </span>
        <span>
          <b>Company: </b>
          {userData?.[3]}
        </span>
        <span>
          <b>Job Title: </b>
          {userData?.[4]}
        </span>
        <span>
          <b>Bio: </b>
          {userData?.[5] && (
            <a href={userData?.[5]} target="_blank">
              <u>{userData?.[5]}</u>
            </a>
          )}
        </span>
        <span>
          {userData?.[0] && (
            <a href="https://t.me/chainedin_bot" target="_blank">
              <u>Contact via Telegram</u>
            </a>
          )}
        </span>
      </div>
    </div>
  );
};
