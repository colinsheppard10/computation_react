import React, { Component } from 'react';
import { fetchRandom } from '../../actions';
import { Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Countdown from "react-countdown";
import Timer from '../Timer';

class PlaceHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Grid centered columns={1}>
        <Grid.Column textAlign='center'>
          <Grid.Row textAlign='center'>
            {this.props.name}
          </Grid.Row>
          <Grid.Row textAlign='center'>
            {this.props.name == 'Three Minute Epic' && <Timer submitter={(x) => { this.props.stopGame() }} time={180000} />}
            {this.props.name != 'Three Minute Epic' && <Button onClick={() => {
              this.props.stopGame();
            }} as='a' size='large'>
              Done
            </Button>}
          </Grid.Row>
        </Grid.Column> 
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return { random: state.random }
}

export default connect(mapStateToProps, { fetchRandom })(PlaceHolder);



