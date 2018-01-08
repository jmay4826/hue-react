import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import SvgIcon from "material-ui/SvgIcon";
import FlatButton from "material-ui/FlatButton";
// import { cie_to_rgb, rgb_to_cie } from "../cie_rgb_converter";
import E27Icon from "../icons/E27Icon";
import { blue300 } from "material-ui/styles/colors";
import ColorPicker from "./ColorPicker";
import axios from "axios";

const LightCard = ({
  attributes: { attributes },
  state: { attributes: currentStatus },
  refreshLights
}) => {
  return (
    <Card>
      <CardHeader
        title={attributes.name}
        subtitle={attributes.type}
        avatar={
          <Avatar
            backgroundColor={currentStatus.rgb}
            icon={<E27Icon fill={"black"} />}
          />
        }
      />
      <CardText>
        <ColorPicker refreshLights={refreshLights} id={attributes.id} />
        <button
          onClick={() =>
            axios.post(`/api/lights/${attributes.id}`, { colorloop: true })
          }
        >
          Color Loop
        </button>
      </CardText>
    </Card>
  );
};

export default LightCard;
