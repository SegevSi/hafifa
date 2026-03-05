import type { Profession, ProfessionData } from "../types";

const ProfessionsData: Record<Profession, ProfessionData> = {
    warrior: {
        bonusSkill: "STR",
        img: "/public/images/warrior.jpg"
    },
    wizard: {
        bonusSkill: "WIS",
        img: "/public/images/wizard.jpeg"
    },
    archer: {
        bonusSkill: "DEX",
        img: "/public/images/archer.jpg"
    },
    assassin: {
        bonusSkill: "CHR",
        img: "/public/images/assasin.jpg"
    },
    paladin: {
        bonusSkill: "CON",
        img: "/public/images/paladin.png"
    },
    captain: {
        bonusSkill: "INT",
        img: "/public/images/captain.jpeg"
    }
} as const;

export default ProfessionsData;