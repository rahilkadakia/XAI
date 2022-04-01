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
    const [name, setName] = useState("");
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
          setLoading(false);
          setIndex(index+1)
        })
    };
  
    // if(result) {
    //   history.push(`result/${selectedFile.name.split('.')[0]}`);
    //   console.log(result)
    // }
    // else {
      return (
        <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <Carousel.Caption>
                <h3>Step 1</h3>
                <p>Choose an image / video depicting Micro Expression</p>
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
                <h3>Upload The Photo / Video </h3>
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
              <Carousel.Caption style={{height: "fit-content"}}>
                {/* <h3>Results </h3>
                <p>Results: </p>
                <p>Explaination: </p> */}
                <div className='results-container'>
                {imageURL && <img className = "lime-img" src = "http://172.20.10.2:5000/007_615"/>}
                <div>
                  <h4>The Provided Image depicts Happiness</h4>
                  <h4>In the provided LIME explaination:</h4>
                  <h5>Left Image: features supporting Happiness</h5>
                  <h5>Right Image: features opposing Happiness</h5>
                </div>
                </div>
                
                <h3 style={{"margin-top":"28px"}}>Results and Explaination</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
      )
    }
  // }

export default TryMeCarousel