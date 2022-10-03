import Head from 'next/head'
import Image from 'next/image'
import LogoImg from "../public/images/3pm_logo.jpeg"

export default function Home() {
 

  return (
    <div>
      <Head>
        <title>3PM NFT Test</title>
        <meta name="description" content="Generated by Level Zero Test"/>
      </Head>      
      
      <div>
      <h4>3PM NFT 오픈소스 라이브러리 입니다</h4>
      <h4>클레이튼, 이더리움, 폴리곤을 지원합니다</h4>
      <h4>개발 환경 : Next.js, caver, caver-js-ext-kas, moralis api</h4>
      </div>
      <br/>
      <div>
      <h4>MY NFT 버튼을 누르면, 현재 로그인된 지갑의 NFT가 보여집니다</h4>
      </div>
      
      <div className="HomeImageContainer">
        <Image src={LogoImg}/>
      </div>
    </div>
  )
}