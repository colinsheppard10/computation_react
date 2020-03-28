import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import Countdown from "react-countdown";

import { submitStudySession } from "../actions";
import { connect } from "react-redux";

// Random component
// const Completionist = () => <span>You are good to go!</span>;

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startButtonVisible: true,
      minute: 0,
      second: 0
    };
    this.playAudio = () => {
      this.yellow.play();
    };

    this.renderer = ({ hours, minutes, seconds, completed }) => {
      // if (completed || completed == null) {
      if (completed) {
        this.props.submitStudySession(1);
        this.playAudio();
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
      <Grid.Row>
        <audio
          ref={yellow => {
            this.yellow = yellow;
          }}
        >
          <source
            src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
            type="audio/mpeg"
          ></source>
        </audio>
        {!this.state.startButtonVisible && (
          <Countdown date={Date.now() + 3000} renderer={this.renderer} />
        )}
        {this.state.startButtonVisible && (
          <Button
            onClick={() => {
              this.setState({
                startButtonVisible: !this.state.startButtonVisible
              });
            }}
            size="large"
          >
            Start Session
          </Button>
        )}
        {this.state.startButtonVisible && (
          <Button onClick={this.playAudio} size="large">
            Test Sound
          </Button>
        )}
      </Grid.Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.results,
    data: state.data
  };
}

export default connect(mapStateToProps, { submitStudySession })(Timer);
