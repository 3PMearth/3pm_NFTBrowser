//import '../styles/globals.css';
import '../styles/bootstrap.min.css';

import MainTitle from "./MainTitle";
import React, { useState, useEffect } from 'react';
import Image from 'next/image'

function MyApp({ Component, pageProps }) {
  const [ShowAddress, SetShowAddress] = useState("Login");

  return (
    <>
      <MainTitle
      ShowAddress={ShowAddress}
      />
    </>
  );
}

export default MyApp;
