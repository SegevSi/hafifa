import type { PlayerBoxListProp } from "../types";
import ProfessionsData from "../data/ProffessionsData";
import "../index.css";


export default function PlayerBoxList({ selectedPlayerId, players, selectPlayer }: PlayerBoxListProp) {

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
              src={ ProfessionsData[p.cls].img }
              alt="image unavalible"
            />
            <div>
              <div>{p.name}</div>
              <div className="profession">{p.cls}</div>
            </div>
          </div>
        ))}
    </>
    );
}

