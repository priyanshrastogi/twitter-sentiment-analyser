import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import Card from './components/Card';
import Footer from './components/Footer';
import { Pie } from 'react-chartjs-2';
import './App.css';
import Spinner from './spinner.svg';

class App extends Component {
  
  state = {
    data: [0, 0, 0],
    tweets: null,
    networking: false
  }

  componentDidMount() {
    this.analyseTweets(null, '#machinelearning');
  }

  analyseTweets = async (event, search) => {
    this.setState({networking: true});
    if(event)
      event.preventDefault();
    let res = await fetch(search.startsWith('#') ? `https://twitter-sentlyser.herokuapp.com/analyse?search=${search.substring(1)}&hashtag=true` : `https://twitter-sentlyser.herokuapp.com/analyse?search=${search}&hashtag=false`);
    res = await res.json();
    console.log(res);
    let pos = 0;
    let neg = 0;
    let nue = 0;
    for(let i=0; i<res.length; i++) {
      if(res[i].polarity>=0.25)
        pos++;
      else if(res[i].polarity<=-0.25)
        neg++;
      else
        nue++;
    }
    this.setState({data: [pos, neg, nue], networking: false, tweets: res});
  }

  renderTweets = () => {
    if(this.state.tweets) {
      return this.state.tweets.map((tweet) => {
        return <Card tweet={tweet.text} author={tweet.author} polarity={tweet.polarity} key={Math.random()*10000}/>
      })
    }
  }
  
  render() {
    const data = {
      labels: [
        'Positive',
        'Negative',
        'Nuetral'
      ],
      datasets: [{
        data: this.state.data,
        backgroundColor: [
        '#11998E',
        '#DA4453',
        '#3A7BD5'
        ],
        hoverBackgroundColor: [
        '#11998E',
        '#DA4453',
        '#3A7BD5'
        ]
      }]
    };
    return (
      <div className='App'>
        <div className='container'>
          <div style={{marginTop: 20, marginBottom: 25}}>
            <h1 className='text-center'>Twitter Sentiment Analyser For Business</h1>
            <h5 className='text-center'>Search for Topics and Hashtags and get labelled data. (100 Most Recent Tweets)</h5>
          </div>
          <div className='row'>
              <SearchBar submitHandler={this.analyseTweets}/>
          </div>
          {this.state.networking ? 
          <div style={{marginTop: 25}}>
            <p className='text-center'>Fetching Tweets, Analysing Sentiments, Calculating Summary...</p>
            <img src={`${Spinner}`} style={{ display: 'block', marginLeft: 'auto', marginRight:'auto'}} alt="Spinner"/>
          </div>
          :
          <div style={{marginTop: 25}}>
            <Pie 
              type='pie'
              data = {data} 
            />
            <div style={{marginTop: 35}}>
              <h3 className='text-center' style={{marginBottom: 25}}>Recent Tweets</h3>
              {this.renderTweets()}
            </div>
          </div>
          }
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
