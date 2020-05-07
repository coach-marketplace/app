import React from "react";
import { Avatar as AvatarUI } from "evergreen-ui";

const Avatar = ({ size, ...props }) => <AvatarUI size={size} {...props} />;

Avatar.defaultProps = {
  size: 40,
};

export default Avatar;
