import Timer from "./Timer";

import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

export default class Games extends Component {
  render() {
    return (
      <Grid celled="internally" columns="equal" stackable>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <Timer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
