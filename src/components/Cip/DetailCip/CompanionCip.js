import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Form, Input, Radio, Row, Col, Skeleton,Checkbox } from 'antd';

import styles from '../../../styles/Cip.module.css'
import { PlusOutlineIcon, RemoveSimpleIcon } from "../../UI/Icons";
import FloatInput from '../../UI/FloatInput/FloatInput';

const CompanionCip = props => {
    const { t,passengerServicesArray } = props;
    let services;
    if(passengerServicesArray?.find(serviceItem => serviceItem.passengerType === "Accompanying")?.services?.length > 0){
        services = passengerServicesArray.find(serviceItem => serviceItem.passengerType === "Accompanying").services
    }
    return (
        <div className={`${styles.companionCip} ${process.env.THEME_NAME === "TRAVELO" && styles.companionCipTravelo}`}>
            <div className={styles.subject}>
                <h3>
                    مشایعت کنندگان
                </h3>
                <div className={styles.passengerCount}>
                    <b> {props.accompanying.length} </b>
                    <span>مشایعت کننده</span>
                    <button type="button" className={styles.plusCount} onClick={props.addAccompanying}>
                        <PlusOutlineIcon />
                    </button>
                </div>
            </div>
            {props.accompanying.sort((a, b) => (a.id - b.id )).map((item,index) => <div key={item.id} className={styles.cardContent}>
                <div className={styles.headerPassenger}>
                    <h4>مشایعت کننده {index+1}</h4>
                    <button type="button" className={styles.removePassneger} onClick={() => props.removeAccompanyingItem(item.id)} >
                        <RemoveSimpleIcon />
                    </button>
                </div>
                <div className={styles.contentPassenger}>
                    <Row gutter={[20,0]}>
                        <Col xs={24} sm={12} md={12} lg={4} xl={4} className="ant-form-item-cip ant-form-item-passenger-gender">
                                <Radio.Group 
                                    className='margin-top-5'
                                    style={{ display: 'flow-root' }}
                                    defaultValue={true}
                                    onChange={e => {props.form.setFieldValue(['accompanying', index , 'gender'], e.target.value);}}
                                >
                                    <Radio value={true}>مرد</Radio>
                                    <Radio value={false}>زن</Radio>
                                </Radio.Group>
                                <label className="float-input-label as-label float-phone-label">
                                    جنسیت
                                </label>
                                <Form.Item
                                    hidden
                                    initialValue={true} 
                                    name={['accompanying', index ,'gender']} 
                                />
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={7} xl={7} >
                            <Form.Item
                                name={['accompanying', index ,'firstName']}
                                rules={[{ required: true, message: `لطفا نام مشایعت کننده را وارد کنید.` }]}
                            >
                                <FloatInput
                                    type="text"
                                    label="نام"
                                    placeholder="نام"
                                    className="full-width"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={7} xl={7}>
                            <Form.Item
                                name={['accompanying', index ,'lastName']}
                                rules={[{ required: true, message: `لطفا نام خانوادگی مشایعت کننده را وارد کنید.` }]}
                            >
                                <FloatInput
                                    type="text"
                                    label="نام خانوادگی"
                                    placeholder="نام خانوادگی"
                                    className="full-width"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {services && <div className={styles.additinalServicePAssenger}>
                        <div className={styles.subject}> سرویس هایی بیشتر :</div>
                        <div className={styles.content}>
                           
                                <Checkbox.Group
                                    onChange={value => {
                                        props.UpdateAccompanying(item.id,"services",value);
                                        props.form.setFieldValue(['accompanying', index , 'services'], value);
                                    }}
                                    value={item.services}
                                >
                                    <Row gutter={[20,20]}>
                                        {services.map(serviceItem => <Col key={serviceItem.id}>
                                            <Checkbox value={serviceItem.id} >
                                                {serviceItem.name}
                                            </Checkbox>
                                        </Col>)}
                                    </Row>
                                </Checkbox.Group>
                                 <Form.Item 
                                    hidden
                                    initialValue={[]}
                                    name={['accompanying', index ,'services']}>
                                </Form.Item>
                                <Form.Item 
                                    hidden
                                    initialValue="Accompanying"
                                    name={['accompanying', index ,'passengerType']}>
                                </Form.Item>
                        </div>
                    </div>}
                </div>
            </div>
            )}
        </div>
    )
}

CompanionCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
CompanionCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(CompanionCip)
