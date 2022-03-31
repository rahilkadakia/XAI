import React from "react"
import { Chrono } from "react-chrono";

const Timeline = () => {
  const items = [{
    title: "May 1940",
    cardTitle: "Dunkirk",
    cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
    cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    media: {
      type: "IMAGE",
      source: {
        url: "https://i.pinimg.com/736x/cd/07/27/cd0727ee72bb17511587b96b6eb5b6aa--telling-lies-lie-to-me.jpg"
      }
    }
  },
  {
    title: "May 1940",
    cardTitle: "Dunkirk",
    url: "http://www.history.com",
    cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
    cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    media: {
        type: "IMAGE",
        source: {
          url: "https://i.pinimg.com/736x/cd/07/27/cd0727ee72bb17511587b96b6eb5b6aa--telling-lies-lie-to-me.jpg"
        }
      }
  },
  {
    title: "May 1940",
    cardTitle: "Dunkirk",
    url: "http://www.history.com",
    cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
    cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    media: {
        type: "IMAGE",
        source: {
          url: "/opencv2.png"
        }
      }
  }

]

  return (
    <div style={{ width: "100%", height: "100%" }}>
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