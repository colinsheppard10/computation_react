import React from "react";
import { connect } from "react-redux";
import { fetchData, submitStudySession } from "../actions";
import { Grid } from "semantic-ui-react";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.less";
import Report from "./Report";
import Timer from "./Timer";
import Computation from "./games/Computation";
import Spatial from "./games/Spatial";

class HomeCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.fetchData()
  }

  render() {
    return (
      <div>
      <Report data={this.props.data}/>
      <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
              <Grid.Column>
                  <Timer submitter={this.props.submitStudySession}/>
              </Grid.Column>
              <Grid.Column>
                  <Computation />
              </Grid.Column>
              <Grid.Column>
                  <Spatial />
              </Grid.Column>
          </Grid.Row>
      </Grid>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}
export default connect(mapStateToProps, { fetchData, submitStudySession })(HomeCol);
