import React, { useState } from "react";
import { d6 } from "./utils/dice"; // Assuming d6 is a function that returns a random number between 1 and 6

export function TwoDice(): React.JSX.Element {
    const [leftDie, setLeftDie] = useState(d6());
    const [rightDie, setRightDie] = useState(d6());

    return (
        <div>
            <span data-testid="left-die">{leftDie}</span>
            <button onClick={() => setLeftDie(d6())}>Roll Left</button>
            <span data-testid="right-die">{rightDie}</span>
            <button onClick={() => setRightDie(d6())}>Roll Right</button>
            {leftDie === rightDie && (leftDie === 1 ? <p>Lose</p> : <p>Win</p>)}
        </div>
    );
}