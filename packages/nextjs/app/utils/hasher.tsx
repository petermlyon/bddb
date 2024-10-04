import argon2 from "argon2";

const appSalt = "DkhgwWxzlBOPO5ZKxono";

export const doHash = (name: string, wallet: string) => {
  return argon2.hash(`${name}${wallet}${appSalt}`);
};
