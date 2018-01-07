const { cie_to_rgb, rgb_to_cie } = require("./cie_rgb_converter");

const getAllLights = async (req, res) => {
  let lights = await req.app.get("client").lights.getAll();
  console.log(lights);
  let convertedLights = lights.map(light => {
    light.state.attributes.rgb = cie_to_rgb(light.state.attributes);
    return light;
  });
  res.send(lights);
};

module.exports = {
  getAllLights
};
