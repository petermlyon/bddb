"use client";

import { useHelpers } from "../utils/helpers";
import { NextPage } from "next";
import { EditDialog } from "~~/components/edit/EditDialog";

const Edit: NextPage = () => {
  const { updateMe } = useHelpers();
  return (
    <EditDialog writeButtonText={"Update my Data!"} writeFunction={updateMe} headerText="Edit your card"></EditDialog>
  );
};

export default Edit;
