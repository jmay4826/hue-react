const { cie_to_rgb, rgb_to_cie } = require("./cie_rgb_converter");

const getLightByParams = async req => {
  try {
    const client = req.app.get("client");
    const light = await client.lights.getById(req.params.id);
    return { client, light };
  } catch (e) {
    console.log(e);
  }
};

const getAllLights = async (req, res) => {
  let lights = await req.app.get("client").lights.getAll();
  lights.map(light => {
    light.state.attributes.rgb = cie_to_rgb(light.state.attributes);
    return light;
  });
  res.send(lights);
};

const updateLight = async (req, res) => {
  try {
    let { client, light } = await getLightByParams(req);
    light.xy = rgb_to_cie(req.body.rgba);

    const response = await client.lights.save(light);
    res.send(response);
  } catch (e) {
    console.log(e);
  }
};

const colorLoop = async (req, res) => {
  try {
    let { client, light } = await getLightByParams(req);
    light.effect = "none";
    res.send(await client.lights.save(light));
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllLights,
  updateLight,
  colorLoop
};
