import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import { i18n, withTranslation, Link } from '../../../../../i18n'
import {useRouter} from 'next/router';
import { ArrowRightIcon } from '../../../UI/Icons'
import IntlTelInput from 'react-intl-tel-input';
import { Form, Input, Radio, Row, Col, Collapse, Checkbox, Tooltip, Skeleton } from 'antd'
import { DownOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { RemoveSimpleIcon, UserOutlineIcon, DateOutlineIcon, ArrowLeftIcon, BabyOutlineIcon, AccompanyingOutlineIcon } from '../../../UI/Icons'

import styles from '../../../../styles/Home.module.css'

const { Panel } = Collapse;
const { TextArea } = Input;

const Passenger = props => {
    const { t, reserveInfo } = props;
        
    // let children = [];
    // let childrenCount = reserveInfo && reserveInfo.rate.children;
    // for (let i = 0 ; i < childrenCount ; i++){
    //     children.push("childrenCount");
    // }

    return (
        <div className={styles.guestDetails}>
            <div className={styles.cardTitle}>مشخصات مسافران</div>
            
            <div className={`${styles.cardBody} ${styles.cardBodyCip}`}>
                <div className={`${styles.rootTitle} ${styles.rootTitle1}`}>
                    <div className={styles.subjectRootTitle}>
                        <UserOutlineIcon />
                        <b>مسافران (بزرگتر از ۲ سال)</b>
                    </div>
                    <div className={styles.addPassenger}>
                        <button type="button" onClick={props.adultAddClick}><PlusOutlined /></button>
                        <input type="text" className="value" value={props.adultList.length} readOnly/>
                        <span>نفر</span>
                        <button type="button" onClick={props.adultRemoveEndClick} disabled={props.adultList.length !== 1 ? false : true}><MinusOutlined /></button>
                    </div>
                </div>
                {props.adultList.map((x, i)=><div className={styles.contentPassenger} key={i}>
                    <div className={styles.subjectPassenger}>
                        <div>مسافر {i+1}</div>
                        {props.adultList.length !== 1 &&
                            <Tooltip placement="right" title="حذف">
                                <div className={styles.removePassenger} onClick={() => props.adultRemoveClick(i)}><RemoveSimpleIcon/></div>
                            </Tooltip>}
                    </div>
                    <div className={styles.rowPassenger}>
                        <Row gutter={[10,0]} key={i}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                                <Form.Item
                                    label="جنسیت"
                                    rules={[{ required: true,message:t('please-choose-gender') }]}
                                    initialValue={true}
                                    className={styles.cardItem}
                                    >
                                    <Radio.Group style={{ display: 'flow-root' }} name="gender" value={x.gender} onChange={(e) => props.adultInputChange(e, i)}>
                                        <Radio value={true}>مرد</Radio>
                                        <Radio value={false}>زن</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={9}>
                                <Form.Item
                                    label="نام"
                                    className={`required-compact-form-Item ${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                >
                                    <Input size="large" name="firstName" value={x.firstName} onChange={(e) => props.adultInputChange(e, i)} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={9}>
                                <Form.Item
                                    label="نام خانوادگی"
                                    className={`required-compact-form-Item ${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                    >
                                    <Input size="large" name="lastName" value={x.lastName} onChange={(e) => props.adultInputChange(e, i)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        {reserveInfo && reserveInfo.passengerTypeServices.map((item, index) => <React.Fragment key={index}>
                            {item.passengerType === "Adult" &&
                                <div className={styles.typeService}>
                                    <div className={styles.subject}>سرویس های بیشتر : </div>
                                    <Checkbox.Group
                                        style={{ width: '100%' }}
                                        name="services"
                                        onChange={(e) => props.adultInputChange(e, i, "services")}
                                        >
                                        <Row>{item.services.map((itemService, key) => <Col span={6} key={key}>
                                                <Checkbox value={itemService.id} name="id" style={{fontSize:12}}>
                                                    {itemService.name}
                                                </Checkbox>
                                            </Col>)}
                                        </Row>
                                    </Checkbox.Group>
                                </div>}
                        </React.Fragment>)}
                    </div>
                </div>)}
            </div>
            
            <div className={`${styles.cardBody} ${styles.cardBodyCip}`}>
                <div className={`${styles.rootTitle} ${styles.rootTitle2}`}>
                    <div className={styles.subjectRootTitle}>
                        <BabyOutlineIcon />
                        <b>مسافران (کوچکتر از ۲ سال)</b>
                    </div>
                    <div className={styles.addPassenger}>
                        <button type="button" onClick={props.childAddClick}><PlusOutlined /></button>
                        <input type="text" className="value" value={props.childList.length} readOnly />
                        <span>نفر</span>
                        <button type="button" onClick={props.childRemoveEndClick} disabled={props.childList.length !== 0 ? false : true}><MinusOutlined /></button>
                    </div>
                </div>
                {props.childList.map((x, i)=><div className={styles.contentPassenger} key={i}>
                    <div className={styles.subjectPassenger}>
                        <div>مسافر {i+1}</div>
                        {props.childList.length !== 0 &&
                            <Tooltip placement="right" title="حذف">
                                <div className={styles.removePassenger} onClick={() => props.childRemoveClick(i)}><RemoveSimpleIcon/></div>
                            </Tooltip>}
                    </div>
                    <div className={styles.rowPassenger}>
                        <Row gutter={[10,0]} key={i}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                                <Form.Item
                                    label="جنسیت"
                                    rules={[{ required: true,message:t('please-choose-gender') }]}
                                    initialValue={true}
                                    className={styles.cardItem}
                                    >
                                    <Radio.Group style={{ display: 'flow-root' }} name="gender" value={x.gender} onChange={(e) => props.childInputChange(e, i)}>
                                        <Radio value={true}>مرد</Radio>
                                        <Radio value={false}>زن</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={9}>
                                <Form.Item
                                    label="نام" 
                                    className={`required-compact-form-Item ${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                >
                                    <Input size="large" name="firstName" value={x.firstName} onChange={(e) => props.childInputChange(e, i)} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={9}>
                                <Form.Item
                                    label="نام خانوادگی"
                                    className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                    >
                                    <Input size="large" name="lastName" value={x.lastName} onChange={(e) => props.childInputChange(e, i)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        {reserveInfo && reserveInfo.passengerTypeServices.map((item, index) => <React.Fragment key={index}>
                            {item.passengerType === "Child" &&
                                <div className={styles.typeService}>
                                    <div className={styles.subject}>سرویس های بیشتر : </div>
                                    <Checkbox.Group
                                        style={{ width: '100%' }}
                                        name="services"
                                        onChange={(e) => props.childInputChange(e, i, "services")}
                                        >
                                        <Row>{item.services.map((itemService, key) => <Col span={6} key={key}>
                                                <Checkbox value={itemService.id} name="id" style={{fontSize:12}}>
                                                    {itemService.name}
                                                </Checkbox>
                                            </Col>)}
                                        </Row>
                                    </Checkbox.Group>
                                </div>}
                        </React.Fragment>)}
                    </div>
                </div>)}
            </div>

            <div className={`${styles.cardBody} ${styles.cardBodyCip}`}>
                <div className={`${styles.rootTitle} ${styles.rootTitle3}`}>
                    <div className={styles.subjectRootTitle}>
                        <AccompanyingOutlineIcon />
                        <b>همراه (مشایعت کننده)</b>
                    </div>
                    <div className={styles.addPassenger}>
                        <button type="button" onClick={props.accompanyingAddClick}><PlusOutlined /></button>
                        <input type="text" className="value" value={props.accompanyingList.length} readOnly />
                        <span>نفر</span>
                        <button type="button" onClick={props.accompanyingRemoveEndClick} disabled={props.accompanyingList.length !== 0 ? false : true}><MinusOutlined /></button>
                    </div>
                </div>
                {props.accompanyingList.map((x, i)=><div className={styles.contentPassenger} key={i}>
                    <div className={styles.subjectPassenger}>
                        <div>همراه {i+1}</div>
                        {props.accompanyingList.length !== 0 &&
                            <Tooltip placement="right" title="حذف">
                                <div className={styles.removePassenger} onClick={() => props.accompanyingRemoveClick(i)}><RemoveSimpleIcon/></div>
                            </Tooltip>}
                    </div>
                    <div className={styles.rowPassenger}>
                        <Row gutter={[10,0]} key={i}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={6}>
                                <Form.Item
                                    label="جنسیت"
                                    rules={[{ required: true,message:t('please-choose-gender') }]}
                                    initialValue={true}
                                    className={styles.cardItem}
                                    >
                                    <Radio.Group style={{ display: 'flow-root' }} name="gender" value={x.gender} onChange={(e) => props.accompanyingInputChange(e, i)}>
                                        <Radio value={true}>مرد</Radio>
                                        <Radio value={false}>زن</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={9}>
                                <Form.Item
                                    label="نام" 
                                    className={`required-compact-form-Item ${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                >
                                    <Input size="large" name="firstName" value={x.firstName} onChange={(e) => props.accompanyingInputChange(e, i)} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={9}>
                                <Form.Item
                                    label="نام خانوادگی"
                                    className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                                    >
                                    <Input size="large" name="lastName" value={x.lastName} onChange={(e) => props.accompanyingInputChange(e, i)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        {reserveInfo && reserveInfo.passengerTypeServices.map((item, index) => <React.Fragment key={index}>
                            {item.passengerType === "Accompanying" &&
                                <div className={styles.typeService}>
                                    <div className={styles.subject}>سرویس های بیشتر : </div>
                                    <Checkbox.Group
                                        style={{ width: '100%' }}
                                        name="services"
                                        onChange={(e) => props.accompanyingInputChange(e, i, "services")}
                                        >
                                        <Row>{item.services.map((itemService, key) => <Col span={6} key={key}>
                                                <Checkbox value={itemService.id} name="id" style={{fontSize:12}}>
                                                    {itemService.name}
                                                </Checkbox>
                                            </Col>)}
                                        </Row>
                                    </Checkbox.Group>
                                </div>}
                        </React.Fragment>)}
                    </div>
                </div>)}
            </div>
            
        </div>
    )
}

Passenger.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

Passenger.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Passenger)