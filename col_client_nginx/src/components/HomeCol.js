import React from "react";
import { connect } from "react-redux";
import { fetchData, submitStudySession, submitResults } from "../actions";
import { Grid } from "semantic-ui-react";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.less";
import Report from "./Report";
import Timer from "./Timer";
import Computation from "./games/Computation";
import Spatial from "./games/Spatial";
import RandomWords from "./games/RandomWords";
import PlaceHolder from "./games/PlaceHolder";

class HomeCol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameInProgress: false,
      roundsPlayed:0,
      gameNumber: -1,
      gamesSeen: []
    };
    this.props.fetchData()
    this.stopGame = () => {
      this.setState({gameInProgress: false})
    }
  }

  getGame() {
    var options = [
      <PlaceHolder stopGame={this.stopGame} name={'Flash Cards'} />,
      <PlaceHolder stopGame={this.stopGame} name={'Three Minute Epic'} />,
      <PlaceHolder stopGame={this.stopGame} name={'Three Minute Epic'} />,
      <PlaceHolder stopGame={this.stopGame} name={'Five One Pagers'} />,
      <PlaceHolder stopGame={this.stopGame} name={'Ten One Liners'} />,
      <PlaceHolder stopGame={this.stopGame} name={'Morning React'} />,
      <PlaceHolder stopGame={this.stopGame} name={'Speed Typing'} />,
      <Computation stopGame={this.stopGame} />,
      <Computation stopGame={this.stopGame} />,
      <Spatial stopGame={this.stopGame} />,
    ];
    const { gameInProgress, roundsPlayed, gameNumber } = this.state;
    console.log( { gameInProgress, roundsPlayed, gameNumber })
    if (!gameInProgress && roundsPlayed < 5) {
      let number = -1;
      while (number == -1 || this.state.gamesSeen.includes(number)) {
        number = Math.floor(Math.random() * Math.floor(10));
      }
      const newGamesSeen = this.state.gamesSeen;
      newGamesSeen.push(number)
      this.setState({ gamesSeen: newGamesSeen })
      const gameNumberRand = number;
      this.setState({ gameInProgress: true, roundsPlayed: this.state.roundsPlayed + 1, gameNumber: gameNumberRand })
    } else if (roundsPlayed >= 5) {
      this.props.submitResults({rounds: 5, minutes:5})
      return <div>done</div>
    }
    return options[gameNumber];
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
                  {this.getGame()}
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
export default connect(mapStateToProps, { fetchData, submitStudySession, submitResults })(HomeCol);
