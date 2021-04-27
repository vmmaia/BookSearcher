import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import { search, resetSearch } from '../../../redux/actions/searchActions';

import './bar.css';

const Bar = (props) => {
  const handleSearch = (query) => {
    if (query !== '') {
      props.search(query);
    } else {
      props.resetSearch();
    }
  };

  return (
    <div className="searchBar-wrapper">
      <Input.Search
        className="searchbar-box"
        placeholder="Search by title, author, or ISBN"
        allowClear
        size="large"
        onSearch={handleSearch}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { searchProps: state.search };
};

export default connect(mapStateToProps, {
  search,
  resetSearch
})(Bar);
