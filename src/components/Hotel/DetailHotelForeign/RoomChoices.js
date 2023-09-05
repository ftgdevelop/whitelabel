import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { i18n, withTranslation, Link } from '../../../../i18n'
import {Row, Col, Skeleton} from 'antd'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Hotel.module.css'
import {ClockCircleOutlined } from '@ant-design/icons'

const SingleRoom = dynamic(() => import('./SingleRoom'))
const MultipleRoom = dynamic(() => import('./MultipleRoom'))


const RoomChoices = props => {

    const { t } = props;  
    
    const [selectedRoomBookingToken,setSelectedRoomBookingToken] = useState(); 

    return (
        <div className={styles.roomChoices} id="anchorroomchoices">
            <div className={styles.container}>
                <div className={styles.subjectRoomChoices}>
                    {t("choose-room")}
                </div>
                <div className={styles.contentRoomChoices}>
                    
                    {
                        (props.hotelDetails)?
                            (props.hotelDetails.availabilities && props.hotelDetails.availabilities.length>0)?
                                (props.isSingleRoom)?
                                // single room
                                    props.hotelDetails.availabilities.map(item=><SingleRoom 
                                        key={item.rates[0].bookingToken}
                                        preReserve={(key)=>{
                                                setSelectedRoomBookingToken(key);
                                                props.preReserve(key);
                                            }
                                        } 
                                        nights={props.nights} 
                                        roomInfo={item.rooms[0]} 
                                        ratesInfo={item.rates}
                                        selectedRoomBookingToken={selectedRoomBookingToken} 
                                    />)
                                :
                                // multipple room
                                props.hotelDetails.availabilities.map((item,index)=><MultipleRoom 
                                    key={index} 
                                    preReserve={(key)=>{
                                        setSelectedRoomBookingToken(key);
                                        props.preReserve(key);
                                        }
                                    } 
                                    roomInfo={item.rooms} 
                                    nights={props.nights}  
                                    ratesInfo={item.rates} 
                                    selectedRoomBookingToken={selectedRoomBookingToken} 
                                />)
                            :
                            <div className={styles.noRoomsAvailableCard}>
                                <div className={styles.noRoomsAvailableInner}>
                                    <Row >
                                        <Col flex="25px"><ClockCircleOutlined className="red" /></Col>
                                        <Col flex="auto">
                                            <h4 className={`red ${styles.noRoomsAvailableTitle}`}>{t("no-room")}</h4>
                                            <p>
                                            {t("no-room-change-date")}
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        :
                        <>
                            <div className={styles.cardRoomChoices}>
                                <h3><Skeleton.Button active size="small" className={styles.roomChoicesName} /></h3>
                                <div className={styles.contentCardRoomChoices}>
                                    <div className={`margin-end-10 ${styles.imageCardRoomChoices}`}>
                                        {/* <div className={styles.imageRoom}>
                                            <Skeleton.Image className={styles.roomChoicesImageSkeleton} />
                                        </div> */}
                                        <div className={styles.facilitiesRoom}>
                                            <ul className="font-12">
                                                <li>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                </li>
                                                <li>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                </li>
                                                <li>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                </li>
                                                <li>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={styles.bedCardRoomChoices}>
                                        <div className={styles.bedRoomPackage}>
                                            <div className={styles.bedRoomPackageName}>
                                                <div className={styles.bedRoomSubject}>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesSubjectSmallSkeleton} />
                                                </div>
                                                <div className={styles.bedRoomDetailPackage}>
                                                    <ul className={styles.detailPackageList}>
                                                        <li>
                                                            <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                        </li>
                                                        <li>
                                                            <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                        </li>
                                                        <li>
                                                            <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className={styles.bedRoomPackageCount}>
                                                <div className={styles.bedRoomSubject}>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesSubjectSmallSkeleton} />
                                                </div>
                                                <div className={styles.detailPackageCount}>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesPackageSkeleton} />
                                                </div>
                                            </div>
                                            <div className={styles.bedRoomPackagePrice}>
                                                <div className={styles.bedRoomSubject}>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesSubjectSmallSkeleton} />
                                                </div>
                                                <div className={styles.detailPackageCount}>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesPackageSkeleton} />
                                                </div>
                                            </div>
                                            <div className={styles.bedRoomPackageBtn}>
                                                <Skeleton.Input active size="large" className={styles.roomChoicesBtnForeginSkeleton} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cardRoomChoices}>
                                <h3><Skeleton.Button active size="small" className={styles.roomChoicesName} /></h3>
                                <div className={styles.contentCardRoomChoices}>
                                    <div className={`margin-end-10 ${styles.imageCardRoomChoices}`}>
                                        {/* <div className={styles.imageRoom}>
                                            <Skeleton.Image className={styles.roomChoicesImageSkeleton} />
                                        </div> */}
                                        <div className={styles.facilitiesRoom}>
                                            <ul className="font-12">
                                                <li>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                </li>
                                                <li>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                </li>
                                                <li>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                </li>
                                                <li>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={styles.bedCardRoomChoices}>
                                        <div className={styles.bedRoomPackage}>
                                            <div className={styles.bedRoomPackageName}>
                                                <div className={styles.bedRoomSubject}>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesSubjectSmallSkeleton} />
                                                </div>
                                                <div className={styles.bedRoomDetailPackage}>
                                                    <ul className={styles.detailPackageList}>
                                                        <li>
                                                            <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                        </li>
                                                        <li>
                                                            <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                        </li>
                                                        <li>
                                                            <Skeleton.Button active size="small" className={styles.roomChoicesFacilitiesSkeleton} />
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className={styles.bedRoomPackageCount}>
                                                <div className={styles.bedRoomSubject}>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesSubjectSmallSkeleton} />
                                                </div>
                                                <div className={styles.detailPackageCount}>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesPackageSkeleton} />
                                                </div>
                                            </div>
                                            <div className={styles.bedRoomPackagePrice}>
                                                <div className={styles.bedRoomSubject}>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesSubjectSmallSkeleton} />
                                                </div>
                                                <div className={styles.detailPackageCount}>
                                                    <Skeleton.Button active size="small" className={styles.roomChoicesPackageSkeleton} />
                                                </div>
                                            </div>
                                            <div className={styles.bedRoomPackageBtn}>
                                                <Skeleton.Input active size="large" className={styles.roomChoicesBtnForeginSkeleton} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

RoomChoices.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
RoomChoices.propTypes = {
t: PropTypes.func.isRequired,
}
  
  
const mapStateToProp = (state) => {
    return {
      hotelDetails: state.hotel.foreignHotelDetail
    };
};

export default withTranslation('common')(connect(mapStateToProp)(RoomChoices))
