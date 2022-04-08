import React from "react"
import { Chrono } from "react-chrono";
import SectionHeader from "./partials/SectionHeader";

const Timeline = () => {
  const items = [{
    title: "Step 1",
    cardTitle: "Upload the video under scrutiny from your local device",
  },
  {
    title: "Step 2",
    cardTitle: "Once successfully uploaded, click the button to submit your video for analysis ",
  },
  {
    title: "Step 3",
    cardTitle: "As soon as your video is submitted successfully, it is received at our backend and we begin pre-processing.In pre-processing we first convert the image into a grayscale format and remove the background to eliminate noise from the received data.",
  },
  {
    title: "Step 4",
    cardTitle: "We now pass on our pre-processed data to the LIME and Deep Learning Model.Deep Learning model correctly identifies and classifies the micro expressions as seen in the selected frames. ",
  },
  {
    title: "Step 5",
    cardTitle: "The output from the DL model goes to the LIME model too, here the frames are picked and pixels corresponding to the detected expressions are highlighted. This helps the user understand which pixels were responsible for the categorisation of micro expressions.",
  },
  {
    title: "Step 6",
    cardTitle: "After successful execution of the models the output will be presented in the form of a report, where the various micro expressions detected shall be mentioned along with a screen shot of the output of the XAI model that shall highlight pixels which would support the findings.",
  },
  // {
  //   title: "May 1940",
  //   cardTitle: "Dunkirk",
  //   url: "http://www.history.com",
  //   cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
  //   cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
  //   media: {
  //       type: "IMAGE",
  //       source: {
  //         url: "https://i.pinimg.com/736x/cd/07/27/cd0727ee72bb17511587b96b6eb5b6aa--telling-lies-lie-to-me.jpg"
  //       }
  //     }
  // },
  // {
  //   title: "May 1940",
  //   cardTitle: "Dunkirk",
  //   url: "http://www.history.com",
  //   cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
  //   cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
  //   media: {
  //       type: "IMAGE",
  //       source: {
  //         url: "/opencv2.png"
  //       }
  //     }
  // }

]
const sectionHeader = {
  title: 'Building up the whole picture',
  // paragraph: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.'
};
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SectionHeader data={sectionHeader} className="center-content" /><br />
      <Chrono items={items} mode="VERTICAL_ALTERNATING" 
            theme={{
                // secondary: "#5658DD",
                // titleColor: "red"
            }}
        />
    </div>
  )
}

export default Timeline