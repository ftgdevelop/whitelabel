import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { withTranslation, Link, i18n } from '../../../../i18n'
import { Row, Col, Skeleton } from 'antd'

import styles from '../../../styles/Hotel.module.css'

const AboutTheHotel = props => {

    const { t } = props;
    return (
        <div
            className={`${styles.aboutTheHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.aboutTheHotelTravelo}`}
            id="anchoraboutthehotel"
            >
            <div className={styles.container}>
                <div className={styles.subjectAboutTheHotel}>
                    {t("about-hotel")}
                </div>
                <div className={styles.cardStyle} dir="ltr">
                    {
                        props.hotelDetails?
                        // {props.hotelDetails &&
                        props.hotelDetails.paragraphs.map(item=><div key={item.title}>
                        <h4 className="normal-title">{item.title}</h4>
                        <p>{item.para}</p>
                        </div>)
                        // }
                        :
                        <>
                            <Row>
                                <Col xs={12}>
                                    <Skeleton active className={styles.textAboutTheHotelForeignSkeleton} />
                                    <Skeleton active className={styles.textAboutTheHotelForeignSkeleton} />
                                    <Skeleton active className={styles.textAboutTheHotelForeignSkeleton} />
                                    <Skeleton active className={styles.textAboutTheHotelForeignSkeleton} />
                                </Col>
                            </Row>
                        </>
                    }
                </div>
            </div>
        </div>
    )

}

AboutTheHotel.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AboutTheHotel.propTypes = {
t: PropTypes.func.isRequired,
}
  
const mapStateToProp = (state) => {
    return {
      hotelDetails: state.hotel.foreignHotelDetail
    };
  };

export default withTranslation('common')(connect(mapStateToProp)(AboutTheHotel))
