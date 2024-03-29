import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class RegisterLoginContainer extends Component{
  constructor(){
    super();
    this.state = {
      login : {
        username: '',
        // email:'',
        password: '',
        successful: false
      },
      register: {
        username:'',
        email: '',
        password:'',
        name: '',
      },
      loginButton: false
    }
  }

  handleRegisterChange = (e) => {
    const updatedChange = {
      ...this.state.register
    }
    updatedChange[e.target.name] =  e.target.value;
    this.setState({
      register: updatedChange
    })
  }


  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const updatedRegister = {
      ...this.state.register
    }

    // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
    // strongRegex.test(updatedRegister.password)
    // console.log("yea??", strongRegex.test(updatedRegister.password));
    // ======================== if statement =========

    if(true){
      this.fetchRegister(updatedRegister)
      this.setState({
        register: {
          name: '',
          username: '',
          email: '',
          password: '',
        }
      })
    }else{
      this.setState({
        register: updatedRegister
      })
    }
  }

 fetchRegister = async(updatedRegister) => {
   console.log('reg updatedRegister', updatedRegister);
   console.log('reg stringify', JSON.stringify(updatedRegister) );
   try{
     const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth`, {
       method: 'POST',
       credentials: 'include',
       body: JSON.stringify(updatedRegister),
       headers: {
         'Content-Type': 'application/json'
       }
     })

     if(!response.ok){
       throw Error(response.statusText)
     }

    console.log('reg response', response);
    const parsedResponse = await response.json();
    console.log('reg parsedResponse', parsedResponse);

     // console.log('userId', parsedResponse.userId);
     // console.log('username', parsedResponse.username);
     // console.log('parsed??', parsedResponse);
     localStorage.setItem('userId', parsedResponse.userId)
     localStorage.setItem('username', parsedResponse.username)

     this.props.history.push('/home')


   }catch(err){
     console.log('fetch regi func fail');
   }
 }

 //================== LogIn =======================

 handleLoginChange = (e) => {
   const updatedChange = {
     ...this.state.login
   }
   // console.log('updatedChange', updatedChange);
   updatedChange[e.target.name] = e.target.value;
   this.setState({
     login: updatedChange
   })
   // console.log('this.state.login', this.state.login);
 }


 handleLoginSubmit = (e) => {
   e.preventDefault();
   const updatedLogin = {
     ...this.state.login
   }
   this.fetchLogin(updatedLogin)
   // console.log(updatedLogin);
 }

 fetchLogin = async(updatedLogin) => {
   // console.log('fetchloging', updatedLogin);
   // console.log('??', JSON.stringify(updatedLogin));
   try{
     const response = await fetch(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
       method: 'POST',
       credentials: 'include',
       body: JSON.stringify(updatedLogin),
       headers: {
         'Content-Type' : 'application/json'
       }
     })

     if(!response.ok){
       throw Error(response.statusText);
     }

     // console.log('login response?', response);
     const parsedResponse = await response.json();
     // console.log("login parsedResponse?", parsedResponse)
     if(parsedResponse.status !== 401){
     // if(parsedResponse.status === 200){
       updatedLogin.successful = true;
       this.setState({
         login: updatedLogin
       })


       localStorage.setItem('userId', parsedResponse.userId)
       localStorage.setItem('username', parsedResponse.username)

      //  if(parsedResponse.userId === '5ce078a9ba00866361956c39'){
      //    this.props.history.push('/adminhome')
      //  }else{
        this.props.history.push('/home')
      // }


     }else{
       alert('fetch fail')
     }
   }catch(err){
     alert("catch err")
   }
 }

 buttonChange = (e) => {
   e.preventDefault();
   this.setState({
     loginButton: !this.state.loginButton
   });
 }


  render(){

    const changeOne = (
      <button onClick={this.buttonChange} className="btn btn-primary">New</button>
    );

    const changeTwo = (
      <button onClick={this.buttonChange} className="btn btn-primary">Login</button>
    );



    return(
      <div>
        <div className="mt-5 ml-5 container">
          <div className="row">
            <div><img src="Logo_ElectriCasa-05.png" className="logo"/></div>
            <div className="electriCasa ml-2">ElectriCasa</div>
          </div>
        </div>
          <div>
          { !this.state.loginButton ?
              <div className="container">
                <h2 className="text-center my-5">Login</h2>
                  <div className="row">
                    <div className="col-4 offset-4">
                      <form onSubmit={this.handleLoginSubmit}>
                        <div className="form-group">
                          <label htmlFor="username">Username:</label>
                          <input name="username" id="username" className="form-control" type="text" value={this.state.login.username} onChange={this.handleLoginChange} required />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password:</label>
                          <input name="password" id="password" className="form-control" type="text" value={this.state.login.password} onChange={this.handleLoginChange} required />
                        </div>
                        <div className="container">
                          <div className="row">
                            <div className="col-3 offset-2">
                              <button className="btn btn-primary" type="submit">Login</button>
                            </div>
                            <div className="col-2 offset-2">
                            {changeOne}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
              </div>

            :
              <div className="container">
                <h2 className="text-center my-5">Register</h2>
                    <div className="row">
                      <div className="col-4 offset-4">
                        <form onSubmit={this.handleRegisterSubmit}>
                          <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input id="name" name="name" className="form-control" type="text" value={this.state.register.name} onChange={this.handleRegisterChange} required />
                          </div>
                          <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input name="username" id="username" className="form-control" type="text" value={this.state.register.username} onChange={this.handleRegisterChange} required/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input id="email" name="email" className="form-control" type="text" value={this.state.register.email} onChange={this.handleRegisterChange} required/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input id="password" name="password" className="form-control" type="text" value={this.state.register.password} onChange={this.handleRegisterChange} required/>
                          </div>
                          <div className="container">
                            <div className="row">
                              <div className="col-2 offset-2"><button className="btn btn-primary" type="submit">Register</button></div>
                              <div className="col-2 offset-2">{changeTwo}</div>
                            </div>
                          </div>
                        </form>
                      </div>
                   </div>
                </div>

              }

      </div>
    </div>
    )
  }
}

export default withRouter(RegisterLoginContainer);
