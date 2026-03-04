import { useState } from "react";
import type { Player, Skills } from "../types";
import SkillContent from "./skill-content";
import { changePlayerSkills } from "../utils/player";


export default function Multiplayer() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

    const selectedPlayer = players.find(p => p.id === selectedPlayerId);

    const updatePlayer = (updatedPlayer: Player): void => {
        setPlayers(players.map(p => {
            if (p.id !== updatedPlayer.id) 
                return p;

            return updatedPlayer;
        }));
    }; 

    const isValid = (): boolean => {
        if (selectedPlayer !== undefined) 
            return selectedPlayer.free === 0;

        return true;
    };

    const selectPlayer = (id: number): void => {
        if (isValid()) 
            setSelectedPlayerId(id)
    };

    return (
    <>
        <div className="container">
            {selectedPlayer ? (
                <SkillContent 
                    selectedPlayer={selectedPlayer} 
                    changeAllSkills={(skills: Skills): void => updatePlayer(changePlayerSkills(selectedPlayer, skills))}
                />) : (
            <div className="content">Select a player</div>
            )}
        </div>
    </>
  )
};