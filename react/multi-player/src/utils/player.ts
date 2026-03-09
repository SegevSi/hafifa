import type { Player, Skills, PlayerFormData } from "../types";
import { initSkills, sumSkillsPoints } from "./skills";
import PlayerData from "../data/playerData";
import SkillData from "../data/skillData";
import ProfessionsData from "../data/proffessionsData";


function calcPlayerTotalPoints() {
  return Math.floor(Math.random() * (PlayerData.MAX_POINTS - PlayerData.MIN_POINTS)) 
        + PlayerData.MIN_POINTS + SkillData.BONUS_POINTS;
}

function createPlayer({name, profession}: PlayerFormData): Player {
  const total = calcPlayerTotalPoints();
  const skills = initSkills(ProfessionsData[profession].bonusSkill);
  
  return {
    id: crypto.randomUUID(),
    name,
    profession,
    total: total,
    skills,
    free: total - sumSkillsPoints(skills)
  };
}

function getChangedSkillsPlayer(player: Player, skills: Skills): Player {

    return {
        ...player,
        skills,
        free: player.total - sumSkillsPoints(skills)
    };
}

export { getChangedSkillsPlayer, createPlayer };
