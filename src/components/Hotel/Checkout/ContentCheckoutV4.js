import React, { useEffect ,useState} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-jalaali';
import { Link, withTranslation, i18n } from '../../../../i18n'

// import IntlTelInput from 'react-intl-tel-input';
// import 'react-intl-tel-input/dist/main.css';
import PhoneInput from "../../UI/PhoneInput/PhoneInput";
import { Form, Input, Radio, Row, Col, Collapse, Checkbox, Select, Skeleton } from 'antd'
import { ArrowRightIcon } from '../../UI/Icons'
import { getAllNationalities } from '../../../actions';
import { DownOutlined } from '@ant-design/icons'
import _ from 'lodash';
import FloatInput from '../../UI/FloatInput/FloatInput';

import ContentCheckoutV4RoomItem from './ContentCheckoutV4RoomItem';

import styles from '../../../styles/Home.module.css'

const { Panel } = Collapse;

const { TextArea } = Input;


const ContentCheckoutV4 = props => {

    const [reserverIsPassenger,setReserverIsPassenger] = useState(true);
    const [phoneNumberValue,setPhoneNumberValue] = useState("");
    const [phoneNumberCountry, setPhoneNumberCountry] = useState("");

    const [countriesArray,setCountriesArray] = useState([]);

    const phoneInputChangeHandle = (value,country)=>{
        setPhoneNumberValue(value);
        setPhoneNumberCountry(country);
    }

    useEffect(()=>{
        if (phoneNumberValue){
            props.changePhoneNumber(phoneNumberValue);
        }
    },[phoneNumberValue]);

    useEffect(() => {
        if (props.userInfo?.phoneNumber){
            setPhoneNumberValue(props.userInfo.phoneNumber);
        }

        const getCountries = async () => {
            const response = await getAllNationalities();
            if (response.data && response.data.result && response.data.result.items) {  
                setCountriesArray(response.data.result.items);
            }
        };

        getCountries();

    },[]);

    const { t,userInfo,hotelInformation ,reserveInformation} = props;

    let backUrl;
    if (reserveInformation && hotelInformation){
        backUrl=`${hotelInformation.Url}/location-${hotelInformation.CityId}/checkin-${moment(reserveInformation.checkin).format("YYYY-MM-DD")}/checkout-${moment(reserveInformation.checkout).format("YYYY-MM-DD")}`;
    }
    
    const changeReserverInfo = (type,val) => {
        if (reserverIsPassenger){
            props.form.setFields([
                {
                    name:['passengers', 0 , type],
                    value: val
                },
            ]);
            props.form.validateFields([['passengers', 0 , type]]);
        }
    }

    const changeSpecialRequest = (text) => {
        props.setSpecialRequestText(text)
    }

    const changeReserverIsPassenger = e => {
        setReserverIsPassenger(!e.target.checked);
        if (e.target.checked){
            props.form.setFields([
                {
                    name:['passengers', 0 , 'gender'],
                    value: true
                },
                {
                    name:['passengers', 0 , 'firstName'],
                    value: ""
                },
                {
                    name:['passengers', 0 , 'lastName'],
                    value: ""
                },
                {
                    name:['passengers', 0 , 'nationalId'],
                    value: ""
                }
            ]);  
        }else{
            const values = props.form.getFieldsValue();
            props.form.setFields([
                {
                    name:['passengers', 0 , 'gender'],
                    value: values.reserver.gender
                },
                {
                    name:['passengers', 0 , 'firstName'],
                    value: values.reserver.firstName
                },
                {
                    name:['passengers', 0 , 'lastName'],
                    value: values.reserver.lastName
                },
                {
                    name:['passengers', 0 , 'nationalId'],
                    value: values.reserver.nationalId
                }
            ]);  
        }
    }

    return (
        <div className={styles.contentCheckout}>
            <div className={styles.backPage}>
                { backUrl ? 
                    <Link as={backUrl} href={backUrl}>
                        <a>
                            <ArrowRightIcon />
                            <span>{t('back-choose-room')}</span>
                        </a>
                    </Link>
                    :
                    <a>
                        <Skeleton.Button active className={styles.backPageSkeleton} />
                    </a>
                }
            </div>
            <div
                className={`${styles.guestDetails} ${process.env.THEME_NAME === "TRAVELO" && styles.guestDetailsTravelo}`}
            >
                <div className={styles.cardTitle}>{t('reserver-information')}</div>
                <div className={styles.cardBody}>
                    <Row gutter={[10,0]}>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item
                                name={['reserver','gender']}
                                rules={[{ required: true,message:t('please-choose-gender') }]}
                                initialValue={!userInfo ? true: userInfo.gender}
                                >
                                <Radio.Group
                                    className='margin-top-5'
                                    defaultValue={!userInfo ? true: userInfo.gender}
                                    onChange={e => { changeReserverInfo("gender", e.target.value) }} >
                                    <Radio value={true}>
                                        {t('male')}
                                    </Radio>
                                    <Radio value={false}>
                                        {t('female')}
                                    </Radio>
                                </Radio.Group>
                                <label className="float-input-label as-label float-phone-label">
                                    جنسیت
                                </label>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={8} xl={8}>                                         
                            <Form.Item
                                initialValue={userInfo?.firstName || undefined }
                                name={['reserver','firstName']}
                                // label={t('name')} 
                                rules={[{pattern:new RegExp(/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/),message:t('just-english-persian-letter-and-space')},{ required: true, message: t('please-enter-name1') }]}
                                className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                            >
                                <FloatInput 
                                    label={t('name')} 
                                    placeholder={t('name')} 
                                    onChange={ e => {changeReserverInfo("firstName",e.target.value)}} 
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item
                                initialValue={userInfo?.lastName || undefined }
                                name={['reserver','lastName']}
                                rules={[{pattern:(/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/),message:t('just-english-persian-letter-and-space')},{ required: true,message: t('please-enter-family')  }]}
                                className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                >
                                <FloatInput 
                                    label={t('family')} 
                                    placeholder={t('family')} 
                                    onChange={ e => {changeReserverInfo("lastName",e.target.value)}} 
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[10,0]}>
                        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item
                                initialValue={userInfo?.phoneNumber || ""}
                                name={['reserver','phoneNumber']}
                                className="label-registrationMobile"
                                rules={
                                    [
                                        ({ getFieldValue }) => ({
                                            validator(rule, value='') {
                                                if (phoneNumberValue){
                                                    if (phoneNumberCountry){
                                                        const requiredLength = phoneNumberCountry.format.replace(/ +/g, "").replace(/[{(+)}]/g, '').replace(/-/g , "").length;
                                                        const valueLength = phoneNumberValue.length;
                                                        if (requiredLength === valueLength)
                                                            return Promise.resolve();
                                                        if (!phoneNumberValue)
                                                            return Promise.reject(new Error(t('please-enter-phone-number')));

                                                            return Promise.reject(new Error('شماره تلفن وارد شده معتبر نیست!'));
                                                    }else{
                                                        return Promise.resolve();
                                                    }
                                                }else{
                                                    return Promise.reject(new Error(t('please-enter-phone-number')));
                                                }
                                            },
                                        })
                                    ]
                                }
                                >
                                <div
                                    style={{direction:"ltr"}}
                                    className={`${styles.reserverMobile} ${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                    >

                                    <PhoneInput 
                                        value={userInfo?.phoneNumber || undefined}
                                        country="ir"
                                        onChange={phoneInputChangeHandle}
                                    />
                                    <label className="float-input-label as-label float-phone-label">
                                        {t("phone-number") + " (بدون صفر)"}
                                    </label>
                                </div>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item
                                initialValue={userInfo?.nationalId || undefined }
                                name={['reserver','nationalId']}
                                rules={
                                    [
                                        {
                                            pattern: (/^[0123456789۰۱۲۳۴۵۶۷۸۹]*$/),
                                            pattern: /^(?:\d*)$/,
                                            message: t('enter-national-code-digit')
                                        },
                                        {
                                            pattern: /^[\d]{0,10}$/,
                                            message: "Value should be less than 10 character",
                                        },
                                        {
                                            min: 10,
                                            max: 10,
                                            message: t('enter-national-number-max'),
                                        },
                                        {
                                            required: true, message: t('please-enter-national-code')
                                        }]
                                }
                                className={`input-number ${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                >
                                <FloatInput
                                    type="number"
                                    maxLength="10"
                                    label={t('national-code')}
                                    placeholder={t('national-code')}
                                    onChange={e => { changeReserverInfo("nationalId", e.target.value) }}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                            <Form.Item
                                initialValue={userInfo?.emailAddress || undefined }
                                name={['reserver','email']}
                                rules={[{ type: 'email',message:t('invalid-email') }]}
                                className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                >
                                <FloatInput
                                    label={t('email')} 
                                    placeholder={t('email')} 
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* <Row gutter={[20,0]}> */}
                        {/* <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <div className={styles.checkoutConfirmEmail}>
                                <MailIcon/>
                                <span>{t('email-confirmaion-will-sent')}</span>
                            </div>
                        </Col> */}
                    {/* </Row> */}
                    
                    {/* <div>
                        <Checkbox 
                        checked={!reserverIsPassenger} 
                        onChange={changeReserverIsPassenger}>
                            {t('reserve-for-other')}
                        </Checkbox>
                    </div> */}

                    <Row gutter={[20,0]}>
                        <Col span={24}>
                            <div className={`${styles.specialRequests} special-request`}>
                                <Collapse 
                                    ghost
                                    expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                                >
                                    <Panel header={
                                        <div className={styles.subjectSpecialRequests}>
                                            <b>{t('special-requests')}</b>
                                        </div>}
                                        key="1"
                                    >
                                        <div className={styles.contentSpecialRequests}>
                                            <Form.Item
                                                name="specialRequest"
                                                className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                >
                                                <TextArea
                                                    placeholder={t('special-requests-desc')}
                                                    rows={4}
                                                    onChange={e => { changeSpecialRequest(e.target.value) }}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Panel>
                                </Collapse>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className={styles.cardTitle}> {t('passengers-informaion')}</div>

            {props.reserveInformation?.rooms && props.reserveInformation.rooms.map((roomItem,roomIndex)=><ContentCheckoutV4RoomItem
                key={roomIndex}
                form={props.form}
                userInfo = {userInfo}
                roomItem = {roomItem}
                roomIndex = {roomIndex}
                reserverIsPassenger = {reserverIsPassenger}
                setReserverIsPassenger = {setReserverIsPassenger}
                reserveInformation  = {reserveInformation }
                updateRoomChildAndExtraBed={props.updateRoomChildAndExtraBed}
            />)}
        </div>
    )
}

ContentCheckoutV4.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
ContentCheckoutV4.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ContentCheckoutV4)