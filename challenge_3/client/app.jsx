//saving the userId in a global obj
var user = {
  id: 9999
};

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
    e.preventDefault();
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  render() {
    return (
      <div>
        <p className="text">Please provide name, email and password:</p>
        <form onSubmit={(e) => {
          this.props.switchForm({
            formValue: this.props.formValue,
            name: this.state.valueName,
            email: this.state.valueEmail,
            password: this.state.valuePassword
          })
        }} >
          <label>
            Name: <input type="text" value={this.state.valueName} name="valueName" onChange={this.handleInputChange} required/>
          </label>
          <label>
            Email: <input type="email" value={this.state.valueEmail} name="valueEmail" onChange={this.handleInputChange} required/>
          </label>
          <label>
            Password: <input type="password" value={this.state.valuePassword} name="valuePassword" onChange={this.handleInputChange} required/>
          </label>
          <input type="submit" value="Next" />
        </form>
      </div>
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
    e.preventDefault();
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  render() {
    return (
      <div>
        <p className="text">Please provide address and phone number:</p>
        <form onSubmit={(e) => {
          this.props.switchForm({
            line1: this.state.valueLine1,
            line2: this.state.valueLine2,
            city: this.state.valueCity,
            state: this.state.valueState,
            zip: this.state.valueZip,
            phone: this.state.valuePhone,
            formValue: this.props.formValue
          })
        }}>
          <label>
            Address: <input type="text" value={this.state.valueLine1} name="valueLine1" onChange={this.handleInputChange} required/>
          </label>
          <label>
            <input type="text" value={this.state.valueLine2} name="valueLine2" onChange={this.handleInputChange} />
          </label>
          <label>
            City: <input type="text" value={this.state.valueCity} name="valueCity" onChange={this.handleInputChange} required/>
          </label>
          <label>
            State: <input type="text" value={this.state.valueState} name="valueState" onChange={this.handleInputChange} required/>
          </label>
          <label>
            Zip code: <input type="number" value={this.state.valueZip} name="valueZip" onChange={this.handleInputChange} required/>
          </label>
          <label>
            Phone number: <input type="number" value={this.state.valuePhone} name="valuePhone" onChange={this.handleInputChange} required/>
          </label>
          <input type="submit" value="Next" />
        </form>
      </div>
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
    e.preventDefault();
    var name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  render() {
    return (
      <div>
        <p className="text">Please provide credit card information:</p>
        <form onSubmit={(e) => this.props.switchForm({
          ccard: this.state.valueCreditCard,
          expdate: this.state.valueExpDate,
          cvv: this.state.valueCVV,
          bzip: this.state.valueBillingZip,
          formValue: this.props.formValue
        })}>
          <label>
            Credit Card number: <input type="number" value={this.state.valueCreditCard} name="valueCreditCard" onChange={this.handleInputChange} required/>
          </label>
          <label>
            Expiration Date (yyyy-mm-dd): <input type="text" value={this.state.valueExpDate} name="valueExpDate" onChange={this.handleInputChange} required/>
          </label>
          <label>
            CVV: <input type="number" value={this.state.valueCVV} name="valueCVV" onChange={this.handleInputChange} required/>
          </label>
          <label>
            Billing zip code: <input type="number" value={this.state.valueBillingZip} name="valueBillingZip" onChange={this.handleInputChange} required/>
          </label>
          <input type="submit" value="Purchase" />
        </form>
      </div>
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
        <h1>Welcome to checkout app!</h1>
        <p className="main-page">Please click on the button.</p>
        <button onClick={(e) => this.props.switchForm({ formValue: this.props.formValue })}>
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

  switchForm(data) {
    if (user.id !== 9999) {
      data.id = user.id;
    }
    fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      })
      .then(response => response.json())
      .then(data => { console.log('resp', data); return data; })
      .then(data => { user.id = data.id; console.log('user', user.id) });

    this.setState({
      formValue: data.formValue
    });
  }

  render() {
    if (this.state.formValue === 0) {
      return <CheckoutPage formValue={1} switchForm={this.switchForm} />;
    } else if (this.state.formValue === 1) {
      return <Form1 formValue={2} switchForm={this.switchForm} />;
    } else if (this.state.formValue === 2) {
      return <Form2 formValue={3} switchForm={this.switchForm} />;
    } else if (this.state.formValue === 3) {
      return <Form3 formValue={0} switchForm={this.switchForm} />;
    }
  }

};

ReactDOM.render(
  <CheckoutApp formValue={0} />,
  document.getElementById('app')
);