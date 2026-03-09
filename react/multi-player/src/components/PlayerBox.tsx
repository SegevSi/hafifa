import type { PlayerBoxProps } from "../types";
import ProfessionsData from "../data/proffessions-data";


export default function PlayerBox({ isSelected, player, selectPlayer }: PlayerBoxProps) {

    return (
        <div
            className={`playerBox ${isSelected ? "selected" : ""}`}
            onClick={selectPlayer}
        >
            <img
                className="icon"
                src={ ProfessionsData[player.profession].img }
                alt="image unavalible"
            />
            <div>
                <div>{player.name}</div>
                <div className="profession">{player.profession}</div>
            </div>
        </div>
    );
}

