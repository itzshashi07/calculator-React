import React from 'react'
import { ACTIONS } from './App.js';

const DigitButtons = ({ digit, dispatch }) => {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, preload: { digit } })}>{digit}</button>
    )
}

export default DigitButtons;
