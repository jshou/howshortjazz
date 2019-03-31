import React from 'react';

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
  const date =  props.data.start.tz('America/Los_Angeles').format('dddd, MMM Do YYYY');
  const start = props.data.start.tz('America/Los_Angeles').format('h:mmA');
  const end = props.data.end.tz('America/Los_Angeles').format('h:mmA');
  const [band, venue] = props.data.summary.split('@').map((s) => {
    return s.trim();
  });

  return (
    <p>
      { date }, { start } - { end }<br/>
      <VenueLink address={ address(props.data.location) } venue={ venue }/>
    </p>
  );
}

export default Show;
