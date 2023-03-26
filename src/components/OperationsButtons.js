import React from 'react'
import { ACTIONS } from './App.js';

const OperationsButton = ({ operation, dispatch }) => {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPTIONS, preload: { operation } })}>{operation}</button>
    )
}

export default OperationsButton;