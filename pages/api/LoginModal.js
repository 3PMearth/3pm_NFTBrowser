import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Container } from "react-bootstrap";

const LoginModal = ({ show, onHide, Address, SetAddress,SetShowAddress, setWalletType,isLogin,setIsLogin, web3, caver, onClickKaikas, onMetaMask}) => {

  const loginButton = () => {
    if (isLogin) {
      SetAddress("");
      window.sessionStorage.removeItem('ID');
      SetShowAddress("Login");
      setIsLogin(false);
      console.log("MetaMask LogOut : " + isLogin);
    }
    else
    {      
      onMetaMask();
      setIsLogin(true);
      //모달창 Off
      onHide(false);
      console.log("MetaMask Login :  "+ isLogin);
    }
  };
  const kaikasLoginButton = (e) => {  
    if (isLogin) {
      SetAddress("");
      window.sessionStorage.removeItem('ID');
      SetShowAddress("Login");
      
      setIsLogin(false);
      console.log("KaiKas LogOut : " + isLogin);
    }
    else
    {
      onClickKaikas();
      setIsLogin(true);
      //모달창 Off
      onHide(false);
      console.log("KaiKas Login : " + isLogin);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            로그인
          </Modal.Title>
        </Modal.Header>
        <br /><br />
        <Modal.Body className="modal-dialog-centered">
          <figure className="text-center modal-dialog modal-dialog-centered">
            <h5>
              지갑을 이용하여 LevelZero에 로그인 합니다.<br />
              아래 지갑을 로그인 해주세요.
            </h5>
          </figure>
        </Modal.Body>
        <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outline-dark" className="btn btn-lg"
                 onClick={() =>{loginButton();  }}>MetaMask 로그인</Button>
        </Modal.Body>        
        <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outline-dark" className="btn btn-lg"
                onClick={() =>{kaikasLoginButton();  }}>KaiKas 로그인</Button>
        </Modal.Body>
        <br/><br/><br/>

      </Modal>
      
    </>
  );
};
export default LoginModal;