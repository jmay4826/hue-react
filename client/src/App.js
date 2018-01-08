import React, { Component } from "react";
import axios from "axios";

import LightCard from "./components/LightCard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lights: []
    };
    this.refreshLights = this.refreshLights.bind(this);
  }
  componentDidMount() {
    this.refreshLights();
  }

  async refreshLights() {
    let lights = (await axios.get("/api/lights")).data;
    this.setState({ lights });
  }

  render() {
    console.log(this.state.lights);
    return (
      <div className="App">
        {this.state.lights.map(light => (
          <LightCard
            refreshLights={this.refreshLights}
            key={light.attributes.attributes.uniqueid}
            {...light}
          />
        ))}
      </div>
    );
  }
}

export default App;
