import PropTypes from "prop-types";
import React, { Component } from "react";
import { Responsive, Segment } from "semantic-ui-react";

import GamesSeg from "./seg_games";
import Report from "./Report";

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  render() {
    const { children } = this.props;

    return <Responsive {...Responsive.onlyComputer}>{children}</Responsive>;
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  render() {
    const { children } = this.props;

    return <Responsive {...Responsive.onlyMobile}>{children}</Responsive>;
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

class HomepageLayout extends Component {
  render() {
    return (
      <ResponsiveContainer>
        <Report />
        <Segment vertical>
          <GamesSeg />
        </Segment>
      </ResponsiveContainer>
    );
  }
}

export default HomepageLayout;
