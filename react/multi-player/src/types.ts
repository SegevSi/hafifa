import SKILLS from "./data/Skills";
import PROFESSIONS from "./data/Professions";

type Skill = typeof SKILLS[number];

type Profession = typeof PROFESSIONS[number];

type ProfessionData = {
    bonusSkill: Skill;
    img: string;
};

type SkillRowProps = {
    skill: Skill;
    name: string;
    currPoints: number;
    minPoints: number;
    maxPoints: number;
    changePoints: (value: number) => void;
};

type Skills = Record<Skill, number>;

type Player = {
    id: number;
    name: string;
    cls: Profession;
    total: number;
    skills: Skills;
    free: number;
};

type SkillsContentProps = {
    selectedPlayer: Player | null;
    changeAllSkills: (skills: Skills) => void
};

export type { ProfessionData, Profession, SkillRowProps, Player, SkillsContentProps, Skill, Skills };