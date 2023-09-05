import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Row, Col, Collapse ,Spin} from 'antd';
import { CaretRightOutlined} from '@ant-design/icons';

import styles from '../../../styles/Cip.module.css'

const PriceCip = props => {
    const { t, discountResponse,
    
    } = props;
    const { Panel } = Collapse;
    
    const numberWithCommas = (x) => {
        if (x) {
            return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
        }
        return 0;
    };

    const getServiceObject = (passengerType,serviceId) => props.passengerServicesArray?.find(item => item.passengerType === passengerType)?.services?.find(item => item.id === serviceId);
    const getPersonPrice = passengerType => props.validateResponse?.rate?.passengers?.find(item=>item.passengerType === passengerType);
    
    
    //passengers
    const passengersArray = props.passengers.map(item => {
        const servicesObj = item.services?.map(serviceItemId => getServiceObject(item.type,serviceItemId));
        const servicesNames = servicesObj?.map(serviceItem => serviceItem.name);
        const servicesPrice = servicesObj?.reduce((total,serviceItem)=>total+serviceItem.salePrice,0) || 0;
        const typePrice = getPersonPrice(item.type)?.salePrice || 0;
        return({
            services:servicesNames,
            passengerTotalPrice: typePrice + servicesPrice
        });
    })
    const passengersTotalPrice = passengersArray.reduce((total,item)=>total+item.passengerTotalPrice , 0);

    //accompanying
    const accompanyingArray = props.accompanying.map(item => {
        const servicesObj = item.services?.map(serviceItemId => getServiceObject("Accompanying",serviceItemId));
        const servicesNames = servicesObj?.map(serviceItem => serviceItem.name);
        const servicesPrice = servicesObj?.reduce((total,serviceItem)=>total+serviceItem.salePrice,0) || 0;
        const typePrice = getPersonPrice("Accompanying")?.salePrice || 0;
        return({
            services:servicesNames,
            accompanyingTotalPrice: typePrice + servicesPrice
        });
    })
    const accompanyingsTotalPrice = accompanyingArray.reduce((total,item)=>total+item.accompanyingTotalPrice , 0);


    //transports
    const transports = props.selectedTransport?.filter(item => item.count > 0);
    const transportsTotalPrice = transports.reduce((total,item)=> total + (item.salePrice * item.count) ,0)


    //extra services
    let extraServices; 
    let extraServicesTotalPrice = 0;
    if (props.selectedServicesArray && props.addedExtraService ){
        extraServices = props.selectedServicesArray?.filter(item => props.addedExtraService.includes(item.id)).map(serviceItem => {
            const amount = (serviceItem.salePrice * (serviceItem.type === "Pet" ? serviceItem.count : 1))
                + 
                ((serviceItem.type === "Conference" || serviceItem.type === "MeetingRoom" ) ? (serviceItem.extraCount * serviceItem.extraSalePrice + serviceItem.hourCount * serviceItem.hourSalePrice) : 0);

            return({
                ...serviceItem,
                calculatedPrice:amount
            })
        });
        if (extraServices?.length){
            extraServicesTotalPrice = extraServices.reduce((total,item)=>total + item.calculatedPrice,0);
        }
    }


    const totalPrice = passengersTotalPrice + accompanyingsTotalPrice + transportsTotalPrice + extraServicesTotalPrice ;

    return (
        <div className={`${styles.priceCip} ${process.env.THEME_NAME === "TRAVELO" && styles.priceCipTravelo}`}>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.resultPrice}>
                        <h3>محاسبه هزینه</h3>
                        <div className={styles.content}>
                            <Collapse 
                                defaultActiveKey={["transfers","accompanyings","services","passengers"]} 
                                ghost
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 180} />}
                                expandIconPosition="right"
                                >
                                <Panel 
                                    key="passengers"
                                        header={
                                            <div className={styles.price}>
                                                <span>مسافر  ({passengersArray.length} نفر)</span>
                                                <b>{numberWithCommas(passengersTotalPrice)} ریال</b>
                                            </div>
                                        }
                                        className={styles.headerPrice}
                                >
                                    {passengersArray.map((passengerItem, index) => {
                                        return (
                                            <div className={styles.detailPrice} key={index}>
                                                <Col>
                                                    مسافر {index + 1}
                                                    {passengerItem.services.length > 0 && <span className='margin-start-10'> (
                                                        {passengerItem.services.join(" , ")}
                                                    )</span>}
                                                </Col>
                                                
                                                <Col>{numberWithCommas(passengerItem.passengerTotalPrice)} ریال</Col>
                                            </div>
                                        )
                                    })}
                                </Panel>
                                
                                {accompanyingArray.length > 0 && <Panel 
                                    key="accompanyings"
                                        header={
                                            <div className={styles.price}>
                                                <span>مشایعت کننده ({accompanyingArray.length} نفر)</span>
                                                <b>{numberWithCommas(accompanyingsTotalPrice)} ریال</b>
                                            </div>
                                        }
                                        className={styles.headerPrice}
                                    >
                                    {accompanyingArray.map((accompanyingItem, index) => {
                                        return (
                                            <div className={styles.detailPrice} key={index}>
                                                <Col>
                                                    مشایعت کننده {index + 1}

                                                    {accompanyingItem.services.length > 0 && <span className='margin-start-10'> (
                                                        {accompanyingItem.services.join(" , ")}
                                                    )</span>}
                                                </Col>
                                                <Col>{numberWithCommas(accompanyingItem.accompanyingTotalPrice)} ریال</Col>
                                            </div>
                                        )
                                        })}                                
                                </Panel>}

                                {transports?.length > 0 && <Panel
                                    key="transfers"
                                        header={
                                            <div className={styles.price}>
                                                <span>تاکسی ویژه cip</span>
                                                <b>{numberWithCommas(transportsTotalPrice)} ریال</b>
                                            </div>
                                        }
                                        className={styles.headerPrice}
                                    >
                                    {transports.map((item,index)=><div className={styles.detailPrice} key={index}>
                                        <Col>{item.name} ({item.count})</Col>
                                        <Col>(x{item.count}) {numberWithCommas(item.salePrice)} ریال</Col>
                                    </div>)}                                
                                </Panel>}

                                {extraServices?.length > 0 && <Panel 
                                    key="services"
                                        header={
                                            <div className={styles.price}>
                                                <span>خدمات اضافه </span>
                                                <b>{numberWithCommas(extraServicesTotalPrice)} ریال</b>
                                            </div>
                                        }
                                        className={styles.headerPrice}
                                    >
                                    {extraServices.map((serviceItem, index) => <div className={styles.detailPrice} key={index}>
                                        <Col>
                                            {serviceItem.name}
                                            {serviceItem.extraCount > 0 && " (میان وعده برای " + serviceItem.extraCount + " نفر)"}
                                            {serviceItem.hourCount > 0 && " (" + serviceItem.hourCount + " ساعت اضافه)" }
                                            {serviceItem.count > 0 && " (" + serviceItem.count + ") "}
                                        </Col>
                                        <Col>
                                            {numberWithCommas(serviceItem.calculatedPrice)} ریال
                                        </Col>
                                    </div>)}
                                </Panel>}                                                              
           

                            </Collapse>                        
                            {discountResponse ? <div className={styles.priceOffer}>
                                <span>تخفیف</span>
                                <small>
                                    {numberWithCommas(discountResponse.discountPrice)} ریال
                                </small>
                            </div> : null}
                            
                            {discountResponse ? 
                                <div className={styles.priceEnd}>
                                    <span>مبلغ نهایی</span>
                                    <b>
                                        {numberWithCommas(discountResponse.orderSubTotalDiscount)} ریال
                                    </b>
                                </div>
                                :
                                <div className={styles.priceEnd}>
                                    <span>مبلغ نهایی</span>
                                    <b>
                                        {numberWithCommas(totalPrice)} ریال
                                    </b>
                                </div>}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

PriceCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
PriceCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(PriceCip)
