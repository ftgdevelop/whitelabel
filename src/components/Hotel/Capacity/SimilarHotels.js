import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link, withTranslation, i18n } from '../../../../i18n';
import { Button, Row, Col, Skeleton, Tooltip } from 'antd';
import { EnvironmentOutlined ,LeftOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic'

import defaultHotelImage from '../../../assets/defaultHotel.svg';
import styles from '../../../styles/Hotel.module.css'
import {HotelDomesticSearchList2, GetHotelById} from '../../../actions'

const Rating = dynamic(() => import('../../UI/Rating/Rating'))

const SimilarHotels = props => {
    const { t, hotelReserveInfo } = props;
    
    const [displayAll,setDisplayAll] = useState(false);
    const [similarHotels,setSimilarHotels] = useState([]);
    const [loading,setLoading] = useState(true);
    const [hoteldata, setHoteldata] = useState("");
    const [hotelUrl, setHotelUrl] = useState("");

    useEffect(() => {
        const hotelData = async () => {
            if (hotelReserveInfo) {
                const res = await GetHotelById(hotelReserveInfo.hotelId, i18n.language);
                if (res.data) {
                    setHoteldata(res.data);
                }
            }
        }
        hotelData();

    }, [hotelReserveInfo]);

    useEffect(()=>{
        const fetchData = async () => {
            // if (hoteldata && hoteldata.Similars && hoteldata.Similars.length > 0  && props.selectedCheckin && props.selectedCheckout && props.selectedRoomsArray){
            if (hoteldata && hoteldata.Similars && hoteldata.Similars.length > 0) {
                let hotelsIdArray = [];
                for (let i = 0 ; i< hoteldata.Similars.length ; i++){
                    hotelsIdArray.push(hoteldata.Similars[i].HotelId)
                }

                let location = "/location-" + hotelReserveInfo.hotelId;
                let checkIn = "/checkin-" + hotelReserveInfo.reserveStartDate.split('T')[0];
                let checkOut = "/checkout-" + hotelReserveInfo.reserveEndDate.split('T')[0];

                let hotelsRoomArray = [];
                if (hotelReserveInfo) {
                    for (let i = 0; i < hotelReserveInfo.rooms.length; i++) {
                        hotelsRoomArray.push(
                            {
                                "adultNo": hotelReserveInfo.rooms[i].adultNo,
                                "childAges": hotelReserveInfo.rooms[i].childrenAges,
                                "roomNo": hotelReserveInfo.rooms[i].roomNo === null ? 0 : hotelReserveInfo.rooms[0].roomNo
                            }
                        )
                    }
                }
                
                let roomm = [];
                for (let index = 0; index < hotelsRoomArray.length; index++) {
                    let searchedRoom =`/adult-${hotelsRoomArray[index].adultNo}`;
                    let childrenAgesArray = hotelsRoomArray[index].childAges;
                    for (let i=0 ; i< childrenAgesArray.length ; i++){
                        searchedRoom += `/child-${childrenAgesArray[i]}`
                    }
                    roomm.push(searchedRoom);
                }
                
                const defaultUrl = location + checkIn + checkOut + roomm.join('');
                setHotelUrl(defaultUrl);


                let params = { "hotelCodes": hotelsIdArray, "checkinDate": hotelReserveInfo.reserveStartDate.split('T')[0], "checkoutDate": hotelReserveInfo.reserveEndDate.split('T')[0], "rooms": hotelsRoomArray }
                
                const hotelPricesResponse = await HotelDomesticSearchList2(params);

                if (hotelPricesResponse.data){                   
                    let similars = [...hoteldata.Similars];
                    let newInfo = hotelPricesResponse.data.result;

                    for (let i=0 ; i< newInfo.length ; i++){
                        let itemIndex = similars.findIndex(x => x.HotelId === newInfo[i].hotelId );
                        if(itemIndex !== -1){
                            similars[itemIndex].boardPriceFrom = newInfo[i].boardPriceFrom;
                            similars[itemIndex].salePriceFrom = newInfo[i].salePriceFrom;
                        }
                    }
                    setSimilarHotels(similars.filter(i => i.salePriceFrom));
                    setLoading(false);
                }
            } else if(hoteldata && hoteldata.Similars && hoteldata.Similars.length === 0){
                setLoading(false);
            }
        }
        fetchData();

    }, [hoteldata, props.selectedCheckout]);

    const toggleDisplayAll = ()=>{
        setDisplayAll(!displayAll);
    }
    function numberWithCommas(x) {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }
    return (
        <div className={styles.similarHotels}>
            {
                (loading)?
                    <div className={styles.container}>
                        <div className={styles.subjectSimilarHotels}>
                            <h3>{t('similar-hotels')}</h3>
                            <span>{t('you-might-be-interested-this-hotels')}</span>
                        </div>
                        <div className={styles.contentSimilarHotels}>
                            <Row gutter={[20,20]}>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <div className={styles.singleSimilarHotels}>
                                        <div className={styles.imageSimilarHotels}>
                                            <Skeleton.Image className={styles.imageSimilarHotelsSkeleton} />
                                        </div>
                                        <div className={styles.detailSimilarHotels}>
                                            <div className={styles.mainDetail}>
                                                <Skeleton.Button active size="medium" className={styles.nameSimilarHotelsSkeleton} />
                                                <Skeleton.Button active size="small" className={styles.ratingSimilarHotelsSkeleton} />
                                                <Skeleton.Button active size="small" className={styles.addressSimilarHotelsSkeleton} />
                                            </div>
                                            <div className={styles.moreDetail}>
                                                <Skeleton.Input active size="large" className={styles.btnSimilarHotelsSkeleton} />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <div className={styles.singleSimilarHotels}>
                                        <div className={styles.imageSimilarHotels}>
                                            <Skeleton.Image className={styles.imageSimilarHotelsSkeleton} />
                                        </div>
                                        <div className={styles.detailSimilarHotels}>
                                            <div className={styles.mainDetail}>
                                                <Skeleton.Button active size="medium" className={styles.nameSimilarHotelsSkeleton} />
                                                <Skeleton.Button active size="small" className={styles.ratingSimilarHotelsSkeleton} />
                                                <Skeleton.Button active size="small" className={styles.addressSimilarHotelsSkeleton} />
                                            </div>
                                            <div className={styles.moreDetail}>
                                                <Skeleton.Input active size="large" className={styles.btnSimilarHotelsSkeleton} />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <div className={styles.singleSimilarHotels}>
                                        <div className={styles.imageSimilarHotels}>
                                            <Skeleton.Image className={styles.imageSimilarHotelsSkeleton} />
                                        </div>
                                        <div className={styles.detailSimilarHotels}>
                                            <div className={styles.mainDetail}>
                                                <Skeleton.Button active size="medium" className={styles.nameSimilarHotelsSkeleton} />
                                                <Skeleton.Button active size="small" className={styles.ratingSimilarHotelsSkeleton} />
                                                <Skeleton.Button active size="small" className={styles.addressSimilarHotelsSkeleton} />
                                            </div>
                                            <div className={styles.moreDetail}>
                                                <Skeleton.Input active size="large" className={styles.btnSimilarHotelsSkeleton} />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>                    
                :(similarHotels.length > 0)?
                <div className={styles.container}>
                    <div className={styles.subjectSimilarHotels}>
                        <h3>{t('similar-hotels')}</h3>
                        <span>{t('you-might-be-interested-this-hotels')}</span>
                    </div>
                    <div className={styles.contentSimilarHotels}>
                        <Row gutter={[20,20]}>
                            {
                                similarHotels && similarHotels.slice(0, 3).map(item =><Col xs={24} sm={12} md={8} lg={8} xl={8} key={item.HotelName}>
                                    <div
                                        className={`${styles.singleSimilarHotels} ${process.env.THEME_NAME === "TRAVELO" && styles.singleSimilarHotelsTravelo}`}
                                        >
                                        <div className={styles.imageSimilarHotels} style={{"backgroundImage":`url(${defaultHotelImage})`}}>
                                            <Link as={item.Url + hotelUrl} href={item.Url + hotelUrl}>
                                                <a target="_blank" rel="noreferrer" onContextMenu={(e)=> e.preventDefault()}>
                                                    {item.ImageUrl && <img src={item.ImageUrl} alt={item.ImageTitle} title={item.ImageTitle} />}
                                                </a>
                                            </Link>
                                        </div>
                                        <div className={styles.detailSimilarHotels}>
                                            <div className={styles.mainDetail}>
                                                <Link as={item.Url + hotelUrl} href={item.Url + hotelUrl}>
                                                    <a target="_blank" rel="noreferrer" onContextMenu={(e)=> e.preventDefault()}>
                                                        <h4>{item.HotelTypeName} {item.HotelName} {item.CityName}</h4>
                                                    </a>
                                                </Link>
                                                <div className={styles.starSimilarHotels}>
                                                    <Rating rate={item.HotelRating}/>
                                                </div>
                                                <div className={styles.addressSimilarHotels}>
                                                    <EnvironmentOutlined />
                                                    {item.Address}
                                                </div>
                                            </div>
                                
                                            <div className={styles.moreDetail}>
                                                <div>
                                                    {(item.boardPriceFrom> item.salePriceFrom) && <span className="old-price no-margin">
                                                        {numberWithCommas(item.boardPriceFrom)} {t('rial')}
                                                    </span>}
                                                    {(item.salePriceFrom && item.salePriceFrom>0)?
                                                        <Tooltip placement="topLeft" title={
                                                            <div>
                                                                <div>
                                                                    <span>{numberWithCommas((item.salePriceFrom/props.nights).toFixed(0))}</span>
                                                                    <span> {t('rial')} </span>
                                                                </div>
                                                                <small>
                                                                    {t("Avg-per-night")}
                                                                </small>
                                                            </div>
                                                        }>
                                                            <div className={styles.priceSimilarHotels}>
                                                                <span> {numberWithCommas(item.salePriceFrom)} {t('rial')} </span>
                                                                <span className={styles.perNightSimilarHotels}>{t('price-start-from')} {props.nights} {t('night')}</span>
                                                            </div>
                                                        </Tooltip>
                                                    :null}
                                                    
                                                    <Link as={item.Url + hotelUrl} href={item.Url + hotelUrl}>
                                                        <a target="_blank" rel="noreferrer">
                                                            <Button
                                                                type="primary"
                                                                block
                                                                htmlType="button"
                                                                className={`red-button min-width-150 ${process.env.THEME_NAME === "TRAVELO" && "antd-btn-select-room-travelo"}`}
                                                                >
                                                                {t("see-rooms")}
                                                                <LeftOutlined className={styles.hotelCardButtonIcon} />
                                                            </Button> 
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>)
                            }
                            {displayAll &&  similarHotels && similarHotels.slice(3, similarHotels.length>6 ? 6 : similarHotels.length).map(item =><Col key={item.HotelName} xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <div
                                        className={`${styles.singleSimilarHotels} ${process.env.THEME_NAME === "TRAVELO" && styles.singleSimilarHotelsTravelo}`}
                                        >
                                        <div className={styles.imageSimilarHotels} style={{"backgroundImage":`url(${defaultHotelImage})`}}>
                                            {item.ImageUrl && <img src={item.ImageUrl} alt={item.ImageTitle} title={item.ImageTitle} onContextMenu={(e)=> e.preventDefault()} />}
                                        </div>
                                        <div className={styles.detailSimilarHotels}>
                                        <div className={styles.mainDetail}>
                                                <Link as={item.Url + hotelUrl} href={item.Url + hotelUrl}>
                                                    <a target="_blank" rel="noreferrer" onContextMenu={(e)=> e.preventDefault()}>
                                                        <h4>{item.HotelTypeName} {item.HotelName} {item.CityName}</h4>
                                                    </a>
                                                </Link>
                                                <div className={styles.starSimilarHotels}>
                                                    <Rating rate={item.HotelRating}/>
                                                </div>
                                                <div className={styles.addressSimilarHotels}>
                                                    <EnvironmentOutlined />
                                                    {item.Address}
                                                </div>
                                            </div>
                                            <div className={styles.moreDetail}>
                                                <div>
                                                    {(item.boardPriceFrom> item.salePriceFrom) && <span className="old-price no-margin">
                                                        {numberWithCommas(item.boardPriceFrom)} {t('rial')}
                                                    </span>}
                                                    {(item.salePriceFrom && item.salePriceFrom>0)?
                                                        <Tooltip placement="topLeft" title={
                                                            <div>
                                                                <div>
                                                                    <span>{numberWithCommas((item.salePriceFrom/props.nights).toFixed(0))}</span>
                                                                    <span> {t('rial')} </span>
                                                                </div>
                                                                <small>
                                                                    {t("Avg-per-night")}
                                                                </small>
                                                            </div>
                                                        }>
                                                            <div className={styles.priceSimilarHotels}>
                                                                <span> {numberWithCommas(item.salePriceFrom)} {t('rial')} </span>
                                                                <span className={styles.perNightSimilarHotels}>{t('price-start-from')} {props.nights} {t('night')}</span>
                                                            </div>
                                                        </Tooltip>
                                                    :null}
                                                    
                                                    <Link as={item.Url + hotelUrl} href={item.Url + hotelUrl}>
                                                        <a target="_blank" rel="noreferrer">
                                                            <Button
                                                                type="primary"
                                                                block
                                                                htmlType="button"
                                                                className={`red-button min-width-150 ${process.env.THEME_NAME === "TRAVELO" && "antd-btn-select-room-travelo"}`}
                                                                >
                                                                {t("see-rooms")}
                                                                <LeftOutlined className={styles.hotelCardButtonIcon} />
                                                            </Button> 
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>)}
                        </Row>
                    </div>
                    {
                        ((!displayAll) && similarHotels && similarHotels.length>3)&&
                        <div
                            className={`${styles.moreSimilarHotels} ${process.env.THEME_NAME === "TRAVELO" && styles.moreSimilarHotelsTravelo}`}
                            >
                            <Button htmlType="button" onClick={toggleDisplayAll}>{t('other-similar-hotels')}</Button>
                        </div>
                    }
                </div>
                :
                <div className={styles.container}>
                    <div className={styles.subjectSimilarHotels}>
                        <h3>{t("similar-hotels")}</h3>
                    </div>
                    <div className={styles.noRoomsAvailableCard}>
                        <div className="text-right">
                            <ExclamationCircleOutlined /> {t('no-similar-hotels')}
                        </div>
                    </div>                    
                </div>
                
            }
        </div>
    )
}


SimilarHotels.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SimilarHotels.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(SimilarHotels)
