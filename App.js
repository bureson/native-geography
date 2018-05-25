import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryList: [],
      isLoading: true
    }
  }

  componentDidMount = () => {
    return fetch('https://restcountries.eu/rest/v2/all').then(response => response.json()).then(json => {
      this.setState({
        countryList: json,
        isLoading: false
      });
    });
  }

  _onPressButton = () => {
    Alert.alert('clicked');
  }

  render = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#000',
            }}/>
            <Text>Hello World</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={this.state.countryList}
          renderItem={item => <Text>{item.item.name}</Text>}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%'
  },
});
