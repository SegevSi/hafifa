import type { Player, Skills, PlayerForm } from "../types";
import { initSkills } from "./skills";
import PlayerData from "../data/playerData";
import SkillData from "../data/SkillData";


let count = 0;

function getId(): number  {
  count++;

  return count;
};

function calcPlayerTotalPoints() {
  return Math.floor(Math.random() * (PlayerData.MAX_POINTS - PlayerData.MIN_POINTS)) 
        + PlayerData.MIN_POINTS + SkillData.BONUS_POINTS;
}

// TODO: rename cls to profession
function createPlayer({name, profession}: PlayerForm) {
  const total = calcPlayerTotalPoints();
  const skills = initSkills(profession);
  const used = Object.values(skills).reduce((a, b) => a + b, 0);

  return {
    id: getId(),
    name,
    cls: profession,
    total: total,
    skills,
    free: total - used,
  };
}

function changePlayerSkills(player: Player, skills: Skills): Player {
    const used = Object.values(skills).reduce((a, b) => a + b, 0);

    return {
        ...player,
        skills,
        free: player.total - used
    };
};

export { changePlayerSkills, createPlayer };
