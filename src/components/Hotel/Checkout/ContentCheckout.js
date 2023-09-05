import React from 'react'
import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../../i18n'

// import IntlTelInput from 'react-intl-tel-input';
// import 'react-intl-tel-input/dist/main.css';
import PhoneInput from "../../UI/PhoneInput/PhoneInput";
import { Form, Input, Radio, Row, Col, Collapse, Checkbox, Select, Skeleton } from 'antd'
import { ArrowRightIcon, HotelIcon } from '../../UI/Icons'
import { DownOutlined } from '@ant-design/icons'
import _ from 'lodash';

import styles from '../../../styles/Home.module.css'
import { MailIcon } from '../../UI/Icons'
import { withSuccess } from 'antd/lib/modal/confirm';

const { Panel } = Collapse;

const { TextArea } = Input;

const { Option } = Select;

class ContentCheckout extends React.Component {

    constructor() {
        super();
        this.state = { 
            phoneNumberValue:"",
            phoneNumberCountry:""
         };
        //this.handleChange = this.handleChange.bind(this);
    }

    phoneInputChangeHandle = (value,country)=>{
        this.setState({
            phoneNumberValue:value,
            phoneNumberCountry:country
        });
    }

    componentDidMount(){
        if (this.props.userInfo?.phoneNumber){
            this.setState({
                phoneNumberValue:this.props.userInfo.phoneNumber
            });
        }
    }

