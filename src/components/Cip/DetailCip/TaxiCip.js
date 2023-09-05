import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Form, Input } from 'antd';

import styles from '../../../styles/Cip.module.css'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const TaxiCip = props => {    
    const { selectedTransport,updateTransport } = props;    

    const numberWithCommas = (x) => {
        if (x) {
            return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
        }
        return 0;
    };
    if (!selectedTransport || selectedTransport.length===0){
        return <div />;
    }
    const someTransportIsSelected = selectedTransport.some(item => item.count > 0);

    return (<div className={`${styles.taxiCip} ${process.env.THEME_NAME === "TRAVELO" && styles.taxiCipTravelo}`} id="anchortaxicip">
        <h3>تاکسی ویژه cip</h3>
        <div className={styles.content}>
            <div className={styles.carList}>
                {selectedTransport.sort((a, b) => a.id - b.id).map((item,index) => (
                    <div className={`${styles.car} ${index?"margin-start-10":""}`} key={item.name}>
                        <div className={styles.carDetailsCip}>
                            {item.picture.path ?
                            <img src={item.picture.path} alt={item.picture.altAttribute} title={item.picture.titleAttribute} />
                            : <img src="/images/default-car.jpg" />}
                            <div className={styles.carTextCip}>
                                <h6>{item.name}</h6>
                                <small>{numberWithCommas(item.salePrice)} ریال</small>
                            </div>
                        </div>
                        <div className={`${styles.addRemoveCar}`}>
                            <button type="button" onClick={() => updateTransport(item.id,"inc")} >
                                <PlusOutlined />
                            </button>
                            <input type="text" className="value" value = {item.count} readOnly />
                            <button type="button" onClick={() => updateTransport(item.id,"dec")} >
                                <MinusOutlined />
                            </button>
                        </div>
                    </div>
                ))}
        </div>
            {someTransportIsSelected && <Form.Item name="Address" label="آدرس مقصد از فرودگاه" rules={[{ required: true, message: 'لطفا آدرس مقصد را وارد نمایید.' }]}>
                <Input size="large" placeholder="آدرس مقصد " />
            </Form.Item>}
        </div>
    </div>)
    

}

TaxiCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
TaxiCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(TaxiCip)
