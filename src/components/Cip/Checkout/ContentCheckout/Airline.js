import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import { i18n, withTranslation, Link } from '../../../../../i18n'
import moment from 'moment-jalaali';
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import TimePicker from 'react-datepicker';
import { Form, Input, Row, Col, Collapse, Skeleton } from 'antd'

import styles from '../../../../styles/Home.module.css'

const { Panel } = Collapse;
const { TextArea } = Input;
const format = 'HH:mm';

const Airline = props => {
    const { t, reserveInfo } = props;
    
    const today = { year: +moment().format("jYYYY"), month: +moment().format("jM"), day: +moment().format("jD") };
    
    return (
        <div className={styles.guestDetails}>
            <div className={styles.cardTitle}>جزئیات پرواز</div>
            <div className={`${styles.cardBody} ${styles.cardBodyAirlineCip}`}>
                <Row gutter={[10,0]}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                        <Form.Item
                            label="نام ایرلاین"
                            className = "card-item required-compact-form-Item" >
                            {/* <AutoComplete
                                style={{ width: "100%" }}
                                options={props.optionsAirline}
                                notFoundContent="موردی پیدا نشد"
                                onSelect={props.onSelectAirline}
                                className={`cip-search-airline`}
                                value={props.airlineName}
                            /> */}
                            <Input size="large" type="text"
                                onChange={props.onSelectAirline}
                                value={props.airlineName}
                                />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                        <Form.Item label="شماره پرواز" className="card-item required-compact-form-Item">
                            <Input size="large" type="text"
                                onChange={props.onChangeflightNumber}
                                value={props.flightNumber}
                                />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                        <Form.Item label="تاریخ پرواز" className="card-item required-compact-form-Item">
                            <DatePicker
                                inputClassName="date-picker-airline"
                                shouldHighlightWeekends
                                locale="fa"
                                value={props.flightDate}
                                onChange={props.onChangeFlightDate}
                                minimumDate={today}
                                inputPlaceholder = " "
                                />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={6} style={{'position': 'relative', 'z-index': '99'}}>
                            <Form.Item label="ساعت پرواز" className="card-item required-compact-form-Item">
                            {/* <TimePicker defaultValue={moment('12:08', format)} format={format} /> */}
                            <TimePicker
                                selected={props.flightTime}
                                // onChange={date => setStartDate(date)}
                                onChange={props.onChangeFlightTime}
                                showTimeSelect
                                showTimeSelectOnly
                                timeCaption={false}
                                // dateFormat="hh:mm aa"
                                defaultValue={moment('00:00', format)}
                                format={format}
                                // placeholderText="انتخاب کنید"
                                // className="react-time-picker"
                                showNow={false}
                                timeIntervals={5}
                                size="large"
                                suffixIcon=""
                                style={{ width: '100%'}}
                                placeholder="دقیقه : ساعت"
                                dateFormat="HH:mm"
                                timeFormat="HH:mm"
                                />
                        </Form.Item>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

Airline.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

Airline.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Airline)