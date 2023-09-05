import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "../../../../i18n";
import { connect } from "react-redux";
import dynamic from 'next/dynamic'

const SignInOtp = dynamic(() => import('../SignInOtp/SignInOtp'))
const SignInPassword = dynamic(() => import('../SignInPassword/SignInPassword'))

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

  setModalSignIn=(modalSignIn) => {
    this.setState({ modalSignIn: modalSignIn });
    this.setState({ modalSignInPassword: false });
  }

  render() {
    const { t } = this.props;

    return (
      <>
        <SignInOtp
          // key="signin"
          setModalSignIn={this.setModalSignIn}
          modalSignIn={this.state.modalSignIn}
          modalSignInPassword={this.modalSignInPassword}
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
