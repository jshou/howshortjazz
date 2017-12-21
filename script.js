import React from 'react';
import ReactDOM from 'react-dom';
import ShowsSection from './lib/shows_section';

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<ShowsSection/>, document.getElementById('shows'));
});
