import React, { useState, useEffect } from 'react';
import kip17Abi from "../../components/kip17Abi";
import Mystyles from "../../styles/mynft.module.css";
import axios from "axios";

const MyNFTData = ({ Address, walletType, web3, caver, newKip17addr, isLogin }) => {
  const [nftlist, setNftlist] = useState([]);

  const [GameNFTlist, setGameNFTlist] = useState([]);
  const [Showlist, setShowlist] = useState([]);
  const [isGameNFT, setGameNFT] = useState(false);
  const [MyNFT, setMyNFT] = useState(false);
  const [NFTDataName, setNFTDataName] = useState(false);
  const [NFTDataID, setNFTDataID] = useState(false);
  const [NFTDataURL, setNFTDataURL] = useState(false);
  const [NFTDataContract, setNFTDataContract] = useState(false);

  //Firebase Database 
  const [Info, setInfos] = useState({
    Contract: '',
    GameItemValue: -1,
    Token: -1
  });

  useEffect(() => {
    if (!isLogin) {

    }

    setNftlist([]);
    setShowlist([]);
    setGameNFTlist([]);
    if (walletType == "klay") {
      KlaytnNFT();
    }
    else {
      ethereumPolygonNFT();
    }
  }, []);

  const SettingGameNFT = (isOK) => {
    setGameNFT(isOK);
    if (isOK == true)
      setShowlist(GameNFTlist);
    else
      setShowlist(nftlist);
  }

  const ethereumPolygonNFT = async () => {
    //https://polygon-mainnet.public.blastapi.io //폴리곤 노드
    //https://polygon-rpc.com                    //폴리곤 노드
    //https://eth-mainnet.public.blastapi.io     // 이더리움 노드
    //https://rpc.ankr.com/eth                   // 이더리움 노드 

    //오픈씨 컨트랙트 주소를 통해서 내가 배포한 NFT가 있는지 체크
    //moralis API 에 있는 transction 로그를 이용해 NFT를 가지고 오는 방식    
    const chainId = await web3.eth.getChainId();
    const url = "";
    if (chainId == 137)  // polygon
      url = "https://deep-index.moralis.io/api/v2/" + Address + "/nft?chain=polygon&format=decimal";
    else if (chainId == 80001) // polygon mumbai
      url = "https://deep-index.moralis.io/api/v2/" + Address + "/nft?chain=mumbai&format=decimal";
    else if (chainId == 1) //eth 
      url = "https://deep-index.moralis.io/api/v2/" + Address + "/nft?chain=eth&format=decimal";
    else if (chainId == 3) //eth ropsten
      url = "https://deep-index.moralis.io/api/v2/" + Address + "/nft?chain=ropsten&format=decimal";
    else if (chainId == 4) //eth Rinkeby
      url = "https://deep-index.moralis.io/api/v2/" + Address + "/nft?chain=rinkeby&format=decimal";

    const api_Key = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
    axios.get(url,
      {
        headers: {
          "X-API-KEY": api_Key,
          "Content-Type": "application/json",
          "accept": "application/json"
        }
      })
      .then(async function (response) {
        const resultData = JSON.stringify(response['data']['result']);

        for (var i = 0; i < response.data.result.length; i++) {
          var user = response.data.result[i];
          console.log("resultData : " + JSON.stringify(user));

          const NftContract = user.token_address;
          const name = user.name;
          const symbol = user.symbol;
          const tokenId = user.token_id;
          const tokenURI = user.token_uri;

          const JsonName = "";
          const JsonDescription = "";
          const JsonURL = "";
          const FireBaseDB = false;

          const URL = user.token_uri.substring(0, 7);
            const GetJson = await fetch(tokenURI);
            const jsonFile = await GetJson.json();

            JsonName = jsonFile.name;
            JsonDescription = jsonFile.description;
            if (!JsonDescription) {
              JsonDescription = jsonFile.bio;
            }

            JsonURL = jsonFile.image;
            if (!JsonURL) {
              JsonURL = jsonFile.image_url;
            }

          setNftlist((prevState) => {
            return [...prevState, { NftContract, name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
          });

          setShowlist((prevState) => {
            return [...prevState, { NftContract, name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
          });
        }
      })
      .catch(function (error) {
        // 에러인 경우 실행
        console.log("error : " + error);
      })
  }

  const KlaytnNFT = async () => {
    const tokenContract = "";

    console.log("account : " + Address);

    const CaverExtKAS = require('caver-js-ext-kas');
    const Caver = new CaverExtKAS();

    //클레이튼 API 에서 받은 account와 key 번호
    const KasAccount = process.env.NEXT_PUBLIC_KLAYTN_ACCOUNT;
    const KasKey = process.env.NEXT_PUBLIC_KLAYTN_KAS_KEY;
    const chainId = '8217'; //Main
    //const chainId = '1001'; //testnet
    Caver.initKASAPI(chainId, KasAccount, KasKey);

    const query = {
      kind: [Caver.kas.tokenHistory.queryOptions.kind.NFT],
      size: 1000,
      //range: '1593529200,1599145200',
      //caFilter: '0xbbe63781168c9e67e7a8b112425aa84c479f39aa',
    }
    const result = await Caver.kas.tokenHistory.getTransferHistoryByAccount(Address, query);

    let Contract = [];
    for (let i = 0; i <= query.size; i++) {
      const number = i;
      const jsondata = result['items'][number];

      //로그상에서 컨트랙트 ID 가지고 오기
      if (jsondata != 'undefined' && jsondata != null) {
        const jsonTo = jsondata['to'];
        const jsonTokenID = jsondata['tokenId'];

        if (jsonTo == Address) {
          const jsonContract = jsondata['contract']['address'];

          const Data = [jsonContract, jsonTokenID];
          Contract.push(Data);
        }
      }
      else {
        break;
      }
    }

    //토큰 ID가 중복으로 들어오는 부분 제거
    let resultContract = Contract.filter((element, index) => {
      return (
        Contract.findIndex(
          (item) => item[0] === element[0] && item[1] === element[1]
        ) === index
      );
    });

    for (let con of resultContract) {
      const NftContract = con[0];
      tokenContract = await new caver.klay.Contract(kip17Abi, con[0]);

      const name = await tokenContract.methods.name().call();
      const symbol = await tokenContract.methods.symbol().call();
      const tokenId = parseInt(con[1], 16);

      const JsonURL = '';
      const JsonName = '';
      const JsonDescription = '';
      const FireBaseDB = false;

      console.log("Contract : " + con[0]);
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();

      console.log("jsontokenOwner : " + tokenOwner.toLowerCase() + "  Address : " + Address);
      //카이카스는 받아오는 TokenID값이 소문자로 나옴
      //https://forum.klaytn.foundation/t/wallet-address-uppercase-lowercase/1297
      //해당 포럼에서 LowerCase를 사용하라고 함
      if (tokenOwner.toLowerCase() != Address)
        continue;

      let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
      FireBaseDB = false;
      console.log("tokenURI : " + tokenURI);

      const URL = tokenURI.substring(0, 7);
      if (URL == "ipfs://") {
        const MetaDataJson = tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");

        const GetJson = await fetch(MetaDataJson);

        const jsonFile = await GetJson.json();
        JsonName = jsonFile.name;

        JsonDescription = jsonFile.description;
        const Image = jsonFile.image;
        //JsonURL = Image.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
        JsonURL = Image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
      }
      else {
        const SubURL = tokenURI.substring(0, 12);
        if (SubURL == "https://ipfs") {
          const MetaDataJson = tokenURI.replace("https://ipfs.infura.io/", "https://ipfs.io/");

          const GetJson = await fetch(MetaDataJson);

          const jsonFile = await GetJson.json();
          JsonName = jsonFile.name;

          JsonDescription = jsonFile.description;
          const Image = jsonFile.image;
          JsonURL = Image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
        }
        else {
          const GetJson = await fetch(tokenURI);
          const jsonFile = await GetJson.json();

          JsonName = jsonFile.name;
          JsonDescription = jsonFile.description;
          JsonURL = jsonFile.image;
        }

      }

      setNftlist((prevState) => {
        return [...prevState, { NftContract, name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
      });

      setShowlist((prevState) => {
        return [...prevState, { NftContract, name, symbol, tokenId, JsonURL, JsonName, JsonDescription, FireBaseDB }];
      });
    }
  };

  return (
    <>
          <div>
        {Showlist.map((token) => {
          if (token != null) {
            return (
              <form className={Mystyles.todoNFTShowtemplate} key={token.id}>
                <div className="card mb-3">
                  <h3 className="card-header">{token.FireBaseDB ? token.name + " GameNFT" : token.name}</h3>
                  <div className="card-body" style={{ display: "block", margin: "auto", height: "250px", width: "250px" }}>
                    <img
                      //style={{ width: "100%", height: "80%", objectFit: "cover", borderTopLeftRadius: "inherit", borderTopRightRadius: "inherit", margin: "0.1px" }}
                      style={{ width: "100%", height: "100%", objectFit: "contain", }}
                      src={token.JsonURL}
                      alt={token.id}
                    />
                  </div>
                  <ul className="list-group list-group-flush" >
                    <table>
                      <li className="list-group-item"><th scope="row" width="50px" text-align="center">이름</th>
                        <td height="50px">{token.JsonName}</td></li>
                      <li className="list-group-item"><th scope="row" width="50px" text-align="center">ID</th>
                        <td height="80px">{token.tokenId}</td></li>
                      <li className="list-group-item"><th scope="row" width="50px" text-align="center">심볼</th>
                        <td>{token.symbol}</td></li>
                      <li className="list-group-item"><th scope="row" width="50px" text-align="center">설명</th>
                        <td height="90px" overflow="hidden" textoverflow="ellipsis" whitespace="nowrap">{token.JsonDescription}</td></li>
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