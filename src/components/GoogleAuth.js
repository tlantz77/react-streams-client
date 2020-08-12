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

  getAuthButtonType = (buttonText, onClickAction) => {
    return (
      <button onClick={onClickAction} className='ui red google button'>
        <i className='google icon'/>
        {buttonText}
      </button>
    );
  }

  renderAuthButton() {
    const isSignedIn = this.state.isSignedIn;

    if (isSignedIn === null ) return null;
    if (isSignedIn) return this.getAuthButtonType('Sign Out', this.auth.signOut());
    return this.getAuthButtonType('Sign In', this.auth.signIn());
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}
 
export default GoogleAuth;

