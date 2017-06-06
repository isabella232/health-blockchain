import React, { Component } from 'react';
import Phone from './Phone/Phone';
import Login from './Login';
import Logo from './Logo';
import Profile from './Profile/Profile';
import BlockExplorer from './BlockExplorer/BlockExplorer';
import './User.css';
import API from './callAPI';

const Route = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  PROFILE: 'profile',
};

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      route: Route.LOGIN
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.isLoggedIn();

    this.onLogIn = this.onLogIn.bind(this);
    this.onSignup = this.onSignup.bind(this);
    this.onLoggedIn = this.onLoggedIn.bind(this);
    this.logout = this.logout.bind(this);
  }

  onLogIn() {
    this.setState({
      route: Route.LOGIN
    });
  }

  onLoggedIn() {
    this.setState({
      route: Route.PROFILE
    });
  }

  onSignup() {
    this.setState({
      route: Route.SIGNUP
    });
  }

  isLoggedIn() {
    API.getRequest('/api/users/isLoggedIn').then(json =>
          json.outcome === 'success' && this.setState({ route: Route.PROFILE }));
  }

  logout() {
    API.postRequest('/api/users/logout')
    .then(() => this.setState({ route: Route.LOGIN }));
  }

  render() {
    let view;
    switch (this.state.route) {
      case Route.SIGNUP:
        view = <Login isLogin={false} onSubmit={this.onLoggedIn} onNavigate={this.onLogIn} />;
        break;
      case Route.PROFILE:
        view = <Profile />;
        break;
      case Route.LOGIN:
      default:
        view = <Login isLogin onSubmit={this.onLoggedIn} onNavigate={this.onSignup} />;
        break;
    }
    return (
      <div className="fitchain">
        <div className="banner">
          <div className="inner-banner">
            <Logo />
            <div className="about"><a href="./about.html">ABOUT</a></div>
          </div>
        </div>
        <div className="content">
          <div className="inner-content">
            <div>
              <div className="splitView">
                <Phone homeButton={this.logout}>
                  {view}
                </Phone>
                <BlockExplorer />
              </div>

            </div>
          </div>
        </div>


        <div className="footer">
          <div className="inner-banner">
            <div className="logoholder">
              <div className="footerInfo">Built with <a href="https://www.ibm.com/cloud-computing/bluemix/">IBM Bluemix</a> and <a href="https://www.ibm.com/blockchain/">IBM Blockchain</a></div>
            </div>
            <div className="footerGithub">
              <a href="https://github.com/IBM-Bluemix/health-blockchain">Github Repo</a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default User;