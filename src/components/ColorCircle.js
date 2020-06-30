import React from 'react';
import { connect } from 'react-redux';


class ColorCircle extends React.Component {
    constructor(props) {
        super(props);
        this.isMatch = this.isMatch.bind(this);

    }


    isMatch() {
        this.props.isMatch(this.props.color);
    }

    render() {

        return (
            <div>
                <button
                    disabled={!this.props.game.gameStarted}
                    className={this.props.game.level} // we can make levelMode into state in redux, and then when I press replay, we can set the state to colorcircle
                    onClick={this.isMatch}
                    style={{ backgroundColor: this.props.color }}>
                </button>
            </div >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        game: state.game,
        timer: state.timer
    };
};




// because we set matchdispatchtoprops here, we cannot do this.props.dispatch, we need to just set all actions used above instead.
export default connect(mapStateToProps)(ColorCircle)