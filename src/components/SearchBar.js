import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
// import ajax from '../ajax';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
  static propTypes = {
    searchDeals: PropTypes.func.isRequired,
  }
  state = {
    searchValue: '',
  }

  debounceSearchDeals = debounce(this.props.searchDeals, 3000);
  
  handleChange = (searchValue) => {
    this.setState({ searchValue }, () => {
      this.debounceSearchDeals(this.state.searchValue);
    });
  }


  render () {
    return (
      <TextInput
        style={styles.input}
        placeholder='Search ...'
        onChangeText={this.handleChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
  }
});

export default SearchBar;
