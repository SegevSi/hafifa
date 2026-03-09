import type { SkillRowProps } from "../types";


function SkillRow(props: SkillRowProps) {

    return (
        <>
        <div className="skillRow">
            <span>
                {props.name}
            </span>
            <div>
                <button onClick={() => props.changePoints(props.currPoints - 1)}>-</button>
                <input type="number" 
                    defaultValue={props.currPoints} 
                    key={Date.now()} 
                    onBlur={e => props.changePoints(e.currentTarget.valueAsNumber)}
                />
                <button onClick={() => props.changePoints(props.currPoints + 1)}>+</button>
            </div>
        </div>
        </>
    )
}

export default SkillRow;