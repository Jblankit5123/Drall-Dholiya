import React from "react";

const SearchInput = ({ searchQuery, setSearchQuery }) => {
    return (
        <>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search tasks"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

        </>
    );
};

export default SearchInput;
