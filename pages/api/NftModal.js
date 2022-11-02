import React, { useState } from 'react';
import { Modal, Button, Form, Container } from "react-bootstrap";

const NftModal = ({ show, onHide,  isLogin, walletType, Address,NFTDataName,NFTDataID,NFTDataURL,NFTDataContract,sendToken}) => {
    const [fromAddress, setfromAddress] = useState('');
    const onAddressChange = (e) => {
        setfromAddress(e.target.value);
      };

    const TransferButton = () => {
        if(fromAddress == "" )
        {
            return;
        }

        if(fromAddress == Address)
        {
            return;
        }

        sendToken(NFTDataContract, NFTDataName,NFTDataID,fromAddress );
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
              My NFT
            </Modal.Title>
          </Modal.Header>
          <br /><br />
          <Modal.Body className="modal-dialog-centered">
            <div className="row">
                <div className="col-8 col-sm-6">
                <img
                  style={{ width: "95%", height: "95%", objectFit: "contain", }}
                  src={NFTDataURL}
                  alt={NFTDataID}
                />
                </div>
                <div className="col-4 col-sm-6">
                <li className="list-group-item"><tr><th scope="row" width="50px" text-align="center">ID </th>
                    <td>{ NFTDataID}</td></tr></li>
                <li className="list-group-item"><tr><th scope="row" width="50px" text-align="center">이름</th>
                    <td>{NFTDataName}</td></tr></li>                    

                <input type="name" className="form-control" id="FromAddress" onChange={onAddressChange} placeholder="0x123456789" />
                <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outline-dark" className="btn btn-lg"
                    onClick={() =>{TransferButton();  }}>Transfer</Button>
                </Modal.Body>                
                </div>
            </div>
          </Modal.Body>     

          <br/><br/><br/>
  
        </Modal>
        
      </>
    );
  };
  export default NftModal;