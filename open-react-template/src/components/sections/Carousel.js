import React from 'react';
import { useState } from "react";
import { Carousel } from "react-bootstrap";

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <div className='carousel-2'>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          {/* <img
            className="d-block w-50"
            style={{margin:"auto"}}
            src={require('./../../assets/images/feature-tile-icon-06.svg')}
            alt="First slide"
          /> */}
          <Carousel.Caption>
            <h3>What are micro expressions?</h3>
            <p>
                Micro expressions are facial expressions that occur within a fraction of a second. This involuntary emotional leakage exposes a person's true emotions. They are extremely low in amplitude and last for 0.1-0.3 seconds only.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* <img
            className="d-block w-50"
            style={{margin:"auto"}}
            src={require('./../../assets/images/feature-tile-icon-02.svg')}
            alt="Second slide"
          /> */}
  
          <Carousel.Caption>
            <h3>Macro VS Micro Expressions </h3>
            <p>
              <table>
                <thead>
                  <tr>
                    <th style={{"text-align": "center"}}>Macro</th>
                    <th style={{"text-align": "center"}}>Micro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Obvious or "normal" facial expressions</td>
                    <td>Often misinterpreted or missed altogether</td>
                  </tr>
                  <tr>
                    <td>Last between 1/2 a second to 4 seconds</td>
                    <td>Occur in 1/2 a second or less</td>
                  </tr>
                  <tr>
                    <td>Match the content and tone of what is said</td>
                    <td>Unconsciously display a concealed emotion, cannot be faked</td>
                  </tr>
                </tbody>
                </table>
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* <img
            className="d-block w-50"
            style={{margin:"auto"}}
            src={require('./../../assets/images/feature-tile-icon-01.svg')}
            alt="Third slide"
          />
   */}
          <Carousel.Caption>
            <h3>Why are Micro Expressions Important ?</h3>
            <p>
            Cannot be suppressed or faked
            </p>
            <p>
            Accurate detection and classification of micro expressions can provide a lot of information about an individual’s thought process and personality when presented in front of a stimuli
            </p>
            <p>
            Find their application in clinical diagnosis, greatly helping doctors in diagnosing certain mental disorders like anxiety, depression, split personalities etc.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3>What is XAI?</h3>
            <p>
            X- Explainable;  AI - Artificial Intelligence, thus XAI can be defined as an AI that is programmed to describe its purpose, rationale and decision-making process in a way that can be understood by the average person. It plays an important role FAT ML model (fairness, accountability and transparency in machine learning).
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3>Why XAI?</h3>
            <p>
              The deep learning model has been able to classify micro expressions correctly by being able to extract unique facial features from the input data. 
              However these features are unknown to the user, making the entire a model a black box. 
            </p>
            <p>
              Using XAI will help us understand the changes that have occurred in the face of the individual by highlighting features supporting and opposing the decision made by the model Thus improving the overall reliability of the model.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>
    );
  }

export default ControlledCarousel