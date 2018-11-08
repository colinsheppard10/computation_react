import React, { Component } from 'react';
import { Segment, Grid, Header, Button } from 'semantic-ui-react';
import { submitResults } from '../actions';
import { connect } from 'react-redux';

class Random extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startButtonVisible: true,
            startTime: null,
            endTime: null,
            loops: 0,
            numberCorrect: 0,
            values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "{", "}", "|", ":", "<", ">", "?", "`", "~"]
        };
    }

    render() {
        return (
            <Segment style={{ padding: '0em' }} vertical>
                <Grid.Row>
                    {this.state.startButtonVisible && <Button onClick={() => {
                        this.generateValues();
                        this.setState({
                            startButtonVisible: false,
                            startTime: new Date(),
                            showQuestion: true
                        });
                    }} as='a' size='large'>
                        Start Random
                </Button>}
                </Grid.Row>

                {!this.state.startButtonVisible && <Grid.Row>
                    {this.generateValues()}
                </Grid.Row>}

                {!this.state.startButtonVisible && <Grid.Row>
                    <Button onClick={() => {
                        this.generateValues();
                        this.setState({
                            loops: this.state.loops + 1
                        });
                        if (this.state.loops >= 4) {
                            this.stopTimer();
                        }
                    }} as='a' size='small'>
                        Incorrect
                            </Button>

                    <Button onClick={() => {
                        this.generateValues();
                        this.setState({
                            loops: this.state.loops + 1,
                            numberCorrect: this.state.numberCorrect + 1,
                        });
                        if (this.state.loops >= 4) {
                            this.stopTimer();
                        }
                    }} as='a' size='small'>
                        Correct
                            </Button>
                </Grid.Row>}

                {this.state.loops >= 5 && <Grid.Row>
                    <div>
                        Correct: {this.state.numberCorrect} In: {this.state.endTime}
                    </div>
                </Grid.Row>}
            </Segment>
        )
    }

    stopTimer() {
        var _endTime = new Date() - this.state.startTime;
        var min = Math.floor(_endTime / 60000);
        var sec = Math.floor(_endTime % 60000 / 1000)
        this.setState({
            endTime: `${min.toString()}:${sec.toString().length < 2 ? `0${sec.toString()}` : sec.toString()}`
        })
        debugger;
        this.props.submitResults(this.props.results.computationResults, this.state.numberCorrect);

    }

    generateValues() {
        return (
            this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " +
            this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)]
        )
    }
}

function mapStateToProps(state) {
    return { results: state.results }
}

export default connect(mapStateToProps, { submitResults })(Random);

