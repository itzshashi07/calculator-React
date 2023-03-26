import React, { useReducer } from 'react'
import DigitButtons from './DigitButtons';
import OperationsButton from './OperationsButtons';
import './App.css';

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPTIONS: 'choose-options',
    CLEAR: 'clear',
    DELETE: 'delete',
    EVALUATE: 'evaluate'
}
function reducer(state, { type, preload }) {
    switch (type) {

        case ACTIONS.ADD_DIGIT:
            if (state.overWrite) {
                return {
                    ...state,
                    overWrite: false,
                    currentOperand: preload.digit
                }
            }
            if (state.currentOperand?.includes('.') && preload.digit == '.') {
                return state;
            }
            if (state.currentOperand == '0' && preload.digit == '0') {
                return state;
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${preload.digit}`
            }

        case ACTIONS.CHOOSE_OPTIONS:
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: preload.operation
                }
            }
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: preload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null
                }
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                currentOperand: null,
                operation: preload.operation
            }

        case ACTIONS.EVALUATE:
            if (state.currentOperand == null || state.previousOperand == null || state.operation == null) {
                return state;
            }
            return {
                ...state,
                overWrite: true,
                previousOperand: null,
                currentOperand: evaluate(state),
                operation: null
            }

        case ACTIONS.DELETE:
            if (state.overWrite) {
                return { currentOperand: null, previousOperand: null, operation: null }
            }
            if (state.currentOperand == null) {
                return state;
            }
            if (state.currentOperand.length == 1) {
                return {
                    ...state,
                    currentOperand: null
                };
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }

        case ACTIONS.CLEAR:
            return { currentOperand: null, previousOperand: null, operation: null }
    }
}

function evaluate(state) {
    const curr = parseFloat(state.currentOperand);
    const prev = parseFloat(state.previousOperand);
    if (isNaN(curr) || isNaN(prev)) return "";
    let computation = "";
    switch (state.operation) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '/':
            computation = prev / curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        default:
            computation = state.currentOperand;
            break;
    }
    return computation.toString();
}

let NUMBER_FORMATTER = Intl.NumberFormat('en-us',{
    maximumFractionDigits:0,
})

function formateOperand(operand){
    if(operand == null) return;
    const [integer,decimal] = operand.split('.');
    if(decimal == null ) return NUMBER_FORMATTER.format(integer)
    
}

const App = () => {
    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, { currentOperand: null, previousOperand: null, operation: null })


    return (
        <div className='calculator-grid'>
            <div className="output">
                <div className="previous-operand">{previousOperand} {operation}</div>
                <div className="current-operand">{currentOperand}</div>
            </div>
            <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
            <OperationsButton operation={"+"} dispatch={dispatch} />
            <DigitButtons digit={"1"} dispatch={dispatch} />
            <DigitButtons digit={"2"} dispatch={dispatch} />
            <DigitButtons digit={"3"} dispatch={dispatch} />
            <OperationsButton operation={"*"} dispatch={dispatch} />
            <DigitButtons digit={"4"} dispatch={dispatch} />
            <DigitButtons digit={"5"} dispatch={dispatch} />
            <DigitButtons digit={"6"} dispatch={dispatch} />
            <OperationsButton operation={"/"} dispatch={dispatch} />
            <DigitButtons digit={"7"} dispatch={dispatch} />
            <DigitButtons digit={"8"} dispatch={dispatch} />
            <DigitButtons digit={"9"} dispatch={dispatch} />
            <OperationsButton operation={"-"} dispatch={dispatch} />
            <DigitButtons digit={"."} dispatch={dispatch} />
            <DigitButtons digit={"0"} dispatch={dispatch} />
            <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
        </div>
    )
}

export default App;