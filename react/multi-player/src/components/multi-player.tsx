import { useState } from "react";
import type { Player, PlayerFormData, Skills } from "../types";
import SkillContent from "./skill-content";
import { getChangedSkillsPlayer } from "../utils/player";
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

    const addPlayer = (player: Player): void => {
        setPlayers([...players, player]);
    };

    const savePlayerHandler = (data: PlayerFormData): void => {
        const newPlayer = createPlayer(data);
        addPlayer(newPlayer);
        setSelectedPlayerId(newPlayer.id);
    };

    const changeSelectedPlayerSkills = (skills: Skills): void => {
        if (selectedPlayer) {
            const updatedSelectedPlayer = getChangedSkillsPlayer(selectedPlayer, skills);
            updatePlayer(updatedSelectedPlayer);
        }
    };

    const disableButton = selectedPlayer !== undefined ? selectedPlayer.free !== 0 : false;
    

    return (
    <>
        <div className="container">
            <PlayersSideBar 
                savePlayer={savePlayerHandler}
                disableButton={disableButton}
                selectedPlayerId={selectedPlayerId}
                players={players}
                selectPlayer={(id: number): void => setSelectedPlayerId(id)}
            />
            {selectedPlayer ? (
                <SkillContent 
                    selectedPlayer={selectedPlayer} 
                    changeAllSkills={changeSelectedPlayerSkills}
                />) : (
            <div className="content">Select a player</div>
            )}
        </div>
    </>
  )
}