import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types'
import { i18n, withTranslation, Router } from '../../../../i18n'
import { Form, Input,  Row, Col, Skeleton, TimePicker } from 'antd'
import moment from 'moment-jalaali';
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
// import TimePicker from 'react-datepicker';
import { useRouter } from 'next/router';

import styles from '../../../styles/Cip.module.css'
import FloatInput from '../../UI/FloatInput/FloatInput';

const format = 'HH:mm';

const AirportCip = props => {

    const router = useRouter();

    const today = { year: +moment().format("jYYYY"), month: +moment().format("jM"), day: +moment().format("jD") };

    // const [startDate, setStartDate] = useState(new Date());

    let defaultFlightNumber;
    let defaultAirline = "";
    const url = router.asPath;
    if (url.includes("flightNumber")){
        defaultFlightNumber = url.split("/flightNumber-")[1].split("/")[0];
    }
    if (url.includes("airlineName")){
        defaultAirline = url.split("/airlineName-")[1].split("/")[0];
    }
    const { t } = props;
    return (
        <div className={`${styles.airportInfoCip} ${process.env.THEME_NAME === "TRAVELO" && styles.airportInfoCipTravelo}`} id="anchorflightinfo">
            <h3>اطلاعات سفر</h3>
            <div className={styles.content}>
                <Row gutter={[20, 10]}>
                    <Col xs={12} sm={12} lg={6} className="ant-form-item-cip">
                        <Form.Item name="originName" rules={[{ required: true, message: `لطفا مبدا را وارد کنید.` }]}>
                            <FloatInput
                                label= "مبدا"
                                placeholder="مبدا"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} lg={6} className="ant-form-item-cip">
                        <Form.Item name="destinationName" rules={[{ required: true, message: `لطفا مقصد را وارد کنید.` }]}>
                            <FloatInput
                                label= "مقصد"
                                placeholder= "مقصد"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} lg={6} className="ant-form-item-cip">
                        <Form.Item initialValue={decodeURIComponent(defaultAirline)} name="airline" rules={[{ required: true, message: 'لطفا نام شرکت هواپیمایی را وارد کنید.' }]}>
                            <FloatInput
                                label="شرکت هواپیمایی"
                                placeholder="شرکت هواپیمایی"
                                className="full-width"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} lg={6} className="ant-form-item-cip">
                        <Form.Item initialValue={defaultFlightNumber} name="flightNumber" rules={[{ required: true, message: 'لطفا شماره پرواز را وارد کنید.' }]}>
                            <FloatInput
                                label="شماره پرواز"
                                placeholder="شماره پرواز"
                                className="full-width"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} lg={6} className="ant-form-item-cip ant-form-item-cip-date">
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
                            <label className="float-input-label as-label float-date-label">
                                تاریخ پرواز
                            </label>
                        </div>
                        {props.flightDateValidation || <div className="ant-form-item-explain ant-form-item-explain-error"><div role="alert">لطفا تاریخ پرواز را وارد کنید.</div></div>}
                    </Col>
                    <Col xs={12} sm={12} lg={6} className="ant-form-item-cip ant-form-item-cip-time">
                        <Form.Item
                            name="flightTime"
                            rules={[{ required: true, message: 'لطفا ساعت پرواز را وارد کنید.' }]}
                            initialValue={moment('00:00', format)}
                            >
                            <TimePicker
                                format={format}
                                size="large"
                                className = {
                                    `${process.env.THEME_NAME === "TRAVELO" && "ant-picker-travelo cip-flight-time"}`
                                }
                                showNow={false}
                            />                            
                        </Form.Item>
                        <label className="float-input-label as-label float-time-label">
                            ساعت پرواز
                        </label>
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
