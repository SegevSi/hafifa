import type { Skill, SkillsContentProps } from "../types";
import SKILLS from "../data/Skills";
import ProfessionData from "../data/ProffessionsData";
import SkillData from "../data/SkillData";
import "../index.css";
import SkillRow from "./skill-row";
import { initSkills, randomizeSkills } from "../utils/skills";


function SkillContent({selectedPlayer, changeAllSkills }: SkillsContentProps) {
    const BEST_SKILL_SIGN = "*";

    const changeSkill = (currSkill: Skill, value: number): void => {
        let min = SkillData.MIN_POINTS;
        let max = SkillData.MAX_POINTS;

        if (ProfessionData[selectedPlayer.profession].bonusSkill === currSkill) {
            min += SkillData.BONUS_POINTS;
            max += SkillData.BONUS_POINTS;
        }

        if (value >= min && value <= max) {
            changeAllSkills({
                ...selectedPlayer.skills,
                [currSkill]: value
            });
        }
    };

    return (
        <>
        <div className="content">
            {selectedPlayer.free !== 0 && (<h1 className="error">there are unused skills points</h1>)}
            <div>Total Points: {selectedPlayer.total}</div>
            <div>Free Points: {selectedPlayer.free}</div>
            <hr />

            {SKILLS.map(skill => {
                const name = ProfessionData[selectedPlayer.profession].bonusSkill === skill? `${skill} ${BEST_SKILL_SIGN}` : skill;

                return (
                    <SkillRow
                        key={skill}
                        name={name}
                        skill={skill}
                        currPoints={selectedPlayer.skills[skill]}
                        changePoints={(value: number) => changeSkill(skill, value)}
                    />
                );
            })}
            <div className="buttonsRow">
                <button className="button" onClick={() => changeAllSkills(randomizeSkills(selectedPlayer.profession, selectedPlayer.total))}>
                    Random
                </button>
                <button className="button" onClick={() => changeAllSkills(initSkills(selectedPlayer.profession))}>
                    Reset
                </button>
            </div> 
        </div>
    </>
    );
};

export default SkillContent;