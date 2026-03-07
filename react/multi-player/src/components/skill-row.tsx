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
                    value={props.currPoints} 
                    onChange={e => props.changePoints(e.target.valueAsNumber)}
                />
                <button onClick={() => props.changePoints(props.currPoints + 1)}>+</button>
            </div>
        </div>
        </>
    )
}

export default SkillRow;