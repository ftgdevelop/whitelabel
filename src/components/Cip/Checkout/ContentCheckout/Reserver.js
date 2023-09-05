import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import { i18n, withTranslation, Link } from '../../../../../i18n'
import {useRouter} from 'next/router';
import { ArrowRightIcon } from '../../../UI/Icons'
import IntlTelInput from 'react-intl-tel-input';
import { Form, Input, Radio, Row, Col, Collapse, Checkbox, Select, Skeleton } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import styles from '../../../../styles/Home.module.css'

const { Panel } = Collapse;
const { TextArea } = Input;

const Reserver = props => {
    const { t } = props;

    String.prototype.toEnglishDigit = function() {
        var find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        var replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        var replaceString = this;
        var regex;
        for (var i = 0; i < find.length; i++) {
            regex = new RegExp(find[i], "g");
            replaceString = replaceString.replace(regex, replace[i]);
        }
        return replaceString;
    }
    
    return (
        <div className={styles.guestDetails}>
            <div className={styles.cardTitle}>مشخصات رزرو گیرنده</div>
            <div className={styles.cardBody}>
                <Row gutter={[20, 0]}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Form.Item label="جنسیت" className={styles.cardItem}>
                            <Radio.Group
                                style={{ display: 'flow-root' }}
                                onChange={e => {props.setReserverGender(e.target.value)}}
                                value={true}
                                >
                                <Radio value={true}>مرد</Radio>
                                <Radio value={false}>زن</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                        <Form.Item
                            label="نام" 
                            className={`required-compact-form-Item ${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                        >
                            <Input size="large" onChange={ e => {props.setReserverFirstName(e.target.value)}}/>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                        <Form.Item
                            label="نام خانوادگی"
                            className={`required-compact-form-Item ${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                            >
                            <Input size="large" onChange={ e => {props.setReserverLastName(e.target.value)}}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[20, 0]}>
                    <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
                    <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                        <Form.Item
                            name="registrationMobile"
                            label="موبایل"
                            rules={[{
                                pattern:(/^[۰۱۲۳۴۵۶۷۸۹0-9]{10}$/),
                                message:t("mobile-phone-invalid")
                            }]}
                            className="required-compact-form-Item"
                            >
                            <div
                                style={{direction:"ltr"}}
                                className={`required-compact-form-Item ${styles.reserverMobile} ${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                >
                                <IntlTelInput
                                    preferredCountries={["ir","ae","iq","tr"]}
                                    defaultCountry = "ir"
                                    containerClassName="intl-tel-input"
                                    inputClassName="form-control"
                                    placeholder="912 * * * * * * *"
                                    onSelectFlag={(num, country) => {
                                        props.setCountryCode(country.dialCode)
                                    }}
                                    onPhoneNumberBlur={(status, value, countryData, number, id) => {                             
                                        props.setPhoneNumber(value.toEnglishDigit())
                                    }}
                                />
                            </div>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={9} lg={9} xl={9}>
                        <Form.Item
                            name="registrationEmail"
                            label="ایمیل"
                            className={`required-compact-form-Item ${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                            >
                            <Input size="large" onChange={ e => {props.setReserverEmail(e.target.value)}}/>
                        </Form.Item>
                    </Col>
                </Row>
                {/* <Row gutter={[20,0]}>
                    <Col span={24}>
                        <div className={`${styles.specialRequests} special-request`}>
                            <Collapse 
                                ghost
                                expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                            >
                                <Panel header={
                                    <div className={styles.subjectSpecialRequests}>
                                        <b>درخواست های ویژه</b>
                                    </div>}
                                    key="1"
                                >
                                    <div className={styles.contentSpecialRequests}>
                                        <span className={styles.noteSpecialRequests}>درخواست های ویژه تضمینی نیستند و با توجه به صلاحدید فرودگاه صورت می گیرد.</span>
                                        <Form.Item
                                            name="SpecialRequest"
                                            className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                            >
                                            <TextArea rows={4} placeholder="متن درخواست" />
                                        </Form.Item>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div>
                    </Col>
                </Row> */}
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