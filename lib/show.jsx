import React from 'react';
import moment from 'moment-timezone';

const VenueLink = (props) => {
  if (props.address) {
    return <a href={ props.address }>{ props.venue }</a>;
  } else {
    return props.venue;
  }
}

const address = (locationString) => {
  const uriLocation = encodeURIComponent(locationString);
  if (uriLocation != 'undefined') {
    return `https://www.google.com/maps/search/?api=1&query=${ uriLocation }`;
  }
}

const Show = (props) => {
  const date =  moment(props.data.start).tz('America/Los_Angeles').format('dddd, MMM Do YYYY');
  const start = moment(props.data.start).tz('America/Los_Angeles').format('h:mmA');
  const end = moment(props.data.end).tz('America/Los_Angeles').format('h:mmA');
  const [band, venue] = props.data.summary.split('@').map((s) => {
    return s.trim();
  });
  const description = props.data.description;

  return (
    <p>
      { date }, { start } - { end }<br/>
      <VenueLink address={ address(props.data.location) } venue={ venue }/>
      { description && <div dangerouslySetInnerHTML={{ __html: props.data.description }}></div> }
    </p>
  );
}

export default Show;
