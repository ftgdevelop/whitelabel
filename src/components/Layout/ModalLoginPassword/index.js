import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "../../../../i18n";
import { connect } from "react-redux";
import dynamic from 'next/dynamic'

const SignInPassword = dynamic(() => import('../SignInPassword/SignInPassword'))

// const SignIn = dynamic(() => import('../SignIn/SignIn'))
// const CreateAccount = dynamic(() => import('../CreateAccount/CreateAccount'))

class ModalLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerClass: "",
      myurl: "",
      modalSignIn: false,
      modalSignInPassword: false,
    };
  }

  setModalSignInPassword=(modalSignInPassword) => {
    this.setState({ modalSignInPassword: modalSignInPassword });
    this.setState({ modalSignIn: false });
  }

  render() {
    const { t } = this.props;
    
    return (
      <>
        <SignInPassword
          // key="signin-password"
          setModalSignInPassword={this.setModalSignInPassword}
          modalSignInPassword={this.state.modalSignInPassword}
          setModalSignIn={this.setModalSignInPassword}
        />
      </>
    );
  }
}

ModalLogin.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

ModalLogin.propTypes = {
  t: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default withTranslation("common")(connect(mapStateToProps)(ModalLogin));
