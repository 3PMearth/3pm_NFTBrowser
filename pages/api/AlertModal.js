import React, { useState } from 'react';
import { Modal, Button, Form, Container } from "react-bootstrap";

const AlertModal = ({ show, onHide }) => {

  const [Address, SetAddress] = useState('Login');

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
            로그인 오류
          </Modal.Title>
        </Modal.Header>
        <br /><br />
        <Modal.Body className="modal-dialog-centered">
          <figure className="text-center modal-dialog modal-dialog-centered">
            <h5>
              카이카스 지갑 또는 메타마스크 지갑이 <b>다운로드</b> 되어있지 않습니다
            </h5>
          </figure>
        </Modal.Body>
        <Modal.Body style={{ display: "flex", justifyContent: "center"}}>
          <p>사용 중인 지갑이 없으신가요?  &nbsp;
            <a href="https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=ko"
              target='_blank' rel='noopener noreferrer' className="alert-link">KaiKas 다운로드</a>&nbsp;&nbsp;
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko"
              target='_blank' rel='noopener noreferrer' className="alert-link">MetaMask 다운로드</a></p>
        </Modal.Body>        
        <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
          <Button className="btn btn-lg btn-danger"
                onClick={onHide}>Close</Button>
        </Modal.Body>        
      </Modal>
      
    </>
  );
};
export default AlertModal;