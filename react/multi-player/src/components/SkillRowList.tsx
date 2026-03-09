import SKILLS from "../data/skills";
import type { SkillRowListProps } from "../types";
import SkillRow from "./SkillRow";


export default function SkillRowList({ skills, changeSkill, bestSkill, processSkill  }: SkillRowListProps) {
    const BEST_SKILL_SIGN = "*";

    return (
    <div className="skillRowList">
    {SKILLS.map((skill) => ( 
        <SkillRow
            key={skill}
            name={bestSkill === skill? `${skill} ${BEST_SKILL_SIGN}` : skill}
            skill={skill}
            currPoints={skills[skill]}
            changePoints={(value: number) => changeSkill(skill, value)}
            processPoints={(value: number) => processSkill(skill, value)}
        />          
    ))}
    </div>
    );
}

