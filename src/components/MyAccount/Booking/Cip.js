import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, i18n, withTranslation,Router } from '../../../../i18n'
import {  Row, Col, Spin,Tag,Divider } from 'antd'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import moment from 'moment-jalaali'
import {useRouter} from 'next/router';

import styles from '../../../styles/Home.module.css'
import { FlightIcon,LockSuccessIcon,CheckIcon,PhoneGrayIcon,WhatsappGrayIcon, EmailGrayIcon, BookingTicketIcon } from '../../UI/Icons'
import AsideMyAccount from '../AsideMyAccount'
import DomesticHotelReserveStatus from '../../UI/ReserveStatus/DomesticHotelReserveStatus'
import { RightOutlined, LoadingOutlined } from '@ant-design/icons'
import { CipGetInformation, CipGetVoucher } from '../../../actions'

const Cip = props => {

    const { t } = props;
    moment.loadPersian();
    const router = useRouter();
    const [copied,setCopied] = useState(false);
    const [reserveInfo,setReserveInfo] = useState();
    const [reserveUserName, setUserName] = useState();
    const [myReserveId, setMyReserveId] = useState();

    const [sessionStorageTelNumber,setSessionStorageTelNumber] = useState();
    const [sessionStorageEmail,setSessionStorageEmail] = useState();
    const [sessionStorageWhatsapp, setSessionStorageWhatsapp] = useState();
    const [voucherStatus, setVoucherStatus] = useState("pending");

    useEffect (()=>{
        setSessionStorageTelNumber(window.sessionStorage.getItem("whiteLabelTelNumber"));
        setSessionStorageEmail(window.sessionStorage.getItem("whiteLabelEmail"));
        setSessionStorageWhatsapp(window.sessionStorage.getItem("whiteLabelWhatsapp"));

        const reserveId = router.query.reserveId;
        setMyReserveId(reserveId)
        let username = router.query.username.trim();
        const firstCharacter = username.toString().substring(0, 1);
        if (!isNaN(firstCharacter)){
            username = "+"+username;
        }
        setUserName(username);
        const fetchData = async () => {
            const response = await CipGetInformation(reserveId,username);
            if (response.data) {  
                setReserveInfo(response.data.result);
            }

          };
          fetchData()
    },[]);
    
    const numberWithCommas=(x) =>{
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }
    
    const getPortalValue = (dataArray, keyword) => {
        const itemIndex = dataArray.findIndex((item) => item.Keyword === keyword);
        if (itemIndex !== -1 && dataArray[itemIndex]) {
            return dataArray[itemIndex];
        } else {
            return null;
        }
    }

    const goBooksPage = () =>{
        if(props.auth && props.auth.isAuthenticated){
            Router.push('/myaccount/booking')
        }else{
            Router.push('/signin')
        }
    }

    const handleClick = async () => {
        setVoucherStatus("loading");
        const res = await CipGetVoucher(myReserveId, reserveUserName);
        if (res.data.result) {
            setVoucherStatus("success");
            let url = `https://cip.safaraneh.com/File/DownloadTempFile?filename=${res.data.result.fileName}.pdf&fileType=${res.data.result.fileType}&fileToken=${res.data.result.fileToken}`;
            let a = document.createElement('a');
            a.href = url;
            a.click();
        } else {
            setVoucherStatus("error");
        }
        setVoucherStatus("pending");
    }

    let telNumber,
    whatsapp,
    email;

    if( props.portalInfo){
        telNumber=getPortalValue(props.portalInfo.Phrases,"TelNumber") && getPortalValue(props.portalInfo.Phrases,"TelNumber")['Value'];  
        whatsapp=getPortalValue(props.portalInfo.Phrases,"whatsapp") && getPortalValue(props.portalInfo.Phrases,"whatsapp")['Value'];
        email=getPortalValue(props.portalInfo.Phrases,"Email") && getPortalValue(props.portalInfo.Phrases,"Email")['Value']; 
    }
    
    return (
        <>
            <Row>
                <Col xs={24} sm={24} md={24} lg={7} xl={8}>
                    <div className={styles.asideMobile}>
                        <AsideMyAccount/>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={17} xl={16}>
                    <div className={styles.managePage}>
                        { reserveInfo ?<>
                        <div className={styles.detailBook}>
                            <div className={styles.headDetailBook}>
                                <div className={styles.headBookMore}>
                                    {/* <Link as="/myaccount/booking" href="/myaccount/booking"> */}
                                        <a className={styles.backBooking} onClick={()=>goBooksPage()}>
                                            <RightOutlined />
                                            {t("return-reserv-list")}
                                        </a>
                                    {/* </Link> */}
                                    <div className={styles.cityNameBooking}>{reserveInfo.airport.name}</div>
                                    <div className={styles.iconBooking}>
                                        <FlightIcon/>
                                    </div>
                                </div>
                                <div className={styles.imageBooking}>
                                    <img src={reserveInfo.HotelImage?reserveInfo.HotelImage:"https://cdn.safaraneh.com/Images/Accommodations/fa/evinhotel.jpg"} alt="" />
                                </div>
                            </div>
                            <div className={styles.contentDetailBook}>
                                <h1>{`تشریفات فرودگاهی ${reserveInfo.airport.name}`}</h1>
                                <div className={styles.dateDetailBook}>
                                    <span>
                                        {moment(reserveInfo.FlightDate).format("jDD jMMMM jYYYY")}
                                    </span>
                                </div>
                                <div>
                                    {/* <DomesticHotelReserveStatus StatusId={reserveInfo.ReserveDetails.StatusId} StatusName={reserveInfo.status}/> */}
                                </div>
                                <br/>
                                {/* {
                                    (reserveInfo.ReserveDetails.StatusId === 4)?
                                        <Link as={`/payment?reserveId=${router.query.reserveId}&username=${reserveUserName}`} href={`/payment?reserveId=${router.query.reserveId}&username=${reserveUserName}`}>
                                            <a className={styles.goBooking}>
                                                <button className={styles.btnGoBooking}>
                                                    <LockSuccessIcon/>
                                                    <span>{t("pay-rial", {number: numberWithCommas(reserveInfo.ReserveDetails.Payable)})}</span>
                                                </button>
                                            </a>
                                        </Link>
                                    :(reserveInfo.ReserveDetails.StatusId === 11 || reserveInfo.ReserveDetails.StatusId === 17)?
                                        
                                        <a href={`https://voucher.safaraneh.com/fa/safaraneh/Reserve/cip/voucher?reserveId=${router.query.reserveId}&username=${reserveUserName}`} target="_blank" className={styles.goBooking}>
                                            <button className={styles.btnGoBooking}>
                                                <span>{t("view-voucher")}</span>
                                            </button>
                                        </a>
                                    :null
                                } */}
                                    
                                    {/* {
                                        reserveInfo.status === "Issued" &&
                                            <a href={`https://voucher.safaraneh.com/fa/safaraneh/Reserve/cip/voucher?reserveId=${router.query.reserveId}&username=${reserveUserName}`} target="_blank" className={styles.goBooking}>
                                                <button className={styles.btnGoBooking}>
                                                    <span>{t("view-voucher")}</span>
                                                </button>
                                            </a>
                                    }
                                     */}
                                    {
                                        reserveInfo.status === "Issued" ?
                                            <a onClick={handleClick} disabled={voucherStatus === "pending" ? null : "disabled"} className={styles.goBooking}>
                                                <button className={styles.btnGoBooking}>
                                                    {voucherStatus === "pending" ?
                                                        <><BookingTicketIcon/>{t("recieve-voucher")}</> :
                                                        <><LoadingOutlined spin /> {t("loading-recieve-voucher")}</>}
                                                </button>
                                            </a> : null
                                    }
                                                                               
                                <div className={styles.reserveIdCopy}>
                                    <div className={styles.content}>
                                        <div className={styles.contentIdCopy}>
                                            {t("tracking-code")}
                                            <div className={styles.copyCode}>
                                                <span>{router.query.reserveId}</span>
                                                <CopyToClipboard
                                                    text={router.query.reserveId}
                                                    onCopy={() => setCopied( true)}>
                                                    { 
                                                        copied ?
                                                            <span className={styles.successCopyCode}><CheckIcon/> {t('copied')}</span> :
                                                            <span className={styles.spanCopyCode}>{t('copy')}</span>
                                                    }
                                                </CopyToClipboard>
                                            </div>
                                            <span>{t("use-this-code")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className={styles.infoHotelBook}>
                            <small>نام فرودگاه</small>
                            <h3>
                                <FlightIcon/> {reserveInfo.airport.name}
                            </h3>
                            <Divider style={{ borderTopColor : "#cccccc" }} />
                            <h4>اطلاعات پرواز</h4>
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>شماره پرواز</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>{reserveInfo.flightNumber}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>ایرلاین</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>{reserveInfo.airline}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <div className="margin-bottom-small">
                                        {/* <span>{reserveInfo.FlightDetail.travelType?"مقصد":"مبدا"}</span> */}
                                    </div>
                                </Col>
                                <Col>
                                    <div className="margin-bottom-small">
                                        {/* <span>{reserveInfo.FlightDetail.Location}</span> */}
                                    </div>
                                </Col>
                            </Row>
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>تاریخ پرواز</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>{moment(reserveInfo.flightTime.split("T")[0], "YYYY-MM-DD").format("jYYYY/jM/jD")}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>ساعت پرواز</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>{moment(reserveInfo.flightTime.split("Z")[0]).format('HH:mm:ss')}</span>
                                    </div>
                                </Col>
                            </Row>
                            
                            <Divider style={{ borderTopColor : "#cccccc" }} />

                            <h4>اطلاعات مسافران</h4>
                            {reserveInfo.passengers.map((passengerItem,index) => <Row key={passengerItem.IdPassenger} align="middle" justify="space-between">
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>{index+1}. {passengerItem.firstName + " " + passengerItem.lastName}</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className={`"margin-bottom-small" ${styles.tagSpan}`}>
                                        <Tag>
                                            {passengerItem.passengerType?"بزرگسال":"کودک"}
                                        </Tag>
                                        {/* <Tag> */}
                                            {/* {passengerItem.Nationality?"ایرانی":"خارجی"} */}
                                        {/* </Tag> */}
                                    </div>
                                </Col>
                            </Row>)}  

                            {/* <Divider style={{ borderTopColor : "#cccccc" }} /> */}
                            
                            {/* <h4>استقبال کنندگان</h4> */}
                            {/* {reserveInfo.Accompanyings.map((AccompanyingsItem,index) => <Row key={index} align="middle" justify="space-between">
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>{index+1}. {AccompanyingsItem.FullName }</span>
                                    </div>
                                </Col>
                            </Row>)}   */}

                            <Divider style={{ borderTopColor : "#cccccc" }} />
                            {reserveInfo.transport.items.length > 0 && <>
                                <h4>ترانسفر </h4>
                                {reserveInfo.transport.items.map((TransfersItem,index) => <Row key={TransfersItem.TransferName} align="middle" justify="space-between">
                                    <Col span={24}>
                                        <div className="margin-bottom-small">
                                            <span>{index+1}. {TransfersItem.name}</span>
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <div className="margin-bottom-small">
                                            <span>آدرس : {TransfersItem.address}</span>
                                        </div>
                                    </Col>
                                </Row>)}  
                                <Divider style={{ borderTopColor : "#cccccc" }} />
                            </>}
                            
                            <h4>اطلاعات رزرو گیرنده</h4>
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>نام و نام خانوادگی</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>{reserveInfo.reserver.firstName + ' ' + reserveInfo.reserver.lastName}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>موبایل</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span dir="ltr">{reserveInfo.reserver.phoneNumber}</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row align="middle" justify="space-between">
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>ایمیل</span>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="margin-bottom-small">
                                        <span>{reserveInfo.reserver.email}</span>
                                    </div>
                                </Col>
                            </Row>  
                        </div>     
                        </>:<Spin/>}

                        <div className={styles.needHelpBook}>
                            <div className={styles.subjectHelpBook}>{t("need-help")}</div>
                            <div className={styles.descriptionHelpBook}>{t("24hours-backup")}</div>
                            <div className={styles.helpBook}>
                                <div className={styles.contactHelpBook}>
                                    <PhoneGrayIcon/>
                                    <div>
                                        <div className={styles.textContact}>{t("contact-us")}</div>
                                        <a href={`tel:${telNumber?telNumber:sessionStorageTelNumber}`}>{telNumber?telNumber:sessionStorageTelNumber}</a>
                                    </div>
                                </div>
                                {(sessionStorageWhatsapp || whatsapp) && 
                                    <div className={styles.contactHelpBook}>
                                        <WhatsappGrayIcon/>
                                        <div>
                                            <div className={styles.textContact}>{t("whatsapp")}</div>
                                            <a href={`https://api.whatsapp.com/send?phone=${whatsapp?whatsapp:sessionStorageWhatsapp}`}>
                                                <span dir="ltr">{whatsapp?whatsapp:sessionStorageWhatsapp}</span>
                                            </a>                                        
                                        </div>
                                    </div>
                                }
                                <div className={styles.contactHelpBook}>
                                    <EmailGrayIcon/>
                                    <div>
                                        <div className={styles.textContact}>{t('email')}</div>
                                        <a href={`mailto:${email?email:sessionStorageEmail}`}>{email?email:sessionStorageEmail}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )

}

Cip.getInitialProps = async () => ({
    namespacesRequired: ["common"],
})
  
Cip.propTypes = {
t: PropTypes.func.isRequired,
}

const mapStateToProp = (state) => {
    return {
        portalInfo: state.portal.portalData,
        auth: state.auth
    };
};

export default withTranslation("common")(connect(mapStateToProp)(Cip))
