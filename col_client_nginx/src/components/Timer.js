import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import Countdown from "react-countdown";

import { submitStudySession } from "../actions";
import { connect } from "react-redux";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerVisible: false,
      minute: 0,
      second: 0
    };

    this.playAudio = () => {
      this.yellow.play();
    };

    this.renderer = ({ hours, minutes, seconds, completed }) => {
      // if (completed || completed == null) {
      if (completed) {
        this.setState({timerVisible: !this.state.timerVisible})
        this.playAudio();
        this.props.submitter(1);
        return <div></div>;
      } else {
        // Render a countdown
        return (
          <span>
            {minutes}:{seconds}
          </span>
        );
      }
    };
  }
  render() {
    return (
      <Grid centered columns={1}>
        <Grid.Row>
          <audio ref={yellow => {this.yellow = yellow;}}>
            <source src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3" type="audio/mpeg"></source>
          </audio>
          {this.state.timerVisible && <Countdown date={Date.now() + 1800000} renderer={this.renderer} />}
          {!this.state.timerVisible && <Button onClick={() => {this.setState({timerVisible: true});}} size="large">
             <div>Start Session</div>
          </Button>}
          {!this.state.timerVisible && <Button onClick={this.playAudio} size="large">
            Test Sound
          </Button>}
        </Grid.Row>
      </Grid>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     results: state.results,
//     data: state.data
//   };
// }

// export default connect(mapStateToProps, { submitStudySession })(Timer);
export default Timer