import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, i18n, withTranslation, Router } from "../../../i18n";
import { LeftOutlined } from "@ant-design/icons";

import { userProfile, logout } from "../../actions/user/authActions";
import styles from "../../styles/Home.module.css";
import {
  TravellersIcon,
  WalletIcon,
  ProfileIcon,
  BookingIcon,
  PasswordIcon,
  InvoiceLargeIcon,
  EditIcon,
  InfoIcon,
  ArrowRightIcon,
} from "../UI/Icons";
import Logout from "./Logout";
import CreateAccountContentForm from "../Layout/CreateAccount/CreateAccountContentForm";
import RequireAuth from "../../utils/requireAuth";

class AsideMyAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    if (!this.props.auth.user.userName) await this.props.getUserProfile();
  }

  render() {
    const { t } = this.props;

    return (
      <>
        {this.props.auth && this.props.auth.isAuthenticated ? (
          <div
            className={`${styles.asideMyAccount} ${
              process.env.THEME_NAME === "TRAVELO" &&
              styles.asideMyAccountTravelo
            }`}
          >
            <div className={styles.detailMyAccount}>
              <div className={styles.profileIcon}>
                <InvoiceLargeIcon />
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.profileInfoName}>
                  <span>{t("hello")}</span>
                  <span>
                    {this.props.auth.user.firstName
                      ? this.props.auth.user.firstName
                      : t("dear-user")}
                  </span>
                </div>
                <span className={styles.profileInfoEmail}>
                  {this.props.auth.user.emailAddress}
                </span>
              </div>
              <Link as="/myaccount/profile" href="/myaccount/profile">
                <a className={styles.linkProfileInfo}>
                  <EditIcon />
                  <span>{t("edit-profile")}</span>
                </a>
              </Link>
            </div>

            {this.props.auth.user.emailAddress &&
            !this.props.auth.user.isEmailConfirmed ? (
              <div className={styles.warningConfirmAccount}>
                <InfoIcon />
                {t("confirm-email")}
              </div>
            ) : (
              ""
            )}

            <Link as="/myaccount/booking" href="/myaccount/booking">
              <a className={styles.linkProfileBooking}>
                <BookingIcon />
                <div className={styles.arrowOutlined}>
                  <span>{t("my-reserve")}</span>
                  <ArrowRightIcon />
                </div>
              </a>
            </Link>

            <Link as="/myaccount/wallet" href="/myaccount/wallet">
              <a className={styles.linkProfileWallet}>
                <WalletIcon />
                <div className={styles.arrowOutlined}>
                  <span>{t("money-bag")}</span>
                  <ArrowRightIcon />
                </div>
              </a>
            </Link>

            <div className={styles.moreMyAccount}>
              <Link as="/myaccount/profile" href="/myaccount/profile">
                <a className={styles.linkProfile}>
                  <ProfileIcon />
                  <div className={styles.contentLinkProfile}>
                    <div className={styles.contentLinkProfileText}>
                      <h4>{t("profile")}</h4>
                      <span>{t("visit-edit-account-informaion")}</span>
                    </div>
                    {this.props.auth.user.isEmailConfirmed ||
                    this.props.auth.user.isPhoneNumberConfirmed ? null : (
                      <div className={styles.warningConfirmAccountIcon}>
                        <InfoIcon />
                      </div>
                    )}
                    <ArrowRightIcon />
                  </div>
                </a>
              </Link>
              {/* <Link as="/myaccount/travellers" href="/myaccount/travellers">
                            <a className={styles.linkProfile}>
                                <TravellersIcon/>
                                <div className={styles.contentLinkProfile}>
                                    <div className={styles.contentLinkProfileText}>
                                        <h4>{t('passengers')}</h4>
                                        <span>{t("add-passenger-informaion")}</span>
                                    </div>
                                    <ArrowRightIcon />        
                                </div>
                            </a>
                        </Link> */}
              <Link as="/myaccount/password" href="/myaccount/password">
                <a className={styles.linkProfile}>
                  <PasswordIcon />
                  <div className={styles.contentLinkProfile}>
                    <div className={styles.contentLinkProfileText}>
                      <h4>{t("password")}</h4>
                      <span>{t("change-password")}</span>
                    </div>
                    <ArrowRightIcon />
                  </div>
                </a>
              </Link>

              <Logout />
            </div>
          </div>
        ) : (
          <CreateAccountContentForm />
        )}
      </>
    );
  }
}

AsideMyAccount.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

AsideMyAccount.propTypes = {
  t: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

const mapDispatchToProps = (dispatch) => ({
  logout: (params) => dispatch(logout(params)),
  getUserProfile: () => dispatch(userProfile()),
});

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProps)(AsideMyAccount)
);
