import type { Skills, Profession } from "../types";
import SKILLS from "../data/Skills";
import ProfessionsData from "../data/ProffessionsData";
import SkillData from "../data/SkillData";

function initSkills(proffession: Profession): Skills {
  const skills = {} as Skills;
  SKILLS.forEach(skill => (skills[skill] = SkillData.MIN_POINTS));
  skills[ProfessionsData[proffession].bonusSkill] += SkillData.BONUS_POINTS;
  
  return skills;
}

function randomizeSkills(profession: Profession, totalPoints: number): Skills {
  const skills: Skills = initSkills(profession);

  const used = Object.values(skills).reduce((a, b) => a + b, 0);
  let remaining = totalPoints - used;

  while (remaining > 0) {
    const randomSkill = SKILLS[Math.floor(Math.random() * SKILLS.length)];

    const maxPoints = randomSkill === ProfessionsData[profession].bonusSkill ? SkillData.MAX_POINTS + SkillData.BONUS_POINTS : SkillData.MAX_POINTS;

    if (skills[randomSkill] < maxPoints) {
      skills[randomSkill]++;
      remaining--;
    }
  }

  return skills;
}

function sumSkillsPoints(skills: Skills): number {
    return Object.values(skills).reduce((a, b) => a + b, 0);
}

export { initSkills, randomizeSkills, sumSkillsPoints };