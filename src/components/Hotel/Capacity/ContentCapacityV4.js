import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Router, Link, i18n } from '../../../../i18n';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';
import { HotelV4DomesticGetReserve } from '../../../actions';
import styles from '../../../styles/Home.module.css';
import { HostelIcon, RemoveOutlineIcon, SupportIcon } from '../../UI/Icons';

const CountDown = dynamic(() => import('../../UI/CountDown/CountDown'));
const SimilarHotels = dynamic(() => import('./SimilarHotels'));

const ContentCapacityV4 = ({ t, router }) => {
  const [reserveInfo, setReserveInfo] = useState(undefined);
  const [remainedSeconds, setRemainedSeconds] = useState(600);

  const fetchData = async () => {
    const path = router.asPath;
    const reserveId = router.query.reserveId;
    const username = path.split('username=')[1].split('&')[0].split('#')[0];
    const response = await HotelV4DomesticGetReserve(reserveId, username);

    if (response.data) {
      if (!reserveInfo) {
        setReserveInfo(response.data.result);
      } else {
        if (response.data.result.reserveStatus !== reserveInfo.reserveStatus) {
          setReserveInfo(response.data.result);
        }
      }
      if (response.data.result.status === 'Pending') {
        Router.push(`/payment?reserveId=${reserveId}&username=${username}`);
      }
    }
  };

  const countDownTimer = () => {
    if (remainedSeconds > 0) {
      setRemainedSeconds((prevSeconds) => prevSeconds - 1);
    } else {
      clearInterval(timerInterval);
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      countDownTimer();
    }, 1000);

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className={styles.contentCapacity}>
        {reserveInfo && (reserveInfo.reserveStatus === 13 || reserveInfo.reserveStatus === 8) ? null : (
          <CountDown seconds={remainedSeconds} />
        )}

        <br />
        {remainedSeconds > 0 ? (
          reserveInfo && (reserveInfo.reserveStatus === 13 || reserveInfo.reserveStatus === 8) ? (
            <div className={styles.textStatusTop}>{t('capacity-full-desc')}</div>
          ) : (
            <div className={styles.textStatusBottom}>{t('capacity-checking-desc')}</div>
          )
        ) : (
          <div className={styles.textStatusTop}>{t('capacity-sorry-waiting')}</div>
        )}

        <div className={styles.statusCapacity}>
          {reserveInfo && (reserveInfo.reserveStatus === 13 || reserveInfo.reserveStatus === 8) ? (
            <div className={styles.loading}>
              <div className={styles.brand}>
                <SupportIcon />
              </div>
              <div className={styles.dot}>
                <div className={styles.outIcon}>
                  <RemoveOutlineIcon />
                </div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={styles.icon}>
                <HostelIcon />
              </div>
            </div>
          ) : (
            <div className={styles.loading}>
              <div className={styles.brand}>
                <SupportIcon />
              </div>
              <div className={styles.dot}>
                <div className={styles.redDot}></div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={styles.icon}>
                <HostelIcon />
              </div>
            </div>
          )}
        </div>

        <div className={styles.reserveCode}>
          <span>{t('with-this-code')}</span>
          <div className={styles.myCode}>
            <span>
              {t('tracking-code')} :{reserveInfo ? <b> {reserveInfo.id} </b> : <Spin />}
            </span>
          </div>
        </div>
      </div>

      {reserveInfo && reserveInfo.reserveStatus === 13 ? <SimilarHotels hotelReserveInfo={reserveInfo} /> : null}
    </>
  );
};

ContentCapacityV4.propTypes = {
  t: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
};

export default withRouter(withTranslation('common')(ContentCapacityV4));