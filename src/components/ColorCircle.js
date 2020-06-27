import React from 'react';

export default class ColorCircle extends React.Component {
    constructor(props) {
        super(props);
        this.isMatch = this.isMatch.bind(this);
        this.levelMode = this.levelMode.bind(this);

    }

    levelMode() {
        console.log(this.props.score)
        if (this.props.score < 4) {
            return 'colorCircle-level1 circleBtn';
        } else if (this.props.score > 13) {
            return 'colorCircle-level4 circleBtn'
        } else if (this.props.score > 8) {
            return 'colorCircle-level3 circleBtn';
        }
        else if (this.props.score >= 4) {
            return 'colorCircle-level2 circleBtn';
        }

    }

    isMatch() {
        this.props.isMatch(this.props.color);
    }

    render() {

        return (
            <div>
                <button
                    disabled={!this.props.gameStarted}
                    className={this.levelMode()} // we can make levelMode into state in redux, and then when I press replay, we can set the state to colorcircle
                    onClick={this.isMatch}
                    style={{ backgroundColor: this.props.color }}>
                </button>
            </div >
        )
    }
}
