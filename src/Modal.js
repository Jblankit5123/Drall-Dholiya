// Modal component
import React, { useContext } from "react";
import { ModalContext } from "./UncontrolledBoard";

const Modal = ({ visible }) => {
    const { editedCard, handleFieldChange, handleSaveChanges, handleModalClose } = useContext(ModalContext);

    if (!visible) {
        return null;
    }

    return (
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
    );
};

export default Modal;
