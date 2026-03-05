import type { PlayerBoxListProps } from "../types";
import ProfessionsData from "../data/ProffessionsData";
import "../index.css";


export default function PlayerBoxList({ selectedPlayerId, players, selectPlayer }: PlayerBoxListProps) {

    return (
    <>
        {players.map(p => (
          <div
            key={p.id}
            className={`playerBox ${selectedPlayerId === p.id ? "selected" : ""}`}
            onClick={() => selectPlayer(p.id)}
          >
            <img
              className="icon"
              src={ ProfessionsData[p.profession].img }
              alt="image unavalible"
            />
            <div>
              <div>{p.name}</div>
              <div className="profession">{p.profession}</div>
            </div>
          </div>
        ))}
    </>
    );
}

