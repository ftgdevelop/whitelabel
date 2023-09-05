import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Form, Row, Col, Select, Button } from 'antd';

import styles from '../../../styles/Cip.module.css'
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons';

const Services = props => {
    const { t, availabilityService, serviceSelected, serviceListSelected, addService, selectedAvailabilityServices } = props;
    
    const [petCount, setPetCount] = useState(1);

    const [conferenceCount, setConferenceCount] = useState(0);
    const [conferenceTime, setConferenceTime] = useState(0);

    const [meetingRoomCount, setMeetingRoomCount] = useState(0);
    const [meetingRoomTime, setMeetingRoomTime] = useState(0);

    const [defaultAvailableService, setDefaultAvailableService] = useState();

    function handleChange(value) {
        serviceSelected(value);
        const selectedItemObject = availabilityService && availabilityService.filter(item=>item.id===value);
        if (selectedItemObject && selectedItemObject[0]){
            props.setSelectedCipService(selectedItemObject[0].name);
        }
    }

    function numberWithCommas(x) {
        if (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            return "0";
        }
    }
    useEffect(() => {
        if (availabilityService && availabilityService.length > 0) {
            setDefaultAvailableService(availabilityService[0].id);
            serviceSelected(availabilityService[0].id);
            props.setSelectedCipService(availabilityService[0].name);
        }
    }, [availabilityService])
    
    return (
        <div className={`${styles.serviceCipList} ${process.env.THEME_NAME === "TRAVELO" && styles.serviceCipListTravelo}`} id="anchorservicetype">
            <div className={styles.subject}>
                <h3>انتخاب نوع سرویس</h3>
            </div>
            <div className={styles.content}>
                <Row gutter={[20, 0]}>
                    <Col xs={24} sm={12} lg={8}>
                        {
                            defaultAvailableService && 
                                <Form.Item name="serviceType" initialValue={defaultAvailableService}>
                                    <Select
                                        className={`full-width ui-select ${process.env.THEME_NAME === "TRAVELO" && "ui-select-travelo"}`}
                                        // defaultOpen={[1]}
                                        onChange={handleChange} placeholder="سرویس مورد نظر را انتخاب کنید">
                                        {availabilityService && availabilityService.map(item =><>
                                            <Option value={item.id}>{item.name}</Option>
                                            </>
                                        )}
                                    </Select>
                                </Form.Item>
                        }
                        <div className={styles.describeService}>
                            شامل : کارت پرواز، پاسپورت
                        </div>
                    </Col>
                </Row>
                
                {serviceListSelected && <div className={styles.additionalCipService}>
                    <h4>انتخاب سرویس اضافه</h4>
                    <Row gutter={[20, 10]}>
                        {serviceListSelected.map((serviceItem, serviceIndex) => <>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} key={serviceIndex}>
                            <div className={styles.service}>
                                <div className={styles.rightSide}>
                                    <div>
                                        <img src={serviceItem.picture.path} alt={serviceItem.picture.altAttribute} title={serviceItem.picture.titleAttribute} />
                                    </div>
                                    <div>
                                        <span className={styles.name}>{serviceItem.name}</span>
                                            <small>{serviceItem.description}</small>
                                            {serviceItem.type === "Conference" && <div className={styles.addRemoveBoxList}>
                                                <div className={styles.addRemoveBox}>
                                                    <span>تعداد میان وعده</span>
                                                    <button
                                                        type="button"
                                                        onClick = {() => setConferenceCount(conferenceCount + 1)}
                                                        disabled={(selectedAvailabilityServices.includes(serviceItem.id))}
                                                        >
                                                        <PlusOutlined />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value = {serviceItem.extraCount = conferenceCount}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick = {() => conferenceCount > 0 && setConferenceCount(conferenceCount - 1)}
                                                        disabled={(selectedAvailabilityServices.includes(serviceItem.id))}
                                                        >
                                                        <MinusOutlined />
                                                    </button>
                                                </div>
                                                <div className={styles.addRemoveBox}>
                                                    <span>تعداد ساعت اضافه</span>
                                                    <button
                                                        type="button"
                                                        onClick = {() => setConferenceTime(conferenceTime + 1)}
                                                        disabled={(selectedAvailabilityServices.includes(serviceItem.id))}
                                                        >
                                                        <PlusOutlined />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value = {serviceItem.hourCount = conferenceTime}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick = {() => conferenceTime >0 && setConferenceTime(conferenceTime - 1)}
                                                        disabled={(selectedAvailabilityServices.includes(serviceItem.id))}
                                                        >
                                                        <MinusOutlined />
                                                    </button>
                                                </div></div>}
                                            
                                            {serviceItem.type === "MeetingRoom" && <div className={styles.addRemoveBoxList}>
                                                <div className={styles.addRemoveBox}>
                                                    <span>تعداد میان وعده</span>
                                                    <button
                                                        type="button"
                                                        onClick = {() => setMeetingRoomCount(meetingRoomCount + 1)}
                                                        disabled={(selectedAvailabilityServices.includes(serviceItem.id))}
                                                        >
                                                        <PlusOutlined />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value = {serviceItem.extraCount = meetingRoomCount}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick = {() => meetingRoomCount >0 && setMeetingRoomCount(meetingRoomCount - 1)}
                                                        disabled={(selectedAvailabilityServices.includes(serviceItem.id))}
                                                        >
                                                        <MinusOutlined />
                                                    </button>
                                                </div>
                                                <div className={styles.addRemoveBox}>
                                                    <span>تعداد ساعت اضافه</span>
                                                    <button
                                                        type="button"
                                                        onClick = {() => setMeetingRoomTime(meetingRoomTime + 1)}
                                                        disabled={(selectedAvailabilityServices.includes(serviceItem.id))}
                                                        >
                                                        <PlusOutlined />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value = {serviceItem.hourCount = meetingRoomTime}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick = {() => meetingRoomTime >0 && setMeetingRoomTime(meetingRoomTime - 1)}
                                                        disabled={(selectedAvailabilityServices.includes(serviceItem.id))}
                                                        >
                                                        <MinusOutlined />
                                                    </button>
                                                </div></div>}
                                            
                                            {serviceItem.type === "Pet" &&
                                                <div className={styles.addRemoveBox}>
                                                    <button
                                                        type="button"
                                                        onClick = {() => setPetCount(petCount + 1)}
                                                        disabled={(selectedAvailabilityServices.includes(serviceItem.id))}
                                                        >
                                                        <PlusOutlined />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value = {serviceItem.count = petCount}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick = {() => petCount >1 && setPetCount(petCount - 1)}
                                                        disabled={(selectedAvailabilityServices.includes(serviceItem.id))}
                                                        >
                                                        <MinusOutlined />
                                                    </button>
                                                </div>}
                                    </div>
                                    
                                    
                                </div>
                                <div className={styles.leftSide}>
                                    {serviceItem.type === "Pet" &&
                                        <span className={styles.salePrice}>{numberWithCommas(serviceItem.salePrice * serviceItem.count)} ریال</span>}

                                    {serviceItem.type === "Conference" &&
                                        <span className={styles.salePrice}>{numberWithCommas(serviceItem.salePrice + (serviceItem.extraCount * serviceItem.extraSalePrice) + (serviceItem.hourCount * serviceItem.hourSalePrice))} ریال</span>}
                                        
                                    {serviceItem.type === "MeetingRoom" &&
                                        <span className={styles.salePrice}>{numberWithCommas(serviceItem.salePrice + (serviceItem.extraCount * serviceItem.extraSalePrice) + (serviceItem.hourCount * serviceItem.hourSalePrice))} ریال</span>}

                                    {serviceItem.type === "Suite" &&
                                            <span className={styles.salePrice}>{numberWithCommas(serviceItem.salePrice)} ریال</span>}
                                    
                                    {serviceItem.type === "SpecialService" &&
                                        <span className={styles.salePrice}>{numberWithCommas(serviceItem.salePrice)} ریال</span>}
                                        
                                    {serviceItem.type === "FastTrack" &&
                                        <span className={styles.salePrice}>{numberWithCommas(serviceItem.salePrice)} ریال</span>}

                                    <Button
                                        onClick={() => addService(serviceItem.id)}
                                        className={(selectedAvailabilityServices.includes(serviceItem.id)) && styles.selecttedServiceBtn}
                                        // disabled={(selectedAvailabilityServices.includes(serviceItem.id))}
                                        >
                                            {(selectedAvailabilityServices.includes(serviceItem.id)) ?
                                                <>
                                                    <CheckOutlined />
                                                    <span>انتخاب شد</span>
                                                </>
                                                : <span>انتخاب کن</span>}
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        </>)}
                    </Row>
                </div>}
            </div>
        </div>
    )
}

Services.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Services.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Services)
