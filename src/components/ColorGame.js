import React from 'react';
import Gameboard from './Gameboard';
import { correctPlay, incorrectPlay } from '../components/sounds.js';
import { connect } from 'react-redux';
import { startTimer, setTimerId, addTime, subTime } from '../actions/timer';
import { startGame, stopGame, level1, level2, level3, level4 } from '../actions/game'
import { bindActionCreators } from 'redux';


class ColorGame extends React.Component {
    constructor(props) {
        super(props);

        this.colorSet = [
            //yellow
            ["#e8d505", "#d9c704"],
            //green
            ["#33a151", "#2e8f48"],
            //blue
            ["#2e368f", "#272e7a"],
            //red
            ["#873333", "#7a2f2f"],
            //light red - red
            ["#913737", "#873333"],
            //light blue - blue
            ["#333b9e", "#2e368f"],
            //light green - green
            ["#32994e", "#2e8f48"],
            //light pink - pink
            ["#c983c4", '#bd7bb8'],

        ];

        this.pickColorPair = this.pickColorPair.bind(this);
        this.loadColor = this.loadColor.bind(this);
        this.randomize = this.randomize.bind(this);
        this.isMatch = this.isMatch.bind(this);
        this.increment = this.increment.bind(this);
        this.levelUp = this.levelUp.bind(this);
        this.levelMode = this.levelMode.bind(this);
        this.countDown = this.countDown.bind(this);


        this.state = {
            colors: [],
            score: 0,
            colorPair: [],
            size: 4,
            wrongClassName: "",
        }
    }


    pickColorPair() {
        const randomNumber = Math.floor(Math.random() * 8);
        this.setState({ colorPair: this.colorSet[randomNumber] }, () => { this.loadColor() });
        console.log('game redux', this.props.game);

        if (this.props.game.gameStarted === false) {
            this.countDown();
            this.props.startGame();
        }

        if (this.props.timer.timeLeft === 0) {
            this.props.startTimer(25);
            this.setState({ size: 4 });
            this.setState({ score: 0 });
            this.props.level1();
        }
    }


    loadColor() {
        // console.log(this.state.colorPair);
        let colorArray = [this.state.colorPair[0]];

        for (let i = 1; i < this.state.size; i++) {
            colorArray.push(this.state.colorPair[1]);
        }
        this.randomize(colorArray);
        this.setState(() => ({ colors: colorArray }));
    }


    randomize(colorArray) {
        for (let i = colorArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
            // swap elements array[i] and array[j]
            // we use "destructuring assignment" syntax to achieve that
            // you'll find more details about that syntax in later chapters
            // same can be written as:
            // let t = colorArray[i]; colorArray[i] = colorArray[j]; colorArray[j] = t
            [colorArray[i], colorArray[j]] = [colorArray[j], colorArray[i]];
        }
        return (colorArray);
    }

    isMatch(color) {
        let counter = 0;
        //We only need to compare the first 3 to know if we got the right answer
        for (let i = 0; i < 3; i++) {
            if (color === this.state.colors[i]) {
                counter++;
            }
        }

        if (counter < 2) {
            console.log("CORRECT!");
            //reset to empty for animation =============
            this.setState({ colors: [] });

            correctPlay();
            this.increment();
            this.props.addTime();
            this.levelUp();
            this.levelMode();
            this.pickColorPair();

            this.setState({ wrongClassName: "correct" });
            setTimeout(() => {
                this.setState({ wrongClassName: "" })
            }, 500);

        } else {
            console.log("INCORRECT GUESS!");
            incorrectPlay();
            this.props.subTime();
            this.setState({ wrongClassName: "incorrect" });
            setTimeout(() => {
                this.setState({ wrongClassName: "" })
            }, 500);

        }


    }

    increment() {
        this.setState({ score: this.state.score + 1 });
        //if there are multiple this.setStates in a row, you should use this.setState((prevState) => {})
        //because it will properly update them, if you use this.state.score since its an async function, it wont addu properly,
        // you can call do this.state.score + 1, four times and it will only be +2 because the get grouped together and not 
        //updated properly.
    }

    levelUp() {
        if (this.state.score === 3) {
            this.setState({ size: 9 });
        } else if (this.state.score === 8) {
            this.setState({ size: 16 });
        } else if (this.state.score === 13) {
            this.setState({ size: 25 })
        }

    }

    levelMode() {
        if (this.state.score < 3) {
            this.props.level1();
        } else if (this.state.score >= 13) {
            this.props.level4();
        } else if (this.state.score >= 8) {
            this.props.level3();
        }
        else if (this.state.score >= 3) {
            this.props.level2();
        }

    }

    countDown() {
        const stopId = setInterval(() => this.props.startTimer(this.props.timer.timeLeft - .5), 500);
        this.props.setTimerId(stopId);
    }


    //reset timer
    // click to make gameStarted to false, and timeLeft back to 30

    // ====== LIFE CYCLE METHODS =====================

    componentDidUpdate() {
        // console.log('Time left in component update', this.props.timer.timeLeft)
        if (this.props.timer.timeLeft < 0.5) {
            // console.log('game started component update', this.state.gameStarted)
            clearInterval(this.props.timer.timerId);
            if (this.props.game.gameStarted === true) {
                this.props.stopGame();
            }
        }

    }


    render() {

        return (
            <div className="container">
                <h1>
                    <span style={{ color: '#FF9AA2' }}>B</span>
                    <span style={{ color: '#FFB7B2' }}>U</span>
                    <span style={{ color: '#FFDAC1' }}>B</span>
                    <span style={{ color: '#E2F0CB' }}>B</span>
                    <span style={{ color: '#B5EAD7' }}>L</span>
                    <span style={{ color: '#C7CEEA' }}>E </span>

                    <span style={{ color: '#FF9AA2' }}>P</span>
                    <span style={{ color: '#C7CEEA' }}>O</span>
                    <span style={{ color: '#E0FEFE' }}>P</span>
                </h1>
                <div className="scoreTime">
                    <h3>TIME : <span>{this.props.timer.timeLeft}</span></h3>
                    <h3>SCORE : <span>{this.state.score}</span> </h3>
                </div>


                <button className='startbtn' onClick={this.pickColorPair} disabled={this.props.game.gameStarted}>{this.props.timer.timeLeft === 0 ? "Replay " : "Start"}</button>

                <p className={this.state.wrongClassName}>
                    {this.state.wrongClassName === "incorrect" ? "TRY AGAIN! -.5 SEC" : "ADD TIME +.5 SEC!"}</p>

                <Gameboard
                    colors={this.state.colors}
                    isMatch={this.isMatch}
                    score={this.state.score}
                />

            </div >
        );
    };
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        timer: state.timer
    };
};



const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({ startTimer: startTimer, setTimerId: setTimerId, addTime: addTime, subTime: subTime, startGame: startGame, stopGame: stopGame, level1: level1, level2: level2, level3: level3, level4: level4 }, dispatch)
}

// because we set matchdispatchtoprops here, we cannot do this.props.dispatch, we need to just set all actions used above instead.
export default connect(mapStateToProps, matchDispatchToProps)(ColorGame)