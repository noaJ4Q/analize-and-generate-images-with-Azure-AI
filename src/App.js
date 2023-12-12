import React from 'react';

function App() {
  // return a title for the app as variable
  const title = 'Welcome to the Road to learn React';
  // show the title in the browser
  return (
    <div>
      <h1>{title}</h1>
      // add a text box to enter an url or prompt
      <label htmlFor="search">URL or prompt: </label>
      // add a button to submit the url or prompt
      <input id="search" type="text" />
      <button type="submit">Search</button>
      
    </div>
  );
}

export default App;
