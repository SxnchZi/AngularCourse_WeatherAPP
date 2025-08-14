import React from 'react';

function SavedLocations({ locations, onSelect }) {
    const handleRemove = (locationToRemove, e) => {
    e.stopPropagation();
    const updatedLocations = locations.filter(loc => loc !== locationToRemove);
    localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
    if (typeof onSelect === 'function') {
        // onSelect(updatedLocations[0] || '');
    }
    };

    return (
    <div className="saved-locations">
        <h3>Сохраненные местоположения</h3>
        {locations.length === 0 ? (
        <p>Нет сохраненных мест</p>
        ) : (
        <ul>
            {locations.map((location, index) => (
            <li 
                key={index} 
                onClick={() => onSelect(location)}
                className="saved-location"
            >
                {location}
                <button 
                onClick={(e) => handleRemove(location, e)}
                className="remove-button"
                >
                ×
                </button>
            </li>
            ))}
        </ul>
        )}
    </div>
    );
}

export default SavedLocations;