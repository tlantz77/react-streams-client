import React, { Component } from 'react';
import { connect}  from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '832540021793-64l0ie3skvcaqatrdanv91g8lb562ar3.apps.googleusercontent.com',
        scope: 'email'
      })
      .then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });  
  };

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  getAuthButtonType = (buttonText, onClickAction) => {
    return (
      <button onClick={onClickAction} className='ui red google button'>
        <i className='google icon'/>
        {buttonText}
      </button>
    );
  };

  renderAuthButton() {
    const isSignedIn = this.props.isSignedIn;

    if (isSignedIn === null) return null;
    if (isSignedIn) return this.getAuthButtonType('Sign Out', this.auth.signOut);
    return this.getAuthButtonType('Sign In', this.auth.signIn);
  };

  render() {
    return <div>{this.renderAuthButton()}</div>
  };
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
}
 
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)

