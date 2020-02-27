/**
 * https://evergreen.segment.com/components/typography
 */

import React from "react";
import { Text as TextUI } from "evergreen-ui";

const Text = props => {
  return <TextUI {...props} />;
};

export default Text;

Text.displayName = "Text";
