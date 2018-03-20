import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';

export default class App extends React.Component {
  state= {
    deals: [],
  }
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals });
    console.log('componentDidMount');
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.deals.length > 0 ?
          <DealList deals={this.state.deals}/> :
          <Text style={styles.header} >Hello</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  }
});
