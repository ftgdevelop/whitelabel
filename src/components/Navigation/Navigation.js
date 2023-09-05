import React from "react";
import PropTypes from "prop-types";
import { Link, i18n, withTranslation } from "../../../i18n";
import { withRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import {
  BlogIcon,
  HotelIcon,
  FlightIcon,
  TickerIcon,
  CipIcon,
  BusIcon,
  TrainIcon,
  InsuranceIcon,
  DrivingLicenceIcon,
  JetIcon,
  CompanyIcon,
  CarIcon,
  InvestmentIcon,
  HealthIcon,
  StudentIcon,
  TaxiIcon,
  MoreIcon,
} from "../UI/Icons";
const tomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
const soTomorrowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 2000);
const dayt = tomorrowDate.getDate();
const montht = tomorrowDate.getMonth() + 1;
const yeart = tomorrowDate.getFullYear();
const dayst = soTomorrowDate.getDate();
const monthst = soTomorrowDate.getMonth() + 1;
const yearst = soTomorrowDate.getFullYear();
const tehranUrl = `/hotels/تهران/location-164/checkin-${yeart}-${montht}-${dayt}/checkout-${yearst}-${monthst}-${dayst}/adult-1`;
const istanbulUrl = `/hotels-foreign/Istanbul/location-75286/checkin-${yeart}-${montht}-${dayt}/checkout-${yearst}-${monthst}-${dayst}/adult-1`;
const tehranmashadUrl = `/flights/THR-MHD?adult=1&child=0&infant=0&step=results&departing=${yeart}-${montht}-${dayt}`;

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tehranUrl: tehranUrl,
      istanbulUrl: istanbulUrl,
      tehranmashadUrl: tehranmashadUrl,
      navigationClass: "",
      myurl: "",
    };
  }

  listenScrollEvent = (e) => {
    if (window.scrollY > 120) {
      this.setState({ navigationClass: "navigationHide" });
    } else {
      this.setState({ navigationClass: "" });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
    this.setState({
      myurl: this.props.router.pathname,
    });
  }

  render() {
    const { t } = this.props;

    return (
      <>
        <div
          className={`${styles.mainNavigation} ${this.state.navigationClass}`}
        >
          <nav>
            <ul>
              <li>
                <Link as="/hotels-home" href="/hotels-home">
                  <a
                    className={
                      this.state.myurl === "/hotels-home"
                        ? styles.activeNavigation
                        : null
                    }
                  >
                    <HotelIcon />
                    <span className="margin-start-5">{t("domestic-hotels")}</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link as="/flights-home" href="/flights-home">
                  <a
                    className={
                      this.state.myurl === "/flights-home"
                        ? styles.activeNavigation
                        : null
                    }
                  >
                    <FlightIcon />
                    <span className="margin-start-5">{t("domestic-flight")}</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link as="/hotels-foreign-home" href="/hotels-foreign-home">
                  <a
                    className={
                      this.state.myurl === "/hotels-foreign-home"
                        ? styles.activeNavigation
                        : null
                    }
                  >
                    <HotelIcon />
                    <span className="margin-start-5">{t("foreign-hotels")}</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link as="/flights-foreign-home" href="/flights-foreign-home">
                  <a
                    className={
                      this.state.myurl === "/flights-foreign-home"
                        ? styles.activeNavigation
                        : null
                    }
                  >
                    <FlightIcon />
                    <span className="margin-start-5">{t("foreign-flight")}</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link as="/cip-home" href="/cip-home">
                  <a
                    className={
                      this.state.myurl === "/cip-home"
                        ? styles.activeNavigation
                        : null
                    }
                  >
                    <CipIcon />
                    <span className="margin-start-5">{t("cip")}</span>
                  </a>
                </Link>
              </li>
              <li>
                  <Link as="/bus" href="/bus">
                      <a className={this.state.myurl === "/bus" ? styles.activeNavigation : null}>
                          <BusIcon />
                          <span className="margin-start-5">{t("bus")}</span>
                      </a>
                  </Link>
              </li>
              <li>
                <Link as="/blog" href="/blog">
                  <a
                    className={
                      this.state.myurl === "/blog"
                        ? styles.activeNavigation
                        : null
                    }
                  >
                    <BlogIcon />
                    <span className="margin-start-5">{t("blog")}</span>
                  </a>
                </Link>
              </li>

              {/* <li>
                                <Link as="/" href="/">
                                    <a>
                                        <FlightIcon />
                                        <span>{t("foreign-flight")}</span>
                                        <small>{t("coming-soon")}</small>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link as="/" href="/">
                                    <a>
                                        <TrainIcon />
                                        <span>{t("train")}</span>
                                        <small>{t("coming-soon")}</small>
                                    </a>
                                </Link>
                            </li>
                            {/* <li>
                                <Link as="/offers" href="/offers">
                                    <a>
                                        <TickerIcon />
                                        <span>{t('offers')}</span>
                                    </a>
                                </Link>
                            </li> */}
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

Navigation.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

Navigation.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withRouter(withTranslation("common")(Navigation));
