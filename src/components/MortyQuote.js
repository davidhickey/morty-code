import React, { Component } from 'react';
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

class MortyQuote extends Component {
  constructor(props) {
   super(props);
   this.state = {
     error: null,
     isLoaded: false
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
  constructor(props) {
    super(props);
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
      quotes: [],
      isLoading: false,
      error: null,
      columns: [
        {
          dataField: 'id',
          text: 'Quote #'
        },
        {
          dataField: 'lender.name',
          text: 'Lender'
        },
        {
          dataField: 'loan_product',
          text: 'Loan Product'
        },
        {
          dataField: 'interest_rate',
          text: 'Interest Rate',
          sort: true
        },
        {
          dataField: 'loan_term',
          text: 'Loan Term',
          sort: true
        },
        {
          dataField: 'monthly_payment',
          text: 'Monthly Payment',
          sort: true
        },
        {
          dataField: 'rate_type',
          text: 'Rate Type',
          sort: true
        }
    ]
    };
  }

  componentDidMount () {
    this.setState({isLoading: true});

    // var url = 'http://morty.mockable.io/quotes?&loan_amount=100000'
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
      //adds unique id to objects in array
      var iterator = 0; // this is going to be your identifier
      function addIdentifier(target){
        target.id = iterator;
        iterator++;
      }
      function loop(obj){
        for(var i in obj){
          var c = obj[i];
          addIdentifier(c);
        }
      }
      loop(data)
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
    const { quotes, isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if(isLoading){
      return <p>Quotes on the way</p>;
    }
    return (
      <BootstrapTable
        keyField='id'
        data={ this.state.quotes }
        columns={ this.state.columns }
      />
    )
  }
}

export default MortyQuote;
