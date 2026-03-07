import type { Player, Skills, PlayerFormData } from "../types";
import { initSkills, sumSkillsPoints } from "./skills";
import PlayerData from "../data/player-data";
import SkillData from "../data/skill-data";


let count = 0;

function getId(): number  {
  count++;

  return count;
}

function calcPlayerTotalPoints() {
  return Math.floor(Math.random() * (PlayerData.MAX_POINTS - PlayerData.MIN_POINTS)) 
        + PlayerData.MIN_POINTS + SkillData.BONUS_POINTS;
}

function createPlayer({name, profession}: PlayerFormData): Player {
  const total = calcPlayerTotalPoints();
  const skills = initSkills(profession);
  const used = sumSkillsPoints(skills);
  
  return {
    id: getId(),
    name,
    profession,
    total: total,
    skills,
    free: total - used,
  };
}

function getChangedSkillsPlayer(player: Player, skills: Skills): Player {
    const used = sumSkillsPoints(skills);

    return {
        ...player,
        skills,
        free: player.total - used
    };
}

export { getChangedSkillsPlayer, createPlayer };
