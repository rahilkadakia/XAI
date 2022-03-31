import React from 'react';
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import Header from '../components/layout/Header';

function TryMeCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
  
    const submitForm = () => {
      console.log(selectedFile);
    };
  
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
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
              <form>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  type="file"
                  // value={selectedFile}
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </form>
              <button onClick={submitForm}>Submit</button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption>
              <h3>Results </h3>
              <p>Results: </p>
              <p>Explaination: </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        
      // </div>
      
      
    );
  }

export default TryMeCarousel