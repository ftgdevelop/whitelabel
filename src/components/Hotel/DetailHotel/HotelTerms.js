import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { Row, Col, Skeleton } from 'antd'

import styles from '../../../styles/Hotel.module.css'
import Image from 'next/image'

const HotelTerms = props => {
    const { t } = props;

    return (
        props.hotelDetails ?
        <div
            className={`${styles.termsHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.termsHotelTravelo}`}
            id="anchorterms"
            >
            <div className={styles.container}>
                <div className={styles.subjectTermsHotel}>
                    {t('terms')}
                </div>
                <div className={styles.contentTermsHotel}>
                    <h4>{t('hotel-terms')}</h4>
                        <Row justify="space-between" gutter={[20, 0]} className="margin-top-small">
                            {props.hotelDetails.Policies.length ? <><Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                <div>
                                    {props.hotelDetails && props.hotelDetails.Policies && <>
                                        {props.hotelDetails.Policies.map(PolicyItem=><div key={PolicyItem.Keyword}>
                                            <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                                                <Col className="content-terms-hotel-root">
                                                    {/* <img src={PolicyItem.Image} alt={PolicyItem.Title} /> */}
                                                    <Image 
                                                        width={24}  
                                                        height={24}  
                                                        src={PolicyItem.Image}
                                                        alt={PolicyItem.Title}
                                                        title={PolicyItem.Title}
                                                    />
                                                    <span>{PolicyItem.Title}</span>
                                                </Col>
                                                <Col><span>{PolicyItem.Description}</span></Col>
                                            </Row>
                                            </div>)}</>}
                                </div>
                            </Col>
                            <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                                {props.hotelAccommodation && props.hotelAccommodation.instruction && <div dangerouslySetInnerHTML={{__html: props.hotelAccommodation.instruction.replace('\r\n', ``)}} />}
                                {props.hotelAccommodation && props.hotelAccommodation.mendatoryFee && <div dangerouslySetInnerHTML={{__html: props.hotelAccommodation.mendatoryFee.replace('\r\n', ``)}} />}
                            </Col></> :<Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                {props.hotelAccommodation && props.hotelAccommodation.instruction && <div dangerouslySetInnerHTML={{__html: props.hotelAccommodation.instruction.replace('\r\n', ``)}} />}
                                {props.hotelAccommodation && props.hotelAccommodation.mendatoryFee && <div dangerouslySetInnerHTML={{__html: props.hotelAccommodation.mendatoryFee.replace('\r\n', ``)}} />}
                            </Col>}
                        </Row>
                </div>
            </div>
        </div>
        :
        <div
        className={`${styles.termsHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.termsHotelTravelo}`}
            >
            <div className={styles.container}>
                <div className={styles.subjectTermsHotel}>
                    {t('terms')}
                </div>
                <div className={styles.contenttermsHotel}>
                    <div>
                        <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                            <Col>
                                <Skeleton.Button active size="small" className={styles.attractionsHotelSkeleton} />
                            </Col>
                            <Col>
                                <Skeleton.Button active size="small" className={styles.carAttractionsHotelSkeleton} />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                            <Col>
                                <Skeleton.Button active size="small" className={styles.attractionsHotelSkeleton} />
                            </Col>
                            <Col>
                                <Skeleton.Button active size="small" className={styles.carAttractionsHotelSkeleton} />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row justify="space-between" gutter={[20,0]} className="margin-top-small">
                            <Col>
                                <Skeleton.Button active size="small" className={styles.attractionsHotelSkeleton} />
                            </Col>
                            <Col>
                                <Skeleton.Button active size="small" className={styles.carAttractionsHotelSkeleton} />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

HotelTerms.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelTerms.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(HotelTerms)
