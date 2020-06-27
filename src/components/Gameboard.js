import React from 'react';
import ColorCircle from './ColorCircle';

const Gameboard = (props) => (

    <div className="gameboard">
        {
            props.colors.map((color, index) => (
                <ColorCircle
                    key={index}
                    color={color}
                    isMatch={props.isMatch}
                    score={props.score}
                    gameStarted={props.gameStarted}
                />
            ))
        }
    </div >

)

export default Gameboard;