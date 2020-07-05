import React from 'react';

export default class Timer extends React.Component {

    constructor(props) {
        super(props);
        this.startTimer = this.startTimer.bind(this);

        this.state = {
            timeLeft: 5,
            timerId: ""
        }
    }

    startTimer() {
        this.timerId = setInterval(() => {
            this.setState((prevState) => ({ timeLeft: prevState.timeLeft - 1 }))
        }, 1000)
    }

    componentDidUpdate() {
        if (this.state.timeLeft < 1) {
            clearInterval(this.timerId);
        };
    }

    render() {
        return (
            <button className="timerBtn" onClick={this.startTimer}>Time Left: {this.state.timeLeft}</button>
        )
    }
}