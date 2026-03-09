import { useRef } from "react";
import type { SkillRowProps } from "../types";


function SkillRow(props: SkillRowProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const changePointsHandler = (value: number): void => {
        if (inputRef.current) {
            const processedPoints = props.processPoints(value);
            props.changePoints(processedPoints);
            inputRef.current.value = String(processedPoints);
        }
    };

    return (
        <>
        <div className="skillRow">
            <span>
                {props.name}
            </span>
            <div>
                <button onClick={() => changePointsHandler(props.currPoints - 1)}>-</button>
                <input type="number" 
                    defaultValue={props.currPoints} 
                    key={props.currPoints} 
                    ref={inputRef}
                    onBlur={e => changePointsHandler(e.currentTarget.valueAsNumber)}
                />
                <button onClick={() => changePointsHandler(props.currPoints + 1)}>+</button>
            </div>
        </div>
        </>
    )
}

export default SkillRow;