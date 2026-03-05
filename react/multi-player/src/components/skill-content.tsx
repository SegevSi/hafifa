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
        changeAllSkills({...selectedPlayer.skills, [currSkill]: value});
    };

    return (
        <>
        <div className="content">
            {selectedPlayer.free !== 0 && (<h1 className="error">there are unused skills points</h1>)}
            <div>Total Points: {selectedPlayer.total}</div>
            <div>Free Points: {selectedPlayer.free}</div>
            <hr />

            {SKILLS.map(skill => {
                let name: string = skill;
                let minPoints: number = SkillData.MIN_POINTS;
                let maxPoints: number = SkillData.MAX_POINTS;

                if (ProfessionData[selectedPlayer.cls].bonusSkill === skill) {
                    name = `${skill} ${BEST_SKILL_SIGN}`;
                    minPoints += SkillData.BONUS_POINTS;
                    maxPoints += SkillData.BONUS_POINTS;
                }

                return (
                    <SkillRow
                        key={skill}
                        name={name}
                        skill={skill}
                        currPoints={selectedPlayer.skills[skill]}
                        minPoints={minPoints}
                        maxPoints={maxPoints}
                        changePoints={(value: number) => changeSkill(skill, value)}
                    />
                );
            })}
            <div className="buttonsRow">
                <button className="button" onClick={() => changeAllSkills(randomizeSkills(selectedPlayer.cls, selectedPlayer.total))}>
                    Random
                </button>
                <button className="button" onClick={() => changeAllSkills(initSkills(selectedPlayer.cls))}>
                    Reset
                </button>
            </div> 
        </div>
    </>
    );
};

export default SkillContent;