import React, { useState, useEffect } from 'react';
import { fetchCitySuggestions } from '../services/weatherService';

function CityInput({ onSearch }) {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
    if (input.length > 2) {
        const timer = setTimeout(async () => {
        try {
            const data = await fetchCitySuggestions(input);
            setSuggestions(data);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
        }, 300);
        
        return () => clearTimeout(timer);
    } else {
        setSuggestions([]);
        setShowSuggestions(false);
    }
    }, [input]);

    const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
        onSearch(input);
    }
    };

    return (
    <form onSubmit={handleSubmit} className="city-form">
        <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите город"
        className="city-input"
        />
        <button type="submit" className="search-button">
            Поиск
        </button>


        {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
            {suggestions.map((item, index) => (
            <li 
                key={index} 
                onClick={() => handleSuggestionClick(item)}
                className="suggestion-item"
            >
                {item}
            </li>
            ))}
        </ul>
        )}
    </form>
    );
}

export default CityInput;