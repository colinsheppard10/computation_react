import ModelBasicExample from './modelBasicExample';

import React, { Component } from 'react'
import { Segment, Grid, Header, Button } from 'semantic-ui-react'
import { Element } from 'react-scroll';


export default class Computation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startButtonVisible: true,
            showQuestion: false,
            showResult: false,
            completed: false,
            startTime: {},
            endTime: '',
            numberCorrect: 0,
            loops: 0,
            one: 0,
            two: 0,
            three: 0,
            four: 0,
            five: 0,
            oneOp: 0,
            twoOp: 0,
            threeOp: 0,
            fourOp: 0,
            oneRes: 0,
            twoRes: 0,
            threeRes: 0,
            fourRes: 0,
            operations: [
                { symbol: "- ", func: (a, b) => { return a - b } },
                { symbol: "+ ", func: (a, b) => { return a + b } },
                { symbol: "/ ", func: (a, b) => { return a / b } },
                { symbol: "* ", func: (a, b) => { return a * b } }
            ]
        };
    }
    render() {
        return (
            <Segment style={{ padding: '0em' }} vertical>
                {this.state.startButtonVisible && <Button onClick={() => {
                    this.generateValues();
                    this.setState({
                        startButtonVisible: false,
                        startTime: new Date(),
                        showQuestion: true
                    });
                }} as='a' size='large'>
                    Start Computation
                </Button>}

                {!this.state.startButtonVisible && <Segment style={{ padding: '0em' }} vertical>
                    {this.state.showQuestion && <Grid.Row textAlign='center'>
                        <div>{this.state.one} {this.state.operations[this.state.oneOp].symbol}
                            {this.state.two} {this.state.operations[this.state.twoOp].symbol}
                            {this.state.three} {this.state.operations[this.state.threeOp].symbol}
                            {this.state.four} {this.state.operations[this.state.fourOp].symbol}
                            {this.state.five}</div>
                    </Grid.Row>}
                    {this.state.showResult && <Grid.Row textAlign='center'>
                        <div>{this.state.oneRes} + {this.state.twoRes} + {this.state.threeRes} + {this.state.fourRes}</div>
                    </Grid.Row>}
                    {!this.state.showResult && <Grid.Row textAlign='center'>
                        <br />
                    </Grid.Row>}

                    <Grid.Row>
                        <Button onClick={() => {
                            this.generateValues();
                            this.setState({
                                showResult: false,
                                loops: this.state.loops + 1
                            });
                            if (this.state.loops >= 4) {
                                this.stopTimer();
                            }
                        }} as='a' size='small'>
                            Incorrect
                            </Button>
                        <Button onClick={() => {
                            this.generateResult();
                            this.setState({
                                showResult: true
                            });
                        }} as='a' size='small'>
                            Done
                            </Button>
                        <Button onClick={() => {
                            this.generateValues();
                            this.setState({
                                loops: this.state.loops + 1,
                                numberCorrect: this.state.numberCorrect + 1,
                                showResult: false
                            });
                            if (this.state.loops >= 4) {
                                this.stopTimer();
                            }
                        }} as='a' size='small'>
                            Correct
                            </Button>
                    </Grid.Row>
                    {this.state.loops >= 5 && <Grid.Row>
                        <div>
                            Correct: {this.state.numberCorrect} In: {this.state.endTime}
                        </div>
                    </Grid.Row>}
                </Segment>
                }
            </Segment>
        )
    }

    generateValues() {
        this.setState({
            one: Math.floor(Math.random() * 100),
            two: Math.floor(Math.random() * 100),
            three: Math.floor(Math.random() * 100),
            four: Math.floor(Math.random() * 100),
            five: Math.floor(Math.random() * 100),
            oneOp: Math.floor(Math.random() * 4),
            twoOp: Math.floor(Math.random() * 4),
            threeOp: Math.floor(Math.random() * 4),
            fourOp: Math.floor(Math.random() * 4)
        })
    }

    generateResult() {
        var _oneRes = this.state.operations[this.state.oneOp].func(this.state.one, this.state.two);
        var _twoRes = this.state.operations[this.state.twoOp].func(_oneRes, this.state.three);
        var _threeRes = this.state.operations[this.state.oneOp].func(_twoRes, this.state.four);
        var _fourRes = this.state.operations[this.state.oneOp].func(_threeRes, this.state.five);
        this.setState({
            oneRes: _oneRes,
            twoRes: _twoRes,
            threeRes: _threeRes,
            fourRes: _fourRes
        })
    }

    stopTimer() {
        var _endTime = new Date() - this.state.startTime;
        var min = Math.floor(_endTime / 60000);
        var sec = Math.floor(_endTime % 60000 / 1000)
        this.setState({
            endTime: `${min.toString()}:${sec.toString().length < 2 ? `0${sec.toString()}` : sec.toString()}`
        })
    }
}

