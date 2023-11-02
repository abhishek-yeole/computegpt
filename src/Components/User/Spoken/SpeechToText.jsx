import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import './Spoken.css'

const SpeechToText = ({ onFinalText }) => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [start, setStart] = useState(true);
  const [inputText, setInputText] = useState("");
  // const [listeningTimeout, setListeningTimeout] = useState(null);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Speech recognition is not supported in your browser.</div>;
  }

  window.addEventListener("load", (event) => {
    handleStart();
  });

  const handleStart = () => {
    SpeechRecognition.startListening();
    setStart(true);
    // setListeningTimeout(setTimeout(handleStop, 10000));
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    const finalText = inputText + transcript + ' ';
    setInputText(finalText);
    onFinalText(finalText); // Pass the final text to the parent component
    setStart(false);
    // clearTimeout(listeningTimeout);
  };

  const handleReset = () => {
    resetTranscript();
    setInputText(""); // Clear the input field
    onFinalText(""); // Pass an empty string to the parent component
  };

  return (
    <div>
      <div className="interface-body">
        {start ? (
          <div className='stop-record stop' onClick={handleStop}>
            <Icon icon="solar:stop-bold-duotone" />
          </div>
        ) : (
          <div className='start-record' onClick={handleStart}>
            <Icon icon="ion:mic-sharp" />
          </div>
        )}
      </div>
      <br />
      <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
        <Icon icon="material-symbols:input" style={{fontSize: '32px'}}/>
        <TextField id="filled-multiline-flexible" label="Speech" multiline size='small' maxRows={4} fullWidth variant="filled" value={inputText} onChange={(e) => {setInputText(e.target.value); onFinalText(e.target.value);}} required />  
        <Button variant="contained" onClick={handleReset} ><Icon icon="bx:reset" fontSize={'24px'} /></Button>
      </Box><br/>
    </div>
  );
};

export default SpeechToText;
