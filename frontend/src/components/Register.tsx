import React, { Component } from 'react'


export default class Register extends Component<{}, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      name: '',
      password: '',
      password_confirm: '',
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e: any) => {
    e.preventDefault
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    }
    console.log(user)
  }

  public render() {
    return (
      <div className="container" style={{ marginTop: '50px', width: '700px' }}>
        <h2 style={{ marginBottom: '40px' }}>Registration</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            {/* <label for="" /> */}
            <input type="text" name="name" className="form-control" placeholder="Name" aria-describedby="helpName" />>
            <small id="helpName" className="text-muted">
              Help text for name
            </small>
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              name="email"
              onChange={this.handleInputChange}
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              onChange={this.handleInputChange}
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              name="password_confirm"
              onChange={this.handleInputChange}
              value={this.state.password_confirm}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}
