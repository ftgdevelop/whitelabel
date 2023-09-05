import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { Link, i18n, withTranslation,Router } from '../../../../i18n'
import { Collapse, Row, Col, Modal,Spin,Tag } from 'antd'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import moment from 'moment-jalaali'
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

import styles from '../../../styles/Home.module.css'
import { BedBookIcon, UserIcon, LockSuccessIcon, LocationIcon, DirectionIcon, PhoneIcon, EmailIcon, CheckIcon, BedIcon, UserOutlineIcon, PhoneGrayIcon,WhatsappGrayIcon, EmailGrayIcon } from '../../UI/Icons'
import AsideMyAccount from '../AsideMyAccount'
import ReserveStatus from '../../UI/ReserveStatus/ReserveStatus'
import Rating from '../../UI/Rating/Rating'
import { RightOutlined, StarFilled } from '@ant-design/icons'
import {foreignHotelGetReserveById} from '../../../actions'
// import ViewCancelationPolicy from '../../components/Booking/ViewCancelationPolicy'
import AnimatedShowMore from 'react-animated-show-more'

console.log("src/components/MyAccount/Booking/HotelForeign.js");
const MapWithNoSSR = dynamic(() => import('../../UI/LeafletMap/LeafletMap'), {
    ssr: false
  });

