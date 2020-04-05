import React, { Component } from 'react';
import { fetchRandom } from '../../actions';
import { Segment, Grid, Header, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Countdown from "react-countdown";

class RandomWords extends Component {
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
                <audio ref={yellow => {this.yellow = yellow;}}>
                    <source src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3" type="audio/mpeg"></source>
                </audio>
                <Grid.Row>
                    {!this.state.timerVisible && <Button onClick={() => {
                    this.props.fetchRandom()
                    this.setState({timerVisible: true});}} size="large">
                    <div>Start Scene</div>
                    </Button>}
                    {this.state.timerVisible && <div>{this.props.random.length ? this.props.random.map(word => {return word + " ";}) : []}</div>}
                </Grid.Row>
                {this.state.timerVisible && <Grid.Row>
                    <Countdown date={Date.now() + 60000} renderer={this.renderer} />
                </Grid.Row>}
            </Grid>
        );
      }
}

function mapStateToProps(state) {
    return { random: state.random }
}

export default connect(mapStateToProps, { fetchRandom })(RandomWords);



