import React, { Component } from 'react';
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
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
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
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
  constructor(props) {
    super(props);
    this.state = {
      quotes: null,
      isLoading: false,
      error: null,
    };
  }

  componentDidMount () {
    this.setState({isLoading: true});

    var url = 'http://morty.mockable.io/quotes?&loan_amount=100000'
    fetch(url)
    // .then(response => response.json())
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(data => {
      console.log(data)
      this.setState({
        quotes: data,
        isLoading: false
      });

    })
    .catch(error => this.setState({
      error,
      isLoading: false
    })
  );
  }

  render() {
    const { hits, isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if(isLoading){
      return <p>Quotes on the way</p>;
    }
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
          <DataQuotes {...this.props} {...this.state} />
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
    // if(this.props.quotes.length == 0) { return null; }

    return (
      <BootstrapTable data={this.props.quotes}>
      <TableHeaderColumn isKey dataField="id">Quote#</TableHeaderColumn>
      <TableHeaderColumn dataField="lender.name">Lender</TableHeaderColumn>
      <TableHeaderColumn dataField="loan_product">Loan Product</TableHeaderColumn>
      <TableHeaderColumn dataField="interest_rate">Interest Rate</TableHeaderColumn>
      <TableHeaderColumn dataField="loan_term">Loan Term</TableHeaderColumn>
      <TableHeaderColumn dataField="monthly_payment">Monthly Payment</TableHeaderColumn>
      <TableHeaderColumn dataField="rate_type">Rate Type</TableHeaderColumn>

      </BootstrapTable>

    )
  }
}

export default MortyQuote;
