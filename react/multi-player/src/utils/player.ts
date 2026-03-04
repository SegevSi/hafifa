import type { Player, Skills } from "../types";


function changePlayerSkills(player: Player, skills: Skills): Player {
    const used = Object.values(skills).reduce((a, b) => a + b, 0);

    return {
        ...player,
        skills,
        free: player.total - used
    };
};

export { changePlayerSkills };
