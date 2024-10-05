import { useEffect, useState } from "react";
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
        padding: "50pt",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
        <p>Display Name: {userData?.[1]} </p>
        <p>Description: {userData?.[2]} </p>
        <p>Company: {userData?.[3]} </p>
        <p>Job Title: {userData?.[4]} </p>
        <p>Bio: {userData?.[5]} </p>
        <p>{userData?.[0] ? "Telegram Available" : "Telegram Unavailable"}</p>
      </div>
    </div>
  );
};
