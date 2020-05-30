import React from "react";
import { Avatar as AvatarUI } from "evergreen-ui";

const Avatar = ({ size, name, ...props }) => (
  <AvatarUI size={size} name={name} {...props} />
);

Avatar.defaultProps = {
  size: 40,
  name: "",
};

export default Avatar;
