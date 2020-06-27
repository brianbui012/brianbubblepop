import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss'
// import { Animated } from "react-animated-css";
// require('./styles/style.css')


class ColorGame extends React.Component {
    constructor(props) {
        super(props);

        this.colorSet = [['blue', '#EA401B'], ['yellow', '#34AD44'], ['green', '#80279D'], ['pink', 'purple']];

        this.pickColorPair = this.pickColorPair.bind(this);
        this.loadColor = this.loadColor.bind(this);
        this.randomize = this.randomize.bind(this);
        this.isMatch = this.isMatch.bind(this);
        this.increment = this.increment.bind(this);
        this.levelUp = this.levelUp.bind(this);
        this.levelMode = this.levelMode.bind(this);

        this.state = {
            colors: [],
            score: 0,
            colorPair: [],
            size: 4,
            level: 'colorCircle-level1 circleBtn'
        }
    }


    levelMode() {
        console.log("hello");
        console.log(this.state.score)

        if (this.state.score > 14) {
            this.setState({ level: 'colorCircle-level4 circleBtn' });
        } else if (this.state.score > 8) {
            this.setState({ level: 'colorCircle-level3 circleBtn' });
        }
        else if (this.state.score >= 4) {
            this.setState({ level: 'colorCircle-level2 circleBtn' });
            // , () => { this.state.isMatch(this.state.color) }
        } else if (this.state.score < 4) {
            this.setState({ level: 'colorCircle-level1 circleBtn' });
        }
    }

    pickColorPair() {
        const randomNumber = Math.floor(Math.random() * 4);
        this.setState({ colorPair: this.colorSet[randomNumber] }, () => { this.loadColor() });

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
            this.increment();
            this.levelUp();
            this.pickColorPair();

        } else {
            console.log("INCORRECT GUESS!");
        }


    }

    increment() {
        this.setState((prevState) => ({ score: prevState.score + 1 }));
        console.log(this.state.score);
    }

    levelUp() {
        if (this.state.score === 4) {
            this.setState({ size: 9 });
        } else if (this.state.score === 9) {
            this.setState({ size: 16 });
        } else if (this.state.score === 15) {
            this.setState({ size: 25 })
        }

    }


    // ====== LIFE CYCLE METHODS =====================

    //problem comes from this.setState taking a while // i think we can use promises to force it to resolve quicker..
    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.score === 4) {
    //         this.setState({ size: 9 });
    //     } else if (this.state.score === 9) {
    //         this.setState({ size: 16 });
    //     }
    // }

    // this.state.score != prevState.score


    render() {
        return (
            <div className="container">
                <h1>Spot The Difference!</h1>
                <h2>Score: {this.state.score}</h2>
                <h2>Size: {this.state.size}</h2>

                <button className='startbtn' onClick={this.pickColorPair}>Start</button>

                <GameBoard
                    colors={this.state.colors}
                    isMatch={this.isMatch}
                    score={this.state.score}
                    level={this.state.level}
                    levelMode={this.levelMode} />

            </div>
        );
    };
}

const GameBoard = (props) => (

    <div className="gameboard">

        {
            props.colors.map((color, index) => (
                <ColorCircle
                    key={index}
                    color={color}
                    isMatch={props.isMatch}
                    score={props.score}
                    level={props.level}
                    levelMode={props.levelMode}
                />
            ))
        }

    </div>


)

class ColorCircle extends React.Component {
    constructor(props) {
        super(props);
        this.isMatch = this.isMatch.bind(this);
    }

    isMatch() {
        this.props.levelMode();
        this.props.isMatch(this.props.color);
    }

    render() {
        return (
            <div>
                <button
                    className={this.props.level}
                    onClick={this.isMatch}
                    style={{ backgroundColor: this.props.color }}>
                </button>
            </div >
        )
    }
}


//we can pass in props to the main app through here. {} is the JSX brackets, not an object literal
ReactDOM.render(<ColorGame />, document.getElementById('app'));






