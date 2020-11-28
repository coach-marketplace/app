import React from "react";

import { Pane as PaneUI } from "evergreen-ui";

const Pane = ({ ...props }) => <PaneUI {...props} />;

Pane.displayName = "Pane";

export default Pane;