    render() {
        const { t,userInfo } = this.props;
        const {phoneNumberValue,phoneNumberCountry} = this.state;
        return (
            <div className={styles.contentCheckout}>
                <div className={styles.backPage}>
                    {
                        this.props.hotelInfo?
                        <>
                            {this.props.searchedInfo && this.props.hotelInfo && this.props.hotelInfo.Url && <Link as={this.props.hotelInfo.Url+this.props.searchedInfo} href={this.props.hotelInfo.Url+this.props.searchedInfo}>
                                <a>
                                    <ArrowRightIcon />
                                    <span>{t('back-choose-room')}</span>
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
                    <div className={styles.cardTitle}>{t('reserver-information')}</div>
                    <div className={styles.cardBody}>
                        <Row gutter={[10,0]}>
                            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                <Form.Item
                                    name="reserverGender"
                                    label={t('gender')}
                                    rules={[{ required: true,message:t('please-choose-gender') }]}
                                    initialValue={userInfo ? userInfo.gender : true}
                                    onChange={ e => {this.props.changeReserverInfo(e.target.value,"gender")}} 
                                    >
                                    <Radio.Group>
                                        <Radio value={true}>
                                            {t('male')}
                                        </Radio>
                                        <Radio value={false}>
                                            {t('female')}
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={8} md={8} lg={8} xl={8}>                                         
                                <Form.Item
                                    initialValue={userInfo?.firstName || undefined }
                                    name='registrationFirstName'
                                    label={t('name')} 
                                    rules={[{pattern:new RegExp(/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/),message:t('just-english-persian-letter-and-space')},{ required: true, message: t('please-enter-name1') }]}
                                    className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                >
                                    <Input 
                                        size="large" 
                                        onChange={ e => {this.props.changeReserverInfo(e.target.value,"fName")}} 
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                                <Form.Item
                                    initialValue={userInfo?.lastName || undefined }
                                    name="registrationLastName"
                                    label={t('family')}
                                    rules={[{pattern:(/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/),message:t('just-english-persian-letter-and-space')},{ required: true,message: t('please-enter-family')  }]}
                                    className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                    >
                                    <Input 
                                        size="large" 
                                        onChange={ e => {this.props.changeReserverInfo(e.target.value,"lName")}}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={[10,0]}>
                            <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                                <Form.Item
                                    initialValue={userInfo?.phoneNumber || ""}
                                    name="registrationMobile"
                                    label = {
                                        t("phone-number") + " (بدون صفر)"
                                    }
                                    className="label-registrationMobile"
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
                                            onChange={this.phoneInputChangeHandle}
                                        />
                                    </div>
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                                <Form.Item
                                    initialValue={userInfo?.nationalId || undefined }
                                    name="codeMeli"
                                    label={t('national-code')}
                                    rules={[{pattern:(/^[0123456789۰۱۲۳۴۵۶۷۸۹]*$/),message:t('enter-national-code-digit')},{ required: true,message:t('please-enter-national-code') }]}
                                    className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                    >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                                <Form.Item
                                    initialValue={userInfo?.emailAddress || undefined }
                                    name="registrationEmail"
                                    label={t('email')}
                                    rules={[{ type: 'email',message:t('invalid-email') }]}
                                    className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                    >
                                    <Input size="large" />
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
                        
                        <div>
                            <Checkbox 
                            checked={!this.props.reserverIsPassenger} 
                            onChange={e=>{this.props.onToggleReserverPassenger(!e.target.checked)}}>
                                {t('reserve-for-other')}
                            </Checkbox>
                        </div>

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
                                                <span className={styles.noteSpecialRequests}>{t('special-requests-desc')}</span>
                                                <Form.Item
                                                    name="SpecialRequest"
                                                    className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                    >
                                                    <TextArea rows={4} />
                                                </Form.Item>
                                                {/* <Row className={styles.detailSpecialRequests}>
                                                    <Col span={6}>
                                                        <span>تخت خواب</span>
                                                    </Col>
                                                    <Col span={18}>
                                                        <Button>تخت اضافه</Button>
                                                        <Button>تخت نوزاد</Button>
                                                    </Col>
                                                </Row>

                                                <Row className={styles.detailSpecialRequests}>
                                                    <Col span={6}>
                                                        <span>دسترسی</span>
                                                    </Col>
                                                    <Col span={18}>
                                                        <Button>حمام قابل دسترسی</Button>
                                                    </Col>
                                                </Row>

                                                <Row className={styles.detailSpecialRequests}>
                                                    <Col span={6}>
                                                        <span>اولویت مینی بار</span>
                                                    </Col>
                                                    <Col span={18}>
                                                        <Button>الکل را از مینی بار خارج کنید</Button>
                                                    </Col>
                                                </Row>

                                                <Row className={styles.otherSpecialRequests}>
                                                    <Checkbox 
                                                        checked={ this.state.checked } 
                                                        onChange={ this.handleChange }
                                                    >
                                                        <span>من درخواست های دیگری دارم</span>
                                                    </Checkbox>
                                                    {
                                                        this.state.checked ? <TextArea rows={4} /> : null
                                                    }
                                                </Row> */}
                                            </div>
                                        </Panel>
                                    </Collapse>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className={styles.cardTitle}> {t('passengers-informaion')}</div>

                {this.props.roomsInfo && this.props.roomsInfo.map((roomItem,roomIndex)=><div
                    key={roomIndex}
                    className={`${styles.passengerMainCard} ${process.env.THEME_NAME === "TRAVELO" && styles.passengerMainCardTravelo}`}
                    >
                    <div className={styles.passengerCardTitle}>
                        <HotelIcon className="margin-end-5" />
                        {t('room')} {roomItem.roomNo} - {roomItem.roomTypeName}
                    </div>
                    
                    {_.times(roomItem.adultNo, _.constant("adult")).map((roomAdultItem,index)=>(index===0)?<div className={styles.passngerDetails} key={index}>
                        <div className={styles.cardBody}>
                            <div className={styles.adultPassenger}>
                                <div className={styles.headerAdultPassneger}>
                                    <div className={styles.subjectAdultPassneger}>
                                        <h4>
                                            {t('adult')} {index+1} {(index>0) || ( t('headman') )}                                        
                                        </h4>
                                    </div>
                                </div>
                                <div className={styles.contentAdultPassneger} layout="vertical">
                                    <Row gutter={[20,0]}>
                                        {roomIndex===0 && this.props.reserverIsPassenger?
                                        <>
                                            <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                                    <div className="ant-row ant-form-item">
                                                        <div className="ant-col ant-form-item-label"><label className="ant-form-item-required" title={t('gender')}>{t('gender')}</label></div>
                                                        <Radio.Group
                                                            value={this.props.firstPassenger.gender}
                                                            onChange={ e => {this.props.changeFirstPassenger(e.target.value,"gender")}} >
                                                            <Radio value={true}>
                                                                {t('male')}
                                                            </Radio>
                                                            <Radio value={false}>
                                                                {t('female')}
                                                            </Radio>
                                                        </Radio.Group>
                                                    </div>
                                            </Col>
                                            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                                                <div className="ant-row ant-form-item">
                                                    <div className="ant-col ant-form-item-label"><label className="ant-form-item-required" title={t('name')}>{t('name')}</label></div>
                                                    <Input 
                                                    size="large" 
                                                    value={this.props.firstPassenger.fName}
                                                    onChange={e=>{this.props.changeFirstPassenger(e.target.value,"fName")}}
                                                    className={`${process.env.THEME_NAME === "TRAVELO" && "input-travelo"}`}
                                                    />
                                                </div>                                    
                                            </Col>
                                            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                                                <div className="ant-row ant-form-item">
                                                    <div className="ant-col ant-form-item-label"><label  className="ant-form-item-required" title={t('family')}>{t('family')}</label></div>
                                                    <Input 
                                                    size="large" 
                                                     value={this.props.firstPassenger.lName}
                                                    onChange={e=>{this.props.changeFirstPassenger(e.target.value,"lName")}}
                                                    className={`${process.env.THEME_NAME === "TRAVELO" && "input-travelo"}`}
                                                    />
                                                </div>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                                <Form.Item
                                                    name={['rooms', roomIndex ,'gender']}
                                                    label={t('gender')}
                                                    rules={[{ required: true,message:t('please-choose-gender') }]}
                                                    initialValue={true}
                                                    >
                                                    <Radio.Group>
                                                        <Radio value={true}>
                                                            {t('male')}
                                                        </Radio>
                                                        <Radio value={false}>
                                                            {t('female')}
                                                        </Radio>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={12} sm={12} md={8} lg={8} xl={8} className="required-compact-form-Item">
                                                <Form.Item
                                                    label={t('name')}
                                                    name={['rooms', roomIndex , 'fName']}
                                                    // name={`room${roomItem.roomNo}-passenger${index}-fname`}
                                                    // noStyle
                                                    rules={[
                                                        { pattern: (/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/), message: t('just-english-persian-letter-and-space') }, 
                                                        { required: true, message: t('please-enter-name1') }
                                                    ]}
                                                >
                                                    <Input
                                                        size="large"
                                                        className={`${process.env.THEME_NAME === "TRAVELO" && "input-travelo"}`}
                                                        />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                                                <Form.Item 
                                                    name={['rooms', roomIndex, 'lName']} 
                                                    label={t('family')} 
                                                    rules={[
                                                        {pattern:(/^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/),message:"فقط حروف انگلیسی، فارسی و فاصله مجاز است"},
                                                        { required: true,message:t('please-enter-family') }
                                                    ]}
                                                >
                                                    <Input
                                                        size="large"
                                                        className={`${process.env.THEME_NAME === "TRAVELO" && "input-travelo"}`}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </>                                        
                                        }
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>:null)}
                </div>)}

                {/* <div className={styles.feesExtras}>
                    <div className={styles.cardTitle}>??? هزینه و موارد اضافی</div>
                    <div className={styles.cardBody}>
                        <AnimatedShowMore
                            height={130}
                            toggle={({ isOpen }) => isOpen ? 'بستن متن' : 'ادامه متن' }
                            speed={0}
                            shadowColor="#ffffff">
                            <div className={styles.contantBody}>
                                <h5>هزینه های اجباری</h5>
                                <p>تمام هزینه های ارائه شده توسط این ملک را شامل می شود. با این حال ، به عنوان مثال ، هزینه ها می توانند بسته به مدت اقامت یا اتاق مورد نظر شما متفاوت باشند.</p>
                            </div>
                            <div className={styles.contantBody}>
                                <h5>هزینه اختیاری</h5>
                                <p>هزینه ها و سپرده های زیر توسط ملک در زمان سرویس ، check-in یا check-out پرداخت می شود.</p>
                                <ul>
                                    <li>هزینه صبحانه بوفه: 150 ریال برای بزرگسالان و 75 ریال برای کودکان (تقریباً)</li>
                                    <li>هزینه شاتل فرودگاه: 260 ریال برای هر وسیله نقلیه (یک طرفه)</li>
                                    <li>چک زود هنگام برای پرداخت هزینه (در دسترس بودن) در دسترس است</li>
                                    <li>چک تأخیر برای هزینه در دسترس است (منوط به در دسترس بودن)</li>
                                    <li>هزینه تختخواب تمام وقت: 240،0 ریال در هر شب</li>
                                </ul>
                            </div>
                        </AnimatedShowMore>
                    </div>
                </div>
                <div className={styles.checkInstructions}>
                    <div className={styles.cardTitle}>??? بررسی دستورالعمل ها</div>
                    <div className={styles.cardBody}>
                        <AnimatedShowMore
                            height={130}
                            toggle={({ isOpen }) => isOpen ? 'بستن متن' : 'ادامه متن' }
                            speed={0}
                            shadowColor="#ffffff">
                            <div className={styles.contantBody}>
                                <h5>دستورالعمل های ورود</h5>
                                <p>هزینه های اضافی ممکن است بسته به خط مشی دارایی متفاوت باشد و متفاوت باشد.</p>
                                <p>شناسایی عکسی که توسط دولت صادر شده است و کارت اعتباری یا ودیعه نقدی نیز در هنگام ورود به اتهامات اتفاقی لازم است.</p>
                                <p>درخواست های ویژه در هنگام ورود به سیستم در دسترس هستند و ممکن است هزینه های اضافی را متحمل شوند. درخواست های ویژه تضمین نمی شود.</p>
                            </div>
                            <div className={styles.contantBody}>
                                <h5>دستورالعمل های خروج</h5>
                                <p>خدمات شاتل فرودگاه 24 ساعته در صورت درخواست ارائه می شود. برای انجام تنظیمات از قبل با ملک تماس بگیرید. هزینه گردشگری توسط شهر اعمال می شود و در ملک جمع می شود. هزینه برای اولین اتاق خواب در هر شب 20 AED است و برای هر اتاق خواب اضافی 20 AED در هر شب افزایش می یابد. برای اطلاعات بیشتر ، لطفاً با استفاده از اطلاعات موجود در ایمیل تأیید خود ، با ملک تماس بگیرید.</p>
                            </div>
                        </AnimatedShowMore>
                    </div>
                </div> */}
            </div>
        )
    }
}

ContentCheckout.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
ContentCheckout.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ContentCheckout)