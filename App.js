import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: 0,
      countryList: [],
      isLoading: true,
      previous: null
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
    this.setState({
      correct: item.item.correct ? this.state.correct + 1 : 0,
      previous: item.item.title
    });
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity onPress={e => this.onPressButton(e, item)} style={styles.list}>
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
        <Text style={styles.text}>What is the capital city of</Text>
        <Text style={styles.titleText}>{country.name}</Text>
        <FlatList
          style={styles.list}
          data={this.shuffleArray(options)}
          renderItem={item => this.renderItem(item)}
          keyExtractor={(item, index) => String(index)}
        />
        {this.state.previous && <Text>Your answer was {this.state.previous}</Text>}
        <Text>Answer strike {this.state.correct}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20%',
    backgroundColor: '#ecf0f1',
  },
  text: {
    paddingBottom: '10%'
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: '10%'
  },
  list: {
    width: '100%',
    flex: 0.8
  },
  option: {
    width: '80%',
    paddingBottom: '4%',
    marginTop: '1%',
    marginLeft: '10%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
