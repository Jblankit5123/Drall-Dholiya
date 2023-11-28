import React, { useState, useEffect, createContext } from "react";
import Board from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchInput from "./SearchInput";
import { getInitialBoard, initialBoardKey } from "./initialBoardData";
import Modal from "./Modal";
import TaskDescription from "./Description";

const initialBoard = getInitialBoard();
export const ModalContext = createContext();
export const TaskDescriptionContext = createContext();

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
            <ModalContext.Provider value={{ editedCard, handleFieldChange, handleSaveChanges, handleModalClose }}>

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
                    renderCard={(card, { removeCard }) => {
                        const assignee = card.assignee || "";
                        const description = card.description || "";
                        const title = card.title || "";
                        const matchesSearch = assignee.toLowerCase().includes(searchQuery.toLowerCase())
                            || title.toLowerCase().includes(searchQuery.toLowerCase()) || description.toLowerCase().includes(searchQuery.toLowerCase());

                        if (!matchesSearch) {
                            return null;
                        }

                        return (
                            <TaskDescriptionContext.Provider value={{ card, handleEditClick, removeCard }}>
                                <TaskDescription />
                            </TaskDescriptionContext.Provider>
                        );
                    }}
                />

                <ToastContainer />
                {editModalVisible && (
                    <Modal visible={editModalVisible} />
                )}

            </ModalContext.Provider>
        </>

    );
}

export default UncontrolledBoard;
