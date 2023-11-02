import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Steps from '../Steps/Steps';
import './Layout.css';
import ChatBot from '../ChatBot/ChatBot';
import CheckLogin from '../../Auth/CheckLogin';
import Header from './Header';
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import config from '../../../config';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StepsLayout = () => {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [sumbittedFeed, setSumbittedFeed] = useState(false);

    const receiveDataFromChild = (data) => {
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleSubmit = async() => {
        try {
            const response = await fetch( config.apiUrlFeedback, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, feedback }),
            });
        
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    console.log(data);
                    setSumbittedFeed(true);
                } else {
                    console.error('Login failed:', data.message);
                }
            } else {
                console.error('HTTP error:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div>
            <Header />
            <div className='layout-body'>
                <CheckLogin redirect={'/login'} trueRedirect={'/null'} sendDataToParent={receiveDataFromChild} />
                <div className='function-0'>
                    <Steps />
                </div>
                <div className='other-functions'>
                    <div className='function-1'>
                        <Link to={'../user/speech'} style={{textDecoration: 'none', color: 'black', width:'100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>SPEECH</Link>
                    </div>
                    <div className='function-2'>
                        <Link to={'../user/llm'} style={{textDecoration: 'none', color: 'black', width:'100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>LLM</Link>
                    </div>
                    <div className='feedback-layout' onClick={handleOpen}>
                        <Icon icon="mingcute:plus-fill" />GOT AN IDEA?
                    </div>
                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                        <Box sx={style}>
                        <h3 style={{textAlign: 'center'}}>SUGGEST AN IDEA</h3>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, display: 'flex', flexDirection: 'row', width: '90%', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }, }} noValidate autoComplete="off">
                            <TextField id="filled-multiline-static" label="Email" fullWidth required value={email} onChange={(e) => setEmail(e.target.value)} disabled={sumbittedFeed}/>
                            <TextField id="filled-multiline-static2" label="Message" multiline rows={4} fullWidth variant="filled" value={feedback} onChange={(e) => setFeedback(e.target.value)} disabled= {sumbittedFeed}/>
                        </Box>
                        {sumbittedFeed ? (
                            <div className='form-submit'><Button variant="contained" color='success' endIcon={<Icon icon="fluent:mail-checkmark-24-filled" />}><p style={{fontWeight: 'bolder'}} >SENT</p></Button><br />
                            <b><i>WE WILL REACH OUT TO YOU SOON!!!</i></b></div>
                        ) : (
                            <div className='form-submit'><Button variant="contained" endIcon={<Icon icon="ic:round-mail" />} onClick={handleSubmit}><p style={{fontWeight: 'bolder'}} >SEND</p></Button></div>
                        )}
                        </Box>
                    </Modal>
                </div>
            </div>
            <ChatBot />
        </div>
    )
}

export default StepsLayout;