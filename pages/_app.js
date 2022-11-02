//import '../styles/globals.css';
import '../styles/bootstrap.min.css';

import MainTitle from "./MainTitle";
import React, { useState, useEffect } from 'react';
import nft_browswer_3pm from "nft_browswer_3pm";

function MyApp({ Component, pageProps }) {
  const [Address, SetAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [ShowAddress, SetShowAddress] = useState("Login");

  const [CoinAmount, SetCoinAmount] = useState(0);
  const [CoinIcon, SetCoinIcon] = useState("/images/ethereum_icon.png");


  const [Api, SetApi] = useState("");

  useEffect(() => {
    const api = new nft_browswer_3pm();    
    api.InitWallet();
    SetApi(api);
    }, []);



  const kaikasLogin = async () => {    
    if(Api)
    {
      await Api.kaikasLogin();
     
      SetAddress(Api.walletaddress);
      SetCoinAmount(Api.coin);
      setWalletType("klay");

      const firstText =  Api.walletaddress.substring(0, 8);
      const LastText =  Api.walletaddress.slice(-6);
      const AllId = firstText + "......." + LastText;
      SetShowAddress(AllId);
      setIsLogin(true);
      SetCoinIcon("/images/klaytn-logo.png");
    }
  }

  const onMetaMask = async () => {
    if(Api)
    {
      await Api.metamaskLogin();

      SetAddress(Api.walletaddress);
      SetCoinAmount(Api.coin);  

      const ID = JSON.stringify(Api.walletaddress);
      ID = ID.substr(2);
      ID = ID.substr(0, ID.length - 2);
  
      const firstText = ID.substring(0, 8);
      const LastText = ID.slice(-6);
      const AllId = firstText + "......." + LastText;
      SetShowAddress(AllId);
  
      if(Api.chainid == 137 || Api.chainid == 80001)
      {
        setWalletType("poly");
        SetCoinIcon("/images/polygon_icon.png");
      }
      else
      {
        setWalletType("eth");
        SetCoinIcon("/images/ethereum_icon.png");
      }
  
      setIsLogin(true);      
    }
  }

  return (
    <>
      <MainTitle
        onClickKaikas={kaikasLogin}
        onMetaMask={onMetaMask}
        Api={Api}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setWalletType={setWalletType}
        Address={Address}
        SetAddress={SetAddress}
        ShowAddress={ShowAddress}
        SetShowAddress={SetShowAddress}
        CoinAmount={CoinAmount}
        CoinIcon={CoinIcon}
      />
      <Component
        Address={Address}
        walletType={walletType}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        Api={Api}
        onClickKaikas={kaikasLogin}
        onMetaMask={onMetaMask}        
        CoinAmount={CoinAmount}
        CoinIcon={CoinIcon}
      />
    </>
  );
}

export default MyApp;
