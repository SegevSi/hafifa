import type { playersSideBarProps, PlayerFormData } from "../types";
import { useState } from "react";
import PlayerBoxList from "./player-box-list";
import PlayerForm from "./player-form";
import "../index.css";


export default function PlayersSideBar(props: playersSideBarProps) { 
    const [showForm, setShowForm] = useState<boolean>(false);

    const selectPlayerHandler = (id: number): void => {
        if (!props.disableButton)
            props.selectPlayer(id);
    };

    const addPlayerHandler = (playerForm: PlayerFormData): void => {
        props.addPlayer(playerForm);
        setShowForm(false);
    };

    return (
    <>
    <div className="sidebar">
        <PlayerBoxList 
            selectedPlayerId={props.selectedPlayerId}
            selectPlayer={selectPlayerHandler}
            players={props.players}
        />
        {!showForm ? (
          <button
            className="button"
            onClick={() => setShowForm(true)}
            disabled={props.disableButton}
          >
            + Add player
          </button>
        ) : (
            <PlayerForm 
                disableButton={props.disableButton}
                addPlayer={addPlayerHandler}
            />
        )}
    </div>
    </>
    );
};

