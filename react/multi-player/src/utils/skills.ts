import type { Skills, Skill } from "../types";
import SKILLS from "../data/skills";
import SkillData from "../data/skillData";

function initSkills(bonusSkill: Skill | null = null): Skills {
  const skills = {} as Skills;
  SKILLS.forEach(skill => (skills[skill] = SkillData.MIN_POINTS));
  
  if (bonusSkill)
    skills[bonusSkill] += SkillData.BONUS_POINTS;
  
  return skills;
}

function sumSkillsPoints(skills: Skills): number {
    return Object.values(skills).reduce((a, b) => a + b, 0);
}

function randomizeSkills(bonusSkill: Skill, totalPoints: number): Skills {
  const skills: Skills = initSkills();

  let remaining = totalPoints - (sumSkillsPoints(skills) + SkillData.BONUS_POINTS);

  while (remaining > 0) {
    const randomSkill = SKILLS[Math.floor(Math.random() * SKILLS.length)];

    if (skills[randomSkill] < SkillData.MAX_POINTS) {
      skills[randomSkill]++;
      remaining--;
    }
  }

  skills[bonusSkill] += SkillData.BONUS_POINTS;

  return skills;
}


export { initSkills, randomizeSkills, sumSkillsPoints };