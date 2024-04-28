import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Row, Col, Button, Modal, Radio, Skeleton } from 'antd'
import { LoadingOutlined, InfoCircleFilled } from '@ant-design/icons'

import {MakeToken} from "../../../actions";
import styles from '../../../styles/Home.module.css'
import { LockIcon, ErrorIcon } from '../../UI/Icons'

const antIcon = <LoadingOutlined style={{ 'font-size': '18px', 'margin-right': '5px', 'position': 'relative','top': '3px' }} spin />


const ContentPayment = props => {

    const { t } = props;

    const [selectedBank,setSelectedBank]=useState();
    const [submitLoading,setSubmitLoading]=useState(false);  

    const onChangeBank = (e)=>{
        setSelectedBank(e.target.value);
    }
    useEffect(()=>{
        if (props.gateWays && props.gateWays[0].id && (!selectedBank)){
            setSelectedBank(props.gateWays.filter(item=>item.id !== 1006)[0].id);
        }
    });
        
    const numberWithCommas= (x) => {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }
    const onPayment =async()=>{
        setSubmitLoading(true);
        let params ={
            "reserveId":props.reserveInfo.idReserve,
            "reserveReferenceId":props.reserveInfo.referenceId,

            // %%%
            // for local test:
            //"callbackUrl":`https://whitelabel-chi.vercel.app/fa/hotel/payment/reserveId-${props.reserveInfo.idReserve}/referenceId-${props.reserveInfo.referenceId}`,
            // for upload :
            "callbackUrl":`${window.location.origin + (i18n.language === 'fa' ? '/fa' : '/ar') }/hotel/payment/reserveId-${props.reserveInfo.idReserve}/referenceId-${props.reserveInfo.referenceId}`,
            "gatewayId":selectedBank,
            "ipAddress":"0000"
        }
        const response = await MakeToken(params);
        if (response.data) {  
            const tokenId =response.data.result.tokenId ;
            window.location.replace(`https://paymentv1.safaraneh.com/fa/Reserves/Payment/PaymentRequest?tokenId=${tokenId}`);
        } else {
            Modal.error({
                title: t("pay-error"),
                content: t("can-not-pay-reserve")
                ,okText: t("very-good"),
                onOk:()=>{
                    setSubmitLoading(false);
                }
              });
        }
    }
    return (
        <div className={styles.contentBooking}>
            {/* <div className={styles.backPage}>
                <Link as="/hotel/checkout" href="/hotel/checkout">
                    <a>
                        <ArrowRightIcon />
                        <span>برگشت به بررسی ظرفیت</span>
                    </a>
                </Link>
            </div> */}
            {props.paymentStatus && props.paymentStatus === "failed" ?
            <div className={styles.errorPayment}>
                <div className={styles.subject}>
                    <ErrorIcon/>
                    {t("error-in-pay")}
                </div>
               <span>{t("please-pay-again")}</span>
            </div>:null}

            <div className={styles.pouyaAlert}>
                <InfoCircleFilled />
                <span>{t("second-password")}</span>
                <Link as="/other/pouya-password" href="/other/pouya-password">
                    <a target="_blank">
                        {t("second-password-desc")}
                    </a>
                </Link>
            </div>

            <div className={styles.howPay}>
                <div className={styles.cardTitle}>{t("please-choose-pay-panel")}</div>
                <div className={styles.cardBody}>
                    <div className={styles.note}>
                        <img src="/images/shetab.png" />
                        <span>{t("shetab-card")}</span>
                    </div>
                    {
                        props.gateWays?
                        <Radio.Group defaultValue={props.gateWays[0].id} className="bankGateWaysRadio" onChange={onChangeBank}>
                            {props.gateWays.filter(bankItem => bankItem.id !== 1006 && bankItem.id !== 6).map(bank=><Radio.Button key={bank.id} value={bank.id}>
                                <img className="gatewaysRadioIcon" src={(bank.id === 5)?"/images/saderat.png":"/images/unknown-bank.png"} /> {bank.displayName || bank.name}
                                {console.log(props.gateWays)}
                            </Radio.Button>)}
                        </Radio.Group>
                        :
                        <div className="bankGateWaysRadio">
                            <Skeleton.Button active className={styles.bankGateWaysRadioSkeleton} />
                            <Skeleton.Button active className={styles.bankGateWaysRadioSkeleton} />
                        </div>
                    }
                        <Row>
                            <Col span={24}>
                                {props.reserveInfo ?
                                <div className={styles.pricePayment}>
                                    {t("total-price-pay")} : {
                                        numberWithCommas(props.reserveInfo.totalPrice.salePrice)
                                    } {t('rial')}
                                </div>
                                :
                                <div className={styles.pricePayment}>
                                    <Skeleton.Button active className={styles.pricePaymentSkeleton} />
                                </div>
                                }
                                
                                <Button loading={submitLoading} disable={!props.reserveInfo || !selectedBank} className={styles.btnPayment} onClick={onPayment}>
                                    <LockIcon/>
                                    {t("pay")}
                                </Button>
                            </Col>
                        </Row>
                   
                    <div className={styles.textAgreePayment}>
                        <span>
                            {t("accept-privacy")}
                        </span>
                    </div>
                </div>
            </div>
            
            
            {/* { showing 
                ? */}
                    <div className={styles.alertWaiting}>
                        <span>{t("15-minutes")}</span>
                        {/* <CloseOutlined onClick={() => this.setState({ showing: !showing })}/> */}
                    </div>
                 {/* : null
             } */}
            
        </div>
    )

}

ContentPayment.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
ContentPayment.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ContentPayment)
