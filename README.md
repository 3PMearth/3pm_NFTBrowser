<p align="center">
<img src ="https://user-images.githubusercontent.com/41898132/199650760-67d26dae-de74-45a1-86b0-22b34944930c.gif">
</p>

#주요 기능

- MetaMask Login (Ethereum & Polygon)
- Kaikas Login (Klaytn)
- 지갑에 소유하고 있는 NFT 보여주기
- NFT 전송

# Install

```bash
npm install nft_browser_3pm
```

# API 참조 문서

```kotlin
new nft_browser_3pm();
nft_brower_3pm.InitWallet();
```

InitWallet() 은 Metamask 지갑 로그인인 Web3 와 Kaikas 지갑 로그인 Caver-js 를 활성화 시킵니다
</br>

```kotlin
nft_brower_3pm.web3;
nft_brower_3pm.caver;
```

web3 : Metamask 지갑에 필요한 web3 패키지를 반환
caver : Kaikas 지갑에 필요한 Caver-js 패키지를 반환

# KaiKas Wallet

```kotlin
nft_brower_3pm.kaikasLogin();
```

Kaikas 지갑에 로그인을 합니다. kaikas 지갑에 로그인이 되어있지 않는 상태라면, kaikas 지갑이 활성화가 되어, 해당 지갑에 비밀번호작성이 완료 된 이후 활성화가 됩니다. 이미 kaikas 지갑에 로그인이 된 상태라면, address와 coin을 활성화 시켜 줍니다
</br>

```kotlin
nft_brower_3pm.walletaddress;
nft_brower_3pm.coin;
```

walletaddress : kaikas 지갑에 로그인이 된 이후 지갑의 주소를 가지고 있는 변수
coin : kaikas 지갑에 있는 코인의 수
</br>

```kotlin
await nft_brower_3pm.klaytnNFT(KAS_API_ACCOUNT,KAS_API_KEY, "8217");
```

KaiKas 지갑안에 있는 NFT를 가져올 수 있다

**Parameters**
|이름|타입|설명|
|------|---|---|
|KAS_API_ACCOUNT|string|Kas API 홈페이지에서 Security 페이지에서 가지고 온다|
|KAS_API_KEY|string|Kas API 홈페이지에서 Security 페이지에서 가지고 온다|
|8217|string| "8217"은 KaiKas의 메인넷 "1001"은 테스트넷 |

KAS_API 경우, [Kas API Console](https://console.klaytnapi.com/ko/security/credential) 에 Security -> Credential 페이지에서 Account와 key 값을 가져올수 있다

**리턴값**
|이름|타입|설명|
|------|---|---|
|Contract|string| Contract 주소|
|ContractName|string| Contract 이름|
|Symbol|string| Contract 심볼 |
|Tokenid|string| Contract 토큰 Id값 |
|JsonURL|string| NFT 이미지 경로 |
|JsonName|string| NFT 이름 |
|JsonDescription|string| NFT 에 대한 설명 |

NFT를 에 사용되는 Json 파일에 있는 데이터 일부를 배열 형태로 가지고 온다

</br>

```kotlin
await Api.KlaytnsendToken(contract,tokenName,tokenId,to);
```

**Parameters**
|이름|타입|설명|
|------|---|---|
|contract|string| Contract 주소값 |
|tokenName|string| JsonName 나온 이름값 |
|tokenId|string| Contract 토큰 ID |
|to|string| 보내는 사람 주소 |

# MetaMask Wallet

```kotlin
nft_brower_3pm.metamaskLogin();
```

MetaMask 지갑에 로그인을 합니다. MetaMask 지갑에 로그인이 되어있지 않는 상태라면, MetaMask 지갑이 활성화가 되어, 해당 지갑에 비밀번호작성이 완료 된 이후 활성화가 됩니다. 이미 MetaMask 지갑에 로그인이 된 상태라면, address와 coin을 활성화 시켜 줍니다
</br>

```kotlin
nft_brower_3pm.walletaddress;
nft_brower_3pm.coin;
nft_brower_3pm.chainid;
```

walletaddress : MetaMask 지갑에 로그인이 된 이후 지갑의 주소를 가지고 있는 변수
coin : MetaMask 지갑에 있는 코인의 수
chainid : MetaMask 지갑의 블록체인 ID
</br>

```kotlin
await nft_brower_3pm.ethereumPolygonNFT(MORALIS_KEY);
```

MetaMask 지갑안에 있는 NFT를 가져올 수 있다

**Parameters**
|이름|타입|설명|
|------|---|---|
|MORALIS_KEY|string|Kas API 홈페이지에서 Security 페이지에서 가지고 온다|

MORALIS_KEY 경우, [Moralis API ](https://admin.moralis.io/web3apis) 에 Moralis API -> Web3 APIs 페이지에서 API Key 값을 가져올수 있다

**리턴값**
|이름|타입|설명|
|------|---|---|
|Contract|string| Contract 주소|
|ContractName|string| Contract 이름|
|Symbol|string| Contract 심볼 |
|Tokenid|string| Contract 토큰 Id값 |
|JsonURL|string| NFT 이미지 경로 |
|JsonName|string| NFT 이름 |
|JsonDescription|string| NFT 에 대한 설명 |

NFT를 에 사용되는 Json 파일에 있는 데이터 일부를 배열 형태로 가지고 온다

</br>

```kotlin
await nft_brower_3pm.ethereumPolygonsendToken(contract,tokenName,tokenId,to);
```

**Parameters**
|이름|타입|설명|
|------|---|---|
|contract|string| Contract 주소값 |
|tokenName|string| JsonName 나온 이름값 |
|tokenId|string| Contract 토큰 ID |
|to|string| 보내는 사람 주소 |
