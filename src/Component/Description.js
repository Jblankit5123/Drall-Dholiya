import React, { useContext } from "react";
import { TaskDescriptionContext } from "../Component/UncontrolledBoard";

const TaskDescription = () => {
    const { card, handleEditClick, removeCard } = useContext(TaskDescriptionContext);

    return (
        <>
            <div style={{ backgroundColor: "#fff", padding: "10px", margin: '5px', width: '350px' }}>
                <p style={{ textAlign: 'right' }}>
                    <span><button onClick={() => handleEditClick(card.id)}>Update</button></span>
                    <span> <button onClick={() => removeCard(card.id)}>x</button></span></p>
                <p>
                    <b>Title: </b>{card.title}
                </p>
                <p><b>Description: </b>{card.description}</p>
                <p><b>Date: </b>{card.date}</p>
                <p><b>Assignee: </b>{card.assignee}</p>
            </div>
        </>
    );
};

export default TaskDescription;
