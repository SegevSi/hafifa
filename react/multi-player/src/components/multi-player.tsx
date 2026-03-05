import { useState } from "react";
import type { Player, PlayerFormData, Skills } from "../types";
import SkillContent from "./skill-content";
import { changePlayerSkills } from "../utils/player";
import { createPlayer } from "../utils/player";
import PlayersSideBar from "./player-side-bar";


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

    const addPlayer = (data: PlayerFormData): void => {
        const p = createPlayer(data);
        setPlayers([...players, p]);
        setSelectedPlayerId(p.id);
    };

    const disableButton = selectedPlayer !== undefined ? selectedPlayer.free !== 0 : false;
    

    return (
    <>
        <div className="container">
            <PlayersSideBar 
                addPlayer={addPlayer}
                disableButton={disableButton}
                selectedPlayerId={selectedPlayerId}
                players={players}
                selectPlayer={(id: number): void => setSelectedPlayerId(id)}
            />
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