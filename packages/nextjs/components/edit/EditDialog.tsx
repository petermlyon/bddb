import { useEffect, useState } from "react";
import { useAccount, useEnsName, useEnsText } from "wagmi";
import { User } from "~~/app/ApiClasses/User";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type EditDialogProps = {
  writeFunction: (user: User) => void;
  headerText: string;
  writeButtonText: string;
};

export const EditDialog = ({ writeFunction, headerText, writeButtonText }: EditDialogProps) => {
  const { address: connectedAddress } = useAccount();

  const [user, setUser] = useState<User>({
    displayName: "",
    description: "",
    tg: "",
    company: "",
    jobTitle: "",
    bioUrl: "",
  });

  const { data: userData } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "userData",
    args: [connectedAddress],
  });

  const [wasSet, setWasSet] = useState({
    displayName: false,
    description: false,
    tg: false,
  });

  const { data: ensName } = useEnsName({
    address: connectedAddress,
    chainId: 1,
  });

  const { data: description } = useEnsText({
    name: ensName ? ensName : "",
    key: "description",
    chainId: 1,
  });

  const { data: telegram } = useEnsText({
    name: ensName ? ensName : "",
    key: "org.telegram",
    chainId: 1,
  });

  useEffect(() => {
    const newUserData = JSON.parse(JSON.stringify(user));
    if (userData?.[0]) {
      newUserData.tg = userData![0];
    }
    if (userData?.[1]) {
      newUserData.displayName = userData![1];
    }
    if (userData?.[2]) {
      newUserData.description = userData![2];
    }
    if (userData?.[5]) {
      newUserData.bioUrl = userData![5];
    }
    if (userData?.[3]) {
      newUserData.company = userData![3];
    }
    if (userData?.[4]) {
      newUserData.jobTitle = userData![4];
    }
    setUser(newUserData);
  }, [userData]);

  useEffect(() => {
    if (!wasSet.displayName && user.displayName == "" && ensName) {
      const newUser = JSON.parse(JSON.stringify(user));
      newUser.displayName = ensName;
      setUser(newUser);
      const newWasSet = JSON.parse(JSON.stringify(wasSet));
      newWasSet.displayName = true;
      setWasSet(newWasSet);
    }
  }, [ensName, user, wasSet]);

  useEffect(() => {
    if (!wasSet.tg && user.tg == "" && telegram) {
      const newUser = JSON.parse(JSON.stringify(user));
      newUser.tg = telegram;
      setUser(newUser);
      const newWasSet = JSON.parse(JSON.stringify(wasSet));
      newWasSet.tg = true;
      setWasSet(newWasSet);
    }
  }, [telegram, user, wasSet]);

  useEffect(() => {
    if (!wasSet.description && user.description == "" && description) {
      const newUser = JSON.parse(JSON.stringify(user));
      newUser.description = description;
      setUser(newUser);
      const newWasSet = JSON.parse(JSON.stringify(wasSet));
      newWasSet.description = true;
      setWasSet(newWasSet);
    }
  }, [description, user, wasSet]);

  return (
    <>
      <div
        className="text-center mt-8 p-10"
        style={{
          width: "80%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10pt",
          alignItems: "center",
          borderRadius: "50pt",
        }}
      >
        <h1 className="text-4xl my-0" style={{ marginBottom: "50pt" }}>
          {headerText}
        </h1>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <p>ChainedIn username</p>
          <input
            className="textBox"
            type="text"
            value={user.displayName}
            onChange={e => {
              const newUser = JSON.parse(JSON.stringify(user));
              newUser.displayName = e.target.value.toLowerCase();
              newUser.displayName = newUser.displayName.replace(" ", "");
              setUser(newUser);
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <p>Telegram ID</p>
          <input
            className="textBox"
            type="text"
            value={user.tg == userData?.[0] ? "" : user.tg}
            placeholder={userData?.[0] && userData?.[0] != "" ? "Saved" : ""}
            onChange={e => {
              const newUser = JSON.parse(JSON.stringify(user));
              newUser.tg = e.target.value;
              setUser(newUser);
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <p>Company</p>
          <input
            className="textBox"
            type="text"
            value={user.company}
            onChange={e => {
              const newUser = JSON.parse(JSON.stringify(user));
              newUser.company = e.target.value;
              setUser(newUser);
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <p>Job Title</p>
          <input
            className="textBox"
            type="text"
            value={user.jobTitle}
            onChange={e => {
              const newUser = JSON.parse(JSON.stringify(user));
              newUser.jobTitle = e.target.value;
              setUser(newUser);
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <p>Description</p>
          <input
            className="textBox"
            type="text"
            value={user.description}
            onChange={e => {
              const newUser = JSON.parse(JSON.stringify(user));
              newUser.description = e.target.value;
              setUser(newUser);
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <p>External URL</p>
          <input
            className="textBox"
            type="text"
            value={user.bioUrl}
            onChange={e => {
              const newUser = JSON.parse(JSON.stringify(user));
              newUser.bioUrl = e.target.value;
              setUser(newUser);
            }}
          />
        </div>
        <button
          style={{
            backgroundColor: "#ffffff20",
            width: "200pt",
            height: "50pt",
            borderRadius: "10pt",
            marginTop: "50pt",
          }}
          onClick={() => {
            writeFunction(user);
          }}
        >
          {writeButtonText}
        </button>
      </div>
    </>
  );
};
