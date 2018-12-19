import React, { Component } from 'react';
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
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
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }
  getValidationState() {
    const length = this.state.value.length;
    if (length > 5) return 'success';
    else if (length < 6) return 'warning';
    else if (length <= 6) return 'error';
    return null;
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }


  render() {
    return (
      <Form>
       <FormGroup
         controlId="formBasicText"
         validationState={this.getValidationState()}
       >
         <ControlLabel>Get an Instant Quote!</ControlLabel>
         <FormControl
           type="number"
           value={this.state.value}
           placeholder="100000"
           onChange={this.handleChange}
         />
         <FormControl.Feedback />
         <HelpBlock>Quotes begin at $100,000.</HelpBlock>
       </FormGroup>
     </Form>
    )
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
