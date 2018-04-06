import axios from 'axios';
import moment from 'moment';
import React from 'react';

import Show from './show.jsx';

class ShowsSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: []
    }
  }

  componentWillMount() {
    this.loadShows('How Short');
  }

  yesterday() {
    return new Date(Date.now() - 864e5).toISOString(); // 864e5 == 86400000 == 24*60*60*1000
  }

  showOptions() {
    return {
      key: 'AIzaSyCA9pV8ZJNnG2Gmerj71DF30noN8DTiQ9c',
      maxResults: 20,
      orderBy: 'startTime',
      singleEvents: true,
      timeMin: this.yesterday()
    }
  }

  calendarUrl() {
    const calendarid = 'nr5jftdjm9p0lg4pigi0dsld6c@group.calendar.google.com';
    return `https://www.googleapis.com/calendar/v3/calendars/${ calendarid }/events`
  }

  address(locationString) {
    const uriLocation = encodeURIComponent(locationString);
    if (uriLocation != 'undefined') {
      return `https://www.google.com/maps/search/?api=1&query=${ uriLocation }`;
    }
  }

  loadShows(bandname) {
    axios.get(this.calendarUrl(), {
      params: this.showOptions()
    }).then(function(response) {
      var data = response.data;
      for (var i = 0; i < data.items.length; i++) {
        var date =  moment(data.items[i].start.dateTime).format('dddd, MMM Do YYYY');
        var start = moment(data.items[i].start.dateTime).format('h:mmA');
        var end = moment(data.items[i].end.dateTime).format('h:mmA');
        var event = data.items[i].summary.split('@').map(function(s) { return s.trim(); });
        var band = event[0];
        var venue = event[1];

        if (band == bandname) {
          this.setState({
            shows: this.state.shows.concat([
              <Show
                key={ i }
                date={ date }
                start={ start }
                end={ end }
                band={ band }
                venue={ venue }
                address={ this.address(data.items[i].location) }/>
            ])
          });
        }
      }
    }.bind(this));
  }

  render() {
    return (
      <div>
        <h2>upcoming shows</h2>
        { this.state.shows }
      </div>
    );
  }
}

export default ShowsSection;
