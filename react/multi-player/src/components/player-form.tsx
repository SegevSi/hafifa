import type { PlayerFormProps, Profession } from "../types";
import PROFESSIONS from "../data/Professions";
import { useState } from "react";
import "../index.css";


export default function PlayerForm({ savePlayer, disableButton }: PlayerFormProps) {
    const DEFAULT_NAME = undefined;
    const DEFAULT_PROFESSION = PROFESSIONS[0];
    
    const [name, setName] = useState<string | undefined>(DEFAULT_NAME);
    const [profession, setProfession] = useState<Profession>(DEFAULT_PROFESSION);

    const resetForm = () => {
        setName(DEFAULT_NAME);
        setProfession(DEFAULT_PROFESSION)
    };

    const addPlayerHandler = () => {
        if (name) {
            savePlayer({name, profession});
            resetForm();
        }
    };

    return (
    <>
    <div className="playerForm">
        <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <select
            value={profession}
            onChange={e => setProfession(e.target.value as Profession)}
        >
            {PROFESSIONS.map(c => (
                <option key={c}>{c}</option>
            ))}
        </select>
        <button 
            className="button" 
            onClick={addPlayerHandler} 
            disabled={disableButton}>
            Save
        </button>
    </div> 
    </>
    );
};

