import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

const GameOverModal = (props) => (
    <Modal
        isOpen={props.timer.timeLeft === 0}
        contentLabel="Selected Option"
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal"
        style={{ overlay: { backgroundColor: 'rgba(0, 31, 63, 0.7' } }}
    >
        <h1 className="title--gameover">
            <span style={{ color: '#FF9AA2' }}>G</span>
            <span style={{ color: '#FFB7B2' }}>A</span>
            <span style={{ color: '#FFDAC1' }}>M</span>
            <span style={{ color: '#E2F0CB' }}>E</span>
            <br />
            <span style={{ color: '#B5EAD7' }}>O</span>
            <span style={{ color: '#C7CEEA' }}>V</span>
            <span style={{ color: '#FF9AA2' }}>E</span>
            <span style={{ color: '#C7CEEA' }}>R</span>
            <span style={{ color: '#E0FEFE' }}>!</span>
        </h1>
        <h4 className="modal__score">SCORE : {props.score}</h4>
        <button className="startbtn modal__startbtn" onClick={props.startGame}>Replay</button>
    </Modal>
);

const mapToStateProps = (state) => {
    return {
        timer: state.timer
    }
};

export default connect(mapToStateProps)(GameOverModal);