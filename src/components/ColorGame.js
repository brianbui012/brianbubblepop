import React from 'react';

import Gameboard from './Gameboard';
import GameOverModal from './GameOverModal';
import HowToPlayModal from './HowToPlayModal';
import Top5Modal from './Top5Modal';

import { correctPlaySound, incorrectPlaySound, startGameSound } from '../components/sounds.js';
import { connect } from 'react-redux';
import { startTimer, setTimerId, addTime, subtractTime } from '../actions/timer';
import { setStartGame, setStopGame, setLevel1, setLevel2, setLevel3, setLevel4 } from '../actions/game';
import { bindActionCreators } from 'redux';
import { Animated } from "react-animated-css";
import axios from 'axios';
//need axios because to render the top5modal, we need to know the top 5 scores.
// on mount we can mount the top 5 scores at the time, then if the highest score beats any of the top

//maybe everytime we mount the main colorgame component , we update the top5array
//when we unmount the top5modal, we update the top 5 array with the new winner player in the new top 5 array

//componentDidMount ? (color game) // componentwillunmount(top5modal)

class ColorGame extends React.Component {
    constructor(props) {
        super(props);

        this.colorSet = [
            //yellow
            ["#e8d505", "#d9c704"],
            //green
            ["#33a151", "#2e8f48"],
            //blue
            ["#2e368f", "#282f7d"],
            //red
            ["#873333", "#7a2f2f"],
            //light red - red
            ["#9e3c3c", "#873333"],
            //light blue - blue
            ["#333b9e", "#2b338c"],
            //light green - green
            ["#32994e", "#2e8f48"],
            //light pink - pink
            ["#d68bd1", '#bd7bb8'],

        ];

        this.startGame = this.startGame.bind(this);
        this.loadColor = this.loadColor.bind(this);
        this.shuffleColorArray = this.shuffleColorArray.bind(this);
        this.isMatch = this.isMatch.bind(this);
        this.increment = this.increment.bind(this);
        this.sizeUp = this.sizeUp.bind(this);
        this.setCircleSize = this.setCircleSize.bind(this);
        this.countDown = this.countDown.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.correctPick = this.correctPick.bind(this);
        this.incorrectPick = this.incorrectPick.bind(this);
        this.openHowToPlayModal = this.openHowToPlayModal.bind(this);
        this.closeHowToPlayModal = this.closeHowToPlayModal.bind(this);

        //Methods for Top 5 Modal ===================================
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.compare = this.compare.bind(this);
        this.closeTop5Modal = this.closeTop5Modal.bind(this);
        this.updateTop5List = this.updateTop5List.bind(this);

        this.state = {
            colors: [],
            score: 0,
            colorPair: [],
            size: 4,
            matchFeedbackClassName: "feedbackClass",
            initialStart: true,
            howToPlayModal: false,
            setTop5Modal: true,
            top5Players: [],
            fifthScore: '',
            username: ''
        }
    }


    startGame() {
        if (this.state.initialStart === true) {
            startGameSound();
        }
        this.updateTop5List();
        this.setState({ setTop5Modal: true })
        this.setState({ initialStart: false });
        this.loadColor();
        if (this.props.game.isGameStarted === false) {
            this.countDown();
            this.props.setStartGame();
        }

        if (this.props.timer.timeLeft === 0) {
            this.resetGame();
        }
    }


    loadColor() {
        //Selects a random color within the colorSet
        const randomNumber = Math.floor(Math.random() * 8);
        this.setState({ colorPair: this.colorSet[randomNumber] }, () => {

            /*Out of the pair chosen set the first color to the first element in the array,
            then set the rest of the array with the second color, then shuffle*/
            let colorArray = [this.state.colorPair[0]];

            for (let i = 1; i < this.state.size; i++) {
                colorArray.push(this.state.colorPair[1]);
            }
            this.shuffleColorArray(colorArray);
            this.setState(() => ({ colors: colorArray }));

        });

    }


    shuffleColorArray(colorArray) {
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
        //Compares the first 3 to know if we got the right answer
        for (let i = 0; i < 3; i++) {
            if (color === this.state.colors[i]) {
                counter++;
            }
        }
        if (counter < 2) {
            this.correctPick();
        } else {
            this.incorrectPick();
        }


    }

    correctPick() {
        //reset to empty for animation =============
        this.setState({ colors: [] });
        correctPlaySound();
        this.increment();
        this.props.addTime();
        this.sizeUp();
        this.setCircleSize();
        this.startGame();

        this.setState({ matchFeedbackClassName: "correct feedbackClass" });
        setTimeout(() => {
            this.setState({ matchFeedbackClassName: "feedbackClass" })
        }, 500);

    }

    incorrectPick() {
        incorrectPlaySound();
        this.props.subtractTime();
        this.setState({ matchFeedbackClassName: "incorrect feedbackClass" });
        setTimeout(() => {
            this.setState({ matchFeedbackClassName: "feedbackClass" })
        }, 500);

    }

    resetGame() {
        this.props.startTimer(20);
        this.setState({ score: 0 });
        this.setState({ size: 4 });
        this.props.setLevel1();
        startGameSound();
    }



    increment() {
        this.setState({ score: this.state.score + 1 });
        //if there are multiple this.setStates in a row, you should use this.setState((prevState) => {})
        //because it will properly update them, if you use this.state.score since its an async function, it wont addu properly,
        // you can call do this.state.score + 1, four times and it will only be +2 because the get grouped together and not 
        //updated properly.
    }

