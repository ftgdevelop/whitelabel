import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types'
import { i18n, withTranslation, Router } from '../../../../i18n'
import { Form, Input,  Row, Col, Select, Skeleton } from 'antd'
import moment from 'moment-jalaali';
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import TimePicker from 'react-datepicker';
import { useRouter } from 'next/router';

import styles from '../../../styles/Cip.module.css'

const { Option } = Select;

const AirportCip = props => {

    const router = useRouter();

    const today = { year: +moment().format("jYYYY"), month: +moment().format("jM"), day: +moment().format("jD") };

    const [startDate, setStartDate] = useState(new Date());

    let defaultFlightNumber;
    let defaultAirline;
    const url = router.asPath;
    if (url.includes("flightNumber")){
        defaultFlightNumber = url.split("/flightNumber-")[1].split("/")[0];
    }
    if (url.includes("airlineName")){
        defaultAirline = url.split("/airlineName-")[1].split("/")[0];
    }
    const { t } = props;
    return (
        <div className={styles.airportInfoCip}>
            <h3>اطلاعات پرواز</h3>
            <div className={styles.content}>
                {props.cipAirPortDetail ? <span className={styles.airportName}>نام فرودگاه : {props.cipAirPortDetail.name}</span>: <Skeleton.Button active size="medium" className={styles.skeletonCipNameText} />}
                <Row gutter={[20,0]}>
                    <Col xs={24} sm={12} lg={8}>
                        <Form.Item name="travelType" label="نوع پرواز" initialValue={1}>
                            <Select className="full-width ui-select" onChange={props.onChangeTravelType}>
                                <Option value={1}>داخلی</Option>
                                <Option value={0}>خارجی</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Form.Item name="flightType" label="ترمینال" initialValue={props.terminal} value={props.terminal}>
                        <Select
                            className="full-width ui-select"
                            onChange={props.changeTerminalType}
                        >
                            <Option value={0}>ورودی</Option>
                            <Option value={1}>خروجی</Option>
                        </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Form.Item initialValue={decodeURIComponent(defaultAirline)} name="airline" label="شرکت هواپیمایی" rules={[{ required: true, message: 'لطفا نام شرکت هواپیمایی را وارد کنید.' }]}>
                            <Input size="large" type="text" placeholder="شرکت هواپیمایی " className="full-width" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Form.Item name="origin" label={props.terminal===0?"مبدا":"مقصد"} rules={[{ required: true, message: `لطفا ${props.terminal===0?"مبدا":"مقصد"} را وارد کنید.` }]}>
                            <Input size="large" type="text" placeholder={props.terminal===0?"مبدا":"مقصد"} className="full-width" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Form.Item initialValue={defaultFlightNumber} name="flightNumber" label="شماره پرواز" rules={[{ required: true, message: 'لطفا شماره پرواز را وارد کنید.' }]}>
                        <Input size="large" type="text" placeholder="شماره پرواز" className="full-width" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={6} lg={4}>
                        <div className="ant-col ant-form-item-label">
                            <label htmlFor="cipBooking_flightDate" className="ant-form-item-required" title="تاریخ پرواز">تاریخ پرواز</label>
                        </div>
                        <div className={styles.cipDate}>
                            <DatePicker
                                inputClassName={styles.datePicker}
                                inputPlaceholder="تاریخ پرواز"
                                shouldHighlightWeekends
                                locale="fa"
                                value={props.flightDate}
                                onChange={props.onChangeFlightDate}
                                minimumDate={today}
                                // selectedDate={initDate}
                            />
                        </div>
                        {props.flightDateValidation || <div class="ant-form-item-explain ant-form-item-explain-error"><div role="alert">لطفا تاریخ پرواز را وارد کنید.</div></div>}
                    </Col>
                    <Col xs={12} sm={6} lg={4}>
                        <Form.Item name="flightTime" label="ساعت پرواز" rules={[{ required: true, message: 'لطفا ساعت پرواز را وارد کنید.' }]} initialValue={new Date()}>
                                <TimePicker
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={10}
                                    timeCaption={false}
                                    dateFormat="hh:mm aa"
                                    placeholderText="انتخاب کنید"
                                    className="react-time-picker"
                                />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

AirportCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AirportCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(AirportCip)
