import React, { Component } from "react";
import Carousel from "react-simply-carousel";

export default class TryMe extends Component {
  state = {
    activeSlideIndex: 0,
  };

  setActiveSlideIndex = (newActiveSlideIndex) => {
    this.setState({
      activeSlideIndex: newActiveSlideIndex,
    });
  };

  render() {
    return (
      <Carousel
        activeSlideIndex={this.state.activeSlideIndex}
        onRequestChange={this.setActiveSlideIndex}
        itemsToShow={3}
        itemsToScroll={3}
      >
        <div style={{ width: 300, height: 300 }}>slide 0</div>
        <div style={{ width: 300, height: 300 }}>slide 1</div>
        <div style={{ width: 300, height: 300 }}>slide 2</div>
        <div style={{ width: 300, height: 300 }}>slide 3</div>
        <div style={{ width: 300, height: 300 }}>slide 4</div>
        <div style={{ width: 300, height: 300 }}>slide 5</div>
        <div style={{ width: 300, height: 300 }}>slide 6</div>
        <div style={{ width: 300, height: 300 }}>slide 7</div>
        <div style={{ width: 300, height: 300 }}>slide 8</div>
        <div style={{ width: 300, height: 300 }}>slide 9</div>
      </Carousel>
    );
  }
}