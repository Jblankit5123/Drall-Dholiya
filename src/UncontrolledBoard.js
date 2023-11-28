import React, { useState, useEffect } from "react";
import Board from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchInput from "./SearchInput";
import { getInitialBoard, initialBoardKey } from "./initialBoardData";
import Modal from "./Modal";

const initialBoard = getInitialBoard();

function UncontrolledBoard() {
    const [board, setBoard] = useState(initialBoard);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedCard, setEditedCard] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

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

    const handleCardRemove = () => {
        toast.success(`Task removed successfully`);
    }

    const onCardNew = () => {
        toast.success(`Task added successfully`);
    }

    return (
        <>
            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Board
                allowRemoveLane
                allowRenameColumn
                allowRemoveCard
                onLaneRemove={console.log}
                onCardRemove={handleCardRemove}
                onLaneRename={console.log}
                initialBoard={board}
                allowAddCard={{ on: "top" }}
                onNewCardConfirm={(draftCard) => ({
                    id: new Date().getTime(),
                    ...draftCard,
                })}
                onCardNew={onCardNew}
                renderCard={(card, { removeCard, dragging }) => {
                    const matchesSearch = card.assignee.toLowerCase().includes(searchQuery.toLowerCase())
                        || card.title.toLowerCase().includes(searchQuery.toLowerCase()) || card.description.toLowerCase().includes(searchQuery.toLowerCase());

                    if (!matchesSearch) {
                        return null;
                    }

                    return (
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
                    );
                }}
            />
            <ToastContainer />
            {editModalVisible && (
                <Modal
                    visible={editModalVisible}
                    onClose={handleModalClose}
                    editedCard={editedCard}
                    onFieldChange={handleFieldChange}
                    onSaveChanges={handleSaveChanges}
                />
            )}
        </>

    );
}

export default UncontrolledBoard;
