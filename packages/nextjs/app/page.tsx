"use client";

import { useEffect, useState } from "react";
import { useHelpers } from "./utils/helpers";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Card } from "~~/components/card/Card";
import { EditDialog } from "~~/components/edit/EditDialog";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { data: numAddresses } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "numAddresses",
  });

  const { data: myData } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "userData",
    args: [connectedAddress],
  });

  const { addMe } = useHelpers();

  const [addressArray, setAddressArray] = useState<number[]>([]);
  const [addressesLoaded, setAddressesLoaded] = useState(0);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!numAddresses) {
      return;
    }

    const newAddressArray = addressArray?.slice();

    for (let i = addressesLoaded; i < numAddresses; i++) {
      newAddressArray?.push(i);
      console.log(numAddresses);
      console.log(i);
      setAddressesLoaded(i + 1);
      setAddressArray(newAddressArray);
    }
  }, [numAddresses, addressArray, addressesLoaded]);

  return connectedAddress && myData?.[1] ? (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5" style={{ width: "100%" }}>
          <h1 style={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <img style={{ width: "400pt" }} src="./chained.png"></img>
          </h1>
          <div
            className="flex items-center flex-row flex-grow pt-10"
            style={{ width: "50%", justifyContent: "center", margin: "auto" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "20pt" }} viewBox="0 0 24 24">
              <path
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                fill="#ffffff"
              />
            </svg>
            <input type="text" className="textBox" onChange={e => setFilter(e.target.value)} />
          </div>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Browse the directory below.</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              flexWrap: "wrap",
              gap: "50px",
              margin: "auto",
              marginTop: "50px",
            }}
          >
            {addressArray.map(element => (
              <Card key={element} index={element} filter={filter} />
            ))}
          </div>
        </div>
      </div>
    </>
  ) : connectedAddress ? (
    <EditDialog headerText="Add yourself!" writeButtonText="Chain me in!" writeFunction={addMe}></EditDialog>
  ) : (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Web3 Business Directory</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">
              Connect your wallet and create your business card to access the directory.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
