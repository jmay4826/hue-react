import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import SvgIcon from "material-ui/SvgIcon";
import FlatButton from "material-ui/FlatButton";
import { cie_to_rgb, rgb_to_cie } from "../cie_rgb_converter";
import E27Icon from "../icons/E27Icon";
import { blue300 } from "material-ui/styles/colors";

console.log(blue300);
const LightCard = ({
  attributes: { attributes },
  state: { attributes: currentStatus }
}) => (
  <Card>
    <CardHeader
      title={attributes.name}
      subtitle={attributes.type}
      avatar={<Avatar icon={<E27Icon fill={currentStatus.rgb} />} />}
    />
    <CardText style={{ backgroundColor: currentStatus.rgb }}>
      {JSON.stringify(currentStatus)}
    </CardText>
  </Card>
);

export default LightCard;
