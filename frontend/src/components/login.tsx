import React, { Component } from 'react'

export interface LoginProps {}

export interface LoginState {
  email: String
  password: String
  errors: {}
}

export default class Login extends Component<LoginProps, Partial< LoginState>> {
  constructor(props: LoginProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange = (e: any) => {
    this.setState({
      [e.target.name]: e.currentTarget.value
      
    })
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(user)
  }

  public render() {
    return (
      <div className="container" style={{ marginTop: '50px', width: '700px' }}>
        <h2 style={{ marginBottom: '40px' }}>login</h2>
        <div className='container'>
          <form>
            <div className='form-group'>
              <label htmlFor='email' className='col-sm-1-12 col-form-label'>Email</label>
              <input type='text' className='form-control' name='email' id='email' placeholder='' />
            </div>
            <div className='form-group'>
              <label htmlFor='password' className='col-sm-1-12 col-form-label'>Email</label>
              <input type='password' className='form-control' name='password' id='password' placeholder='' />
            </div>
            <button type='submit' className='btn btn-primary'>Login User</button>
          </form>
        </div>
      </div>
    )
  }
}
