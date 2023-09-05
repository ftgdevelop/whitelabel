import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { i18n, withTranslation } from "../../../../../i18n";

import styles from "../../../../styles/Bus.module.css";
import SortBusList from "./SortBusList";
import BusListCard from "./BusListCard/BusListCard";

const BusListContent = (props) => {
  const { t, busList } = props;
  const [count, setCount] = useState(10);

  useEffect(() => {
    const handleScroll = (event) => {
      var y = window.scrollY;
      if (y + 1300 > event.srcElement.body.scrollHeight) {
        if (count + 10 < busList.length) setCount(count + 10);
        else {
          setCount(busList.length);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    busList.length && busList.length < 10
      ? setCount(busList.length)
      : setCount(10);
  }, [props.sortby]);

  useEffect(() => {
    busList.length && busList.length < 10
      ? setCount(busList.length)
      : setCount(10);
  }, [props.busList.length]);

  return (
    <>
      <div className={styles.flightListContent}>
        <SortBusList changeSort={props.changeSort} />

        {/* <div>
            <span> {t("first-choose-departure-ticket")}</span>
            <span> {t('first-choose-arrival-ticket')}</span>
        </div>  */}

        <div className={styles.flightResultList}>
          {props.busList?.length && (
            props.busList.slice(0, count).map((bus,index) => (
              <BusListCard bus={bus} key={index} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

BusListContent.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

BusListContent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation("common")(BusListContent);
