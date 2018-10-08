import React from 'react';
import { range, zip } from 'rxjs';
import { filter } from 'rxjs/operators';
import { getEvents } from 'gcal-events';

import Show from './show.jsx';

const CALENDAR_ID = 'nr5jftdjm9p0lg4pigi0dsld6c@group.calendar.google.com'
const CALENDAR_KEY = 'AIzaSyCA9pV8ZJNnG2Gmerj71DF30noN8DTiQ9c'

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

  loadShows(bandname) {
    const shows = getEvents(CALENDAR_ID, CALENDAR_KEY, { maxResults: 20 }).pipe(
      filter((show) => {
        const band = show.summary.split('@').map((s) => {
          return s.trim();
        })[0];
        return band === bandname;
      })
    );

    zip(range(1, 10000), shows, (i, eventData) => {
      return <Show key={ i } data={ eventData } />;
    }).subscribe((show) => {
      this.setState({ shows: this.state.shows.concat([show]) });
    }, (error) => {
      console.log(error);
      this.setState({ calendarError: 'There was an error fetching the calendar. Please refresh to try again.' });
    });
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
