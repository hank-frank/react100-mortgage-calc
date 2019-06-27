import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor( props ) {
    super( props );

    this.state = {
      balance: "",
      rate: "",
      term: "",
      output: ""
    }
    this.onChange = this.onChange.bind(this)
  }
 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  calculate(balance, rate, term) {
    const n = term * 12;
    const r = rate / 1200;
    const top = r * (1 + r) ** n;
    const bottom = (1 + r) ** n - 1;

    var payment = (balance * (top / bottom)).toFixed(2);   //I think this is the right math? 
    return payment;
  }
  handleClick(balance, rate, term) {
    balance = this.state.balance;
    rate = this.state.rate;
    term = this.state.term;

    var result = this.calculate(balance, rate, term);
    console.log(result);
    // return this.state.result;
    // this.setState({
    //   output: + "is your monthly payment."        //this is't right but something needs to go here. 
    // });
  }

  render() {
    // const {
    //   balance, 
    //   rate, 
    //   term, 
    //   output
    // } = this.state;
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
              onClick={this.handleClick()}
              >Submit</button>
          </div>
          <div 
            name="output"
            onChange={this.onChange}
            value={ this.state.output } 
            className="form-group" 
            id="output"></div>
        </form>
        {/* your JSX goes here */}
      </div>
    );
  }
};
