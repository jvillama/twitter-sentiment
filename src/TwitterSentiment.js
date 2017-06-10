import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from './utils/api';
import Loading from './Loading';

class QueryInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;

    this.setState(function () {
      return {
        term: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.props.id,
      this.state.term
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.state.disabled) {
      this.setState({
        disabled: nextProps.disabled
      });
    }
  }
  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='term'>{this.props.term}</label>
        <input
          id='term'
          placeholder='Please enter Twitter search term'
          type='text'
          value={this.state.term}
          autoComplete='off'
          onChange={this.handleChange}
          disabled={this.state.disabled}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.term || this.state.disabled}>
            Submit
        </button>
      </form>
    );
  }
}

QueryInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}

QueryInput.defaultProps = {
  label: 'query',
  disabled: false
}

function Tweets (props) {
  return (
    <ul className='popular-list'>
      {props.tweets.map(function (tweet, index) {
        return (
          <li key={index} className={'popular-item ' + tweet.type}>
            <div key={tweet.id}>{tweet.text}</div>
            <div>Sentiment: <strong>{tweet.type}</strong> - Score: <strong>{tweet.score}</strong></div>
          </li>
        )
      })}
    </ul>
  )
}

Tweets.propTypes = {
  tweets: PropTypes.array.isRequired
}

class TwitterSentiment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      tweets: null,
      error: null,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;

    this.setState(function() {
      return {
        term: value
      }
    });
  }
  handleSubmit(id, term) {
    this.setState(function() {
      return {
        loading: true
      }
    });

    api.searchTweets(term).then(function(tweets) {
      if (tweets === null) {
        return this.setState(function() {
          return {
            error: 'Looks like there was an error. Check on Twitter.',
            loading: false
          }
        });
      }

      this.setState(function() {
        return {
          error: null,
          tweets: tweets,
          loading: false
        }
      });
    }.bind(this));
  }
  render() {
    return (
      <div>
        <QueryInput
          id='query'
          label='query'
          disabled={this.state.loading}
          onSubmit={this.handleSubmit} />
        {this.state.loading && <Loading />}
        {this.state.tweets && <Tweets tweets={this.state.tweets} />}
      </div>
    );
  }
}

TwitterSentiment.propTypes = {
  term: PropTypes.string.isRequired
}

TwitterSentiment.defaultProps = {
  term: ''
};

export default TwitterSentiment;
