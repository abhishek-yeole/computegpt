import React, { useState } from 'react';
import SpeechToText from './SpeechToText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { Icon } from '@iconify/react';
import './Spoken.css'
import config from '../../../config';

const Spoken = () => {
  const [finalText, setFinalText] = useState("");
  const [responseText, setResponseText] = useState("Talk with me!!");
  const [voiceName, setVoiceName] = useState("Google UK English Male");
  const [pitch, setPitch] = useState(1.5);
  const [rate, setRate] = useState(1.5);
  const [disable, setDisable] = useState(false);

  const handleFinalText = (text) => {
    setFinalText(text);
  };

  const handleSubmit = async () => {
    setDisable(true);
    setResponseText("Generating...");
    try {
      const response = await fetch( config.apiUrlWolframSpoken, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: finalText }),
    });

      const data = await response.json();
      if (data.success) {
        setResponseText(data.response);
        speak(data.response);
        setDisable(false);
      }

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.name === voiceName);
    utterance.voice = selectedVoice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    speechSynthesis.speak(utterance);
  };

  const getDirection = () => {
		if (window.innerWidth <= 900) {
			return 'column';
		} else {
			return 'row';
		}
	};

  return (
    <div className='spoken-body'>
    <div className='query-input-spoken'>
      <div className='info-spoken'>
        <div className='info-spoken-header'>VOICE INTERFACE</div>
        <p className='info-spoken-context'>The generated information is represented to the user via an Voice overlay, making it interactive and convinient.</p>
      </div>
      <div className='main-input-spoken'>
        <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
          <Icon icon="material-symbols:input" style={{fontSize: '32px'}}/>
          <TextField id="filled-multiline-flexible" label="Speech" multiline size='small' maxRows={4} fullWidth variant="filled" value={finalText} onChange={(e) => {setFinalText(e.target.value)}} required />  
        </Box><br/>
        <Button variant="contained" disabled={disable} onClick={handleSubmit} startIcon={<Icon icon="mdi:thunder" />}><b>Generate</b></Button>
      </div>
      <div className='parameters-spoken'>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography><b>Parameters</b></Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Box component="form" sx={{ '& > :not(style)': { m: 0.5, width: '95%' }, }} noValidate autoComplete="off" >
            <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
              <Icon icon="ci:user-voice" style={{fontSize: '32px'}}/>
              <FormControl fullWidth>
                  <InputLabel id="vehicle-type-select-label" required>Voice</InputLabel>
                  <Select labelId='vehicle-type-select-label' size='small' value={voiceName} onChange={(e) => setVoiceName(e.target.value)} required fullWidth label="Voice">
                      <MenuItem value="Google UK English Male">Google UK English Male</MenuItem>
                      <MenuItem value="Google UK English Female">Google UK English Female</MenuItem>
                      <MenuItem value="Google US English Male">Google US English Male</MenuItem>
                      <MenuItem value="Google US English Female">Google US English Female</MenuItem>
                      <MenuItem value="Google Australian English Male">Google Australian English Male</MenuItem>
                      <MenuItem value="Google Indian English Male">Google Indian English Male</MenuItem>
                      <MenuItem value="Google Indian English Female">Google Indian English Female</MenuItem>
                      <MenuItem value="Google South African English Male">Google South African English Male</MenuItem>
                      <MenuItem value="Google Irish English Male">Google Irish English Male</MenuItem>
                      <MenuItem value="Microsoft David Desktop - English (United States)">Microsoft David</MenuItem>
                      <MenuItem value="Microsoft Zira Desktop - English (United States)">Microsoft Zira</MenuItem>
                      <MenuItem value="Microsoft Mark Desktop - English (United States)">Microsoft Mark</MenuItem>
                      <MenuItem value="Microsoft Hazel Desktop - English (United Kingdom)">Microsoft Hazel</MenuItem>
                      <MenuItem value="Microsoft George Desktop - English (Australia)">Microsoft George</MenuItem>
                  </Select>
              </FormControl>
            </Box>
            <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <InputLabel style={{margin: '0px'}}>Pitch</InputLabel>
              <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Icon icon="material-symbols:tune-rounded" style={{fontSize: '32px'}}/>
                  <Slider aria-label="Pitch" defaultValue={1.0} valueLabelDisplay="auto" step={0.1} marks min={0} max={2} value={pitch} onChange={(e) => setPitch(e.target.value)} />    
              </Box>
              <InputLabel style={{margin: '0px'}}>Rate</InputLabel>
              <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Icon icon="icon-park-solid:speed-one" style={{fontSize: '32px'}}/>
                  <Slider aria-label="Pitch" defaultValue={1.0} valueLabelDisplay="auto" step={0.1} marks min={0.5} max={2} value={rate} onChange={(e) => setRate(e.target.value)} />
              </Box>
            </Box>
          </Box>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
    <div className='output-spoken'>
      <div className='server-output'>{responseText}</div><br />
      <div className='input-interface'>
        <SpeechToText onFinalText={handleFinalText} />
      </div>
    </div>
    </div>
  )
}

export default Spoken