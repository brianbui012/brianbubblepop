import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

const Top5Modal = (props) => (
    <Modal
        isOpen={props.timer.timeLeft === 0}
        contentLabel="Selected Option"
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="top5-modal"
        style={{ overlay: { backgroundColor: 'rgba(0, 31, 63, 0.7' } }}
    >
        <div>
            <h1 className="top5-modal__title">
                <span style={{ color: '#FF9AA2' }}>T</span>
                <span style={{ color: '#FFB7B2' }}>O</span>
                <span style={{ color: '#FFDAC1' }}>P </span>
                <span style={{ color: '#E2F0CB' }}>F</span>
                <span style={{ color: '#B5EAD7' }}>I</span>
                <span style={{ color: '#C7CEEA' }}>V</span>
                <span style={{ color: '#FF9AA2' }}>E</span>
                <span style={{ color: '#C7CEEA' }}></span>
                <span style={{ color: '#E0FEFE' }}></span>
                <span style={{ color: '#FF9AA2' }}></span>
            </h1>


        </div>
        <h4 className="top5-modal__score">New High Score!</h4>
        <h5 className="top5-modal__score">Score : {props.score}</h5>
        <ol>
            {props.top5Players.map((player => <li className="top5-modal__list" key={player._id}>{player.username} - {player.score}</li>))}
        </ol>
        <form onSubmit={props.onSubmit}>
            <input
                className="top5-modal__input"
                type="text"
                value={props.username}
                onChange={props.onChangeUsername}
                minLength="3"
                maxLength="3"
                name="username"
                placeholder="Initials"
                required />
            <button className="top5-modal__submit-btn">Submit</button>
        </form>


    </Modal>
);

const mapToStateProps = (state) => {
    return {
        timer: state.timer
    }
};

export default connect(mapToStateProps)(Top5Modal);