import React from 'react';

export default class App extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {  //these need to have their initial state set here or they are not able to have their state referenced anywhere later in the Component. 
      balance: "",
      rate: "",
      term: "",
      output: "",
      result: null //needing to delare initial state of this here to be able to setState on it later. 
    }
    //these functions need to be bound to the component or they are not accessable to any other part of the component. This is how you bind. 
    this.onChange = this.onChange.bind(this)
    this.calculate = this.calculate.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
 //A function that is making it possible to collect the value of any item in the HTML below that has it's onChange attr set below to onChange
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
//the calc function that is running the math. 
  calculate(balance, rate, term) {
    balance = this.state.balance; //if these are declared below in handleCLick the var result has access to them and as their state changed back after the click event runs to default of "" after the click event result reruns the calc funct since their state changed and will be outputting nothing since the initial state is nothing.
    rate = this.state.rate;
    term = this.state.term;
    
    const n = term * 12;
    const r = rate / 1200;
    const top = r * (1 + r) ** n;
    const bottom = (1 + r) ** n - 1;

    var payment = (balance * (top / bottom)).toFixed(2);
    return payment;
  }
  //handle click here is taking the result of the calc function and outputting it below to the h3 element by setting it's state to be the result of themath. `` are template literals and are how it's being concat'd
  handleClick(e) {
    e.preventDefault();

    var result = this.calculate();  //this is necessary here or it cant find calculate
    console.log(result);

    this.setState({ //passing result down ot the h3 below
      output: `$${result} + "is your monthly payment."`
    });
  }
//whats rendered, the above is working off of and onto this as though it were the DOM(withnone of the DOM functionality using this/state for all of that)
  render() {
    return (
      <div className='container'>
        <form className="form-horizontal">
          <div className='page-header'>
            <h3>Mortgage Calculator</h3>
          </div>
          <div className="form-group">
            <label 
              htmlFor="loan-balance-input"
              >Loan Balance:</label>
            <input 
              type="number"
              value= { this.state.balance } 
              name="balance" 
              className="form-control" 
              placeholder="Loan Balance" 
              id="loan-balance-input"
              onChange={ this.onChange }
              ></input>
            <label 
              htmlFor="apr-rate">APR:</label>
            <input 
              type="number" 
              value={ this.state.rate }
              name="rate" 
              step="0.01" 
              className="form-control" 
              placeholder="APR - interest rate" 
              id="apr-rate"
              onChange={ this.onChange }
              ></input>
            <label 
              htmlFor="term"
              >Term:</label>
            <select 
              name="term" 
              className="form-control" 
              id="term"
              value={ this.state.term }
              onChange={ this.onChange }>
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
            <button
              name="submit"
              id="button"
              onClick={this.handleClick}
              >Submit</button>
          </div>
          <div 
            name="output"
            onChange={this.onChange}
            value={ this.state.output } 
            className="form-group" 
            id="output">
              <h3>{ this.state.output }</h3>
            </div>
        </form>
      </div>
    );
  }
};
