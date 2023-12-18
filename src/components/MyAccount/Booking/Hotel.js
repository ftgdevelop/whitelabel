import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, withTranslation,Router,i18n } from '../../../../i18n'
import { Row, Col, Modal,Spin,Tag } from 'antd'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import moment from 'moment-jalaali'
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

import styles from '../../../styles/Home.module.css'
import { BedBookIcon, UserIcon, LockSuccessIcon, LocationIcon, DirectionIcon, PhoneIcon, EmailIcon, CheckIcon, UserOutlineIcon, PhoneGrayIcon,WhatsappGrayIcon, EmailGrayIcon, BookingTicketIcon } from '../../UI/Icons'
import AsideMyAccount from '../AsideMyAccount'
import Rating from '../../UI/Rating/Rating'
import { RightOutlined } from '@ant-design/icons'
import {GetHotelById, HotelV4DomesticGetReserve} from '../../../actions'

const MapWithNoSSR = dynamic(() => import('../../UI/LeafletMap/LeafletMap'), {
    ssr: false
  });

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
    const [hotelInfo,setHotelInfo] = useState();  
    const [hasError,setError] = useState(false);    

    const [mapVisibility,setMapVisibility] = useState(false);

    const [sessionStorageTelNumber,setSessionStorageTelNumber] = useState();
    const [sessionStorageEmail,setSessionStorageEmail] = useState();
    const [sessionStorageWhatsapp,setSessionStorageWhatsapp] = useState();
    
    const reserveId = router.query.reserveId;

    useEffect (()=>{
        setSessionStorageTelNumber(window.sessionStorage.getItem("whiteLabelTelNumber"));
        setSessionStorageEmail(window.sessionStorage.getItem("whiteLabelEmail"));
        setSessionStorageWhatsapp(window.sessionStorage.getItem("whiteLabelWhatsapp"));

        let username = router.query.username.trim();
        const firstCharacter = username.toString().substring(0, 1);
        if (!isNaN(firstCharacter)){
            username = "+"+username;
        }

        const fetchData = async () => {
            const response = await HotelV4DomesticGetReserve(reserveId,username);
            if (response?.data?.result) {  
                setReserveInfo(response.data.result);

                const HotelId = response.data.result.accommodationId;
                const HotelInfoResponse = await GetHotelById(HotelId,i18n.language);
                if (HotelInfoResponse.data){
                  setHotelInfo(HotelInfoResponse.data);
                }
            }else{
                setError(true);
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


    let guests;
    let price;

    if (reserveInfo?.rooms){
        guests = reserveInfo.rooms.reduce((sum,room) => (sum + room.bed) , 0);
        price = reserveInfo.rooms.reduce((sum,room) => {
            const roomPrice = room.pricing?.find(x => x.ageCategoryType==="ADL" && x.type==="Room")?.amount;
            return((sum + roomPrice))
        } , 0);
    }

    let status = null;

    let paymentLink = null;

    if(reserveInfo){

        let StatusColor = null;
        switch(reserveInfo.status){
            
            case "Pending":
            case "Registered":
            case "OnCredit":
            case "InProgress":
                StatusColor = "#52c41a";
                break;

            case "ContactProvider":
            case "Unavailable":
                StatusColor = "#e7412a";
                break;

            case "Canceled":
            case "PaymentSuccessful":
            case "WebServiceUnsuccessful":
                StatusColor = "#ffb6ab";
                break;
        
            case "Issued":
                StatusColor = "#1dac08";
                break;

            default:
                StatusColor = "#dddddd"

            //what about these status?
            // "Undefined, Issued, WebServiceCancel, PriceChange, Refunded, Voided, InProgress, PaidBack, RefundInProgress, Changed"
        };

        status = <Tag color={StatusColor} > {t(`${reserveInfo.status}`)} </Tag>

        paymentLink = (
            <Link
                as={`/payment?username=${reserveInfo.username}&reserveId=${reserveInfo.id}`}
                href={`/payment?username=${reserveInfo.username}&reserveId=${reserveInfo.id}`}
            >
                <a className={styles.goBooking}>
                    <button className={styles.btnGoBooking}>
                        <LockSuccessIcon/>
                        <span>{t("pay-rial", {number: numberWithCommas(price)})}</span>
                    </button>
                </a>
          </Link>
        );

        if(
            reserveInfo.status === "Canceled" 
            || reserveInfo.status === "Issued" 
            || reserveInfo.status === "Registered" 
            || reserveInfo.status === "Unavailable" 
            || reserveInfo.status === "PaymentSuccessful" 
            || reserveInfo.status === "WebServiceUnsuccessful" 
        ){
            paymentLink = null; 
        }

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
                        {hasError ? (
                            <div className={styles.needHelpBook}>
                                <div className={styles.helpBook}>
                                    متاسفانه دریافت اطلاعات این رزرو با خطا روبرو شد. لطفا برای اطلاعات بیشتر با پشتیبانی تماس بگیرید.
                                </div>
                                <br />
                                <div className={styles.reserveIdCopy}>
                                    <div className={styles.content}>
                                        <div className={styles.contentIdCopy}>
                                            {t("tracking-code")}
                                            <div className={styles.copyCode}>
                                                <span>{reserveId}</span>
                                                <CopyToClipboard
                                                    text={reserveId}
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
                                <br />
                            </div>
                        ): (reserveInfo && hotelInfo) ? <>
                        <div className={styles.detailBook}>
                            <div className={styles.headDetailBook}>
                                <div className={styles.headBookMore}>
                                    {/* <Link as="/myaccount/booking" href="/myaccount/booking"> */}
                                        <a className={styles.backBooking} onClick={()=>goBooksPage()}>
                                            <RightOutlined />
                                            {t("return-reserv-list")}
                                        </a>
                                    {/* </Link> */}
                                    <div className={styles.cityNameBooking}>{hotelInfo.CityName}</div>
                                    <div className={styles.iconBooking}>
                                        <BedBookIcon/>
                                    </div>
                                </div>
                                <div className={styles.imageBooking}>
                                    <img src={hotelInfo.ImageUrl || "https://cdn.safaraneh.com/Images/Accommodations/fa/evinhotel.jpg"} alt="" />
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
                                <h1>{`${hotelInfo.HotelCategoryName} ${hotelInfo.HotelName} ${hotelInfo.CityName}`}</h1>
                                <div className={styles.dateDetailBook}>
                                    {!!guests && <><span>{guests}</span> <UserIcon/></>}
                                    
                                    <span>
                                        {moment(reserveInfo.checkin).format("jDD jMMMM jYYYY")} - {moment(reserveInfo.checkout).format("jDD jMMMM jYYYY")}
                                    </span>
                                </div>

                                {status}

                                <br/>
                                <br/>

                                {paymentLink}


                                { reserveInfo.status === 'Issued' && hotelInfo && (
                                    <div className={styles.downloadVoucher}>
                                        <a
                                            href={`http://voucher.safaraneh.com/fa/safaraneh/Reserve/hotel/voucher?reserveId=${reserveInfo.id}&username=${reserveInfo.username}`}
                                            target="_blank"
                                        >
                                            <BookingTicketIcon/> {t("recieve-voucher")}
                                        </a>
                                    </div>
                                )}
                                                                               
                                <div className={styles.reserveIdCopy}>
                                    <div className={styles.content}>
                                        <div className={styles.contentIdCopy}>
                                            {t("tracking-code")}
                                            <div className={styles.copyCode}>
                                                <span>{reserveInfo.id}</span>
                                                <CopyToClipboard
                                                    text={reserveInfo.id}
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
                                <h2>{`${hotelInfo.HotelCategoryName} ${hotelInfo.HotelName} ${hotelInfo.CityName}`}</h2>
                                <Rating rate={hotelInfo.HotelRating} />
                                <div className={styles.address}>
                                    <LocationIcon />
                                    <span> {hotelInfo.Address}</span>
                                </div>
                                <div className={styles.contactHotelBook}>
                                    {hotelInfo.Latitude && hotelInfo.Longitude &&                                    
                                    <div>
                                        <DirectionIcon/>
                                        <span onClick={()=>{setMapVisibility(true)}} >{t("hotel-on-map")}</span>
                                        <Modal
                                            title={`${hotelInfo.HotelCategoryName} ${hotelInfo.HotelName} ${hotelInfo.CityName} ${t("on-map")}`}
                                            open={mapVisibility}
                                            onCancel={()=>{setMapVisibility(false)}}
                                            footer={null}
                                        >
                                            <div className="mapModal">
                                                <MapWithNoSSR mapInfo={{"lat":hotelInfo.Latitude,"lang":hotelInfo.Longitude,"zoom":14}}/>
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
                                    <span>{moment(reserveInfo.checkout).diff(moment(reserveInfo.checkin), 'days')} {t("night")}</span>
                                </div>
                                <div className={styles.rowBookInfo}>
                                    <span>{t("enter-date")}</span>
                                    <span> {moment(reserveInfo.checkin).format("jDD jMMMM jYYYY")}</span> 
                                </div>
                                <div className={styles.rowBookInfo}>
                                    <span>{t("exit-date")}</span>
                                    <span> {moment(reserveInfo.checkout).format("jDD jMMMM jYYYY")} </span>
                                </div>
                                <div className={styles.rowBookInfo}>
                                    <span>{t("guest-name")}</span>
                                    <span>{reserveInfo.reserver?.firstName} {reserveInfo.reserver?.lastName}</span>
                                </div>
                            </div>
                            <div className={`${styles.roomDetails} ${styles.noBorderBottom}`}>
                                <div className={styles.subjectRoomDetails}>{t("reserve-details")}</div>
                                {reserveInfo.rooms.map(roomItem => <div key={roomItem.roomId} className={styles.contentRoomDetails}>
                                    <div className={styles.nameRoomDetailsContent}>
                                        <div>
                                            <div className={styles.nameRoomDetails}>
                                                <BedBookIcon/>
                                                <span>{roomItem.name}</span>
                                            </div>
                                            <div className={styles.moreRoomDetails}>
                                                <UserOutlineIcon/>
                                                <span>{roomItem.bed} {t('adult')}</span>
                                            </div>
                                        </div>
                                        
                                        <div className={styles.moreRoomDetails}>
                                            {roomItem.passengers?.map((passengerItem,passengerIndex) => (
                                                <div key={passengerIndex}>
                                                    {passengerItem.firstName} {passengerItem.lastName}
                                                </div>
                                            ))}
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
