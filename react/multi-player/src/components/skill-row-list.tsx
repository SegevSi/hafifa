import SKILLS from "../data/Skills";
import type { SkillRowListProps } from "../types";
import SkillRow from "./skill-row";


export default function SkillRowList({ skills, changeSkill, bestSkill  }: SkillRowListProps) {
    const BEST_SKILL_SIGN = "*";

    return (
    <>
    {SKILLS.map((skill) => ( 
        <SkillRow
            key={skill}
            name={bestSkill === skill? `${skill} ${BEST_SKILL_SIGN}` : skill}
            skill={skill}
            currPoints={skills[skill]}
            changePoints={(value: number) => changeSkill(skill, value)}
        />          
    ))}
    </>
    );
}

