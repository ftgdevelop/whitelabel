import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Form,  Radio, Row, Col } from 'antd';

import PhoneInput from "../../UI/PhoneInput/PhoneInput";
import styles from '../../../styles/Cip.module.css'
import FloatInput from '../../UI/FloatInput/FloatInput';

const Reserver = props => {
    const [phoneNumberCountry,setPhoneNumberCountry] = useState("");
    const [phoneNumberValue,setPhoneNumberValue] = useState("");

    const phoneInputChangeHandle = (value,country)=>{
        setPhoneNumberCountry(country);
        setPhoneNumberValue(value);
        updateUsername();
    }

    useEffect(()=>{
        if (props.userInfo?.phoneNumber){
            setPhoneNumberValue(props.userInfo.phoneNumber);
        }
    },[]);

    const reserverInfoChange = (value, type) => {
        if (props.reserverPassenger) {
            if (type === "gender"){
                props.setFirstPassengerGender(value);
            }
            props.form.setFields([
                {
                    name: ['passengers', 0, type],
                    value: value,
                },
            ]);
            props.form.validateFields([['passengers', 0 , type]]);
        }
    }

    const updateUsername = () => {
        const values = props.form.getFieldsValue();
        const value = values.reserver?.phoneNumber.replace(/ +/g, "").replace(/[{()}]/g, '').replace(/-/g , "").toEnglishDigit();
        props.form.setFieldValue(['reserver', 'userName'], value);
        props.form.setFieldValue(['reserver', 'phoneNumber'], value);
    }

    const {userInfo} = props;
    return (
        <div className={`${styles.airportInfoCip} ${process.env.THEME_NAME === "TRAVELO" && styles.airportInfoCipTravelo}`} id="anchorreservercip">
            <h3>مشخصات رزرو گیرنده</h3>
            <div className={styles.content}>
                <Row gutter={[20,10]}>
                    <Col xs={24} sm={24} md={24} lg={4} xl={4} className="ant-form-item-cip">
                        <Radio.Group 
                            className='margin-top-5'
                            defaultValue={userInfo ? userInfo.gender : true}
                            onChange={e => {
                                reserverInfoChange(e.target.value, 'gender');
                                props.form.setFieldValue(['reserver', 'gender'], e.target.value);

                            }}
                        >
                            <Radio value>مرد</Radio>
                            <Radio value={false}>زن</Radio>
                        </Radio.Group>
                        <label className="float-input-label as-label float-phone-label">
                            جنسیت
                        </label>
                        <Form.Item 
                            hidden
                            name={['reserver', 'gender']} 
                            initialValue={userInfo ? userInfo.gender : true}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xl={5} className="ant-form-item-cip">
                        <Form.Item 
                        initialValue={userInfo?.firstName || "" }
                        name={['reserver', 'firstName']} 
                        rules={[{pattern:new RegExp(/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/),message:'فقط حروف انگلیسی، فارسی و فاصله مجاز است'},{ required: true, message:'لطفا  نام  خود را وارد کنید.' }]}
                        >
                            <FloatInput
                                type="text" 
                                label="نام"
                                placeholder="نام"
                                className="full-width"
                                onChange={e => {reserverInfoChange(e.target.value, 'firstName')}}   
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={5} xl={5} className="ant-form-item-cip">
                        <Form.Item 
                            initialValue={userInfo?.lastName || "" } 
                            name={['reserver', 'lastName']} 
                            rules={[{pattern:new RegExp(/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/),message:'فقط حروف انگلیسی، فارسی و فاصله مجاز است'},{ required: true, message:'لطفا  نام خانوادگی خود را وارد کنید.' }]}
                        >
                            <FloatInput
                                size="large" 
                                type="text" 
                                label="نام خانوادگی"
                                placeholder="نام خانوادگی"
                                className="full-width" 
                                onChange={(e) => {reserverInfoChange(e.target.value, 'lastName')}}                                        
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={5} xl={5} className="ant-form-item-cip">
                        <Form.Item 
                            initialValue={userInfo?.emailAddress || "" } 
                            name={['reserver', 'email']} 
                            rules={[{ required: true, message: 'آدرس ایمیل خود را وارد کنید.' },{ type: 'email',message:'ایمیل وارد شده معتبر نیست.' }]}
                        >
                            <FloatInput
                                size="large"
                                type="text"
                                label="ایمیل"
                                placeholder="ایمیل"
                                className="full-width"
                            />
                        </Form.Item>
                        <Form.Item 
                            hidden
                            name={['reserver', 'userName']} 
                        />
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={5} xl={5} className="ant-form-item-cip">
                        <Form.Item
                            initialValue={userInfo?.phoneNumber || ""}
                            name={['reserver', 'phoneNumber']} 
                            rules={
                                [
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (phoneNumberValue && phoneNumberCountry){
                                                const requiredLength = phoneNumberCountry.format.replace(/ +/g, "").replace(/[{(+)}]/g, '').replace(/-/g , "").length;
                                                const valueLength = phoneNumberValue.length;
                                                if (requiredLength === valueLength)
                                                    return Promise.resolve();
                                                if (!phoneNumberValue)
                                                    return Promise.reject(new Error("لطفا شماره تلفن همراه خود را وارد کنید."));

                                                    return Promise.reject(new Error("شماره تلفن همراه وارد شده معتبر نیست!"));
                                            }else{
                                                return Promise.reject(new Error("لطفا شماره تلفن همراه خود را وارد کنید."));
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
                                    تلفن همراه
                                </label>
                            </div>
                        </Form.Item> 
                    </Col>
                </Row>
            </div>
        </div>
    )
}

Reserver.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Reserver.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Reserver)