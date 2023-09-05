import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Router, Link, i18n } from '../../../../i18n'
import {withRouter} from "next/router";
import dynamic from 'next/dynamic'

import {Spin} from 'antd';
import {HotelDomesticGetReserve} from '../../../actions';
import styles from '../../../styles/Home.module.css'
import { HostelIcon, RemoveOutlineIcon, SupportIcon } from '../../UI/Icons'

const CountDown = dynamic(() => import('../../UI/CountDown/CountDown'))
const SimilarHotels = dynamic(() => import('./SimilarHotels'))

class ContentCapacity extends React.Component{
    state = { 
        reserveInfo: undefined,
        remainedSeconds: 600
     };

    fetchData = async () => {
        const reserveId = this.props.router.query.reserveId;
        const username = this.props.router.query.username;
        const response = await HotelDomesticGetReserve(reserveId,username);

        if (response.data) {
            if (!this.state.reserveInfo){
                this.setState({reserveInfo:response.data.result});
            }else{
                if (response.data.result.reserveStatus !== this.state.reserveInfo.reserveStatus ){
                    this.setState({reserveInfo:response.data.result});
                }
            }

            if (response.data.result.reserveStatus === 4){
                Router.push(`/payment?username=${username}&reserveId=${reserveId}`);
            }
        }
    };

    countDownTimer = () =>{
        if (this.state.remainedSeconds>0){
            this.setState({remainedSeconds:this.state.remainedSeconds-1})
        }else{
            console.log("time is up");
            clearInterval(this.timerInterval);
        }
    }
    timerInterval = setInterval(() => {            
        this.countDownTimer();
    }, 1000);
    componentDidMount = ()=> {
        this.fetchData();
        const interval = setInterval(() => {
            this.fetchData();
        }, 10000);

        // this.setState({hotelReserveInfo:this.state.reserveInfo})

        return () => {
            clearInterval(this.timerInterval);
            clearInterval(interval);
        }
    };
    
    render(){
        const { t } = this.props;
        return (
            <>
                <div className={styles.contentCapacity}>
                    
                    {(this.state.reserveInfo && (this.state.reserveInfo.reserveStatus === 13 || this.state.reserveInfo.reserveStatus === 8)) ?
                        null : <CountDown seconds={this.state.remainedSeconds} />
                    }
                    
                    <br/>
                    {(this.state.remainedSeconds > 0 )?
                        (this.state.reserveInfo && (this.state.reserveInfo.reserveStatus === 13 || this.state.reserveInfo.reserveStatus === 8)) ?
                        <div className={styles.textStatusTop}>
                            {t('capacity-full-desc')}
                        </div>
                        :<div className={styles.textStatusBottom}>
                            {t('capacity-checking-desc')}
                        </div>
                    :
                        <div className={styles.textStatusTop}>
                            {t('capacity-sorry-waiting')}
                        </div>
                    }

                    <div className={styles.statusCapacity}>
                        {(this.state.reserveInfo && (this.state.reserveInfo.reserveStatus === 13 || this.state.reserveInfo.reserveStatus === 8))?<div className={styles.loading}>
                            <div className={styles.brand}>
                                <SupportIcon/>
                            </div>
                            <div className={styles.dot}>
                                <div className={styles.outIcon}>
                                    <RemoveOutlineIcon/>
                                </div>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className={styles.icon}>
                                <HostelIcon/>
                            </div>
                        </div>:
                        <div className={styles.loading}>
                            <div className={styles.brand}>
                                <SupportIcon/>
                            </div>
                            <div className={styles.dot}>
                                <div className={styles.redDot}></div>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className={styles.icon}>
                                <HostelIcon/>
                            </div>
                        </div>
                        }                
                    </div>


                    <div className={styles.reserveCode}>
                        <span>{t('with-this-code')}</span>
                        <div className={styles.myCode}>
                            <span>
                                {t('tracking-code')} :{this.state.reserveInfo?<b> {this.state.reserveInfo.idReserve} </b>:<Spin/>}
                            </span>
                        </div>
                    </div>

                </div>
                {(this.state.reserveInfo && (this.state.reserveInfo.reserveStatus === 13)) ?
                    <SimilarHotels hotelReserveInfo={this.state.reserveInfo} /> : null
                }
            </>
        )
    }
    
}

ContentCapacity.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

ContentCapacity.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withRouter(withTranslation('common')(ContentCapacity))
