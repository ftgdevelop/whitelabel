import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Form, Input, Radio, Row, Col, TreeSelect, Select, Skeleton, Collapse, Checkbox } from 'antd';
import PhoneInput from "../../UI/PhoneInput/PhoneInput";

import styles from '../../../styles/Cip.module.css'
import { PlusOutlineIcon, RemoveSimpleIcon, RoomIcon, AnimalIcon, VisaIcon, WheelchairIcon, VipRoomIcon, FlightIcon, ServiceRoomIcon } from "../../UI/Icons";
import { PlusOutlined, MinusOutlined, CheckCircleOutlined, CaretRightOutlined } from '@ant-design/icons';

const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

const { Panel } = Collapse;

const treeData = [
    {
      title: 'خدمات ویزا',
      value: '0-0',
      key: '0-0',
    },
];
class PassengerAndReserverCip extends React.Component {
    state = {
        // value: [''],
        phoneNumberCountry:"",
        phoneNumberValue:"",
        reserverInfo:{
            gender:true,
            fName:"",
            lName:""
        }
    };

    onChange = value => {
        console.log('onChange ', value);
        this.setState({ value });
    };
    phoneInputChangeHandle = (value,country)=>{
        this.setState({ phoneNumberCountry:country ,phoneNumberValue:value});
    }
    numberWithCommas = (x) => {
        if (x) {
            return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
        }
        return 0;
    };

