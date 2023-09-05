import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import { Button, Modal, Spin } from 'antd'

import styles from '../../../styles/Hotel.module.css'
import { CheckOutlined } from '@ant-design/icons'
import moment from 'moment-jalaali';
import {GetCancellationPolicy} from '../../../actions'

const Cancellation = props => {
    const { t } = props;
    moment.loadPersian();

    const [cancellationRules,setCancellationRules] = useState();
    const [modalVisibility,setModalVisibility] = useState(false); 

    function numberWithCommas(x) {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }

    const getCancellationRules = async (token)=>{
        setModalVisibility(true);
        const cancellationResponse = await GetCancellationPolicy(props.parametersString);
        if (cancellationResponse.data){
            setCancellationRules(cancellationResponse.data.result);
        }
    }

    return (
        <>
            <span className={props.status === "Refundable"?styles.green:""}  onClick={()=>getCancellationRules()} >
            {props.status === "Refundable" && <CheckOutlined /> } { props.status}</span>
            <Modal
            className={i18n.language === 'us'?"ltr":"rtl"}
            title={t("cancelation-policy")}
            open={modalVisibility}
            onCancel={()=>setModalVisibility(false)}
            footer={<Button type="primary" htmlType="button" onClick={()=>setModalVisibility(false)}>{t("very-good")}</Button>}
            >
                {cancellationRules ?
                <div>
                    <h3>{(cancellationRules.status === "Refundable") && t("refundable")}</h3>
                    <h3>{(cancellationRules.status === "NonRefundable") && t("non-refundable")}</h3>
                    {/* <h3>{(cancellationRules.status === "CallSupport") && t("call-support-cancellation")}</h3> */}
                    <ul>
                        {cancellationRules.fees.map((item,index)=>{
                            let date;
                            if(i18n.language === 'fa'){
                                date = <> 
                                    <span> {moment(item.fromDate).format("D MMMM YYYY")} </span>
                                    ({moment(item.fromDate).format("jD jMMMM jYYYY")}) 
                                </>;
                            }else{
                                const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                                const d = new Date(item.fromDate);
                                let month = months[d.getMonth()];
                                date = d.getDate() + " " + month + " " + d.getFullYear()
                            }
                            return(<li key={index}>
                                {numberWithCommas(item.amount)} {t("rial-from")} {date}
                            </li>)}
                        )}
                    </ul>                    
                </div>
                : 
                <Spin />
                }
            </Modal>

        </>
    )
}

Cancellation.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Cancellation.propTypes = {
t: PropTypes.func.isRequired,
}
  
  

export default withTranslation('common')(Cancellation)
