class Form1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueName: '',
      valueEmail: '',
      valuePassword: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // updates the value of the input field in the state
  handleInputChange(e) {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.switchForm(this.props.formValue)}>
        <label>
          Name: <input type="text" value={this.state.valueName} name="valueName" onChange={this.handleInputChange} />
        </label>
        <label>
          Email: <input type="text" value={this.state.valueEmail} name="valueEmail" onChange={this.handleInputChange} />
        </label>
        <label>
          Password: <input type="text" value={this.state.valuePassword} name="valuePassword" onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }

};

class Form2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueLine1: '',
      valueLine2: '',
      valueCity: '',
      valueState: '',
      valueZip: '',
      valuePhone: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // updates the value of the input field in the state
  handleInputChange(e) {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.switchForm(this.props.formValue)}>
        <label>
          Address: <input type="text" value={this.state.valueLine1} name="valueLine1" onChange={this.handleInputChange} />
        </label>
        <label>
          <input type="text" value={this.state.valueLine2} name="valueLine2" onChange={this.handleInputChange} />
        </label>
        <label>
          City: <input type="text" value={this.state.valueCity} name="valueCity" onChange={this.handleInputChange} />
        </label>
        <label>
          State: <input type="text" value={this.state.valueState} name="valueState" onChange={this.handleInputChange} />
        </label>
        <label>
          Zip code: <input type="text" value={this.state.valueZip} name="valueZip" onChange={this.handleInputChange} />
        </label>
        <label>
          Phone number: <input type="text" value={this.state.valuePhone} name="valuePhone" onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }

};

class Form3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCreditCard: '',
      valueExpDate: '',
      valueCVV: '',
      valueBillingZip: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // updates the value of the input field in the state
  handleInputChange(e) {
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.switchForm(this.props.formValue)}>
        <label>
          Credit Card number: <input type="text" value={this.state.valueCreditCard} name="valueCreditCard" onChange={this.handleInputChange} />
        </label>
        <label>
          Expiration Date: <input type="text" value={this.state.valueExpDate} name="valueExpDate" onChange={this.handleInputChange} />
        </label>
        <label>
          CVV: <input type="text" value={this.state.valueCVV} name="valueCVV" onChange={this.handleInputChange} />
        </label>
        <label>
          Billing zip code: <input type="text" value={this.state.valueBillingZip} name="valueBillingZip" onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }

};

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome to checkout app! Please click on the button.</h1>
        <button onClick={(e) => this.props.switchForm(this.props.formValue)}>
          Checkout
        </button>
      </div>
    );
  }

};


class CheckoutApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: props.formValue
    }
    this.switchForm = this.switchForm.bind(this);
  }

  switchForm(value) {
    this.setState({
      formValue: value
    })
  }

  render() {
    if (this.state.formValue === 0) {
      return <CheckoutPage formValue={1} switchForm={this.switchForm}/>;
    } else if (this.state.formValue === 1) {
      return <Form1 formValue={2} switchForm={this.switchForm}/>;
    } else if (this.state.formValue === 2) {
      return <Form2 formValue={3} switchForm={this.switchForm}/>;
    } else if (this.state.formValue === 3) {
      return <Form3 formValue={0} switchForm={this.switchForm}/>;
    }
  }

};

ReactDOM.render(
  <CheckoutApp formValue={0} />,
  document.getElementById('app')
);