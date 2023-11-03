import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import './LLM.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import config from '../../../config';


function LLM() {
  const [query, setQuery] = useState('');
  const [maxChars, setMaxChars] = useState(1500);
  const [width, setWidth] = useState(500);
  const [maxWidth, setMaxWidth] = useState(500);
  const [plotWidth, setPlotWidth] = useState(500);
  const [mag, setMag] = useState(1.00);
  const [units, setUnits] = useState('metric');
  const [imageURLs, setImageURLs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleSubmit = async () => {
    setLoaded(false);
    setDisable(true);
    setLoading(true);
    try {
      const response = await fetch( config.apiUrlWolframLLM, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, maxChars, width, maxWidth, plotWidth, mag, units }),
    });

      // const data = await response.json();
      // console.log(data.response);
      // const text = data.response.replace(/\\n/g, '\n'); 
      // const imageRegex = /(https:[^\s]+)/g;
      // const imageURLs = [...text.matchAll(imageRegex)];
      // const withImages = text.split(imageRegex);

      // setWithImages(withImages);
      // setImageURLs(imageURLs);
      const xmlString = await response.text();
      console.log(xmlString);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      const imgTags = xmlDoc.getElementsByTagName('img');
      const urls = Array.from(imgTags).map((tag) => tag.getAttribute('src'));
      setImageURLs(urls);
      console.log(urls);
      console.log(imageURLs);
      setLoading(false);
      setLoaded(true);
      setDisable(false);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const getDirection = () => {
		if (window.innerWidth <= 768) {
			return 'column';
		} else {
			return 'row';
		}
	};
  
  return (
    <div className='llm-body'>
      <div className='query-input-llm'>
        <div className='info-llm'>
          <div className='info-llm-header'>LLM INTERFACE</div>
          <p className='info-llm-context'>The LLM  is built for usage in specifically with large language models and chat products.</p>
        </div>
        <div className='main-input-llm'>
          <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
            <Icon icon="material-symbols:input" style={{fontSize: '32px'}}/>
            <TextField id="filled-multiline-flexible" label="Input" multiline size='small' maxRows={4} fullWidth variant="filled" value={query} onChange={(e) => setQuery(e.target.value)} required />  
          </Box><br/>
          <Button variant="contained" onClick={handleSubmit} disabled={disable} startIcon={<Icon icon="mdi:thunder" />}><b>Generate</b></Button>
        </div>
        <div className='parameters-llm'>
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
                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                    <Icon icon="material-symbols:trail-length" style={{fontSize: '32px'}}/>
                    <TextField id="outlined-basic" label="Output Size" variant="outlined" type='number' size='small' value={maxChars} onChange={(e) => setMaxChars(e.target.value)} required />
                </Box>
                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                    <Icon icon="icon-park:auto-width" style={{fontSize: '32px'}}/>
                    <TextField id="outlined-basic" label="Image Width" variant="outlined" type='text' size='small' value={width} onChange={(e) => setWidth(e.target.value)} required />
                </Box>
              </Box>
              <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                    <Icon icon="fluent-mdl2:fit-width" style={{fontSize: '32px'}}/>
                    <TextField id="outlined-basic" label="Max Width" variant="outlined" type='number' size='small' value={maxWidth} onChange={(e) => setMaxWidth(e.target.value)} required />
                </Box>
                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                    <Icon icon="carbon:qq-plot" style={{fontSize: '32px'}}/>
                    <TextField id="outlined-basic" label="Plot Width" variant="outlined" type='number' size='small' value={plotWidth} onChange={(e) => setPlotWidth(e.target.value)} required />
                </Box>
              </Box>
              <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                    <Icon icon="icon-park:sort-amount-up" style={{fontSize: '32px'}}/>
                    <TextField id="outlined-basic" label="Magnitude" variant="outlined" type='number' size='small' value={mag} onChange={(e) => setMag(e.target.value)} required fullWidth/>
                </Box>
                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', flexDirection: 'row', width: '97%', alignItems: 'center' }}>
                  <Icon icon="arcticons:metrictime" style={{fontSize: '32px'}}/>
                  <FormControl fullWidth>
                      <InputLabel id="vehicle-type-select-label" required>Units</InputLabel>
                      <Select labelId='vehicle-type-select-label' size='small' value={units} onChange={(e) => setUnits(e.target.value)} required fullWidth label="Units">
                          <MenuItem value="metric">Metric</MenuItem>
                          <MenuItem value="nonmetric">Non-Metric</MenuItem>
                      </Select> 
                  </FormControl>
                </Box>
              </Box>
            </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className='output-llm'>
        {/* {withImages.length > 0 ? (
          <div>
            <div>
            <pre>
              <div className='llm-output-content'>
                {withImages.map((section, index) => {
                  if (index % 2 === 0) {
                    return <p key={index}>{section}</p>;
                  } else if (index === withImages.length-2) {
                    return (
                      <a key={index} href={imageURLs[(index - 1) / 2][1]}>
                        <Button variant='contained' color='secondary' endIcon={<Icon icon="mingcute:arrow-right-fill" />}>Know more!</Button>
                      </a>
                    );
                  } else {
                    return <img key={index} src={imageURLs[(index - 1) / 2][1]} alt={`${index}`} />;
                  }
                })}
              </div>
            </pre>
          </div>
          </div>
        ) : (
          <p>Loading...</p>
        )} */}
        {loaded > 0 ? (
          <div className='output-block'>  
            <div className='llm-interface-user'>
              <strong>QUERY: </strong>{query}
            </div>
            <div className='llm-output-images'>
              <strong>OUTPUT: </strong><br />
              {imageURLs.slice(2, -1).map((url, index) => (
                <div key={index} className='single-output-llm'><strong><Icon icon="raphael:arrowright" /></strong>{parse(`<img className='image-config' src="${url}" alt="${index}" />`)}</div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {loading ? (
              <div className='initial-load'>
                <div><div className="custom-loader"></div><div>Generating...</div></div>
              </div>
            ): (
              <div className='initial-load'>
                <Icon icon="fluent:person-chat-20-filled" fontSize={'60px'} /><div>Ask me Anything!!</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LLM;