    sizeUp() {
        if (this.state.score === 3) {
            this.setState({ size: 9 });
        } else if (this.state.score === 8) {
            this.setState({ size: 16 });
        } else if (this.state.score === 13) {
            this.setState({ size: 25 })
        }

    }

    setCircleSize() {
        if (this.state.score < 3) {
            this.props.setLevel1();
        } else if (this.state.score >= 13) {
            this.props.setLevel4();
        } else if (this.state.score >= 8) {
            this.props.setLevel3();
        }
        else if (this.state.score >= 3) {
            this.props.setLevel2();
        }

    }

    countDown() {
        const stopId = setInterval(() => this.props.startTimer(this.props.timer.timeLeft - .5), 500);
        this.props.setTimerId(stopId);
    }

    openHowToPlayModal() {
        this.setState({ howToPlayModal: true });
    }

    closeHowToPlayModal() {
        this.setState({ howToPlayModal: false });
    }



    //Top 5 Modal Methods ================================================

    onChangeUsername(e) {
        this.setState({ username: e.target.value.toUpperCase() })
    }

    onSubmit(e) {
        e.preventDefault();
        this.closeTop5Modal();
        this.setState({ username: e.target.username.value })

        const user = {
            username: e.target.username.value,
            score: this.state.score
        }
        //'https://brianbubblegame.herokuapp.com/users/add'
        //LOCAL : axios.post('http://localhost:3000/users/add)
        axios.post('/users/add', user)
            .then(res => console.log("axios post", res.data));

    }

    updateTop5List() {
        //Get Updated database
        //axios.get('https://brianbubblegame.herokuapp.com/users')
        //LOCAL : axios.get('http://localhost:3000/users')
        axios.get('/users')
            .then(response => {
                if (response.data.length > 0) {
                    const sortedPlayers = response.data.sort(this.compare);
                    this.setState({ top5Players: sortedPlayers.slice(0, 5) }, () => {
                        this.setState({ fifthScore: this.state.top5Players[4].score })
                    })
                }

            })
    }

    closeTop5Modal() {
        this.setState({ setTop5Modal: false })
    }


    //reset timer
    // click to make isGameStarted to false, and timeLeft back to 30

    // ====== LIFE CYCLE METHODS =====================

    compare(a, b) {
        const playerA = a.score;
        const playerB = b.score;

        let comparison = 0;
        if (playerA > playerB) {
            comparison = -1;
        } else if (playerA < playerB) {
            comparison = 1;
        }
        return comparison;
    }

    componentDidMount() {
        this.updateTop5List();
    }


    componentDidUpdate() {
        // console.log('Time left in component update', this.props.timer.timeLeft)
        if (this.props.timer.timeLeft < 0.5) {
            // console.log('game started component update', this.state.isGameStarted)
            clearInterval(this.props.timer.timerId);
            if (this.props.game.isGameStarted === true) {
                this.props.setStopGame();
            }
        }

    }



    render() {

        return (
            <div className="container">
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true} animationInDuration={1800}>
                    <h1 className="title">
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
                </Animated>
                <div className="scoreTime">
                    <h3>TIME : <span>{this.props.timer.timeLeft}</span></h3>
                    <h3>SCORE : <span>{this.state.score}</span> </h3>
                </div>

                {this.state.initialStart && <button className='htpbutton' onClick={this.openHowToPlayModal}>How To Play</button>}

                {<button className='startbtn' disabled={this.props.game.isGameStarted} onClick={this.startGame}>{this.props.timer.timeLeft === 0 ? "Replay " : "Start"}</button>}


                {this.state.howToPlayModal &&
                    <HowToPlayModal
                        howToPlayModal={this.state.howToPlayModal}
                        closeHowToPlayModal={this.closeHowToPlayModal}
                    />}

                <p className={this.state.matchFeedbackClassName}>
                    {this.state.matchFeedbackClassName === "incorrect" ? "TRY AGAIN! -.5 SEC" : "ADD TIME +.5 SEC!"}</p>

                <Gameboard
                    colors={this.state.colors}
                    isMatch={this.isMatch}
                    score={this.state.score}
                />
                {this.state.score <= this.state.fifthScore &&
                    this.state.setTop5Modal &&
                    <GameOverModal
                        startGame={this.startGame}
                        score={this.state.score}
                    />}

                {this.state.score > this.state.fifthScore &&
                    this.state.setTop5Modal &&
                    !(this.props.game.isGameStarted) &&
                    <Top5Modal
                        onChangeUsername={this.onChangeUsername}
                        onSubmit={this.onSubmit}
                        username={this.state.username}
                        top5Players={this.state.top5Players}
                        score={this.state.score}
                        closeTop5Modal={this.closeTop5Modal}
                    />}

            </div>
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
    return bindActionCreators({
        startTimer: startTimer, setTimerId: setTimerId,
        addTime: addTime, subtractTime: subtractTime,
        setStartGame: setStartGame, setStopGame: setStopGame,
        setLevel1: setLevel1, setLevel2: setLevel2, setLevel3: setLevel3, setLevel4: setLevel4
    }, dispatch)
}

// because we set matchdispatchtoprops here, we cannot do this.props.dispatch, we need to just set all actions used above instead.
export default connect(mapStateToProps, matchDispatchToProps)(ColorGame)