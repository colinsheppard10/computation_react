import ModelBasicExample from './modelBasicExample';

import React, { Component } from 'react'
import { Segment, Grid, Header, Button } from 'semantic-ui-react'
import { Element } from 'react-scroll';


export default class Random extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startButtonVisible: true,

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

    generateValues() {
        return (
            this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " +
            this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)] + " " + this.state.values[Math.floor(Math.random() * 62)]
        )
    }
}

