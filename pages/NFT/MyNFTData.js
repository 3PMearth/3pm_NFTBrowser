import React, { useState, useEffect } from 'react';
import Mystyles from "../../styles/mynft.module.css";
import NFTModal from '../api/NftModal';

const MyNFTData = ({ Address, walletType, Api , isLogin }) => {
  const [nftlist, setNftlist] = useState([]);

  const [Showlist, setShowlist] = useState([]);
  const [MyNFT, setMyNFT] = useState(false);
  const [NFTDataName, setNFTDataName] = useState(false);
  const [NFTDataID, setNFTDataID] = useState(false);
  const [NFTDataURL, setNFTDataURL] = useState(false);
  const [NFTDataContract, setNFTDataContract] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      return;
    } 
    
    setNftlist([]);
    setShowlist([]);
    nftShow();

  }, []);

  const nftShow = async() =>
  {
    if(Api && walletType == "klay")
    {
      const KasAccount = process.env.NEXT_PUBLIC_KLAYTN_ACCOUNT;
      const KasKey = process.env.NEXT_PUBLIC_KLAYTN_KAS_KEY;
      await Api.klaytnNFT(KasAccount,KasKey, "8217")
      .then(res => {
        setShowlist(res);
        res.map((token) => {
            console.log("Token Contract : " + token.Contract + "  Name : " + token.ContractName);
        });  
      }); 
    }
    else
    {
      await Api.ethereumPolygonNFT(process.env.NEXT_PUBLIC_MORALIS_API_KEY)
      .then(res => {
        setShowlist(res);
        res.map((token) => {
            console.log("Token Contract : " + token.Contract + "  Name : " + token.ContractName);
        });  
      });   
    }
  }

  const SettingGameNFT = (isOK) => {
    if (isOK == true)
      setShowlist(GameNFTlist);
    else
      setShowlist(nftlist);
  }

  const sendToken = async (contract, tokenName, tokenId, to) => {
    if (walletType == "klay") {
      await Api.KlaytnsendToken(contract,tokenName,tokenId,to)
      .then(res => {
        setMyNFT(false);

        //reload
        setNftlist([]);
        setShowlist([]);
        nftShow();
      }); 
    }
    else {
      await Api.ethereumPolygonsendToken(contract,tokenName,tokenId,to)
      .then(res => {
        setMyNFT(false);

        //reload
        setNftlist([]);
        setShowlist([]);
        nftShow();
      }); 
    }
  };

  //NFT 이미지를 누르는 버튼
  const MyNFTButtonOn = (NftContract, JsonName, tokenId, JsonURL) => {
    setMyNFT(true);
    setNFTDataContract(NftContract);
    setNFTDataName(JsonName);
    setNFTDataID(tokenId);
    setNFTDataURL(JsonURL);
  }
  return (
    <>
      <NFTModal
        show={MyNFT}
        onHide={() => setMyNFT(false)}
        isLogin={isLogin}
        walletType={walletType}
        Address={Address}
        NFTDataName={NFTDataName}
        NFTDataID={NFTDataID}
        NFTDataURL={NFTDataURL}
        NFTDataContract={NFTDataContract}
        sendToken={sendToken}
      />

      <div>
      {Showlist && Showlist.map((token) => {
          if (token != null) {
            return (
              <form className={Mystyles.todoNFTShowtemplate} key={token.id}>
                <div className="card mb-3">
                  <div className="card-body" style={{ display: "block", margin: "auto", height: "250px", width: "250px" }}>
                    <img onClick={() => MyNFTButtonOn(token.Contract, token.JsonName, token.Tokenid, token.JsonURL)}
                      //style={{ width: "100%", height: "80%", objectFit: "cover", borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit", margin: "0.1px" }}
                      style={{ width: "100%", height: "100%", objectFit: "contain", }}
                      src={token.JsonURL}
                      alt={token.id}
                    />
                  </div>
                  <ul className="list-group list-group-flush" >
                    <table>
                      <li className="list-group-item"><tr><th scope="row" width="50px" text-align="center">이름</th>
                        <td>{token.JsonName}</td></tr></li>
                      <li className="list-group-item"><tr><th scope="row" width="50px" text-align="center">ID</th>
                        <td>{token.Tokenid}</td></tr></li>
                      <li className="list-group-item"><tr><th scope="row" width="50px" text-align="center">심볼</th>
                        <td>{token.Symbol}</td></tr></li>
                      <li className="list-group-item"><tr><th scope="row" width="50px" text-align="center">설명</th>
                        <td height="80px">{token.JsonDescription}</td></tr></li>
                    </table>
                  </ul>
                </div>
              </form>
            );
          }
        })}
      </div>
    </>
  );
}

export default MyNFTData;