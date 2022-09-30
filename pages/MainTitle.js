import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import Title from '../styles/Title.module.css';

import Link from 'next/link';
import Image from 'next/image'

import LoginModal from './api/LoginModal.js';
import AlertModal from "./api/AlertModal";


const MainTitle = ({ShowAddress}) => {
    const Name = "3PM";
    const [LoginOn, setLoginOn] = useState(false);
    const [AlertOn, setAlertOn] = useState(false);
    const CheckUnlocked = () => 
    {
        if(window.klaytn || window.ethereum)
            setLoginOn(true);
        else
            setAlertOn(true); 
    }

    return (
            <>
            <LoginModal
                show={LoginOn}
                onHide={() => setLoginOn(false)}
            />           
            <AlertModal
                show={AlertOn}
                onHide={() => setAlertOn(false)}
            />            

            <div>
                <Navbar bg="light" expand="xl">
                    <h4><Navbar.Brand href="/"><b>{Name}</b></Navbar.Brand></h4>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="ml-auto">
                            <div className={Title.MainMenu}><Link href="/">Home</Link></div>
                            <div className={Title.MainMenu}><Link href="/NFT/MyNFTData"> MY NFT </Link></div>                            
                            { /*<div className={Title.MainMenu}><Link href="/NFT/Minting">NFT Minting</Link></div> */}                             
                        </Nav>
                    </Navbar.Collapse>        



                    <Nav className="mr-auto">
                    <Button variant="primary" onClick={()=> { CheckUnlocked(); }} >{ShowAddress}</Button>
                    </Nav>                    
                </Navbar>
            </div>

        </>
    );
}

export default MainTitle;