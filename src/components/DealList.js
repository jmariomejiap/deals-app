import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';
import DealItem from './DealItem';

class DealList extends React.Component {
  static propTypes = {
    deals: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };


  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({item}) => <DealItem deal={item} onPress={this.props.onItemPress}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  }
});

export default DealList;
