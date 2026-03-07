import type { Skill, SkillsContentProps } from "../types";
import ProfessionData from "../data/ProffessionsData";
import SkillData from "../data/SkillData";
import "../index.css";
import SkillRowList from "./skill-row-list";
import { initSkills, randomizeSkills } from "../utils/skills";



function SkillContent({selectedPlayer, changeAllSkills }: SkillsContentProps) {

    const changeSkill = (skill: Skill, value: number): void => {
        let min = SkillData.MIN_POINTS;
        let max = SkillData.MAX_POINTS;

        if (ProfessionData[selectedPlayer.profession].bonusSkill === skill) {
            min += SkillData.BONUS_POINTS;
            max += SkillData.BONUS_POINTS;
        }

        if (value >= min && value <= max) {
            changeAllSkills({
                ...selectedPlayer.skills,
                [skill]: value
            });
        }
    };

    return (
        <>
        <div className="skillContent">
            <h1>Player {selectedPlayer.name}</h1>
            <div>Total Points: {selectedPlayer.total}</div>
            <div>Free Points: {selectedPlayer.free}</div>
            {selectedPlayer.free !== 0 && (<div className="error">there are unused skills points</div>)}
            <hr />

            <SkillRowList
                skills={selectedPlayer.skills}
                changeSkill={changeSkill}
                bestSkill={ProfessionData[selectedPlayer.profession].bonusSkill}
            />
            <div className="buttonsRow">
                <button 
                    className="button" 
                    onClick={() => changeAllSkills(randomizeSkills(selectedPlayer.profession, selectedPlayer.total))}>
                    Random
                </button>
                <button 
                    className="button" 
                    onClick={() => changeAllSkills(initSkills(selectedPlayer.profession))}>
                    Reset
                </button>
            </div> 
        </div>
    </>
    );
}

export default SkillContent;