const { Panel } = Collapse;
const HotelForeign = props => {
    const router = useRouter();
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

    const [copied,setCopied] = useState(false);
    const [reserveInfo,setReserveInfo] = useState();
    const [guestQ,setGuestQ] = useState();
    const [mapVisibility,setMapVisibility] = useState(false);

    const [sessionStorageTelNumber,setSessionStorageTelNumber] = useState();
    const [sessionStorageEmail,setSessionStorageEmail] = useState();
    const [sessionStorageWhatsapp,setSessionStorageWhatsapp] = useState();

    useEffect (()=>{
        setSessionStorageTelNumber(window.sessionStorage.getItem("whiteLabelTelNumber"));
        setSessionStorageEmail(window.sessionStorage.getItem("whiteLabelEmail"));
        setSessionStorageWhatsapp(window.sessionStorage.getItem("whiteLabelWhatsapp"));

        const fetchData = async () => {
            const reserveId = router.query.reserveId;
            const username = router.query.username;
            const response = await foreignHotelGetReserveById(reserveId,username);
            if (response.data) {  
                setReserveInfo(response.data.result);
                const roomsInfo = response.data.result.accommodation.rooms;
                let guests=0;
                for(let i=0 ; i<roomsInfo.length ; i++ ){
                    guests += (roomsInfo[i].adults+roomsInfo[i].children)
                }
                setGuestQ(guests);
            }

          };
          fetchData()
    },[]);

    const goBooksPage = () =>{
        if(this.props.auth && this.props.auth.isAuthenticated){
          Router.push('/myaccount/booking')
        }else{
          Router.push('/signin')
        }
    }

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
                                    <div className={styles.cityNameBooking}>{reserveInfo.city.name}</div>
                                    <div className={styles.iconBooking}>
                                        <BedBookIcon/>
                                    </div>
                                </div>
                                <div className={styles.imageBooking}>
                                    <img src={reserveInfo.accommodation.mainPhoto?reserveInfo.accommodation.mainPhoto:"https://cdn.safaraneh.com/Images/Accommodations/fa/evinhotel.jpg"} alt="" />
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
                                <h1>{reserveInfo.accommodation.name}</h1>
                                <div className={styles.dateDetailBook}>
                                    <span>{guestQ && guestQ}</span>
                                    <UserIcon/>
                                    <span>
                                        {moment(reserveInfo.date.checkIn).format("jDD jMMMM jYYYY")} - {moment(reserveInfo.date.checkOut).format("jDD jMMMM jYYYY")}
                                    </span>
                                </div>
                                <div>
                                    <ReserveStatus status={reserveInfo.status} />
                                </div>
                                <br/>
                                {reserveInfo.status === "Pending"?
                                <Link as={`/payment?reserveId=${reserveInfo.id}&username=${reserveInfo.reserver.username}`} href={`/payment?reserveId=${reserveInfo.id}&username=${reserveInfo.reserver.username}`}>
                                    <a className={styles.goBooking}>
                                        <button className={styles.btnGoBooking}>
                                            <LockSuccessIcon/>
                                            <span>{t("pay-rial",{number:numberWithCommas(reserveInfo.salePrice)})}</span>
                                        </button>
                                    </a>
                                </Link>
                                :reserveInfo.status === "Issued"?
                                    <a target="_blank" href={`http://voucher.safaraneh.com/fa/safaraneh/Reserve/HotelForeign/voucher?reserveId=${reserveInfo.id}&username=${reserveInfo.reserver.username}`} className={styles.goBooking}>
                                        <button className={styles.btnGoBooking}>
                                            <span>{t("view-voucher")}</span>
                                        </button>
                                    </a>
                                : null
                                }   

                                <div className={styles.reserveIdCopy}>
                                    <div className={styles.content}>
                                        <div className={styles.contentIdCopy}>
                                            <span>{t("tracking-code")}</span>
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
                                <h2>{reserveInfo.accommodation.name}</h2>
                                <Rating rate={reserveInfo.accommodation.rating} />
                                <div className={styles.address}>
                                    <LocationIcon />
                                    <span> {reserveInfo.accommodation.address}</span>
                                </div>
                                <div className={styles.contactHotelBook}>
                                    {
                                        reserveInfo.accommodation.coordinator.latitude && reserveInfo.accommodation.coordinator.longitude && <div>
                                            <DirectionIcon/>
                                            <span onClick={()=>{setMapVisibility(true)}} >{t("hotel-on-map")}</span>
                                  
                                            <Modal
                                                title={`${t("hotel")} ${reserveInfo.accommodation.name}  ${t("on-map")}`}
                                                open={mapVisibility}
                                                onCancel={()=>{setMapVisibility(false)}}
                                                footer={null}
                                            >
                                                <div className="mapModal">
                                                <MapWithNoSSR mapInfo={{"lat":reserveInfo.accommodation.coordinator.latitude,"lang":reserveInfo.accommodation.coordinator.longitude,"zoom":14}}/>
                                                </div>
                                            </Modal>
                                        </div>
                                    }
                                    {/* <div>
                                        <PhoneIcon/>
                                        <span>+123456789</span>
                                    </div>
                                    <div>
                                        <EmailIcon/>
                                        <span>info@domain.com</span>
                                    </div> */}
                                </div>
                            </div>
                            <div className={styles.bookInfo}>
                                <div className={styles.rowBookInfo}>
                                    <span>{t("night-number")}</span>
                                    <span>{moment(reserveInfo.date.checkOut).diff(moment(reserveInfo.date.checkIn), 'days')} شب</span>
                                </div>
                                <div className={styles.rowBookInfo}>
                                    <span>{t("enter-date")}</span>
                                    <span> {moment(reserveInfo.date.checkIn).format("jDD jMMMM jYYYY")}</span>
                                </div>
                                <div className={styles.rowBookInfo}>
                                    <span>{t("exit-date")}</span>
                                    <span> {moment(reserveInfo.date.checkOut).format("jDD jMMMM jYYYY")} </span>
                                </div>
                                <div className={styles.rowBookInfo}>
                                    <span>{t("guest-name")}</span>
                                    <span>{`${reserveInfo.reserver.gender?"Mr":"Mrs"} ${reserveInfo.reserver.firstName} ${reserveInfo.reserver.lastName}`}</span>
                                </div>
                            </div>
                            <div className={styles.roomDetails}>
                                <div className={styles.subjectRoomDetails}>{t("reserve-details")}</div>
                                {reserveInfo.accommodation.rooms.map(roomItem => <div key={roomItem.id} className={styles.contentRoomDetails}>
                                    <div>
                                        <div className={styles.nameRoomDetails}>
                                            <BedBookIcon/>
                                            <span>{roomItem.name}</span>
                                        </div>
                                        <ul>
                                            <li>
                                                {roomItem.boardCode}
                                            </li>
                                        </ul>
                                        <div className={styles.moreRoomDetails}>
                                            <UserOutlineIcon/>
                                            <span>{roomItem.adults} {t('adult')}</span> {(roomItem.children>0)&& <span> و  {roomItem.children} {t('child')}</span>}
                                        </div>
                
                                        {/* <div className={styles.moreRoomDetails}>
                                            <BedIcon/>
                                            <span>۱ تخت دو نفره</span>
                                        </div>
                                        <div className={styles.moreRoomDetails}>
                                            <CheckIcon/>
                                            <span>کنسلی رایگان </span>
                                        </div> */}
                                    </div>
                                </div>)}
                            </div>
                            <div className={styles.cancellationPolicy}>
                                <div className={styles.subjectRoomDetails}>{t("cancelation-rules")}</div>

                                <div className={styles.passengerBookingSummary}>
                                    <Tag className="margin-bottom-small" color={(reserveInfo.cancellationPolicyType === "Refundable") ? "green" : (reserveInfo.cancellationPolicyType === "NonRefundable")?"red": undefined }>{(reserveInfo.cancellationPolicyType === "Refundable") ? t("refundable") : (reserveInfo.cancellationPolicyType === "NonRefundable")?t("non-refundable"): reserveInfo.cancellationPolicyType }</Tag>
                                    <ul>
                                        {reserveInfo.cancellations.map((cancellationItem,cancellationIndex)=><li key={cancellationIndex}>
                                            {numberWithCommas(cancellationItem.amount)} {t("rial-from-date")}<span> {moment(cancellationItem.fromDate).format("D MMMM YYYY")} </span> ({moment(cancellationItem.fromDate).format("jD jMMMM jYYYY")})
                                        </li>
                                        )}
                                    </ul>                    
                                </div>
                            </div>
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

HotelForeign.getInitialProps = async () => ({
    namespacesRequired: ["common"],
})
  
HotelForeign.propTypes = {
t: PropTypes.func.isRequired,
}
  
function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default (withTranslation("common"))(connect(mapStateToProps, null)(HotelForeign))
