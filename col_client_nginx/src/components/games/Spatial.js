import React, { Component } from 'react'
import { Button, Grid, Image} from 'semantic-ui-react'
import whiteSquare from './whiteSquare.png';
import blackSquare from './blackSquare.png';
import { submitResults } from '../../actions';
import { connect } from 'react-redux';

class Spatial extends Component {
    constructor(props){
        super(props);
        var {inputArray,
            clickedArray,
            rotationDirection,
            rotatedInputArray} = this.setup();
        this.state = {
            inputArray,
            clickedArray,
            rotationDirection,
            rotatedInputArray,
            rounds: 1,
            score: 0,
            result: null,
            showAnswer : false,
            startRound: false
        }
    }

    setup(){
        var inputArray = this.buildInputArray();
        var rotationDirection = this.chooseRotation();
        let rotatedInputArray = inputArray;
        var rotationDirectionDegrees = rotationDirection.degrees;
        while (rotationDirectionDegrees > 0){
            rotatedInputArray = this.rotate90(rotatedInputArray, rotationDirection.clockWise)
            rotationDirectionDegrees = rotationDirectionDegrees - 90;
        }
        var clickedArray = this.copyDimensions(rotatedInputArray);
        return {inputArray,
            clickedArray,
            rotationDirection,
            rotatedInputArray}
    }

    copyDimensions = (_rotatedInputArray) => {
        var clickedArray = [];
    
        for(var r = 0; r < _rotatedInputArray.length; r++){
            clickedArray.push([]);
            for (var c = 0; c < _rotatedInputArray[r].length; c++){
                clickedArray[r].push(0);
            }
        }
        return clickedArray;
    }

    buildInputArray = () => {
        var randR = Math.floor(Math.random() * Math.floor(3)) + 2;
        var randC = Math.floor(Math.random() * Math.floor(3)) + 2;
        var inputArray = [];
    
        for(var r = 0; r < randR; r++){
            inputArray.push([]);
            for (var c = 0; c < randC; c++){
                inputArray[r].push(Math.floor(Math.random() * Math.floor(2)));
            }
        }
        return inputArray;
    }

    createTable = (_myArray, blank) => {
        return (
            <Grid celled='internally' centered>
                {_myArray.map((row, rIndex) => {
                    return (
                        <Grid.Row>
                            {row.map((column, cIndex) => {
                                if (blank){
                                    return (
                                        <Grid.Column onClick = {() => {this.updateArray(rIndex,cIndex)}} centered width={2} style={{ padding: '0em' }} >
                                            <Image src={this.state.clickedArray[rIndex][cIndex] === 1? blackSquare:whiteSquare}fluid/>
                                        </Grid.Column>
                                    )
                                } else {
                                    return (
                                        <Grid.Column centered width={2} style={{ padding: '0em' }}>
                                            <Image src={_myArray[rIndex][cIndex] === 1?blackSquare:whiteSquare}fluid/>
                                        </Grid.Column>
                                    )
                                }
                            })}
                        </Grid.Row>
                    )
                })}
            </Grid>
        )
    }

    chooseRotation = () => {
        var options = [90,180,270];
        var randDegrees = Math.floor(Math.random() * Math.floor(3));
        var randDirection = Math.floor(Math.random() * Math.floor(2))
        return { degrees: options[randDegrees], clockWise: randDirection === 0};
    }

    rotate90 = (_inputArray, _clockWise) => {
        var _outputArray = [];
        for (var i = 0; i < _inputArray[0].length; i++)
            _outputArray.push([]);
    
        for (var ir = 0; ir < _inputArray.length; ir++){
            let oc = 0;
            let or = 0;
            for(var ic = 0; ic < _inputArray[ir].length; ic++){
                if (_clockWise){
                    oc = _inputArray.length - (ir + 1);
                    or = ic;
                } else {
                    oc = ir; 
                    or = _inputArray[ir].length - (ic + 1);
                }
                _outputArray[or][oc] = _inputArray[ir][ic];
            }
        }
        return _outputArray;
    }

    updateArray = (i, j) => {
        var _newArray = this.state.clickedArray;
        _newArray[i][j] = _newArray[i][j]===1?0:1;
        this.setState({clickedArray: _newArray});
    }
    
    getBoard() {
        let {rotationDirection, inputArray, startRound, rotatedInputArray, showAnswer, clickedArray, result} = this.state
        return(
            <Grid.Column>
                <Grid.Row>
                    {!startRound && !showAnswer && this.createTable(inputArray, false)}
                    {showAnswer && startRound && this.createTable(rotatedInputArray, false)}
                </Grid.Row>
                <Grid.Row>
                    {`${rotationDirection.degrees} ${rotationDirection.clockWise?'ClockWisee':'Counter ClockWisee'}`}
                </Grid.Row>
                <Grid.Row>
                    {startRound && (!showAnswer || showAnswer) && this.createTable(clickedArray, true)}
                </Grid.Row>
                <Grid.Row>
                    {!startRound && !showAnswer && <Button onClick = {() => {this.setState({showAnswer: false, startRound: true})}}>Start Round</Button>}
                    {startRound && !showAnswer && <Button onClick = {() => {this.setState({showAnswer: true, startRound: true});this.calculateResult();}}>Show Answer</Button>}
                    {startRound && showAnswer && <p>{`${result} score: ${this.state.score} round: ${this.state.rounds}`}</p>}
                    {startRound && showAnswer && <Button onClick = {() => {this.setState({showAnswer: false, startRound: false});this.nextRound();}}>Next Round</Button>}
                </Grid.Row>
            </Grid.Column>
        )
    }

    playGame(){
        while(this.state.rounds < 6){
            return this.getBoard();
        }
        this.props.submitResults(this.props.results.computationResults, this.state.score);
        return (
            <Grid.Column>
            <Grid.Row>
                <p>{`${this.state.result} final score: ${this.state.score} round: ${this.state.rounds}`}</p>
            </Grid.Row>
        </Grid.Column>
        )
    }

    nextRound(){
        var {inputArray,
            clickedArray,
            rotationDirection,
            rotatedInputArray} = this.setup();
        this.setState({
            inputArray,
            clickedArray,
            rotationDirection,
            rotatedInputArray,
            rounds: this.state.rounds + 1,
            showAnswer : false,
            startRound: false
        })
    }

    calculateResult(){
        let i = 0;
        let j = 0;
        for (i = 0; i < this.state.rotatedInputArray.length; i++){
            for (j = 0; j < this.state.rotatedInputArray[i].length; j++){
                if(this.state.rotatedInputArray[i][j] !== this.state.clickedArray[i][j]){
                    this.setState({
                        result: 'incorrect', 
                    })
                    return;
                }
            }
        }
        this.setState({
            result: 'correct',
            score: this.state.score + 1,
        })
        return 
    }

    render() {
        return this.playGame()
    }
}

function mapStateToProps(state) {
    return { results: state.results }
}

export default connect(mapStateToProps, { submitResults })(Spatial);