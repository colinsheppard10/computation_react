import React, { Component } from 'react';
import { Segment, Grid, Header, Button } from 'semantic-ui-react';
import { submitStudySession } from '../actions';
import { connect } from 'react-redux';


class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startButtonVisible: true,
            second: 0
        };
        this.playAudio = () => {
            this.yellow.play();
        }
    }

    render() {
        return (
            <Grid.Row>
                <audio ref={(yellow) => { this.yellow = yellow; }}>
                    <source src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3" type="audio/mpeg" >
                    </source>
                </audio>
                {this.state.startButtonVisible && <Button onClick={() => {
                    this.setState({
                        startButtonVisible: false,
                        minute: 0,
                        second: 5,
                        currentInterval: setInterval(() => {
                            if(this.state.minute < 1 && this.state.second < 1){
                                clearInterval(this.state.currentInterval);
                                this.setState({startButtonVisible: true});
                                this.playAudio();
                                this.props.submitStudySession(1);
                            } else {
                                if(this.state.second < 1){
                                    this.setState({
                                        minute: this.state.minute -1,
                                        second: 59
                                    })
                                } else {
                                    this.setState({
                                        second: this.state.second -1
                                    })
                                }
                            }
                        },1000)
                    });
                    }} size='large'>
                        Start Session
                </Button>}
                {!this.state.startButtonVisible && <p>{this.state.minute} : {this.state.second}</p>}
                <Button onClick={this.playAudio} size='large'>Test Sound</Button>
            </Grid.Row>
        )
    }
}

function mapStateToProps(state) {
    return { 
        results: state.results,
        data: state.data
    }
}

export default connect(mapStateToProps, { submitStudySession })(Timer);
