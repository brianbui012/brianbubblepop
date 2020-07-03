import React from 'react';
import Modal from 'react-modal';

const HowToPlayModal = (props) => (
    <Modal
        isOpen={props.howToPlayModal}
        contentLabel="Selected Option"
        ariaHideApp={false}
        closeTimeoutMS={200}
        className="modal--howtoplay"
        style={{ overlay: { backgroundColor: 'rgba(0, 31, 63, 0.7' } }}
    >
        <div className="header--howtoplay">
            <h1 className="title--howtoplay">
                <span style={{ color: '#FF9AA2' }}>H</span>
                <span style={{ color: '#FFB7B2' }}>O</span>
                <span style={{ color: '#FFDAC1' }}>W </span>
                <span style={{ color: '#E2F0CB' }}>T</span>
                <span style={{ color: '#B5EAD7' }}>O </span>
                <span style={{ color: '#C7CEEA' }}>P</span>
                <span style={{ color: '#FF9AA2' }}>L</span>
                <span style={{ color: '#C7CEEA' }}>A</span>
                <span style={{ color: '#E0FEFE' }}>Y</span>
            </h1>

            <button onClick={props.closeHowToPlayModal} className="button--howtoplay">X</button>

        </div>

        <p className="paragraph--howtoplay">The rules are simple:</p>

        <p className="paragraph--howtoplay">Find the bubble with a slightly different color.</p>

        <p className="paragraph--howtoplay">If picked correctly, +.5 seconds will be added to your total time.</p>

        <p className="paragraph--howtoplay">Picked incorrectly, -.5 seconds will be deducted from your total time.</p>
    </Modal>
);



export default HowToPlayModal;
