import type { Skill, SkillsContentProps } from "../types";
import ProfessionsData from "../data/proffessions-data";
import SkillData from "../data/skill-data";
import SkillRowList from "./skill-row-list";
import { initSkills, randomizeSkills } from "../utils/skills";



function SkillContent({selectedPlayer, changeAllSkills }: SkillsContentProps) {

    const changeSkillHandler = (skill: Skill, value: number): void => {
        let min = SkillData.MIN_POINTS;
        let max = SkillData.MAX_POINTS;

        if (ProfessionsData[selectedPlayer.profession].bonusSkill === skill) {
            min += SkillData.BONUS_POINTS;
            max += SkillData.BONUS_POINTS;
        }

        value = Number.isNaN(value) ? min : Math.min(max, Math.max(min, value));
        
        changeAllSkills({
            ...selectedPlayer.skills,
            [skill]: value
        });   
    };
    
    const randomizeSkillsHandler = (): void => {
        changeAllSkills(randomizeSkills(ProfessionsData[selectedPlayer.profession].bonusSkill, selectedPlayer.total));
    };

    const resetSkillsHandler = (): void => {
        changeAllSkills(initSkills(ProfessionsData[selectedPlayer.profession].bonusSkill));
    };

    return (
        <>
        <div className="skillContent">
            <h1>Player {selectedPlayer.name}</h1>
            <div>Total Points: {selectedPlayer.total}</div>
            <div>Free Points: {selectedPlayer.free}</div>
            {selectedPlayer.free > 0 ? (
                <div className="error">there are unused points</div>
            ) : selectedPlayer.free < 0 ? (
                <div className="error">too many points used</div>
            ) : (
                <br/>
            )}

            <SkillRowList
                skills={selectedPlayer.skills}
                changeSkill={changeSkillHandler}
                bestSkill={ProfessionsData[selectedPlayer.profession].bonusSkill}
            />
            <div className="buttonsRow">
                <button 
                    onClick={randomizeSkillsHandler}>
                    Random
                </button>
                <button 
                    onClick={resetSkillsHandler}>
                    Reset
                </button>
            </div> 
        </div>
    </>
    );
}

export default SkillContent;