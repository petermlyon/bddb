import { User } from "../ApiClasses/User";
import argon2 from "argon2-browser";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const appSalt = "DkhgwWxzlBOPO5ZKxono";

export const doHash = (name: string, wallet: string) => {
  return argon2.hash({ pass: name, salt: `${wallet}${appSalt}` });
};

export function useHelpers() {
  const { writeContractAsync } = useScaffoldWriteContract("YourContract");
  const { address: connectedAddress } = useAccount();

  const updateMe = async (user: User) => {
    const userMod = JSON.parse(JSON.stringify(user));
    delete userMod.tg;

    if (user.tg && connectedAddress) {
      console.log(await doHash(user.tg, appSalt));
      userMod.tgHash = (await doHash(user.tg, appSalt)).encoded;
    }

    return writeContractAsync({
      functionName: "updateUser",
      args: [userMod],
    });
  };

  const addMe = async (user: User) => {
    const userMod = JSON.parse(JSON.stringify(user));
    delete userMod.tg;

    if (user.tg && connectedAddress) {
      console.log(await doHash(user.tg, appSalt));
      userMod.tgHash = (await doHash(user.tg, appSalt)).encoded;
    }

    return writeContractAsync({
      functionName: "addUser",
      args: [userMod],
    });
  };

  return {
    updateMe,
    addMe,
  };
}
