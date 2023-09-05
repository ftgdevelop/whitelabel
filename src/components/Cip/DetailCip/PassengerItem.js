import React,{useState,useEffect} from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Form, Input, Radio, Row, Col,  Select, Checkbox } from 'antd';
import _ from "lodash";
import moment from 'moment-jalaali';

import styles from '../../../styles/Cip.module.css'
import { RemoveSimpleIcon } from "../../UI/Icons";
import FloatInput from '../../UI/FloatInput/FloatInput';


const { Option } = Select;
  
const PassengerItem = props => {

    const {t,passengerItem,passengerIndex,setReserverIsNotPassenger,passengerServicesArray,UpdatePassenger,form,userInfo} = props;

    const[day,setDay] = useState();
    const[month,setMonth] = useState();
    const[year,setYear] = useState(); 

    useEffect (()=>{
        if (day && month && year){
            const value = moment(`${year}-${month}-${day}`,"YYYY-MM-DD").format();
            form.setFieldValue(['passengers', passengerIndex , 'birthday'], value);
            form.validateFields([['passengers', passengerIndex , 'birthday']]);
        }
    },[day,month,year]);

    return (
    <div key={passengerItem.id} className={styles.cardContent}>
        <div className={styles.headerPassenger}>
            <h4>مسافر {passengerIndex+1}</h4>

            {(passengerIndex > 0) && <button type="button" className={styles.removePassneger} onClick={()=>props.removePassenger(passengerItem.id)}>
                <RemoveSimpleIcon/>
            </button>}
        </div>
        <div className={styles.contentPassenger}>
            <Row gutter={[20, 10]}>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} className="ant-form-item-cip">
                    <label className="as-label mb-0">
                        جنسیت
                    </label>
                    <Radio.Group
                        value={passengerItem.gender}
                        onChange={e => {
                            UpdatePassenger(passengerItem.id,"gender",e.target.value);
                            setReserverIsNotPassenger(passengerIndex);
                            form.setFieldValue(['passengers', passengerIndex , 'gender'], e.target.value);
                        }}  
                        style={{ display: 'flow-root' }}
                    >
                        <Radio value={true}>مرد</Radio>
                        <Radio value={false}>زن</Radio>
                    </Radio.Group>
                    <Form.Item
                        initialValue={userInfo && passengerIndex === 0 ? userInfo.gender : true}
                        hidden
                        name={['passengers', passengerIndex ,'gender']}
                    >
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6} xl={6} className="ant-form-item-cip">
                    <label className="as-label mb-0">
                        نوع مسافر
                    </label>
                    <Radio.Group 
                        value={passengerItem.type}
                        onChange={(e) => {
                            UpdatePassenger(passengerItem.id,"type",e.target.value);
                            form.setFieldValue(['passengers', passengerIndex , 'passengerType'], e.target.value);
                        }}  
                        style={{ display: 'flow-root' }}
                    >
                        <Radio value="Adult">بزرگسال</Radio>
                        <Radio value="Child">کودک زیر ۲ سال</Radio>
                    </Radio.Group>
                    <Form.Item 
                        initialValue="Adult"
                        hidden
                        name={['passengers', passengerIndex ,'passengerType']}
                    >
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} className="required-compact-form-Item ant-form-item-cip">
                    <Form.Item
                        initialValue={userInfo && passengerIndex === 0 ? userInfo.firstName : ""}
                        name={['passengers', passengerIndex ,'firstName']}
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
                        <FloatInput
                            onChange={() => {setReserverIsNotPassenger(passengerIndex)}}  
                            size="large"
                            type="text"
                            label="نام انگلیسی"
                            placeholder="نام انگلیسی"
                            className="full-width"        
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} className="required-compact-form-Item ant-form-item-cip">
                    <Form.Item
                    initialValue={userInfo && passengerIndex === 0 ? userInfo.lastName : ""}
                        name={['passengers', passengerIndex ,'lastName']}
                        rules={[
                            { required: true, message: 'لطفا نام خانوادگی مسافر را وارد کنید.' },
                            {
                                pattern: new RegExp(
                                /^[a-zA-Zآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ ]*$/
                                ),
                                message: 'فقط حروف انگلیسی، فارسی و فاصله مجاز است',
                            }
                        ]}
                    >
                        <FloatInput
                            size="large"
                            onChange={() => {setReserverIsNotPassenger(passengerIndex)}}                                        
                            type="text"
                            label="نام خانوادگی انگلیسی"
                            placeholder="نام خانوادگی انگلیسی"
                            className="full-width"
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} className="required-compact-form-Item ant-form-item-cip">
                    <Form.Item
                        name={['passengers', passengerIndex ,'nationalId']}
                        rules={[
                            { required: true, message: 'لطفا شماره ملی مسافر را وارد کنید.' },
                        ]}
                    >
                        <FloatInput
                            size="large"
                            type="text"
                            label="شماره ملی"
                            placeholder="شماره ملی"
                        />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} className="required-compact-form-Item ant-form-item-cip">
                    <Form.Item
                        name={['passengers', passengerIndex ,'passportNumber']}
                        rules={[
                            { required: true, message: 'لطفا شماره گذرنامه مسافر را وارد کنید.' },
                        ]}
                    >
                        <FloatInput
                            size="large"
                            type="text"
                            label="شماره گذرنامه"
                            placeholder="شماره گذرنامه"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6} xl={6} className="required-compact-form-Item ant-form-item-cip">
                    <div className="ant-row ant-form-item ant-row ant-form-item-birthday no-margin-bottom">
                        <Input.Group comact>
                            <Select
                                defaultValue="روز"
                                style={{ width: "22%"}}
                                showSearch
                                onChange={e => setDay(e)}
                                className={`${
                                    process.env.THEME_NAME === "TRAVELO" &&
                                    "form-item-travelo"
                                }`}
                                >
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                                <Option value="6">6</Option>
                                <Option value="7">7</Option>
                                <Option value="8">8</Option>
                                <Option value="9">9</Option>
                                <Option value="10">10</Option>
                                <Option value="11">11</Option>
                                <Option value="12">12</Option>
                                <Option value="13">13</Option>
                                <Option value="14">14</Option>
                                <Option value="15">15</Option>
                                <Option value="16">16</Option>
                                <Option value="17">17</Option>
                                <Option value="18">18</Option>
                                <Option value="19">19</Option>
                                <Option value="20">20</Option>
                                <Option value="21">21</Option>
                                <Option value="22">22</Option>
                                <Option value="23">23</Option>
                                <Option value="24">24</Option>
                                <Option value="25">25</Option>
                                <Option value="26">26</Option>
                                <Option value="27">27</Option>
                                <Option value="28">28</Option>
                                <Option value="29">29</Option>
                                <Option value="30">30</Option>
                                <Option value="31">31</Option>
                            </Select>
                            <Select
                                defaultValue="ماه"
                                style={{ width: "46%", marginRight: "1%" }}
                                showSearch
                                onChange={e => setMonth(e)}
                                className={`${
                                    process.env.THEME_NAME === "TRAVELO" &&
                                    "form-item-travelo"
                                }`}
                                >
                                {props.dateInfo.years.monthMiladi.map(
                                    (val, index) => (
                                        <Option value={index + 1} key={index}>
                                        {index + 1 > 9
                                            ? index + 1
                                            : 0 + (index + 1)}{" "}
                                        - {val}
                                        </Option>
                                    )
                                )}
                            </Select>
                            <Select
                                defaultValue="سال"
                                style={{ width: "30%", marginRight: "1%" }}
                                showSearch
                                onChange={e => setYear(e)}
                                className={`${
                                    process.env.THEME_NAME === "TRAVELO" &&
                                    "form-item-travelo"
                                }`}
                                >
                                {props.dateInfo.years["ADT"].miladi.map(
                                    (value, index) => (
                                        <Option value={value} key={index}>
                                        {value}
                                        </Option>
                                    )
                                )}
                            </Select>
                        </Input.Group>
                        <label className="float-input-label as-label float-country-label">
                            تاریخ تولد
                        </label>
                    </div>
                    <Form.Item
                        className='input-hidden-form-item'
                        name={['passengers', passengerIndex ,'birthday']}
                        rules={[
                            { required: true, message: 'لطفا تاریخ تولد مسافر را وارد کنید.' },
                        ]}
                    >
                        <input type={"hidden"} />
                    </Form.Item>
                </Col>
                <Form.Item
                    hidden
                    name={['passengers', passengerIndex ,'nationality']}
                    initialValue={"IR"}
                >
                    <input type={"hidden"} />
                </Form.Item>
            </Row>   
            {passengerServicesArray?.find(serviceItem => serviceItem.passengerType === passengerItem.type)?.services?.length > 0 && <div className={styles.additinalServicePAssenger}>
                <div className={styles.subject}> سرویس هایی بیشتر :</div>
                <div className={styles.content}>
                    <Checkbox.Group
                        onChange={value => {
                            UpdatePassenger(passengerItem.id,"services",value);
                            form.setFieldValue(['passengers', passengerIndex , 'services'], value);
                        }}
                        value={passengerItem.services}
                    >
                        <Row gutter={[20,20]}>
                            {passengerServicesArray.find(serviceItem => serviceItem.passengerType === passengerItem.type).services.map(serviceItem => <Col key={serviceItem.id}>
                                <Checkbox value={serviceItem.id} >
                                    {serviceItem.name}
                                </Checkbox>
                            </Col>)}
                        </Row>
                    </Checkbox.Group>
                </div>
            </div>}
            <Form.Item
                hidden
                name={['passengers', passengerIndex ,'services']}
                initialValue={[]}
            >
                <input type={"hidden"} />
            </Form.Item>
        </div>
    </div>
    )
}

PassengerItem.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
PassengerItem.propTypes = {
    t: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    dateInfo: state.dateInfo,
  };
}
  
export default withTranslation('common')(
    connect(mapStateToProps)(PassengerItem)
)
