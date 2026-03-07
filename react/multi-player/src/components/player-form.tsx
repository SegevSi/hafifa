import type { PlayerFormProps, Profession } from "../types";
import PROFESSIONS from "../data/Professions";
import { useState } from "react";
import "../index.css";


export default function PlayerForm({ addPlayer, disableButton }: PlayerFormProps) {
    const DEFAULT_NAME = "";
    const DEFAULT_PROFESSION = PROFESSIONS[0];
    
    const [name, setName] = useState<string>(DEFAULT_NAME);
    const [profession, setProfession] = useState<Profession>(DEFAULT_PROFESSION);

    const resetForm = () => {
        setName(DEFAULT_NAME);
        setProfession(DEFAULT_PROFESSION)
    };

    const addPlayerHandler = () => {
        addPlayer({name, profession});
        resetForm();
    }

    return (
    <>
    <form className="playerForm">
        <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <select
            value={profession}
            onChange={e => setProfession(e.target.value as Profession)}
            className="input"
        >
            {PROFESSIONS.map(c => (
            <option key={c}>{c}</option>
            ))}
        </select>
        <button className="button" type="submit" onClick={addPlayerHandler} disabled={disableButton}>
            Save
        </button>
        </form> 
    </>
    );
};

