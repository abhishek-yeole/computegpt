import { useState } from 'react';
import parse from 'html-react-parser';
import './Steps.css';
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

function Steps() {
  const [imageUrls, setImageUrls] = useState([]);
  const [query, setQuery] = useState('');
  const [width, setWidth] = useState(500);
  const [maxWidth, setMaxWidth] = useState(500);
  const [plotWidth, setPlotWidth] = useState(500);
  const [mag, setMag] = useState(1.00);
  const [units, setUnits] = useState('metric');
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleSubmit = async () => {
    setLoaded(false);
    setDisable(true);
    setLoading(true);
    try {
      // Make the API call and store the XML response
      const response = await fetch( config.apiUrlWolframSteps , {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, width, maxWidth, plotWidth, mag, units }),
    });

      const xmlString = await response.text();
      // Parse the XML string to extract the image URLs
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      const imgTags = xmlDoc.getElementsByTagName('img');
      const urls = Array.from(imgTags).map((tag) => tag.getAttribute('src'));
      setImageUrls(urls);
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
    <div className='steps-body'>
      <div className='query-input-steps'>
        <div className='info-steps'>
          <div className='info-steps-header'>STEP BY STEP SOLUTION</div>
          <p className='info-steps-context'>The generated explanations of computed answers are designed to provide clarity and understanding to the end user and are especially useful in educational and training applications.</p>
        </div>
        <div className='main-input-steps'>
          <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
            <Icon icon="material-symbols:input" style={{fontSize: '32px'}}/>
            <TextField id="filled-multiline-flexible" label="Input" multiline size='small' maxRows={4} fullWidth variant="filled" value={query} onChange={(e) => setQuery(e.target.value)} required />  
          </Box><br/>
          <Button variant="contained" onClick={handleSubmit} disabled={disable} startIcon={<Icon icon="mdi:thunder" />}><b>Generate</b></Button>
        </div>
        <div className='parameters-steps'>
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
                    <Icon icon="icon-park:auto-width" style={{fontSize: '32px'}}/>
                    <TextField id="outlined-basic" label="Image Width" variant="outlined" type='number' size='small' value={width} onChange={(e) => setWidth(e.target.value)} required />
                </Box>
                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                    <Icon icon="fluent-mdl2:fit-width" style={{fontSize: '32px'}}/>
                    <TextField id="outlined-basic" label="Max Width" variant="outlined" type='text' size='small' value={maxWidth} onChange={(e) => setMaxWidth(e.target.value)} required />
                </Box>
              </Box>
              <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', flexDirection: getDirection(), alignItems: 'center' }}>
                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                    <Icon icon="carbon:qq-plot" style={{fontSize: '32px'}}/>
                    <TextField id="outlined-basic" label="Plot Width" variant="outlined" type='number' size='small' value={plotWidth} onChange={(e) => setPlotWidth(e.target.value)} required />
                </Box>
                <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', alignItems: 'center' }}>
                    <Icon icon="icon-park:sort-amount-up" style={{fontSize: '32px'}}/>
                    <TextField id="outlined-basic" label="Magnitude" variant="outlined" type='number' size='small' value={mag} onChange={(e) => setMag(e.target.value)} required />
                </Box>
              </Box>
              <Box sx={{ '& > :not(style)': { m: 0.5 }, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className='output-steps'>
        {loaded > 0 ? (
          <div className='output-block'>  
            <div className='llm-interface-user'>
              <strong>QUERY: </strong>{query}
            </div>
            <div className='llm-output-images'>
              <strong>OUTPUT: </strong><br />
              {imageUrls.map((url, index) => (
                <div key={index} className='single-output-llm'><strong><Icon icon="raphael:arrowright" /></strong>{parse(`<img className='image-config-steps' src="${url}" alt="${index}" />`)}</div>
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

export default Steps;