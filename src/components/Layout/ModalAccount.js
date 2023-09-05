import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "antd";
import { connect } from "react-redux";
import { Link, withTranslation } from "../../../i18n";
import dynamic from "next/dynamic";

import styles from "../../styles/Home.module.css";
import { UserAccountIcon, WalletIcon } from "../UI/Icons";
import { GetBalance } from "../../actions/user/authActions";

const AsideMyAccount = dynamic(() => import("../MyAccount/AsideMyAccount"));
const VerifyNumber = dynamic(() => import("../MyAccount/VerifyNumber"));

class ModalAccount extends React.Component {
  state = { modalMyAccount: false };

  setModalMyAccount(modalMyAccount) {
    this.setState({ modalMyAccount });
  }

  componentDidMount = () => {
    this.props.GetBalance();
  };

  render() {
    const { t } = this.props;
    return (
      <>
        <Link as="/myaccount/wallet" href="/myaccount/wallet">
          <a
            className={`${styles.walletLink} ${
              process.env.THEME_NAME === "TRAVELO" && styles.walletLinkTravelo
            }`}
          >
            <WalletIcon />
            <span className={styles.text}>
              {t("money-bag")} :{" "}
              {Intl.NumberFormat({ style: "currency", currency: "IRR" }).format(
                this.props.creditAmount
              )}{" "}
              {this.props.currency}
            </span>
          </a>
        </Link>
        <Button
          type="text"
          className={`${styles.btnModalMyAccount} ${
            process.env.THEME_NAME === "TRAVELO" &&
            styles.btnModalMyAccountTravelo
          }`}
          onClick={() => this.setModalMyAccount(true)}
        >
          <UserAccountIcon />
          <span className={styles.text}>{t("account")}</span>
        </Button>
        <Modal
          title={
            <div className={styles.modalMyAccountLink}>
              <Link as="/myaccount/profile" href="/myaccount/profile">
                <a>{t("profile")}</a>
              </Link>
            </div>
          }
          className={styles.modalMyAccount}
          open={this.state.modalMyAccount}
          onOk={() => this.setModalMyAccount(false)}
          onCancel={() => this.setModalMyAccount(false)}
          footer={null}
          style={{ height: "100vh" }}
        >
          <div className={styles.contentModalMyAccount}>
            <AsideMyAccount />
          </div>
        </Modal>
        {this.props.statusRegister === "mobile" &&
        !this.state.modalMyAccount ? (
          <VerifyNumber showModal={true} />
        ) : (
          ""
        )}
      </>
    );
  }
}

ModalAccount.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

ModalAccount.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
  return {
    statusRegister: state.statusRegister,
    creditAmount: state.creditAmount,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => ({
  GetBalance: () => dispatch(GetBalance()),
});

export default withTranslation("common")(
  connect(mapStateToProp, mapDispatchToProps)(ModalAccount)
);
