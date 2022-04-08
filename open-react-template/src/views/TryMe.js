import React from 'react';
import axios from 'axios';
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Grid } from "react-loader-spinner";



function TryMeCarousel() {
    const [index, setIndex] = useState(0);
    const URL = "http://172.20.10.2:5000/lime"
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const [mxp, setMxp] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState(true);
    const [loading, setLoading] = useState(false)
    const submitForm = (event) => {
      event.preventDefault();
      setLoading(true)
        let data = new FormData();
        data.append('file', selectedFile);
        console.log(data);
        const res = axios.post(URL, data, {
          headers: {
            'accept': 'application/json',
            'Content-Type': `multipart/form-data;`,
          }
        }).then((resp) => {
          console.log(resp);
          setImageURL("http://172.20.10.2:5000/" + selectedFile.name.split(".")[0])
          setMxp(resp.data.class)
          // setMxpConf(resp.data.confidence)
          setLoading(false);
          setIndex(index+1)
        })
    };
      return (
        <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <Carousel.Caption>
                <h3>Step 1</h3>
                <p>Choose a video depicting Micro Expression</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption>
                <h3>Step 2</h3>
                <p>Upload the image in the form provided in the further steps</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption>
                <h3>Step 3</h3>
                <p>Visualise the results and explaination provided for it using XAI and our OpenCV algorithm</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption>
                <h3>Upload The Video </h3>
                <form style={{padding: "20px"}}>
                  {/* <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  /> */}
  
                  <input
                    type="file"
                    // value={selectedFile}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </form>
                {loading == true ?
                 <Grid
                    color="#6163FF"
                    height={20}
                    width={20}
                    timeout={10000}
                    wrapperStyle={{"justify-content": "center","margin-top": "50px"}}
                  />
                  :
                  <button className='submit-img' onClick={submitForm}>Submit</button>
                }
                
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{height: "fit-content"}}>
              {mxp && <Carousel.Caption style={{height: "fit-content"}}>
              <h3 style={{"margin-top":"28px"}}>Predicted Micro Expression: {mxp}</h3>
              {/* <h3 style={{"margin-top":"28px"}}>LIME Explaination</h3> */}
                <div className='results-container'>
                  <div className="lime-img-left lime-img">
                    <img className = "lime-img" src = {selectedFile && `http://172.20.10.2:5000/${selectedFile.name.split(".")[0]}_1`}/>
                    <p>Features Supporting {mxp}</p>
                  </div>
                  <div className="lime-img-right lime-img">
                    <img className = "lime-img" src = {selectedFile && `http://172.20.10.2:5000/${selectedFile.name.split(".")[0]}_2`}/>
                    <p>Features Opposing {mxp}</p>
                  </div>
                </div>
              </Carousel.Caption>}
              
            </Carousel.Item>
            <Carousel.Item style={{height: "fit-content"}}>
              
              <Carousel.Caption style={{height: "fit-content"}}>
              <h3 style={{"margin-top":"28px"}}>OpenCV Based Algo Explaination</h3>
              <div className='results-container'>
                  <a href="http://172.20.10.2:5000/video/1" className="submit-img">Download Video Output</a>
              </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
      )
    }
  // }

export default TryMeCarousel