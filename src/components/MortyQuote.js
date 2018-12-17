import React, { Component } from 'react';

class MortyQuote extends Component {
  constructor(props) {
   super(props);
   this.state = {
     error: null,
     isLoaded: false,
     items: []
   };
 }
  render() {
    return (
      <div>
        <div>
          <QuoteInput />
        </div>
        <div>
          <QuoteTable />
        </div>
      </div>

  );
  }
}


class QuoteInput extends Component {
  render() {
    return (<p>QuoteInput here</p>)
  }
}
class QuoteTable extends Component {
  render() {
    return (
      <div>
        <p>QuoteTable here</p>
        <div>
          <div>
            <FilterQuotes />
          </div>
          <div>
            <SortQuotes />
          </div>
          <div>
          <DataQuotes />
          </div>
        </div>
      </div>
    )
  }
}

class FilterQuotes extends Component {
  render() {
    return (<span>FilterQuotes here</span>)
  }
}

class SortQuotes extends Component {
  render() {
    return (<span>SortQuotes here</span>)
  }
}

class DataQuotes extends Component {
  render() {
    return (<table>DataQuotes here</table>)
  }
}

export default MortyQuote;
