import type { SkillRowProps } from "../types";
import "../index.css";


function SkillRow(props: SkillRowProps) {

    return (
        <>
        <div key={props.skill} className="skillRow">
            <span>
                {props.name}
            </span>
            <div>
                <button onClick={() => props.changePoints(props.currPoints - 1)}>-</button>
                <input type="number" 
                    min={props.minPoints} 
                    max={props.maxPoints} 
                    value={props.currPoints} 
                    onInput={e => props.changePoints(e.currentTarget.valueAsNumber)}
                />
                <button onClick={() => props.changePoints(props.currPoints + 1)}>+</button>
            </div>
        </div>
        </>
    )
};

export default SkillRow;