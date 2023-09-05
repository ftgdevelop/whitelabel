import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types'
import { i18n, withTranslation, Link } from '../../../../../i18n'
import {useRouter} from 'next/router';
import { ArrowRightIcon } from '../../../UI/Icons'
import IntlTelInput from 'react-intl-tel-input';
import { Form, Input, Row, Col, Collapse, Checkbox, Select, Skeleton } from 'antd'
import { DownOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { HotelIcon, UserOutlineIcon, DateOutlineIcon, ArrowLeftIcon, BabyOutlineIcon, AccompanyingOutlineIcon } from '../../../UI/Icons'

import styles from '../../../../styles/Home.module.css'

const { Panel } = Collapse;
const { TextArea } = Input;

const Transport = props => {
    const { t, reserveInfo } = props;

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    function numberWithCommas(x) {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }

    return (
        <div className={styles.guestDetails}>
            <div className={styles.cardTitle}>ترانسفر فرودگاهی</div>
            <div className={`${styles.cardBody} ${styles.cardBodyCip}`}>
                {reserveInfo ? <ul>
                    {reserveInfo.transport.map((item, index) => <li key={index}>
                            <div className={styles.contentTransport}>
                                <div className={styles.transportImage}>
                                    {item.picture.path === null ?
                                        <img src="https://cdn2.safaraneh.com/images/cip/services/default.jpg" alt="" title="" /> 
                                        :
                                        <img src={item.picture.path} alt={item.picture.altAttribute} title={item.picture.titleAttribute} />}
                                </div>
                                <div className={styles.transportPrice}>
                                    <span className={styles.name}>{item.name}</span>
                                    {/* <span className={styles.boardPrice}>{numberWithCommas(item.boardPrice)} ریال</span> */}
                                    <span className={styles.salePrice}>{numberWithCommas(item.salePrice)} ریال</span>
                                    <span className={styles.description}>{item.description}</span>
                                </div>
                            </div>
                            <div className={styles.addRemoveTransport}>
                                <button type="button" onClick={() => props.setCountTransports(item.count = (item.count+1))}>
                                    <PlusOutlined />
                                </button>
                                <input type="text" className="value" value={item.count ? item.count : item.count = 0} readOnly />
                                <button type="button" onClick={() => item.count >= 1 && props.setCountTransports(item.count = (item.count-1))}>
                                    
                                    <MinusOutlined />
                                </button>
                            </div>
                        </li>
                    )}
                    </ul>
                : "loading"}
                <Form.Item name="SpecialRequest" label="آدرس مبدا یا مقصد">
                    <TextArea rows={2} onChange={ e => {props.setAddressTransports(e.target.value)}} />
                </Form.Item>
            </div>
        </div>
    )
}

Transport.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

Transport.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Transport)