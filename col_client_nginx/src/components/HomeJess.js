import React from "react";
import { connect } from "react-redux";
import { fetchDataJess } from "../actions";
import { submitStudySessionJess } from "../actions";

import Report from "./Report";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.less";
import Timer from "./Timer";

class HomeJess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.fetchDataJess()
  }

  render() {
    return (
      <div>
      <Report data={this.props.dataJess}/>
      <Timer submitter={this.props.submitStudySessionJess}/>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { dataJess: state.dataJess };
}
export default connect(mapStateToProps, { fetchDataJess, submitStudySessionJess })(HomeJess);
