import type { PlayerBoxListProps } from "../types";
import PlayerBox from "./player-box";


export default function PlayerBoxList({ selectedPlayerId, players, selectPlayer }: PlayerBoxListProps) {

    return (
    <>
        {players.map(player => (
            <PlayerBox 
                key={player.id}
                player={player}
                isSelected={player.id == selectedPlayerId}  
                selectPlayer={() => selectPlayer(player.id)}  
            />
        ))}
    </>
    );
}

