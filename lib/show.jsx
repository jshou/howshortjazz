import React from 'react';

const Show = (props) => {
  return (
    <p>
      { props.date }, { props.start } - { props.end }<br/>
      <a href={ props.address }>{ props.venue }</a>
    </p>
  );
}

export default Show;
