import React, { useEffect ,useState} from 'react'
import PropTypes from 'prop-types'
import {  withTranslation, i18n } from '../../../../i18n'
import { HotelIcon,RemoveIcon,InfoIcon } from '../../UI/Icons'

import { Form, Input, Radio, Row, Col, Select, Skeleton,Divider,Tooltip } from 'antd'
import { getAllNationalities } from '../../../actions';
import Quantity from '../../UI/Quantity/Quantity';
import _ from 'lodash';

import styles from '../../../styles/Home.module.css'
import FloatInput from '../../UI/FloatInput/FloatInput';

const { Option } = Select;

const ContentCheckoutV4RoomItem = props => {
    
    const {t,userInfo,roomItem,roomIndex,reserverIsPassenger,setReserverIsPassenger,reserveInformation} = props;
    
    const [countriesArray,setCountriesArray] = useState([]);

    const [hasChild,setHasChild] = useState(false);
    const [childAge,setChildAge] = useState();
    const [extraBedCount,setExtraBedCount] = useState(0);
    const [gender,setGender] = useState((reserverIsPassenger && roomIndex === 0 && userInfo )? userInfo.gender :true);

    const extraBedPrice = roomItem.pricing?.find((item) => item.type === 'ExtraBed' && item.ageCategoryType === 'ADL')?.amount || 0;
    const childPrice = roomItem.pricing?.find((item) => item.type === 'Room' && item.ageCategoryType === 'CHD')?.amount || 0;
    
    useEffect(()=>{
        props.updateRoomChildAndExtraBed(roomIndex,"selectedChild", hasChild,childPrice);
        if (hasChild){
            props.form.setFieldValue(['passengers', roomIndex , 'childrenAge'], childAge);
        } else {
            props.form.setFieldValue(['passengers', roomIndex , 'childrenAge'], "");
        }
    },[hasChild,childAge]);

    useEffect(()=>{
        props.updateRoomChildAndExtraBed(roomIndex,"selectedExtraBed", extraBedCount,extraBedPrice);
        props.form.setFieldValue(['passengers', roomIndex , 'extraBed'], extraBedCount);
    },[extraBedCount]);

    useEffect(()=>{
        const getCountries = async () => {
            const response = await getAllNationalities();
            if (response.data && response.data.result && response.data.result.items) {  
                setCountriesArray(response.data.result.items);
            }
        };

        getCountries();

    },[]);

    const numberWithCommas = x => {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }
    const firstPassengerGender = Form.useWatch(['passengers', roomIndex ,'gender'], props.form);   

    return (
            <div
                className={`${styles.passengerMainCard} ${process.env.THEME_NAME === "TRAVELO" && styles.passengerMainCardTravelo}`}
            >
                <div className={`${styles.passengerCardTitle} margin-bottom-15`}>
                    <HotelIcon className="margin-end-5" />
                    {t('room')} {roomIndex +1 } - {roomItem.name}
                </div>
                <div className={styles.cardBody}>
                    <div className={styles.adultPassenger}>
                        <div className={styles.contentAdultPassneger} layout="vertical">
                            <div className='margin-bottom-15'><b>مشخصات مسافر اصلی {reserveInformation.rooms?.length > 1 && <>اتاق {roomIndex+1}</>}</b></div>
                            <Row gutter={[20,0]}>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item
                                        name={['passengers', roomIndex ,'gender']}
                                        rules={[{ required: true,message:t('please-choose-gender') }]}
                                        initialValue={(reserverIsPassenger && roomIndex === 0 && userInfo )? userInfo.gender :true}
                                        >
                                        <Radio.Group 
                                            value={(reserverIsPassenger && roomIndex === 0) ? firstPassengerGender : gender}
                                            onChange={e =>{
                                                    setGender(e.target.value);
                                                    if(roomIndex === 0){
                                                        setReserverIsPassenger(false)
                                                    }
                                                }
                                            } 
                                        >
                                            <Radio value={true}>
                                                {t('male')}
                                            </Radio>
                                            <Radio value={false}>
                                                {t('female')}
                                            </Radio>
                                        </Radio.Group>
                                        <label className="float-input-label as-label float-phone-label">
                                            {t('gender')}
                                        </label>
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={8} lg={8} xl={8} className="required-compact-form-Item">
                                    <Form.Item
                                        initialValue={(reserverIsPassenger && roomIndex === 0 && userInfo )? userInfo.firstName :""}
                                        name={['passengers', roomIndex , 'firstName']}
                                        rules={[
                                            { pattern: (/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/), message: t('just-english-persian-letter-and-space') }, 
                                            { required: true, message: t('please-enter-name1') }
                                        ]}
                                        className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                    >
                                        <FloatInput
                                            label={t('name')} 
                                            placeholder={t('name')} 
                                            onChange={roomIndex === 0 ? ()=>{setReserverIsPassenger(false)} : undefined}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item 
                                        initialValue={(reserverIsPassenger && roomIndex === 0 && userInfo )? userInfo.lastName :""}
                                        name={['passengers', roomIndex, 'lastName']} 
                                        rules={[
                                            {pattern:(/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/),message:"فقط حروف انگلیسی، فارسی و فاصله مجاز است"},
                                            { required: true,message:t('please-enter-family') }
                                        ]}
                                        className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                    >
                                        <FloatInput
                                            label={t('family')} 
                                            placeholder={t('family')} 
                                            onChange={roomIndex === 0 ? ()=>{setReserverIsPassenger(false)} : undefined}
                                        />
                                    </Form.Item>
                                </Col>
                                {/* <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item
                                        initialValue={(reserverIsPassenger && roomIndex === 0 && userInfo )? userInfo.nationalId :""}
                                        name={['passengers', roomIndex, 'nationalId']} 
                                        rules={[{pattern:(/^[0123456789۰۱۲۳۴۵۶۷۸۹]*$/),message:t('enter-national-code-digit')},{ required: true,message:t('please-enter-national-code') }]}
                                        className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                        >
                                        <FloatInput
                                            label={t('national-code')} 
                                            placeholder={t('national-code')} 
                                            onChange={roomIndex === 0 ? () => { setReserverIsPassenger(false) } : undefined}
                                        />
                                    </Form.Item>
                                </Col>                                     */}
                                <Form.Item 
                                    initialValue={roomIndex+1} 
                                    hidden
                                    name={['passengers', roomIndex, 'roomNumber']} 
                                >
                                    <input type="text" />
                                </Form.Item>
                                {/* <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                                    {countriesArray?
                                        <Form.Item 
                                            name={['passengers', roomIndex, 'nationality']} 
                                            rules={[{ required: true,message:t("please-choose-nationality") }]}
                                            initialValue="IR"
                                        >
                                            <Select
                                                showSearch
                                                className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                >
                                                {countriesArray.map(countryItem=><Option key={countryItem.code} value={countryItem.code}>{countryItem.name}</Option>)}
                                            </Select>
                                            <label className="float-input-label as-label float-phone-label">
                                                {t('nationality')}
                                            </label>
                                        </Form.Item>
                                        :
                                        <><Skeleton.Input active/><Spin /></>
                                    }
                                </Col> */}
                            </Row>
                        </div>
                    </div>
                    
                    {!!roomItem.maxChildAge && (
                        <div className='child-form-control'>
                            <Divider />
                            <Row justify="space-between">
                                <Col>
                                <strong>
                                    <Tooltip title={`برای کودکان بالای ${roomItem.maxChildAge} سال باید از تخت اضافه استفاده کنید.`} >
                                      کودک <InfoIcon />
                                    </Tooltip>
                                </strong>
                                </Col>
                                <Col>
                                    <Select
                                        className={`min-width-120 ${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                        placeholder="سن کودک"
                                        onChange={setChildAge}
                                    >
                                        {_.range(1,roomItem.maxChildAge+1).map((item) => (
                                            <Select.Option key={item} value={item}>
                                            {item}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                    <button 
                                        type="button" 
                                        className="button blue-btn inline-btn medium-button margin-start-20" 
                                        onClick = {() =>{setHasChild(true)}}
                                        disabled={hasChild || !childAge}
                                    >
                                        {hasChild ? "افزوده شد":"افزودن"}
                                    </button>
                                </Col>
                            </Row>
                            {hasChild && <>
                                <Divider />
                                <Form.Item hidden name={['passengers', roomIndex, 'childrenAge']} />
                                <Row justify='space-between'>
                                    <Col>
                                        کودک اول
                                    </Col>
                                    <Col>
                                        <span onClick = {() =>{setHasChild(false)}} title="حذف کودک" className='pointer'>
                                            <RemoveIcon />
                                        </span>
                                    </Col>
                                </Row>
                            </>}
                        </div>
                    )}
                    {!!roomItem.extraBed && (
                        <div className='extraBed-form-control'>
                            <Divider />
                            <Row justify="space-between">
                                <Col>
                                    <strong>
                                        تخت اضافه 
                                        <small className="margin-start-5">
                                            ({numberWithCommas(extraBedPrice || 0)} {t('rial')} برای هر شب)
                                        </small>
                                    </strong>
                                </Col>
                                <Col>    
                                    <Quantity 
                                        min={0} 
                                        max={roomItem.extraBed}
                                        onChange={setExtraBedCount} 
                                    />
                                    <Form.Item  hidden initialValue={0} name={['passengers', roomIndex, 'extraBed']} />
                                </Col>
                            </Row>
                            {/* {hasExtraBed && <>
                                <Divider />
                                <Row justify='space-between'>
                                    <Col>
                                        تخت اضافه
                                    </Col>
                                    <Col>
                                        <span onClick = {() =>{setHasExtraBed(false)}} title="حذف تخت اضافه" className='pointer'>
                                            <RemoveIcon />
                                        </span>
                                    </Col>
                                </Row>
                            </>} */}
                        </div>
                    )}
                </div>
            </div>
    )
}

ContentCheckoutV4RoomItem.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
ContentCheckoutV4RoomItem.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ContentCheckoutV4RoomItem)