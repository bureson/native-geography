import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: 0,
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

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getRandomCountry = () => {
    return this.state.countryList[Math.floor(Math.random() * this.state.countryList.length)];
  }

  getRandomOptions = (count) => {
    let options = [];
    while (options.length < count) {
      const randomCountry = this.getRandomCountry();
      if (randomCountry.capital) {
        options.push({
          title: randomCountry.capital,
          correct: false
        })
      } else continue;
    }
    return options;
  }

  onPressButton = (e, item) => {
    if (item.item.correct) {
      this.setState({
        correct: this.state.correct + 1
      });
    }
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity onPress={e => this.onPressButton(e, item)}>
        <View style={styles.option}>
          <Text>{item.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }



  render = () => {
    if (this.state.isLoading) {
      return <Text>Loading</Text>
    }
    const country = this.getRandomCountry();
    const options = [{
      title: country.capital,
      correct: true
    }].concat(this.getRandomOptions(3));
    return (
      <View style={styles.container}>
        <Text>What is the capital city of</Text>
        <Text style={styles.titleText}>{country.name}</Text>
        <FlatList
          data={this.shuffleArray(options)}
          renderItem={item => this.renderItem(item)}
          keyExtractor={(item, index) => String(index)}
        />
        <Text>Correct answers: {this.state.correct}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  option: {
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
