import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, withTranslation,Router } from '../../../../i18n'
import { Collapse, Row, Col, Modal,Spin,Tag } from 'antd'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import moment from 'moment-jalaali'
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

import styles from '../../../styles/Home.module.css'
import { BedBookIcon, UserIcon, LockSuccessIcon, LocationIcon, DirectionIcon, PhoneIcon, EmailIcon, CheckIcon, UserOutlineIcon, PhoneGrayIcon,WhatsappGrayIcon, EmailGrayIcon, BookingTicketIcon } from '../../UI/Icons'
import AsideMyAccount from '../AsideMyAccount'
import DomesticHotelReserveStatus from '../../UI/ReserveStatus/DomesticHotelReserveStatus'
import Rating from '../../UI/Rating/Rating'
import { RightOutlined, StarFilled, LoadingOutlined } from '@ant-design/icons'
import {HotelDomesticReserveDetail} from '../../../actions'
import { GetVoucherHotelDomesticPdf } from '../../../actions'

const MapWithNoSSR = dynamic(() => import('../../UI/LeafletMap/LeafletMap'), {
    ssr: false
  });


const { Panel } = Collapse;

const Hotel = props => {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         value: '',
    //         copied: false,
    //         modalReserveId: false,
    //     };
    // }

    // setModalReserveId(modalReserveId) {
    //     this.setState({ modalReserveId });
    // }

    const { t } = props;
    moment.loadPersian();
    const router = useRouter();
    const [copied,setCopied] = useState(false);
    const [reserveInfo,setReserveInfo] = useState();
    const [reserveUserName,setUserName] = useState();
    const [guestQ,setGuestQ] = useState();
    const [mapVisibility,setMapVisibility] = useState(false);

    const [sessionStorageTelNumber,setSessionStorageTelNumber] = useState();
    const [sessionStorageEmail,setSessionStorageEmail] = useState();
    const [sessionStorageWhatsapp,setSessionStorageWhatsapp] = useState();
    const [voucherStatus,setVoucherStatus] = useState("pending");

    const reserveId = router.query.reserveId;
    const username = router.query.username;
    
    useEffect (()=>{
        setSessionStorageTelNumber(window.sessionStorage.getItem("whiteLabelTelNumber"));
        setSessionStorageEmail(window.sessionStorage.getItem("whiteLabelEmail"));
        setSessionStorageWhatsapp(window.sessionStorage.getItem("whiteLabelWhatsapp"));

        const reserveId = router.query.reserveId;
        let username = router.query.username.trim();
        const firstCharacter = username.toString().substring(0, 1);
        if (!isNaN(firstCharacter)){
            username = "+"+username;
        }
        setUserName(username);
        const fetchData = async () => {
            let params = {"reserveId":reserveId,"Username":username,"LanguageId":1};
            const response = await HotelDomesticReserveDetail(params);
            if (response.data) {  
                setReserveInfo(response.data);
                const roomsInfo = response.data.Rooms;
                let guests=0;
                for(let i=0 ; i<roomsInfo.length ; i++ ){
                    guests += (roomsInfo[i].AdultOnBed+roomsInfo[i].ChildrenOnBed)
                }
                setGuestQ(guests);
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

    let telNumber,
    whatsapp,
    email;

    if( props.portalInfo){
        telNumber=getPortalValue(props.portalInfo.Phrases,"TelNumber") && getPortalValue(props.portalInfo.Phrases,"TelNumber")['Value'];  
        whatsapp=getPortalValue(props.portalInfo.Phrases,"whatsapp") && getPortalValue(props.portalInfo.Phrases,"whatsapp")['Value'];
        email=getPortalValue(props.portalInfo.Phrases,"Email") && getPortalValue(props.portalInfo.Phrases,"Email")['Value']; 
    }

    const handleClick = async () => {
        setVoucherStatus("loading");
        const res = await GetVoucherHotelDomesticPdf(reserveId, username);
        if(res.data.result){
          setVoucherStatus("success");
          let url = `https://hotelv2.safaraneh.com/File/DownloadTempFile?filename=${res.data.result.fileName}.pdf&fileType=${res.data.result.fileType}&fileToken=${res.data.result.fileToken}`;
          let a = document.createElement('a');
          a.href = url;
          a.click();
        } else {
          setVoucherStatus("error");
        }
        setVoucherStatus("pending");
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
                                    <div className={styles.cityNameBooking}>{reserveInfo.CityName}</div>
                                    <div className={styles.iconBooking}>
                                        <BedBookIcon/>
                                    </div>
                                </div>
                                <div className={styles.imageBooking}>
                                    <img src={reserveInfo.HotelImage?reserveInfo.HotelImage:"https://cdn.safaraneh.com/Images/Accommodations/fa/evinhotel.jpg"} alt="" />
                                </div>
                            </div>
                            <div className={styles.contentDetailBook}>
                                {/* <button 
                                    className={styles.btnModalReserveId}
                                     onClick={() => this.setModalReserveId(true)}
                                    >مدیریت رزرو</button> */}
                                {/* <Modal
                                    open={this.state.modalReserveId}
                                    onOk={() => this.setModalReserveId(false)}
                                    onCancel={() => this.setModalReserveId(false)}
                                    footer={null}
                                    >
                                    <div className={styles.modalReserveId}>
                                        <div className={styles.subjectModal}>آیا باید رزرو خود را به روز کنید یا لغو کنید؟</div>
                                        <div className={styles.descriptionModal}>تیم پشتیبانی مشتری ما آماده کمک به شما است.</div>

                                        <div className={styles.reserveIdCopy}>
                                            <div className={styles.content}>
                                                <div className={styles.contentIdCopy}>
                                                    <span>کد پیگیری</span>
                                                    <div className={styles.copyCode}>
                                                        <span>۵۸۳۴۶۴۴</span>
                                                        <CopyToClipboard
                                                            text="۵۸۳۴۶۴۴"
                                                            onCopy={() => this.setState({copied: true})}>
                                                            { 
                                                                this.state.copied ?
                                                                    <span className={styles.successCopyCode}><CheckIcon/> کپی شد</span> :
                                                                    <span className={styles.spanCopyCode}>کپی کن</span>
                                                            }
                                                        </CopyToClipboard>
                                                    </div>
                                                    <span>هنگام صحبت با پشتیبانی از این کد استفاده کنید</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.helpBook}>
                                            <Row>
                                                <Col span={12}>
                                                    <div className={styles.contactHelpBook}>
                                                        <PhoneGrayIcon/>
                                                        <div>
                                                            <div className={styles.textContact}>با ما تماس بگیرید</div>
                                                            <a href="#">+123456789</a>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div className={styles.contactHelpBook}>
                                                        <WhatsappGrayIcon/>
                                                        <div>
                                                            <div className={styles.textContact}>ارسال پیام در واتس آپ</div>
                                                            <a href="#">+123 456789</a>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col span={12}>
                                                    <div className={styles.contactHelpBook}>
                                                        <EmailGrayIcon/>
                                                        <div>
                                                            <div className={styles.textContact}>ایمیل</div>
                                                            <a href="#">support@domain.com</a>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                    </div>
                                </Modal> */}
                                <h1>{`${reserveInfo.HotelTypeName} ${reserveInfo.HotelName} ${reserveInfo.CityName}`}</h1>
                                <div className={styles.dateDetailBook}>
                                    <span>{guestQ && guestQ}</span>
                                    <UserIcon/>
                                    <span>
                                        {moment(reserveInfo.ReserveStartDate).format("jDD jMMMM jYYYY")} - {moment(reserveInfo.ReserveEndDate).format("jDD jMMMM jYYYY")}
                                    </span>
                                </div>
                                <div>
                                    <DomesticHotelReserveStatus StatusId={reserveInfo.StatusId} StatusName={reserveInfo.StatusName}/>
                                </div>
                                <br/>
                                {
                                    (reserveInfo.StatusId === 4)?
                                        <Link as={`/hotel/payment/reserveId-${reserveInfo.ReserveId}/referenceId-${reserveInfo.UserId}`} href={`/hotel/payment/reserveId-${reserveInfo.ReserveId}/referenceId-${reserveInfo.UserId}`}>
                                            <a className={styles.goBooking}>
                                                <button className={styles.btnGoBooking}>
                                                    <LockSuccessIcon/>
                                                    <span>{t("pay-rial", {number: numberWithCommas(reserveInfo.Payable)})}</span>
                                                </button>
                                            </a>
                                        </Link>
                                    :(reserveInfo.StatusId === 11 || reserveInfo.StatusId === 17)?
                                        
                                        // <a href={`http://voucher.safaraneh.com/fa/safaraneh/Reserve/hotel/voucher?reserveId=${reserveInfo.ReserveId}&username=${reserveUserName}`} target="_blank" className={styles.goBooking}>
                                        //     <button className={styles.btnGoBooking}>
                                        //         <span>{t("view-voucher")}</span>
                                        //     </button>
                                        // </a>
                                        <div className={styles.downloadVoucher}>
                                            <a onClick={handleClick} disabled={voucherStatus === "pending" ? null : "disabled"}>
                                            {voucherStatus === "pending" ?
                                                <><BookingTicketIcon/>{t("recieve-voucher")}</> :
                                                <><LoadingOutlined spin /> {t("loading-recieve-voucher")}</>}
                                            </a>
                                        </div>
                                        
                                    :(reserveInfo.StatusId === 2)?
                                    <Link as={`/hotel/capacity?reserveId=${reserveInfo.ReserveId}&username=${reserveUserName}`} href={`/hotel/capacity?reserveId=${reserveInfo.ReserveId}&username=${reserveUserName}`}>
                                       <a target="_blank" className={styles.goBooking}>
                                            <button className={styles.btnGoBooking}>
                                                <span>{t("checking-capacity")}</span>
                                            </button>
                                        </a>
                                    </Link>
                                    :null
                                }
                                                                               
                                <div className={styles.reserveIdCopy}>
                                    <div className={styles.content}>
                                        <div className={styles.contentIdCopy}>
                                            {t("tracking-code")}
                                            <div className={styles.copyCode}>
                                                <span>{reserveInfo.ReserveId}</span>
                                                <CopyToClipboard
                                                    text={reserveInfo.ReserveId}
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
                            <div className={styles.nameInfo}>
                                <h2>{`${reserveInfo.HotelTypeName} ${reserveInfo.HotelName} ${reserveInfo.CityName}`}</h2>
                                <Rating rate={reserveInfo.HotelRating} />
                                <div className={styles.address}>
                                    <LocationIcon />
                                    <span> {reserveInfo.HotelAddress}</span>
                                </div>
                                <div className={styles.contactHotelBook}>
                                    {reserveInfo.HotelLatitude && reserveInfo.HotelLongitude &&                                    
                                    <div>
                                        <DirectionIcon/>
                                        <span onClick={()=>{setMapVisibility(true)}} >{t("hotel-on-map")}</span>
                                        <Modal
                                            title={`${reserveInfo.HotelTypeName} ${reserveInfo.HotelName} ${reserveInfo.CityName} ${t("on-map")}`}
                                            open={mapVisibility}
                                            onCancel={()=>{setMapVisibility(false)}}
                                            footer={null}
                                        >
                                            <div className="mapModal">
                                                <MapWithNoSSR mapInfo={{"lat":reserveInfo.HotelLatitude,"lang":reserveInfo.HotelLongitude,"zoom":14}}/>
                                            </div>
                                        </Modal>
                                    </div>
                                    }
                                    <div>
                                        <PhoneIcon/>
                                        <a href={`tel:${telNumber?telNumber:sessionStorageTelNumber}`}>{telNumber?telNumber:sessionStorageTelNumber}</a>
                                    </div>
                                    <div>
                                        <EmailIcon/>
                                        <a href={`mailto:${email?email:sessionStorageEmail}`}>{email?email:sessionStorageEmail}</a>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.rowBookInfo}>
                                    <span>{t("night-number")}</span>
                                    <span>{moment(reserveInfo.ReserveEndDate).diff(moment(reserveInfo.ReserveStartDate), 'days')} {t("night")}</span>
                                </div>
                                <div className={styles.rowBookInfo}>
                                    <span>{t("enter-date")}</span>
                                    <span> {moment(reserveInfo.ReserveStartDate).format("jDD jMMMM jYYYY")}</span>
                                </div>
                                <div className={styles.rowBookInfo}>
                                    <span>{t("exit-date")}</span>
                                    <span> {moment(reserveInfo.ReserveEndDate).format("jDD jMMMM jYYYY")} </span>
                                </div>
                                <div className={styles.rowBookInfo}>
                                    <span>{t("guest-name")}</span>
                                    <span>{reserveInfo.ReserveName}</span>
                                    </div>
                                    {console.log("reserveInfo", reserveInfo)}
                            </div>
                            <div className={`${styles.roomDetails} ${styles.noBorderBottom}`}>
                                <div className={styles.subjectRoomDetails}>{t("reserve-details")}</div>
                                {reserveInfo.Rooms.map(roomItem => <div key={roomItem.RoomId} className={styles.contentRoomDetails}>
                                    <div className={styles.nameRoomDetailsContent}>
                                        <div>
                                            <div className={styles.nameRoomDetails}>
                                                <BedBookIcon/>
                                                <span>{roomItem.Name}</span>
                                            </div>
                                            <div className={styles.moreRoomDetails}>
                                                <UserOutlineIcon/>
                                                <span>{roomItem.AdultOnBed} {t('adult')}</span> {(roomItem.ChildrenOnBed>0)&& <span> و  {roomItem.ChildrenOnBed} {t('child')}</span>}
                                            </div>
                                        </div>
                                        
                                        <div className={styles.moreRoomDetails}>
                                            <span>{roomItem.PassengerName}</span>
                                        </div>

                                        {/* <ul>
                                            <li>
                                                {roomItem.boardCode}
                                            </li>
                                        </ul> */}
                
                                        {/* <div className={styles.moreRoomDetails}>
                                            <BedIcon/>
                                            <span>۱ تخت دو نفره</span>
                                        </div>
                                        <div className={styles.moreRoomDetails}>
                                            <CheckIcon/>
                                            <span>کنسلی رایگان </span>
                                        </div> */}


{/* AdultExtraService: 0
AdultOnBed: 2
BoardPrice: 17000000
ChildrenAgeDescription: ""
ChildrenExtraServiceWithBed: 0
ChildrenExtraServiceWithoutBed: 0
ChildrenFree: 0
ChildrenFullService: 0
ChildrenOnBed: 0
Image: "https://cdn.safaraneh.com/general/Images/RoomType/esteghlal-hotel-tehran-020.jpg"
MaxAgeExService: 200
MaxAgeFree: 0
Name: "سوئیت معمولی شرقی"
PassengerName: "رامین درخشان"
Price: 8500000
ReserveEndDate: "2020-12-15"
ReserveStartDate: "2020-12-14"
: 4876 */}




                                    </div>
                                </div>)}
                            </div>
                            {/* <div className={styles.cancellationPolicy}>
                                <div className={styles.subjectRoomDetails}>قوانین کنسلی</div>

                                <div className={styles.passengerBookingSummary}>
                                    <Tag className="margin-bottom-small" color={(reserveInfo.cancellationPolicyType === "Refundable") ? "green" : (reserveInfo.cancellationPolicyType === "NonRefundable")?"red": undefined }>{(reserveInfo.cancellationPolicyType === "Refundable") ? "قابل استرداد" : (reserveInfo.cancellationPolicyType === "NonRefundable")?"غیر قابل استرداد": reserveInfo.cancellationPolicyType }</Tag>
                                    <ul>
                                        {reserveInfo.cancellations.map((cancellationItem,cancellationIndex)=><li key={cancellationIndex}>
                                            {numberWithCommas(cancellationItem.amount)} ریال از تاریخ <span> {moment(cancellationItem.fromDate).format("D MMMM YYYY")} </span> ({moment(cancellationItem.fromDate).format("jD jMMMM jYYYY")})
                                        </li>
                                        )}
                                    </ul>                    
                                </div>
                            </div> */}
                        </div>
                        
                        {/* <div className={styles.feesExtrasBook}>
                            <div className={styles.cardTitle}>هزینه و موارد اضافی</div>
                            <div className={styles.feesExtras}>
                                <div className={styles.cardBody}>
                                    <AnimatedShowMore
                                        height={130}
                                        toggle={({ isOpen }) => isOpen ? 'بستن متن' : 'ادامه متن' }
                                        speed={0}
                                        shadowColor="#ffffff">
                                        <div className={styles.contantBody}>
                                            <h5>هزینه های اجباری</h5>
                                            <p>تمام هزینه های ارائه شده توسط این ملک را شامل می شود. با این حال ، به عنوان مثال ، هزینه ها می توانند بسته به مدت اقامت یا اتاق مورد نظر شما متفاوت باشند.</p>
                                        </div>
                                        <div className={styles.contantBody}>
                                            <h5>هزینه اختیاری</h5>
                                            <p>هزینه ها و سپرده های زیر توسط ملک در زمان سرویس ، check-in یا check-out پرداخت می شود.</p>
                                            <ul>
                                                <li>هزینه صبحانه بوفه: 150 ریال برای بزرگسالان و 75 ریال برای کودکان (تقریباً)</li>
                                                <li>هزینه شاتل فرودگاه: 260 ریال برای هر وسیله نقلیه (یک طرفه)</li>
                                                <li>چک زود هنگام برای پرداخت هزینه (در دسترس بودن) در دسترس است</li>
                                                <li>چک تأخیر برای هزینه در دسترس است (منوط به در دسترس بودن)</li>
                                                <li>هزینه تختخواب تمام وقت: 240،0 ریال در هر شب</li>
                                            </ul>
                                        </div>
                                    </AnimatedShowMore>
                                </div>
                            </div>
                        </div> */}

                        {/* <div className={styles.checkInstructionsBook}>
                            <div className={styles.cardTitle}>بررسی دستورالعمل ها</div>
                            <div className={styles.checkInstructions}>
                                <div className={styles.cardBody}>
                                    <AnimatedShowMore
                                        height={130}
                                        toggle={({ isOpen }) => isOpen ? 'بستن متن' : 'ادامه متن' }
                                        speed={0}
                                        shadowColor="#ffffff">
                                        <div className={styles.contantBody}>
                                            <h5>دستورالعمل های ورود</h5>
                                            <p>هزینه های اضافی ممکن است بسته به خط مشی دارایی متفاوت باشد و متفاوت باشد.</p>
                                            <p>شناسایی عکسی که توسط دولت صادر شده است و کارت اعتباری یا ودیعه نقدی نیز در هنگام ورود به اتهامات اتفاقی لازم است.</p>
                                            <p>درخواست های ویژه در هنگام ورود به سیستم در دسترس هستند و ممکن است هزینه های اضافی را متحمل شوند. درخواست های ویژه تضمین نمی شود.</p>
                                        </div>
                                        <div className={styles.contantBody}>
                                            <h5>دستورالعمل های خروج</h5>
                                            <p>خدمات شاتل فرودگاه 24 ساعته در صورت درخواست ارائه می شود. برای انجام تنظیمات از قبل با ملک تماس بگیرید. هزینه گردشگری توسط شهر اعمال می شود و در ملک جمع می شود. هزینه برای اولین اتاق خواب در هر شب 20 AED است و برای هر اتاق خواب اضافی 20 AED در هر شب افزایش می یابد. برای اطلاعات بیشتر ، لطفاً با استفاده از اطلاعات موجود در ایمیل تأیید خود ، با ملک تماس بگیرید.</p>
                                        </div>
                                    </AnimatedShowMore>
                                </div>
                            </div>
                        </div> */}
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

Hotel.getInitialProps = async () => ({
    namespacesRequired: ["common"],
})
  
Hotel.propTypes = {
t: PropTypes.func.isRequired,
}

const mapStateToProp = (state) => {
    return {
        portalInfo: state.portal.portalData,
        auth: state.auth
    };
};

export default withTranslation("common")(connect(mapStateToProp)(Hotel))
