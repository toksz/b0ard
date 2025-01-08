import React from 'react';
import './FilterBar.css';

function FilterBar({ onFilterChange, onSortChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-controls">
        <label>Filter by:</label>
        <select onChange={(e) => onFilterChange(e.target.value)}>
          <option value="all">All</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
      </div>
      <div className="sort-controls">
        <label>Sort by Title:</label>
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
