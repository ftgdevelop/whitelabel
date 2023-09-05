import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { i18n, withTranslation } from "../../../../i18n";
import { useRouter } from "next/router";
import { Row, Col, Skeleton, Drawer, Button } from "antd";
import { Line } from "rc-progress";
import { FilterFilled } from "@ant-design/icons";
import _ from "lodash";
import styles from "../../../styles/Flight.module.css";
import FlightListFilter from "./FlightListForeignFilter/FlightListForeignFilter";
import FlightListForeignContent from "./FlightListForeignContent/FlightListForeignContent";
import DatePersion from "../../UI/DatePersion/DatePersion";
import { ArrowRightIcon, ArrowLeftIcon, RemoveIcon } from "../../UI/Icons";
import FlightNoAvailable from "./FlightListForeignContent/FlightNoAvailable";
import FlightFilterSelected from "./FlightFilterSelected/FlightFilterSelected";
import SearchFlightForeign from "../SearchFlightForeign/SearchFlightForeign";
import { FetchPath } from "../../../actions/flight/Flight";
import Modal from "../../UI/modal";

const FlightListForeign = (props) => {
  const { t, flightTotal, isCompleted, FetchPath, pathSelected } = props;
  const [isShowing, setIsShowing] = useState(false);
  const router = useRouter();
  const path = router.query.index.split("-");

  const getPath = async () => {
    await FetchPath(path[0]);
    FetchPath(path[1]);
  };

  useEffect(() => {
    getPath();
  }, [router.query]);

  const openModalHandler = () => {
    setIsShowing(true);
  };

  const closeModalHandler = () => {
    setIsShowing(false);
  };

  return (
    <div className={styles.flightList}>
      <Modal className="modal" show={isShowing} close={closeModalHandler}>
        <SearchFlightForeign />
      </Modal>
      {isShowing && (
        <div onClick={closeModalHandler} className={styles.back_drop}></div>
      )}
      <div className={styles.container}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={6} xl={6}>
            <FlightListFilter />
          </Col>

          <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <div className={styles.showMySearch}>
              <div className={styles.mySearchOD}>
                <div className={styles.mySearchOrigin}>
                  <div className={styles.labelOrigin}>{path[0]}</div>
                  <div className={styles.citytOrigin}>
                    {pathSelected && pathSelected[0]
                      ? pathSelected[0].name.split(",")[0]
                      : ""}
                  </div>
                </div>
                <div className={styles.middleIcon}>
                  <ArrowLeftIcon />
                </div>
                <div className={styles.mySearchDestination}>
                  <div className={styles.labelDestination}>{path[1]}</div>
                  <div className={styles.cityDestination}>
                    {pathSelected && pathSelected[1]
                      ? pathSelected[1].name.split(",")[0]
                      : ""}
                  </div>
                </div>
              </div>

              <div className={styles.mySearchDR}>
                <div className={styles.mySearchDeparting}>
                  <div className={styles.labelDeparting}>
                    {t("departure-time")}
                  </div>
                  <div className={styles.dateDeparting}>
                    {" "}
                    <DatePersion date={router.query.departing} />
                  </div>
                </div>
                {router.query.returning && (
                  <div className={styles.mySearchReturning}>
                    <div className={styles.labelReturning}>
                      {t("تاریخ برگشت")}
                    </div>
                    <div className={styles.dateReturning}>
                      <DatePersion date={router.query.returning} />
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.mySearchPC}>
                <div className={styles.mySearchPassenger}>
                  <div className={styles.labelPassenger}>{t("مسافران")}</div>
                  <div className={styles.countPassenger}>
                    {Number(router.query.adult) +
                      Number(router.query.child) +
                      Number(router.query.infant)}
                  </div>
                </div>
                {/* <div className={styles.mySearchCabin}>
                  <div className={styles.labelCabin}>{t("cabin")}</div>
                  <div className={styles.typeCabin}>{t("economy")}</div>
                </div> */}
              </div>

              <div className={styles.mySearchBtn}>
                <button onClick={openModalHandler}>{t("change-search")}</button>
              </div>
            </div>
            <FlightFilterSelected />
            {/* <div className={styles.filterSortFlightList}>
              <div className={styles.sortAndDay}>
                <div className={styles.nextBackDay}>
                  <div
                    className={styles.backDay}
                    onClick={() => nextDay("prev")}
                  >
                    <ArrowRightIcon />
                    {t("previous-day")}
                  </div>
                  <div className={styles.nowDay}>دوشنبه 25 اسفند</div>
                  <div
                    className={styles.nextDay}
                    onClick={() => nextDay("next")}
                  >
                    {t("next-day")}
                    <ArrowRightIcon />
                  </div>
                </div>
              </div>
            </div> */}
            <FlightListForeignContent />
            {isCompleted && !flightTotal && (
              <FlightNoAvailable
                subjectText={t("no-flight-available")}
                helpText={t("see-other-date")}
                btnText={t("change-search")}
                handler={openModalHandler}
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

FlightListForeign.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

FlightListForeign.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    keyAvailability: state.flightForeign.keyAvailability,
    flights: state.flightForeign.flights,
    fetchingKey: state.flightForeign.fetchingKey,
    isCompleted: state.flightForeign.isCompleted,
    error: state.flightForeign.error,
    flightTotal: state.flightForeign.flightTotal,
    pathSelected: state.flightForeign.pathSelected,
  };
};

const mapDispatchToProp = {
  FetchPath,
};

export default withTranslation("common")(
  connect(mapStateToProps, mapDispatchToProp)(FlightListForeign)
);
