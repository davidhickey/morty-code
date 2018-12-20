import React, { Component } from 'react';
import './App.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import BootstrapTable from 'react-bootstrap-table-next';
import MortyQuote from './components/MortyQuote';
class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1>Loan Quote Tool</h1>
      </header>
        <MortyQuote />
      </div>
    );
  }
}

export default App;
