import SKILLS from "./data/skills";
import PROFESSIONS from "./data/professions";

type Skill = typeof SKILLS[number];

type Profession = typeof PROFESSIONS[number];

type ProfessionData = {
    bonusSkill: Skill;
    img: string;
};

type Skills = Record<Skill, number>;

type SkillRowProps = {
    skill: Skill;
    name: string;
    currPoints: number;
    changePoints: (value: number) => void;
    processPoints: (value: number) => number;
};

type SkillRowListProps = {
    skills: Skills;
    changeSkill: (skill: Skill, value: number) => void;
    processSkill: (skill: Skill, value: number) => number;
    bestSkill: Skill;
};


type Player = {
    id: string;
    name: string;
    profession: Profession;
    total: number;
    skills: Skills;
    free: number;
};

type SkillsContentProps = {
    selectedPlayer: Player;
    changeAllSkills: (skills: Skills) => void
};

type PlayerBoxProps = {
    player: Player;
    isSelected: boolean;
    selectPlayer: () => void;
};

type PlayerBoxListProps = {
    selectedPlayerId: string | null;
    players: Player[];
    selectPlayer: (id: string) => void;
};

type PlayerFormData = {
    profession: Profession;
    name: string;
};

type PlayerFormProps = {
    savePlayer: (playerForm: PlayerFormData) => void;
    disableButton: boolean;
};

type playersSideBarProps = PlayerFormProps & PlayerBoxListProps;

export type { 
    ProfessionData, 
    Profession, 
    SkillRowProps, 
    SkillRowListProps,
    Player, 
    SkillsContentProps, 
    Skill, 
    Skills, 
    PlayerBoxProps,
    PlayerBoxListProps,
    PlayerFormData,
    PlayerFormProps,
    playersSideBarProps
};