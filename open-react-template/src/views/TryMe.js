import React from 'react';
import axios from 'axios';
import { useState } from "react";
import { Carousel } from "react-bootstrap";
// import { useHistory } from "react-router-dom";



function TryMeCarousel() {
    const [index, setIndex] = useState(0);
    const URL = "http://172.20.10.2:5000/lime"
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    // let history = useHistory();
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
  
    const submitForm = (event) => {
      event.preventDefault();
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
              <img src = {imageURL} />
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
      )
    }
  // }

export default TryMeCarousel