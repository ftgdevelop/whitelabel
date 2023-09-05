import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { i18n, withTranslation } from "../../../i18n";
import { Row, Col, Button, notification } from "antd";
import { LoadingOutlined, InfoCircleFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import {withRouter} from "next/router";

import { WalletFillIcon, PlusOutlineIcon } from '../UI/Icons'

import styles from "../../styles/Home.module.css";
import { ConfirmByDeposit, GetBalance } from '../../actions/user/authActions';



const Wallet = (props) => {

    const { t } = props;
    const [loading, setLoading] = useState(false);
    const [errorMessage,setErrorMessage]= useState('');

    const numberWithCommas = (x) => {
        if (x) {
            return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
        }
        return 0;
    };


    const submit = async() => {
        setErrorMessage('');
        setLoading(true);
        const { reserveId, username } = props.router.query;
        const res = await ConfirmByDeposit({username: username.replace(' ', '+'),reserveId: reserveId});

        if(res.status === 200 && res.data && res.data.result){
            props.GetBalance(props.currency);
            const callbackUrl = `/callback?reserveId=${reserveId}&username=${username.replace(' ', '+')}&status=${res.data.result.isSuccess}`
            props.router.replace(callbackUrl)

        }else{
            setLoading(false);
            setErrorMessage(res.data.error.message)
        }
    }

    return (
        <div className={styles.wallet}>
            <div className={styles.cardTitle}>
                <h4>پرداخت با استفاده از کیف پول؟</h4>
                <div className={styles.increaseCredit}>
                    <a href="myaccount/wallet" target="_blank">
                        <PlusOutlineIcon/>
                        افزایش اعتبار
                    </a>
                </div>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.pricePayment}>کل مبلغ پرداخت : {numberWithCommas(props.pricePayment)} ریال</div>
                <div className={styles.pricePayment}>موجودی کیف پول شما : {numberWithCommas(props.creditAmount)} ریال</div>
                {errorMessage ? <p className="signup__error">{errorMessage}</p> :''}
                
                <Button 
                    className={styles.btnPayment}
                    disabled={props.pricePayment > props.creditAmount ? false: false }
                    onClick={()=>submit()}>
                    { loading ? <LoadingOutlined/> : <WalletFillIcon/>}
                    {t('pay')}
                </Button>
                
            </div>
        </div>
    )
};

Wallet.getInitialProps = async () => ({
    namespacesRequired: ["common"],
});

Wallet.propTypes = {
    t: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => {
    return {
      creditAmount: state.creditAmount,
      currency: state.currency
    };
};

const mapDispatchToProps = (dispatch) => ({
    GetBalance: params => dispatch(GetBalance(params)),
})
export default withTranslation('common')(connect(mapStateToProp, mapDispatchToProps)(withRouter(Wallet)))
