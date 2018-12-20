import React, { Component } from 'react';
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

class MortyQuote extends Component {
  constructor(props) {
   super(props);
   this.handleValueChange = this.handleValueChange.bind(this)
   this.state = {
     error: null,
     isLoaded: false,
     value: ''
   };
 }

 handleValueChange(value){
   this.setState({value})
 }

  render() {
    return (
      <div>
        <div>
          <QuoteInput {...this.state} onValueChange={this.handleValueChange}/>
        </div>
        <div>
          <QuoteTable value={this.state.value} />
        </div>
      </div>

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
    if (length > 5) return 'success';
    else if (length < 6) return 'warning';
    else if (length <= 6) return 'error';
    return null;
  }
  handleChange(e) {
    // e.preventDefault();
    // this.setState({ value: e.target.value });
    this.props.onValueChange(e.target.value);

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
           value={this.props.value}
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
    let url = 'http://morty.mockable.io/quotes?&loan_amount='+ quote;
    console.log(url)
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
      console.log('got data!!!')

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
