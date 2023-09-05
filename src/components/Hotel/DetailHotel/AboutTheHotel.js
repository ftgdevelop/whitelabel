import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { Row, Col, Skeleton } from 'antd'
import parse from 'html-react-parser'

import styles from '../../../styles/Hotel.module.css'

const AboutTheHotel = props => {
    const { t } = props;

    const [projectName,setProjectName] = useState();
    const [projectAddress,setProjectAddress] = useState();

    useEffect(()=>{
        setProjectAddress(window.location.origin);

        let project = window.localStorage.whiteLabelProjectName;
        setProjectName(project);
    },[]);

    const getPortalValue = (dataArray, keyword) => {
        const itemIndex = dataArray.findIndex((item) => item.Keyword === keyword);
          if (itemIndex !== -1 && dataArray[itemIndex]) {
            return dataArray[itemIndex];
          } else {
            return null;
          }
      }
    let portalName; 
    if( props.portalInfo){
        portalName=getPortalValue(props.portalInfo.Phrases,"Name")['Value'];        
    } 

    return (
        <div
            className={`${styles.aboutTheHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.aboutTheHotelTravelo}`}
            id="anchoraboutthehotel"
            >
            <div className={styles.container}>
                <div className={styles.subjectAboutTheHotel}>
                    {t('about-hotel')}
                </div>
                {
                    props.loading?
                    <div className={styles.contentAboutTheHotel}>
                        <Row>
                            <Col xs={12}>
                                <Skeleton active className={styles.textAboutTheHotelSkeleton} />
                            </Col>
                            <Col xs={12}>
                                <Skeleton.Button active size="small" className={styles.subjectGuestReviewsSkeleton} />
                                <Skeleton.Button active size="small" className={styles.dateAboutTheHotelSkeleton} />
                                <Skeleton.Button active size="small" className={styles.dateAboutTheHotelSkeleton} />
                            </Col>
                        </Row>
                    </div>
                    :
                    <div className={styles.contentAboutTheHotel}>
                        <Row gutter={[20,20]}>
                            {/* <Col xs={24} md={(props.hotelDetails && props.hotelDetails.Policies && (props.hotelDetails.Policies.length === 0)) ? 24 : 24} className="text-justify">
                                {props.hotelDetails && props.hotelDetails.Content ?
                                    parse(`${props.hotelDetails.Content
                                        .replace(/سفرانه/g, portalName ? portalName : projectName)
                                        .replace(/https:\/\/safaraneh.com\/fa\/hotels\/%d8%b1%d8%b2%d8%b1%d9%88-%d9%87%d8%aa%d9%84/g, "/")
                                        .replace(/http:\/\/www.safaraneh.com/g, projectAddress)
                                        .replace(/https:\/\/safaraneh.com/g, projectAddress)}`)
                                    : null}
                            </Col> */}
                            <Col xs={24} md={(props.hotelAccommodation && props.hotelAccommodation.description &&(props.hotelAccommodation.description.length === 0))?24:24} className="text-justify">
                                {props.hotelAccommodation && props.hotelAccommodation.description ?
                                    parse(`${props.hotelAccommodation.description
                                        .replace(/سفرانه/g, portalName ? portalName : projectName)
                                        .replace(/https:\/\/safaraneh.com\/fa\/hotels\/%d8%b1%d8%b2%d8%b1%d9%88-%d9%87%d8%aa%d9%84/g, "/")
                                        .replace(/http:\/\/www.safaraneh.com/g, projectAddress)
                                        .replace(/https:\/\/safaraneh.com/g, projectAddress)}`)
                                    : null}
                            </Col>
                            {/* {props.hotelDetails && props.hotelDetails.Policies &&( props.hotelDetails.Policies.length > 0) && <Col xs={24} md={24}>
                            <h4>{t('enter-exit-time')}</h4>
                            {props.hotelDetails.Policies.map(PolicyItem=><p key={PolicyItem.Keyword}>{PolicyItem.Title} : {PolicyItem.Description}</p>)}
                            </Col>} */}
                        </Row>
                    </div>
                }
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
        portalInfo: state.portal.portalData,
    };
};

export default withTranslation('common')(connect(mapStateToProp)(AboutTheHotel))
    
