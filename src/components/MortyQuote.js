import React, { Component } from 'react';
import {Grid, Row, Col, Form, InputGroup, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { numberFilter } from 'react-bootstrap-table2-filter';

// Note: Three Components in this component.
// Parent: MortyQuote
// Child: QuoteInput, QuoteTable

class MortyQuote extends Component {
  constructor(props) {
   super(props);
   this.handleValueChange = this.handleValueChange.bind(this)
   this.state = {
     value: ''
   };
 }

 handleValueChange(value){
   this.setState({value})
 }

  render() {
    return (
      <Grid fluid className="container">
        <Row>
          <Col className="quote-input-container" lg={12}>
            <QuoteInput {...this.state} onValueChange={this.handleValueChange} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} mdOffset={0} lg={12} lgOffset={0}>
            <QuoteTable value={this.state.value} />
          </Col>
        </Row>
      </Grid>

  );
  }
}


class QuoteInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  getValidationState() {
    const length = this.props.value.length;
    //meets minimum of $100,000
    if (length > 5) return 'success';
    // else if (length < 6) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }
  handleChange(e) {
    this.props.onValueChange(e.target.value);
  }


  render() {
    return (
      <Form>
      <h2>Hey there! What size loan do you need?</h2>
       <FormGroup
         controlId="formBasicText"
         validationState={this.getValidationState()}
       >

           <InputGroup>
           <InputGroup.Addon>$</InputGroup.Addon>
           <FormControl
             type="number"
             value={this.props.value}
             placeholder="100000"
             onChange={this.handleChange}
           />
           </InputGroup>
           <FormControl.Feedback />

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
          text: '#'
        },
        {
          dataField: 'lender.name',
          text: 'Lender',
          sort: true
        },
        {
          dataField: 'loan_product',
          text: 'Product',
          sort: true
        },
        {
          dataField: 'interest_rate',
          text: 'Interest',
          filter: numberFilter(),
          sort: true
        },
        {
          dataField: 'loan_term',
          text: 'Term',
          sort: true
        },
        {
          dataField: 'monthly_payment',
          text: 'Monthly Payment',
          filter: numberFilter(),
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

  componentDidMount() {
    // onload, display all quotes for $100,000
    var quote = '1000000'
    this.fetchQuotes(quote);
  }

  componentDidUpdate(oldProps){
    if(oldProps.value !== this.props.value){
      //pass current quote value into fetchQuotes
      var quote = this.props.value
      this.fetchQuotes(quote);
    }
  }

  fetchQuotes(quote){

    this.setState({isLoading: true});
    let url = 'https://morty.mockable.io/quotes?&loan_amount='+ quote;

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(data => {
      //adds unique id to objects in array
      var iterator = 0;
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
    const { isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }
    if(isLoading){
      return <p className="get-quotes">Generating great loans based on your quote.</p>
    }
    if(this.state.quotes.length === 0 ){
      return <p className="no-quotes">Unfortunately, no quotes available for this amount. Please enter in at least $100,000.00</p>
    }
    return (
      <BootstrapTable hover fluid
        keyField='id'
        data={ this.state.quotes }
        columns={ this.state.columns }
        filter={ filterFactory() }
      />
    )
  }
}

export default MortyQuote;
