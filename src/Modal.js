import React from "react";

const Modal = ({ visible, onClose, editedCard, onFieldChange, onSaveChanges }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Edit Card</p>
                <label>Title</label>
                <input
                    type="text"
                    placeholder="Title"
                    value={editedCard.title}
                    onChange={(e) => onFieldChange('title', e.target.value)}
                />
                <label>Description</label>
                <textarea
                    placeholder="Description"
                    value={editedCard.description}
                    onChange={(e) => onFieldChange('description', e.target.value)}
                />
                <label>Date</label>
                <input
                    type="text"
                    placeholder="Date"
                    value={editedCard.date}
                    onChange={(e) => onFieldChange('date', e.target.value)}
                />
                <label>Assignee</label>
                <input
                    type="text"
                    placeholder="Assignee"
                    value={editedCard.assignee}
                    onChange={(e) => onFieldChange('assignee', e.target.value)}
                />
                <button onClick={onSaveChanges}>Save Changes</button>
            </div>
        </div>
    );
};

export default Modal;
