/**
 * https://evergreen.segment.com/components/typography
 */

import React from "react";
import PropTypes from "prop-types";
import { Text as TextUI, Paragraph, Link, Strong, Small } from "evergreen-ui";

const Text = ({ is, children, ...props }) => {
  switch (is) {
    case "small":
      return <Small {...props}>{children}</Small>;
    case "strong":
      return <Strong {...props}>{children}</Strong>;
    case "a":
      return <Link {...props}>{children}</Link>;
    case "span":
      return <TextUI {...props}>{children}</TextUI>;
    case "p":
    default:
      return <Paragraph {...props}>{children}</Paragraph>;
  }
};

Text.propTypes = {
  is: PropTypes.oneOf(["p", "span", "a", "strong", "small"]),
  children: PropTypes.node,
};

export default Text;
