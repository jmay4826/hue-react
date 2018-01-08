import React, { Component } from "react";
import colorPicker from "../images/colorPicker.jpg";
import axios from "axios";

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { rgb: "" };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.refs.image.onload = () => {
      this.updateCanvas();
    };
  }
  updateCanvas() {
    const w = 750;
    const h = 979;

    const image = this.refs.image;
    const ctx = this.refs.canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, 187.5, 244.75);
  }

  handleClick(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    const [r, g, b, a] = this.refs.canvas
      .getContext("2d")
      .getImageData(offsetX, offsetY, 1, 1).data;
    this.setState({
      rgb: `rgba(${r}, ${g}, ${b}, ${a})`
    });

    axios
      .put(`/api/lights/${this.props.id}`, { rgba: [r, g, b, a] })
      .then(() => this.props.refreshLights())
      .catch(console.log);
  }
  render() {
    return (
      <div>
        <canvas
          ref="canvas"
          width={187.5}
          height={244.74}
          onClick={this.handleClick}
        />
        <img ref="image" src={colorPicker} style={{ display: "none" }} />
        <div
          style={{
            width: "25px",
            height: "25px",
            background: this.state.rgb
          }}
        />
      </div>
    );
  }
}

export default ColorPicker;
