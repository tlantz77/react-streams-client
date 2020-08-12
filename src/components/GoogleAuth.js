import React, { Component } from 'react';

class GoogleAuth extends Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '832540021793-64l0ie3skvcaqatrdanv91g8lb562ar3.apps.googleusercontent.com',
        scope: 'email'
      })
      .then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });  
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  }

  renderAuthButton() {
    const isSignedIn = this.state.isSignedIn;

    if (isSignedIn === null ) {
      return <div>Don't know if signed in</div>
    } else if (isSignedIn) {
      return <div>Signed In!</div>
    } else {
      return <div>Not Signed In!</div>
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}
 
export default GoogleAuth;

