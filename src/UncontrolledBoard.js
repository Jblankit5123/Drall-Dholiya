import React, { useState, useEffect } from "react";
import Board from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialBoardKey = "taskBoard";
const initialBoard = JSON.parse(localStorage.getItem(initialBoardKey)) || {
    columns: [
        {
            id: 1,
            title: "To do",
            backgroundColor: "#fff",
            cards: [
                {
                    id: 1,
                    title: "Card title 1",
                    description: "users to create, update, and delete",
                    date: "25/11/2023",
                    assignee: 'kamal',
                },
                {
                    id: 2,
                    title: "Card title 2",
                    description: "users to create, update, and delete",
                    date: "25/11/2023",
                    assignee: 'Swapnil'
                }
            ],
        },
        {
            id: 2,
            title: "In progress",
            cards: [
                {
                    id: 9,
                    title: "Card title 9",
                    description: "users to create, update, and delete",
                    date: "25/11/2023",
                    assignee: 'Ankit',
                },
            ],
        },
        {
            id: 3,
            title: "Done",
            cards: [
                {
                    id: 10,
                    title: "Card title 6",
                    description: "users to create, update, and delete",
                    date: "25/11/2023",
                    assignee: 'Anupam'
                },
                {
                    id: 3,
                    title: "Card title 3",
                    description: "users to create, update, and delete",
                    date: "25/11/2023",
                    assignee: 'Dev',
                },
            ],
        },
    ],
};

function UncontrolledBoard() {
    const [board, setBoard] = useState(initialBoard);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedCard, setEditedCard] = useState(null);

    useEffect(() => {
        localStorage.setItem(initialBoardKey, JSON.stringify(board));
    }, [board]);

    const handleEditClick = (cardId) => {
        const cardToUpdate = board.columns.flatMap((col) => col.cards).find((card) => card.id === cardId);
        if (cardToUpdate) {
            setEditedCard({ ...cardToUpdate });
            setEditModalVisible(true);
        }
    };

    const handleModalClose = () => {
        setEditModalVisible(false);
        setEditedCard(null);
    };

    const handleFieldChange = (field, value) => {
        setEditedCard((prevCard) => ({ ...prevCard, [field]: value }));
    };

    const handleSaveChanges = () => {
        const updatedBoard = { ...board };
        const columnIndex = updatedBoard.columns.findIndex((col) =>
            col.cards.some((card) => card.id === editedCard.id)
        );
        const cardIndex = updatedBoard.columns[columnIndex].cards.findIndex((card) => card.id === editedCard.id);

        updatedBoard.columns[columnIndex].cards[cardIndex] = editedCard;
        setBoard(updatedBoard);
        toast("Updated")
        handleModalClose();
    };

    return (
        <>
            <Board
                allowRemoveLane
                allowRenameColumn
                allowRemoveCard
                onLaneRemove={console.log}
                onCardRemove={console.log}
                onLaneRename={console.log}
                initialBoard={board}
                allowAddCard={{ on: "top" }}
                onNewCardConfirm={(draftCard) => ({
                    id: new Date().getTime(),
                    ...draftCard,
                })}
                onCardNew={console.log}
                renderCard={(card, { removeCard, dragging }) => (
                    <div style={{ backgroundColor: "#fff", padding: "10px", margin: '5px' }}>
                        <p style={{ textAlign: 'right' }}><span><button onClick={() => handleEditClick(card.id)}>Edit</button></span>
                            <span> <button onClick={() => removeCard(card.id)}>x</button></span></p>
                        <p>
                            <b>Title: </b>{card.title}

                        </p>
                        <p><b>Description: </b>{card.description}</p>
                        <p><b>Date: </b>{card.date}</p>
                        <p><b>Assignee: </b>{card.assignee}</p>
                    </div>
                )}
            />
            <ToastContainer />
            {editModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleModalClose}>&times;</span>
                        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Edit Card</p>
                        <label>Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            value={editedCard.title}
                            onChange={(e) => handleFieldChange('title', e.target.value)}
                        />
                        <label>Description</label>
                        <textarea
                            placeholder="Description"
                            value={editedCard.description}
                            onChange={(e) => handleFieldChange('description', e.target.value)}
                        />
                        <label>Date</label>
                        <input
                            type="text"
                            placeholder="Date"
                            value={editedCard.date}
                            onChange={(e) => handleFieldChange('date', e.target.value)}
                        />
                        <label>Assignee</label>
                        <input
                            type="text"
                            placeholder="Assignee"
                            value={editedCard.assignee}
                            onChange={(e) => handleFieldChange('assignee', e.target.value)}
                        />
                        <button onClick={handleSaveChanges}>Save Changes</button>
                    </div>
                </div>
            )}
        </>

    );
}

export default UncontrolledBoard;