    render() {
        const { t } = this.props;
        const tProps = {
            treeData,
            // value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            style: {
              width: '100%',
            },
        };
        const firstPassengerKey = this.props.selectedPassengers && this.props.selectedPassengers[0].key;
        const {phoneNumberValue,phoneNumberCountry} = this.state;
        return (
            <>
                <div className={`${styles.airportInfoCip} ${process.env.THEME_NAME === "TRAVELO" && styles.airportInfoCipTravelo}`} id="anchorreservercip">
                    <h3>مشخصات رزرو گیرنده</h3>
                    {/* {this.state.reserverInfo.gender?"مرد":"زن"} - {this.state.reserverInfo.fName} {this.state.reserverInfo.lName} */}
                    <div className={styles.content}>
                        <Row gutter={[20,0]}>
                            <Col xs={24} sm={6}>
                                <Form.Item 
                                initialValue={true} 
                                name="reserverGender" 
                                label="جنسیت" 
                                rules={[{ required: true, message: 'لطفا جنسیت را مشخص کنید.' }]}
                                >
                                    <Radio.Group 
                                        onChange={
                                            (e) => {
                                                this.setState({reserverInfo:{...this.state.reserverInfo,gender:e.target.value}});
                                                if (this.props.reserverIsPassenger){
                                                    this.props.onPassengerInfoChange(e.target.value, firstPassengerKey, 'gender')
                                                } 
                                            }
                                        }
                                    >
                                        <Radio value={true}>مرد</Radio>
                                        <Radio value={false}>زن</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={9}>
                                <Form.Item 
                                name="reserverFirstName" 
                                label="نام" 
                                rules={[{ required: true, message: 'لطفا  نام  خود را وارد کنید.' }]}
                                >
                                    <Input 
                                        size="large" 
                                        type="text" 
                                        placeholder="نام" 
                                        className="full-width" 
                                        onChange={(e) => {
                                            this.setState({reserverInfo:{...this.state.reserverInfo,fName:e.target.value}});
                                            if (this.props.reserverIsPassenger){
                                                this.props.onPassengerInfoChange(e.target.value, firstPassengerKey, 'firstName')}
                                            } 
                                        } 
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={9}>
                                <Form.Item name="reserverLastName" label="نام خانوادگی" rules={[{ required: true, message: 'لطفا نام خانوادگی خود را وارد کنید.' }]}>
                                    <Input 
                                        size="large" 
                                        type="text" 
                                        placeholder="نام خانوادگی" 
                                        className="full-width" 
                                        onChange={(e) => {
                                            this.setState({reserverInfo:{...this.state.reserverInfo,lName:e.target.value}});
                                            if (this.props.reserverIsPassenger){
                                                this.props.onPassengerInfoChange(e.target.value, firstPassengerKey, 'lastName')}
                                            } 
                                        }                                         
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={6}></Col>
                            <Col xs={12} sm={9}>
                                <Form.Item name="reserverEmail" label={"ایمیل"} rules={[{ required: true, message: 'آدرس ایمیل خود را وارد کنید.' }]}>
                                    <Input size="large" type="text" placeholder="ایمیل" className="full-width" />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={9}>
                                <Form.Item
                                    name="reserverMobileNumber"
                                    label={"تلفن همراه"}
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
                                            country="ir"
                                            onChange={this.phoneInputChangeHandle}
                                        />
                                    </div>
                                </Form.Item> 
                            </Col>
                        </Row>
                    </div>
                </div>
                <div>
                    <Checkbox 
                    checked={!this.props.reserverIsPassenger} 
                    onChange={e=>{
                        this.props.onToggleReserverPassenger(!e.target.checked);
                        if (!e.target.checked){
                            this.props.onPassengerInfoChange(this.state.reserverInfo.gender, firstPassengerKey, 'gender');
                            this.props.onPassengerInfoChange(this.state.reserverInfo.fName, firstPassengerKey, 'firstName');
                            this.props.onPassengerInfoChange(this.state.reserverInfo.lName, firstPassengerKey, 'lastName');
                        }
                    }}
                    >
                        برای شخص دیگری قصد رزرو دارم
                    </Checkbox>
                </div>
                <br/>
                <div className={`${styles.passengerCip} ${process.env.THEME_NAME === "TRAVELO" && styles.passengerCipTravelo}`}>
                    <div className={styles.subject}>
                        <h3>مشخصات مسافران</h3>
                        <div className={styles.passengerCount}>
                            <b> {this.props.selectedPassengers ? this.props.selectedPassengers.length : <Spin/>}</b>
                            <span>مسافر</span>
                            <button type="button" className={styles.plusCount} onClick={this.props.addPassenger}>
                                <PlusOutlineIcon />
                            </button>
                        </div>
                    </div>
                    {
                        this.props.selectedPassengers && this.props.selectedPassengers.map((passengerItem,passengerIndex)=><div key={passengerItem.key} className={styles.cardContent}>
                            <div className={styles.headerPassenger}>
                                <h4>مسافر {passengerIndex+1}</h4>

                                {(passengerIndex > 0) && <button type="button" className={styles.removePassneger} onClick={()=>this.props.removePassenger(passengerItem.key)}>
                                    <RemoveSimpleIcon/>
                                </button>}
                            </div>
                            <div className={styles.contentPassenger}>
                                <Row gutter={[20, 0]}>
                                    {firstPassengerKey===passengerItem.key && this.props.reserverIsPassenger ?
                                    <>
                                        <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                                            <div className="ant-row ant-form-item">
                                                <div className="ant-col ant-form-item-label"><label title="جنسیت">جنسیت</label></div>
                                                <Radio.Group value={passengerItem.gender}
                                                    onChange={(e) => 
                                                        {
                                                            if(passengerIndex===0){
                                                                this.props.onToggleReserverPassenger(false)
                                                            }
                                                            this.props.onPassengerInfoChange(e.target.value, passengerItem.key, 'gender')
                                                        }
                                                    }  
                                                    style={{ display: 'flow-root' }}
                                                >
                                                    <Radio value={true}>مرد</Radio>
                                                    <Radio value={false}>زن</Radio>
                                                </Radio.Group>
                                            </div>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                                            <Form.Item initialValue={passengerItem.passengerType} name={`passengerType_${passengerItem.key}`} label="نوع مسافر">
                                                <Radio.Group value={passengerItem.passengerType} onChange={(e) => this.props.onPassengerInfoChange(e.target.value, passengerItem.key, 'passengerType')}  style={{ display: 'flow-root' }}>
                                                    <Radio value="Adult">بزرگسال</Radio>
                                                    <Radio value="Child">کودک زیر ۲ سال</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={8} xl={8}></Col>
                                        <Col xs={12} sm={12} md={12} lg={8} xl={8} className="required-compact-form-Item">
                                            <div className="ant-row ant-form-item">
                                                <div className="ant-col ant-form-item-label"><label className="ant-form-item-required" title="نام">نام</label></div>
                                                <Input
                                                    size="large"
                                                    value={passengerItem.firstName}
                                                    onChange={(e) => 
                                                        {
                                                            if(passengerIndex===0){
                                                                this.props.onToggleReserverPassenger(false)
                                                            }
                                                            this.props.onPassengerInfoChange(e.target.value, passengerItem.key, 'firstName')
                                                        }
                                                    }
                                                    type="text"
                                                    placeholder="نام"
                                                    className="full-width"
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={8} xl={8} className="required-compact-form-Item">
                                            <div className="ant-row ant-form-item">
                                                <div className="ant-col ant-form-item-label"><label className="ant-form-item-required" title="نام خانوادگی">نام خانوادگی</label></div>
                                                <Input
                                                size="large"
                                                value={passengerItem.lastName}
                                                onChange={(e) => 
                                                    {
                                                        if(passengerIndex===0){
                                                            this.props.onToggleReserverPassenger(false)
                                                        }
                                                        this.props.onPassengerInfoChange(e.target.value, passengerItem.key, 'lastName')
                                                    }
                                                }  
                                                type="text"
                                                placeholder="نام خانوادگی"
                                                className="full-width"
                                                />
                                            </div>
                                        </Col>                                    
                                    </>
                                    :
                                    <>
                                        <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                                            <Form.Item initialValue={passengerItem.gender} name={`passengerGender_${passengerItem.key}`} label="جنسیت">
                                                <Radio.Group value={passengerItem.gender} 
                                                    onChange={(e) => 
                                                        {
                                                            if(passengerIndex===0){
                                                                this.props.onToggleReserverPassenger(false)
                                                            }
                                                            this.props.onPassengerInfoChange(e.target.value, passengerItem.key, 'gender')
                                                        }
                                                    }  
                                                    style={{ display: 'flow-root' }}
                                                >
                                                    <Radio value={true}>مرد</Radio>
                                                    <Radio value={false}>زن</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                                            <Form.Item initialValue={passengerItem.passengerType} name={`passengerType_${passengerItem.key}`} label="نوع مسافر">
                                                <Radio.Group value={passengerItem.passengerType} onChange={(e) => this.props.onPassengerInfoChange(e.target.value, passengerItem.key, 'passengerType')}  style={{ display: 'flow-root' }}>
                                                    <Radio value="Adult">بزرگسال</Radio>
                                                    <Radio value="Child">کودک زیر ۲ سال</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12} md={12} lg={8} xl={8}></Col>
                                        <Col xs={12} sm={12} md={12} lg={8} xl={8} className="required-compact-form-Item">
                                            <Form.Item
                                                initialValue={passengerItem.firstName}
                                                name={`passengerFirstName_${passengerItem.key}`}
                                                label="نام"
                                                rules={[
                                                    { required: true, message: 'لطفا نام مسافر را وارد کنید.' },
                                                    {
                                                        pattern: new RegExp(
                                                        /^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/
                                                        ),
                                                        message: 'فقط حروف انگلیسی، فارسی و فاصله مجاز است',
                                                    }
                                                ]}
                                            >
                                                <Input
                                                    size="large"
                                                    value={passengerItem.firstName}
                                                    onChange={(e) => 
                                                        {
                                                            if(passengerIndex===0){
                                                                this.props.onToggleReserverPassenger(false)
                                                            }
                                                            this.props.onPassengerInfoChange(e.target.value, passengerItem.key, 'firstName')
                                                        }
                                                    }
                                                    type="text"
                                                    placeholder="نام"
                                                    className="full-width"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={12} sm={12} md={12} lg={8} xl={8} className="required-compact-form-Item">
                                            <Form.Item
                                                initialValue={passengerItem.lastName}
                                                name={`passengerLastName_${passengerItem.key}`}
                                                label="نام خانوادگی"
                                                rules={[
                                                    { required: true, message: 'لطفا نام خانوادگی مسافر را وارد کنید.' },
                                                    {
                                                        pattern: new RegExp(
                                                        /^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/
                                                        ),
                                                        message: 'فقط حروف انگلیسی، فارسی و فاصله مجاز است',
                                                    }
                                                ]}>
                                                <Input
                                                size="large"
                                                value={passengerItem.lastName}
                                                onChange={(e) => 
                                                    {
                                                        if(passengerIndex===0){
                                                            this.props.onToggleReserverPassenger(false)
                                                        }
                                                        this.props.onPassengerInfoChange(e.target.value, passengerItem.key, 'lastName')
                                                    }
                                                }  
                                                type="text"
                                                placeholder="نام خانوادگی"
                                                className="full-width"
                                                />
                                            </Form.Item>
                                        </Col>                                    
                                    </>
                                    }
                                </Row>
                                <div className={styles.additinalServicePAssenger}>
                                    <div className={styles.subject}> سرویس هایی بیشتر :</div>
                                    <div className={styles.content}>
                                        <Row gutter={[20, 0]}>
                                            {
                                                this.props.selectedServiceResult.passengerTypeServices && this.props.selectedServiceResult.passengerTypeServices.map(item => item).filter(item => item.passengerType === passengerItem.passengerType).map(item =>
                                                {
                                                    let optionsService = [];
                                                    for (let i = 0; i < item.services.length; i++) {
                                                        optionsService.push({
                                                            label: item.services[i].name,
                                                            value: item.services[i].id,
                                                        })
                                                    }
                                                    
                                                        return (
                                                            <Checkbox.Group
                                                                // value={passengerServiceItem.id}
                                                                options={optionsService}
                                                                onChange={
                                                                    (e) => {
                                                                        this.props.onPassengerInfoChange(e, passengerItem.key, 'services')
                                                                    }
                                                                }
                                                            />
                                                        )
                                                        
                                                    }
                                                )
                                            }
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </>
        )
    }
}

PassengerAndReserverCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
PassengerAndReserverCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(PassengerAndReserverCip)
