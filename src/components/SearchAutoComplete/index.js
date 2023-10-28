import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import useDebounce from '../../hooks/useDebounce';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  textField: {
    color: theme.palette.text.other,
  },
  searchForProducts: {
    padding: theme.spacing(1, 3),
    borderRadius: 10,
  },
  searchIcon: {
    color: theme.palette.primary.main,
  },
}));

function SearchAutoComplete({ onChange, setList, params, searchQuery, setSearchQuery, setHasMore, placeholder }) {
  const classes = useStyles();
  const [onLoad, setOnLoad] = useState(false);

  const debouncedSearchTerm = useDebounce(searchQuery);

  const onSearch = () => {
    setHasMore(false);
    setList([]);
    setSearchQuery(searchQuery);
    setHasMore(true);
  };

  useEffect(() => {
    if (onLoad) {
      onSearch(searchQuery ? searchQuery.trim() : '');
    } else setOnLoad(true);
  }, [debouncedSearchTerm]);

  return (
    <TextField
      className={classes.textField}
      placeholder={placeholder}
      InputProps={{ disableUnderline: true }}
      value={searchQuery}
      {...params}
      onChange={(event) => {
        const _searchInput = event && event.target && event.target.value ? event.target.value : '';
        setSearchQuery(_searchInput);
        onChange(event);
      }}
    />
  );
}

SearchAutoComplete.propTypes = {
  setList: PropTypes.func,
  onChange: PropTypes.func,
  params: PropTypes.object,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  setHasMore: PropTypes.func,
  placeholder: PropTypes.string,
};

SearchAutoComplete.defaultProps = {
  type: 'global',
  onChange: () => {},
};

export default SearchAutoComplete;
