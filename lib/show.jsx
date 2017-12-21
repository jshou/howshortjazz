import React from 'react';

const VenueLink = (props) => {
  if (props.address) {
    return <a href={ props.address }>{ props.venue }</a>;
  } else {
    return props.venue;
  }
}

const Show = (props) => {
  return (
    <p>
      { props.date }, { props.start } - { props.end }<br/>
      <VenueLink address={ props.address } venue={ props.venue }/>
    </p>
  );
}

export default Show;
