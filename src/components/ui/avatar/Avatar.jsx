import React from "react";
import { Avatar as AvatarUI } from "evergreen-ui";

const Avatar = props => {
  return <AvatarUI name={props.name} size={props.size} />;
};

Avatar.defaultProps = {
  size: 40
};

export default Avatar;

Avatar.displayName = "Avatar";
