import React, { Children } from "react";
import PropTypes from "prop-types";
import { Link, withTranslation, i18n } from "../../../../i18n";
import { useRouter } from "next/router";
import { Skeleton } from "antd";
import moment from "moment-jalaali";

import styles from "../../../styles/Hotel.module.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { InfoIcon } from "../../UI/Icons";

const HotelName = (props) => {
  const { t } = props;
  const router = useRouter();

  let listUrl;
  const searchInfo = router.asPath;

  if (props.hotelDetails && searchInfo) {
    let checkin,
      checkout,
      guests = "";

    if (searchInfo.includes("checkin-")) {
      checkin = searchInfo.split("checkin-")[1].split("/")[0];

      if (searchInfo.includes("checkout-")) {
        checkout = searchInfo.split("checkout-")[1].split("/")[0];
      } else {
        checkout = moment(checkin).add(1, "day").format("YYYY-MM-DD");
      }
    } else {
      checkin = moment().format("YYYY-MM-DD");
      checkout = moment().add(1, "day").format("YYYY-MM-DD");
    }

    if (searchInfo.includes("adult-")) {
      guests += "adult-" + searchInfo.split("adult-")[1].split("/")[0];
      let ChildrenAges = searchInfo.split("child-");
      ChildrenAges.shift();
      for (let i = 0; i < ChildrenAges.length; i++) {
        const age = ChildrenAges[i].split("/")[0];
        guests += `/child-${age}`;
      }
    } else {
      guests = "adult-1";
    }

    if (i18n.language === "fa") {
      listUrl = `/hotels/هتل-های-${props.hotelDetails.CityName}/location-${props.hotelDetails.CityId}/checkin-${checkin}/checkout-${checkout}/${guests}`;
    } else if (i18n.language === "ar") {
      listUrl = `/hotels/فنادق-${props.hotelDetails.CityName}/location-${props.hotelDetails.CityId}/checkin-${checkin}/checkout-${checkout}/${guests}`;
    } else {
      listUrl = `/hotels/هتل-های-${props.hotelDetails.CityName}/location-${props.hotelDetails.CityId}/checkin-${checkin}/checkout-${checkout}/${guests}`;
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.hotelNameBackLink}>
        {props.hotelDetails && props.hotelDetails.IsCovid && (
          <div className={styles.alertCovid}>
            <div className={styles.text}>
              {/* <span>
                <svg>
                  <path
                    fillRule="evenodd"
                    d="M23 21L12 2 1 21h22zm-12-3v-2h2v2h-2zm0-4h2v-4h-2v4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span> */}
              <span>
                <svg
                  focusable="false"
                  className="icon anticon svg-icon"
                  color="inherit"
                  fill="currentcolor"
                  aria-hidden="true"
                  role="presentation"
                  viewBox="0 0 13 13"
                  preserveAspectRatio="xMidYMid meet"
                  size="16"
                  width="16"
                  height="16"
                  style={{ width: 18 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.502 7.498c1.286 1.287 2.776 2.516 3.365 1.927.843-.843 1.363-1.577 3.221-.083 1.86 1.494.432 2.49-.385 3.307-.943.942-4.456.05-7.929-3.423C.302 5.753-.592 2.24.352 1.296 1.168.48 2.164-.946 3.658.913c1.494 1.858.76 2.378-.084 3.22-.588.59.641 2.08 1.928 3.366z"
                  ></path>
                </svg>
              </span>
              <span>
                جهت رزرو با شماره <a
                  href="tel:+982179515000"
                  style={{ color: "#ffffff", fontWeight: 700, fontSize: 14, textDecoration: "underline" }}
                >02179515000</a> تماس بگیرید.
              </span>
              {/* <span>
                این هتل اقدامات احتیاطی کووید-۱۹ را برای اطمینان از سلامت و
                ایمنی مهمانان تعیین کرده است.
              </span> */}
            </div>
          </div>
        )}

        <div className={styles.content}>
          {listUrl ? (
            <>
              <Link as={listUrl} href={listUrl}>
                <a>
                  <ArrowRightOutlined />
                  <span>
                    مشاهده {t("hotels-of")}
                    {props.hotelDetails.CityName}
                  </span>
                </a>
              </Link>
              {/* <div className={styles.callPhoneNumber}>
                <span>شماره تلفن رزرو : </span>
                <a href="tel:+982179515000">02179515000</a>
              </div> */}
            </>
          ) : (
            <>
              <Skeleton.Button
                active
                size="small"
                className={styles.skeletonHotelNameBackLink}
              />
              {/* <div className={styles.callPhoneNumber}>
                <Skeleton.Button
                  active
                  size="small"
                  className={styles.skeletonHotelNameBackLink}
                />
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

HotelName.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

HotelName.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(HotelName);
