import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../../i18n'

import PhoneInput from "../../UI/PhoneInput/PhoneInput";
import 'react-intl-tel-input/dist/main.css';
import { Form, Input, Row, Col, Collapse,Spin, Select, Skeleton } from 'antd'
import {  HotelIcon } from '../../UI/Icons'
import { DownOutlined,RightOutlined } from '@ant-design/icons'
import _ from 'lodash';

import styles from '../../../styles/Home.module.css'
import {getAllNationalities} from '../../../actions'


const { Panel } = Collapse;

const { TextArea } = Input;

const { Option } = Select;

// function onChange(e) {
//     console.log(`checked = ${e.target.checked}`);
// }

const ContentCheckout = props =>{

    const [countriesArray, setCountriesArray] = useState();
    const [phoneNumberValue, setPhoneNumberValue] = useState("");
    const [phoneNumberCountry, setPhoneNumberCountry] = useState("");



    useEffect(()=>{       
        const getCountries = async () => {
            const response = await getAllNationalities();
            if (response.data && response.data.result && response.data.result.items) {  
                setCountriesArray(response.data.result.items);
            }
          };

          getCountries();

        if (props.userInfo?.phoneNumber){
            setPhoneNumberValue(props.userInfo.phoneNumber);
        }

    }, []);
    
    const phoneInputChangeHandle = (value,country)=>{
        setPhoneNumberCountry(country);
        setPhoneNumberValue(value);
    }

    const { t,userInfo } = props;

    let reserverFirstName = "";
    let reserverLastName = "";
    if(userInfo?.firstName){
      reserverFirstName = userInfo.firstName;
    }
    if(userInfo?.lastName){
      reserverLastName = userInfo.lastName;
    }
    return (
        <div className={styles.contentCheckout}>
            <div className="back-page">
                {
                    props.hotelInfo?
                    <>
                        {props.searchedInfo && <Link as={"/hotel-foreign"+props.searchedInfo} href={"/hotel-foreign"+props.searchedInfo}>
                            <a>
                                <RightOutlined className="mirror-ltr margin-end-5" />
                                <span>{t("back-choose-room")}</span>
                            </a>
                        </Link>}
                    </>
                    :
                    <a>
                        <Skeleton.Button active className={styles.backPageSkeleton} />
                    </a>
                }
            </div>
            <div
                className={`${styles.guestDetails} ${process.env.THEME_NAME === "TRAVELO" && styles.guestDetailsTravelo}`}
                >
                <div className={styles.cardTitle}>{t("reserver-information")}</div>
                <div className={styles.cardBody}>
                    <Row gutter={[20,0]}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item label={t("name")} className="required-compact-form-Item">
                                <Input.Group compact className="gender-name-group">
                                    <Form.Item
                                        name='reserverGender'
                                        initialValue={userInfo ? userInfo.gender : true}
                                        noStyle
                                        rules={[{ required: true, message: t("please-choose-gender") }]}
                                    >
                                        <Select
                                            className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                            >
                                            <Option value={true}>{t("male")}</Option>
                                            <Option value={false}>{t("female")}</Option>
                                        </Select>
                                    </Form.Item>
                
                                    <Form.Item
                                        initialValue={reserverFirstName }
                                        noStyle
                                        name='registrationFirstName'
                                        rules={[{pattern:(/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/),message:t("just-english-persian-letter-and-space")},{ required: true,message:t("please-enter-name1")  }]}
                                    >
                                        <Input
                                            size="large"
                                            className={`${process.env.THEME_NAME === "TRAVELO" && "input-travelo"}`}
                                            />
                                    </Form.Item>
                    
                            
                                </Input.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item
                                initialValue={reserverLastName}
                                name="registrationLastName"
                                label={t("family")}  
                                rules={[{pattern:(/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/),message:t("just-english-persian-letter-and-space")},{ required: true,message:t("please-enter-family")  }]}
                                className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[20,0]}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item
                                initialValue={userInfo?.phoneNumber || ""}
                                name="registrationMobile"
                                className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                label={t("phone-number")}
                                rules={
                                    [
                                        ({ getFieldValue }) => ({
                                            validator(rule, value='') {
                                                // if (userInfo?.phoneNumber){
                                                //     return Promise.resolve();
                                                // }else if (phoneNumberValue && phoneNumberCountry){
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
                                </div>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item
                                initialValue={userInfo?.emailAddress || undefined }
                                name="registrationEmail"
                                label={t("email")}
                                rules={[{ required: true,message:t("please-enter-email") },{ type: 'email',message:t("invalid-email") }]}
                                className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                >
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                    </Row>
 
                    <Row gutter={[20,0]}>
                        <Col span={24}>
                            <div className={`${styles.specialRequests} special-request`}>
                                <Collapse 
                                    ghost
                                    expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                                >
                                    <Panel header={
                                        <div className={styles.subjectSpecialRequests}>
                                            <b className='margin-start-10'>{t("special-requests")}</b>
                                        </div>}
                                        key="1"
                                    >
                                        <div className={styles.contentSpecialRequests}>
                                            <span className={styles.noteSpecialRequests}>{t("special-requests-desc")}</span>
                                            <Form.Item
                                                name="specialRequest"
                                                className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                >
                                                <TextArea rows={4} />
                                            </Form.Item>

                                        </div>
                                    </Panel>
                                </Collapse>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className={styles.cardTitle}> {t("passengers-informaion")}</div>

            {props.hotelInfo ? props.hotelInfo.accommodation.rooms.map((roomItem,roomIndex)=><div
                key={roomIndex}
                className={`${styles.passengerMainCard} ${process.env.THEME_NAME === "TRAVELO" && styles.passengerMainCardTravelo}`}
                >
                <div className={styles.passengerCardTitle}>
                    <HotelIcon  className="margin-end-5"/>
                    {t("room")} {roomIndex+1} - {roomItem.name}
                </div>

                {/* adults info: */}
                {_.times(roomItem.adults, _.constant("adult")).map((_,index)=><div className={styles.passngerDetails} key={index}>
                    <div className={styles.cardBody}>
                        <div className={styles.adultPassenger}>
                            <div className={styles.headerAdultPassneger}>
                                <div className={styles.subjectAdultPassneger}>
                                    <h4>
                                        {t("adult")} {index+1}                                        
                                    </h4>
                                </div>

                            </div>
                            <div className={styles.contentAdultPassneger} layout="vertical">
                                <Row gutter={[20,0]}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8}>
                                        <Form.Item label={t("name")} className="required-compact-form-Item">
                                            <Input.Group compact className="gender-name-group">
                        
                                                <Form.Item
                                                    name={`room${roomIndex}-passenger${index}-gender`}
                                                    initialValue={true}
                                                    noStyle
                                                    rules={[{ required: true, message: t("please-choose-gender") }]}
                                                >
                                                    <Select
                                                        className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                        >
                                                        <Option value={true}>{t('male')}</Option>
                                                        <Option value={false}>{t('female')}</Option>
                                                    </Select>
                                                </Form.Item>
                            
                                                <Form.Item
                                                    name={`room${roomIndex}-passenger${index}-fname-adult`}
                                                    noStyle
                                                    rules={[{pattern:(/^[a-zA-Z ]*$/),message:t("just-english-and-space")},{ required: true, message: t("please-enter-name1") }]}
                                                >
                                                    <Input
                                                        size="large"
                                                        className={`${process.env.THEME_NAME === "TRAVELO" && "input-travelo"}`}
                                                        />
                                                </Form.Item>
                                
                                    
                                            </Input.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8}>
                                        <Form.Item name={`room${roomIndex}-passenger${index}-lname`} label={t("family")} rules={[{pattern:(/^[a-zA-Z ]*$/),message:t("just-english-and-space")},{ required: true,message:t("please-enter-passenger-name") }]}>
                                            <Input
                                                size="large"
                                                className={`${process.env.THEME_NAME === "TRAVELO" && "input-travelo"}`}
                                                />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8}>
                                        <Form.Item name={`room${roomIndex}-passenger${index}-nationality`} label={t('nationality')} rules={[{ required: true,message:t("please-choose-nationality") }]}>
                                            {countriesArray?
                                                <Select
                                                    showSearch
                                                    className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                    >
                                                    {countriesArray.map(countryItem=><Option key={countryItem.code} value={`${countryItem.name}_${countryItem.code}`}>{countryItem.name}</Option>)}
                                                </Select>:
                                                <><Skeleton.Input active/><Spin /></>
                                            }
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>)}

                {/* children info: */}
                {_.times(roomItem.children, _.constant("children")).map((_,index)=><div className={styles.passngerDetails} key={index}>
                    <div className={styles.cardBody}>
                        <div className={styles.adultPassenger}>
                            <div className={styles.headerAdultPassneger}>
                                <div className={styles.subjectAdultPassneger}>
                                    <h4>
                                        {t('child')} {index+roomItem.adults+1}                                        
                                    </h4>
                                </div>

                            </div>
                            <div className={styles.contentAdultPassneger} layout="vertical">
                                <Row gutter={[20,0]}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8}>
                                        <Form.Item label={t("name")} className="required-compact-form-Item">
                                            <Input.Group compact className="gender-name-group">
                        
                                                <Form.Item
                                                    name={`room${roomIndex}-passenger${index+roomItem.adults}-gender`}
                                                    initialValue={true}
                                                    noStyle
                                                    rules={[{ required: true, message: t("please-choose-gender") }]}
                                                >
                                                    <Select>
                                                        <Option value={true}>{t('male')}</Option>
                                                        <Option value={false}>{t('female')}</Option>
                                                    </Select>
                                                </Form.Item>
                            
                                                <Form.Item
                                                    name={`room${roomIndex}-passenger${index+roomItem.adults}-fname-child`}
                                                    noStyle
                                                    rules={[{pattern:(/^[a-zA-Z ]*$/),message:t("just-english-and-space")},{ required: true, message: t("please-enter-name1") }]}
                                                >
                                                    <Input size="large" />
                                                </Form.Item>
                                
                                    
                                            </Input.Group>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8}>
                                        <Form.Item name={`room${roomIndex}-passenger${index+roomItem.adults}-lname`} label={t("family")} rules={[{pattern:(/^[a-zA-Z ]*$/),message:t("just-english-and-space")},{ required: true,message:t("please-enter-passenger-name") }]}>
                                            <Input size="large"/>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={8}>
                                        <Form.Item name={`room${roomIndex}-passenger${index+roomItem.adults}-nationality`} label={t('nationality')} rules={[{ required: true,message:t("please-choose-nationality") }]}>
                                            {countriesArray?
                                                <Select showSearch>
                                                    {countriesArray.map(countryItem=><Option key={countryItem.code} value={`${countryItem.name}_${countryItem.code}`} >{countryItem.name}</Option>)}
                                                </Select>:
                                                <><Skeleton.Input active/><Spin /></>
                                            }
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>)}

            </div>)
            :
            <Spin />}           
        
        </div>
    )

}

ContentCheckout.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
ContentCheckout.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ContentCheckout)