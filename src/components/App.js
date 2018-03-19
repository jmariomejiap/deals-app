import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ajax from '../ajax';


export default class App extends React.Component {
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    console.log('componentDidMount deals =  ', deals);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header} >Hello</Text>
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
