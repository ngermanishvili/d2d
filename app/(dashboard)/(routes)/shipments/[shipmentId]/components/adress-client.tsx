import React, { useEffect } from "react";
import AdressInput from "./adress";
import { currentUserId } from "@/lib/auth";
import { db } from "@/lib/db";

const AdressInputClient = () => {
  return <AdressInput />;
};

export default AdressInputClient;
