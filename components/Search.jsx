import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]); // This fixes setSuggestions warning
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // 1. Using useEffect to fetch suggestions from backend
  useEffect(() => {
    if (keyword.trim().length > 1) {
      const delayDebounceFn = setTimeout(() => {
        // Replace with your actual API URL
        fetch(`${process.env.REACT_APP_API_URL}/courses?keyword=${keyword}`)
          .then(res => res.json())
          .then(data => {
            const results = data.courses || data || [];
            setSuggestions(results.slice(0, 5)); // Using setSuggestions here
            setShowSuggestions(true);
          })
          .catch(err => console.error("Search Error:", err));
      }, 400);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [keyword]); // This fixes useEffect unused warning

  // 2. Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <form onSubmit={searchHandler} className="search-form">
        <i className="fa fa-search search-icon-inside"></i>
        <input
          type="text"
          className="search-input-field"
          placeholder="Search courses..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoComplete="off"
        />
      </form>

      {/* 3. Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((course) => (
            <li key={course._id} onClick={() => {
              setKeyword(course.title);
              navigate(`/?keyword=${course.title}`);
              setShowSuggestions(false);
            }}>
              {course.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}