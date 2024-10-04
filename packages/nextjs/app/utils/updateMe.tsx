import { User } from "../ApiClasses/User";
import { doHash } from "./hasher";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export function useHelpers() {
  const { writeContractAsync } = useScaffoldWriteContract("YourContract");
  const { address: connectedAddress } = useAccount();

  const updateMe = (user: User) => {
    const userMod = JSON.parse(JSON.stringify(user));
    delete userMod.tg;

    if (user.tg && connectedAddress) {
      userMod.tgHash = doHash(user.tg, connectedAddress);
    }

    return writeContractAsync({
      functionName: "updateUser",
      args: [userMod],
    });
  };

  return [updateMe];
}
