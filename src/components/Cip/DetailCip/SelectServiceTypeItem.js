import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import { Button } from 'antd';
import { DownOutlined ,CheckCircleOutlined} from "@ant-design/icons";

import styles from './SelectServiceTypeItem.module.css'

const SelectServiceTypeItem = props => {
    const {item} = props;
    const [detail, setDetail] = useState();
    
    const numberWithCommas = (x) => {
        if (x) {
            return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
        }
        return 0;
    };

    const onSelectDetail = (type) => {
        setDetail(prevValue =>{
            if (type===prevValue){
                return(undefined);
            }
            return(type)
        })
    }
    
    const passengerTypeString = type => {
        switch (type){
            case "Adult":
                return "بزرگسال";
            case "Child":
                return "کودک";
            case "Infant":
                return "نوزاد";
            case "Accompanying":
                return "همراه";
            default:
                return type;              
        }
    } 

    let detailElement = null;

    switch (detail){
        case "remarks":
            detailElement = <div className='margin-top-15 bg-light-gray border-radius padding-y-10 padding-x-20'>
                    <p className='padding-top-20'>{item.remark}</p>;
            </div>
            break;
        case "transport":
            detailElement = <div className='margin-top-15 bg-light-gray border-radius padding-y-10 padding-x-20'>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.RowColumn}>ردیف</th>
                            <th>عنوان</th>
                            <th>تصویر</th>
                            <th>توضیحات</th>
                            <th>قیمت</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.transport.map((transportItem,transportIndex) => <tr key={transportItem.name}>
                            <td>{transportIndex+1}</td>
                            <td>{transportItem.name}</td>
                            <td><img src={transportItem.picture.path} alt={transportItem.picture.altAttribute} title={transportItem.picture.titleAttribute} className={styles.transportImage} /></td>
                            <td>{transportItem.description || "--" }</td>
                            <td>{numberWithCommas(transportItem.salePrice)} ریال</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>;
            break;
        case "extraServices":
            detailElement = <div className='margin-top-15 bg-light-gray border-radius padding-y-10 padding-x-20'>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.RowColumn}>ردیف</th>
                            <th>عنوان</th>
                            <th>توضیحات</th>
                            <th>قیمت</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.services.map((serviceItem,serviceIndex) => <tr key={serviceItem.name}>
                            <td>{serviceIndex+1}</td>
                            <td>{serviceItem.name}</td>
                            <td>{serviceItem.description || "--" }</td>
                            <td>{numberWithCommas(serviceItem.salePrice)} ریال</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>;
            break;
        case "price":
            detailElement = <div className='margin-top-15 bg-light-gray border-radius padding-y-10 padding-x-20'>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.RowColumn}>ردیف</th>
                            <th>نوع مسافر</th>
                            <th>قیمت</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.passengers.map((passengersItem,passengersIndex) => <tr key={passengersIndex}>
                            <td>{passengersIndex+1}</td>
                            <td>{passengerTypeString(passengersItem.passengerType)}</td>
                            <td>{numberWithCommas(passengersItem.salePrice)} ریال</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>;
            break;            
        default:
            detailElement = null;

    }

    return (
        <div className="card-style card-rounded margin-bottom-15" >
            <h5 className="normal-title margin-bottom-15">{props.isSelected?"خدمات انتخاب شده: ":""}{item.name}</h5>
            {item.description && <p className={styles.itemDescription} >{item.description} </p>}
            <div className={styles.cipItemFooter}>
                <div className='detail-btns'>
                    {item.remark && <button type='button' className={`link-style-btn margin-end-20 ${detail === "remarks"?"":"gray"}`} onClick={()=>{onSelectDetail("remarks")}}>
                        توضیحات
                        <DownOutlined className='margin-start-5' rotate={detail === "remarks" ? 180 : 0} />
                    </button>}
                    {item.transport && item.transport.length > 0 && <button type='button' className={`link-style-btn margin-end-20 ${detail === "transport"?"":"gray"}`} onClick={()=>{onSelectDetail("transport")}}>
                        تاکسی ویژه CIP
                        <DownOutlined className='margin-start-5' rotate={detail === "transport" ? 180 : 0} />
                    </button>}
                    { item.services && item.services.length > 0 && <button type='button' className={`link-style-btn margin-end-20 ${detail === "extraServices"?"":"gray"}`} onClick={()=>{onSelectDetail("extraServices")}}>
                        سرویس های مازاد
                        <DownOutlined className='margin-start-5' rotate={detail === "extraServices" ? 180 : 0} />
                    </button>}
                    {item.passengers && item.passengers.length > 0 && <button type='button' className={`link-style-btn margin-end-20 ${detail === "price"?"":"gray"}`} onClick={()=>{onSelectDetail("price")}}>
                        جزییات قیمت
                        <DownOutlined className='margin-start-5' rotate={detail === "price" ? 180 : 0} />
                    </button>}
                </div>
                {props.isSelected ?
                    <CheckCircleOutlined style={{ fontSize: '40px', color: '#4caf50' }} />
                :
                    <div>
                        {item.boardPrice && item.salePrice && item.boardPrice > item.salePrice && <span className='old-price margin-end-10'>{numberWithCommas(item.boardPrice)} ریال</span>}
                        <b className='margin-end-10'>{numberWithCommas(item.salePrice)} ریال</b>
                        <Button htmlType='button' className='button blue-btn inline-btn' onClick={props.onSelectItem} > رزرو آنلاین </Button>
                    </div>
                }
            </div>
            <div>
                {detailElement}
            </div>
        </div>
    )
}

SelectServiceTypeItem.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SelectServiceTypeItem.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(SelectServiceTypeItem)
