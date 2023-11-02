import React, {useEffect, useState} from 'react'
import Header from './Header';
import Spline from '@splinetool/react-spline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import './layout.css';
import mission from '../../Assets/land_mission.svg';
import working from '../../Assets/working_back.png';
import config from '../../config';
import Loader from './Loader';

const Landing = () => {
    const [bgImage, setBgImage] = useState(false);
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [sumbittedFeed, setSumbittedFeed] = useState(false);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setBgImage(true);
        } else {
            setBgImage(false);
        }   
    }, []);

    const handleStart = () => {
        window.location.href = './login';
    }

    const handleGit = () => {
        window.location.href = './login';
    }

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
        <div className='Landing'>
            <Loader time='5000'/>
            <Header />
            {!bgImage ? (
                <div className='back-3d' id='about'>
                    <Spline scene="https://prod.spline.design/ZENixsBSWgbTPcC4/scene.splinecode" style={{width: '100vw', height: '100vh'}} />
                </div>
            ) : (
                <div className='back-3d-mobile' id='about'>
                    <Spline scene="https://prod.spline.design/BQzEex-2-VaZqKI3/scene.splinecode" style={{width: '100vw', height: '100vh'}} />
                </div>
            )}
            {!bgImage ? (
                <div className='intro' onClick={handleStart}>
                    <div className='intro-controls'></div>
                </div>
            ) : (
                <div><br /><br /><br /><br />
                    <div className='intro-mobile'>
                        <div className='intro-mega1'>ComputeGPT</div>
                        <div className='intro-mega2'>Your Computational Companion</div><br />
                        <div className='intro-mini'>ComputeGPT is your one-stop solution for accurate and efficient mathematical problem-solving, powered by advanced LLM technology.</div><br />
                        <div className='intro-controls'><Button variant="contained" endIcon={<Icon icon="line-md:arrow-right" />} onClick={handleStart}><p style={{fontWeight: 'bolder'}}>Get Started</p></Button></div>
                    </div>
                </div>
            )}


            <div className='spacer' id='mission'></div>

            <div className='mission' >
                <img className='mission-image' src={mission} alt="Mission" />
                <div className='mission-content'>
                    <div className='mission-header'>Our Mission</div>
                    <div className='mission-text'>At ComputeGPT, our mission is to simplify complex computational problem-solving for users worldwide. We strive to provide a seamless and intuitive experience, enabling users to solve intricate computations effortlessly.</div>
                </div>
            </div>

            <div className='spacer' id='working'></div>

            <div className='working'>
                <div className='working-content'>
                    <div className='working-header'>How does it Works?</div>
                    <div className='working-text'>ComputeGPT employs AI and LLM technology to swiftly and accurately solve a wide array of Computational problems. By leveraging the power of advanced algorithms and natural language processing, ComputeGPT breaks down complex problems into simple, understandable steps, making mathematical computations a breeze.</div>
                </div>
                <img style={{width: '350px'}} src={working} alt="Working" />
            </div>

            <div className='spacer' id='features'></div>

            <div className='features'>
                <h1 style={{textIndent: '100px'}}>Features</h1><br />
                <div className="flex-container">
                    <div className="flex-item1">
                        <div className="marker">
                            <div className="ribbon">
                                <span>1</span>
                            </div>
                        </div>
                        <h2><b>Step-by-Step Solutions</b></h2><br />
                        <span>ComputeGPT offers a step-by-step breakdown of even the most intricate mathematical problems, ensuring a comprehensive understanding of the solution process.</span>
                    </div>
                    <div className="flex-item2"><div className="numbers"><h3>1</h3></div></div>
                </div>

                <div className="flex-container">
                    <div className="flex-item3"><div className="flex-item2"><div className="numbers"><h3>2</h3></div></div></div>
                    <div className="flex-item4">
                        <div className="marker">
                            <div className="ribbon">
                                <span>2</span>
                            </div>
                        </div>
                        <h2><b>LLM Powered Solutions</b></h2><br />
                        <span>Empowered by the latest in Language Model technology, ComputeGPT provides highly accurate and reliable solutions to a diverse range of computational challenges.</span>
                    </div>
                </div>

                <div className="flex-container">
                    <div className="flex-item5">
                        <div className="marker">
                            <div className="ribbon">
                                <span>3</span>
                            </div>
                        </div>
                        <h2><b>Voice interface</b></h2><br />
                        <span>Interact with ComputeGPT effortlessly using our intuitive voice interface. Ask complex math queries verbally and receive immediate, accurate responses.</span>
                    </div>
                    <div className="flex-item6"><div className="flex-item2"><div className="numbers"><h3>3</h3></div></div></div>
                </div>

                <div className="flex-container">
                    <div className="flex-item7"><div className="flex-item2"><div className="numbers"><h3>4</h3></div></div></div>
                    <div className="flex-item8">
                        <div className="marker">
                            <div className="ribbon">
                                <span>4</span>
                            </div>
                        </div>
                        <h2><b>Conversation Bot</b></h2><br />
                        <span>Engage in a seamless conversation with ComputeGPT. Enjoy a continuous interaction experience as ComputeGPT comprehends and responds to your queries in a natural, conversational manner.</span>
                    </div>
                </div>
            </div>
            
            <div className='end-spacer' id='contact'></div>

            <div className='end-intro'>
                <div className='end-left'>
                    <div className='left-header'>Join the StoryCircle Community</div>
                    <div className='left-content'>Ready to embark on your collaborative storytelling journey?</div>
                    <Button variant="contained" endIcon={<Icon icon="line-md:arrow-right" />} onClick={handleGit}><p style={{fontWeight: 'bolder'}}>Github </p></Button><br />
                    <div className='left-header'>Get Started Today</div>
                    <div className='left-content'>Simplify math problem-solving with ComputeGPT. Join now for hassle-free computations and experience the ease of solving complex problems effortlessly.</div>
                    <Button variant="contained" endIcon={<Icon icon="line-md:arrow-right" />} onClick={handleStart}><p style={{fontWeight: 'bolder'}}>Sign Up Now !</p></Button>
                </div>
                <div className='end-right'>
                    <div className='right-header'>Contact Us</div>
                    <div className='right-content'>Have questions or need assistance? Our support team is here to help!!</div>
                    <div className='contact-form'>
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
                    </div>
                </div>
            </div>

            <div className='spacer' id='features'></div>
        </div>
    )
}

export default Landing