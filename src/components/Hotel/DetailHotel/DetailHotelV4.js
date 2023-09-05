import React,{useEffect,useState,useRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { i18n, withTranslation, Router, Link } from '../../../../i18n';
import { useRouter } from 'next/router';
import moment from 'moment-jalaali';
import { InView } from 'react-intersection-observer';
import dynamic from 'next/dynamic'

import styles from '../../../styles/Hotel.module.css';

import {GetDomesticHotelDetails,setDomesticHotelDetail,GetpageByUrl,GetScore,DomesticHotelV4GetRooms, GetAccommodationById} from '../../../actions'
const DomesticSearchHotel = dynamic(() => import('../SearchHotel/DomesticSearchHotel'))
import HotelBackLink from './HotelBackLink';
import GalleryHotelTravelo from './GalleryHotelTravelo';
import SearchV4 from './SearchV4';

const GalleryHotel = dynamic(() => import('./GalleryHotel'))
const AnchorNavigation = dynamic(() => import('./AnchorNavigation'))
const SelectRoom = dynamic(() => import('./SelectRoom'))
const Reviews = dynamic(() => import('./Reviews'))
const ReviewsTravelo = dynamic(() => import('./ReviewsTravelo'))
const HotelAmenities = dynamic(() => import('./HotelAmenities'))
const HotelAmenitiesTravelo = dynamic(() => import('./HotelAmenitiesTravelo'))
const Attractions = dynamic(() => import('./Attractions'))
const AboutTheHotel = dynamic(() => import('./AboutTheHotel'))
const SimilarHotelsV4 = dynamic(() => import('./SimilarHotelsV4'))
const HotelName = dynamic(() => import('./HotelName'))
const HotelTerms = dynamic(() => import('./HotelTerms'))
const HotelFaq = dynamic(() => import('./HotelFaq'))

const DetailHotelV4 = props => {
    const { t } = props;
    const router = useRouter();

    const [hotelDetailLoading,setHotelDetailLoading] = useState(true);
    const [hotelDetails,setHotelDetails] = useState();
    const [score,setScore] = useState();
    const [availability,setAvailability] = useState();

    const [searchedInfo,setSearchedInfo] = useState(); 

    const [hotelAccommodation, setHotelAccommodation] = useState();
    
    const [pageByUrlData, setPageByUrlData] = useState();
    
    const [utmData,setUtmDate] = useState();

    let checkin,checkout;
    const clearUrlPath = router.asPath.split("?")[0].split("#")[0];
    if (clearUrlPath.includes("checkin-") && clearUrlPath.includes("checkin-") && clearUrlPath.includes("location-")){
        let pathName = clearUrlPath.split("location-")[1];
        checkin =moment(pathName.split("checkin-")[1]?.split("/")[0]).format("YYYY-MM-DD");
        checkout =  moment(pathName.split("checkout-")[1]?.split("/")[0]).format("YYYY-MM-DD");
    }else{
        checkin = moment().format("YYYY-MM-DD");
        checkout = moment().add(1, 'day').format("YYYY-MM-DD");
    }
        
    useEffect(() => {
        let utm;
        if (router.query && router.query.utm_source && router.query.utm_key) {
            utm = {
                utmSource: router.query.utm_source,
                utmKey: router.query.utm_key
            }
            setUtmDate(utm)
        }
    }, []);


    let searchedValue;
    if (hotelDetails){
        searchedValue = `${hotelDetails.HotelCategoryName} ${hotelDetails.HotelName} ${hotelDetails.CityName}`;
    }
    
    let pageId,hotelId;
    if (pageByUrlData){
        pageId = pageByUrlData.Id;
        hotelId = pageByUrlData.EntityId
    } else if (hotelDetails){
        hotelId = hotelDetails.HotelId;
    }

    let mapInfo = {lat:0,lang:0,zoom:10};
    if(hotelDetails?.Latitude && hotelDetails.Longitude){
        mapInfo = {
            lat:hotelDetails.Latitude,
            lang:hotelDetails.Longitude,
            zoom:hotelDetails.Zoom || 13
        }
    }

    let images = [];
    let attractionsData;
    if(hotelDetails){
        images = hotelDetails.Gallery;
        attractionsData = hotelDetails.DistancePoints;
    }

    useEffect(() => {

        let url;
        if (clearUrlPath.includes("location-")){
            const urlDetails = clearUrlPath.split("/location-")[1];
            
            let redusedUrlParametersArray = urlDetails.split("/");
            let redusedUrlParameters = redusedUrlParametersArray.join("/");
            setSearchedInfo("/location-"+redusedUrlParameters);
            url = clearUrlPath.split("/location-")[0];
        }else{
            let parametersArray = clearUrlPath.split("/");
            url = "/"+parametersArray[1]+"/"+parametersArray[2]+"/"+parametersArray[3];
            setSearchedInfo("");
        }    
        url = url.slice(3);
        // url = "/fa".concat(url);
        url = "/".concat(i18n.language.concat(url));
        
        const fetchGetPageByUrl = async () => {
            const getPageByUrlResponse = await GetpageByUrl(url,i18n.language);
            if (getPageByUrlResponse.data){
                setPageByUrlData(getPageByUrlResponse.data);
            }
        };
        fetchGetPageByUrl();

        const fetchData = async () => {
            const response = await GetDomesticHotelDetails(url, i18n.language);
            if (response.data) {
                setHotelDetails(response.data);

                props.saveHotelDetails(response.data);

                setHotelDetailLoading(false);
            }
        };
        fetchData();

    }, [clearUrlPath]);


    useEffect(()=>{
        if (pageId){
            const fetchScore = async () => {
                const scoreResponse = await GetScore(pageId);
                if (scoreResponse.data){
                    setScore(scoreResponse.data);
                }
            }
            fetchScore();
        }
    }, [pageId]);

    useEffect(()=>{
        if (hotelId) {
            const fetchAvailibility = async () => {
                setAvailability();
                const roomsResponse = await DomesticHotelV4GetRooms ({
                    hotelId:hotelId,
                    checkin,
                    checkout
                });
                if(roomsResponse.data){
                    setAvailability(roomsResponse.data.result);
                }
            };
            fetchAvailibility();

            const fetchAccommodationData = async () => {
                const GetAccommodationByIdResponse = await GetAccommodationById(hotelId, i18n.language);
                if (GetAccommodationByIdResponse.data) {
                    setHotelAccommodation(GetAccommodationByIdResponse.data.result);
                }
            }
            fetchAccommodationData();
        }

    },[hotelId,checkin,checkout]);
    

    const prevLangRef = useRef();
    const mountRef = useRef();
    useEffect(() => {
        prevLangRef.current = i18n.language;
    });
    const prevLang = prevLangRef.current;
    
    useEffect(()=>{
        if(!mountRef.current){
            mountRef.current = true;
            // console.log('not mounted');
        }else{
            // console.log('didmount');
            const fetchData = async () => {
                let url;
                if (clearUrlPath.includes("location-")){
                    const urlDetails = clearUrlPath.split("/location-")[1];
                    let redusedUrlParametersArray = urlDetails.split("/");
                    let redusedUrlParameters = redusedUrlParametersArray.join("/");
                    setSearchedInfo("/location-"+redusedUrlParameters);
                    url = clearUrlPath.split("/location-")[0];
                }else{
                    let parametersArray = clearUrlPath.split("/");
                    url = "/"+parametersArray[1]+"/"+parametersArray[2]+"/"+parametersArray[3];
                    setSearchedInfo("");
                }    
                url = url.slice(3);
                url = "/".concat(prevLang.concat(url));
                const getPageByUrlResponse = await GetpageByUrl(url,prevLang);
                    if (getPageByUrlResponse.data){
                        // console.log(i18n.language,getPageByUrlResponse.data.Relations);
                        let findLang = getPageByUrlResponse.data.Relations.find(val=>val.IsoCode === i18n.language);
                        // console.log(encodeURI(findLang.PageUrl) !== url);
                        if(findLang){
                            if(encodeURI(findLang.PageUrl)!== url){
                                Router.push(findLang.PageUrl);
                            }
                        }
                        else{
                            Router.push('/');
                        }
                    }
            }
            fetchData();
        }
    },[t])

    return (
        <div
            className={`${styles.detailHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.detailHotelTravelo}`}
        >
            
            <HotelBackLink hotelDetails={hotelDetails} />
            
            {process.env.THEME_NAME === "TRAVELO" &&
                <GalleryHotelTravelo hotelDetails={hotelDetails} loading={hotelDetailLoading} images={images} score={score} mapInfo={mapInfo}/>}

            {process.env.THEME_NAME === "TAJAWAL" &&
                <GalleryHotel hotelDetails={hotelDetails} loading={hotelDetailLoading} images={images} score={score} mapInfo={mapInfo}/>}
            
            <AnchorNavigation hotelDetails={hotelDetails} hotelAccommodation={hotelAccommodation} attractionsData={attractionsData} />

            <HotelName hotelDetails={hotelDetails} score={score} mapInfo={mapInfo} attractionsData={attractionsData} />
        
            <SearchV4 hotelDetails={hotelDetails} setHotelDetailLoading={setHotelDetailLoading} />
            
            <SelectRoom availability={availability} checkin={checkin} checkout={checkout} hotelAccommodation={hotelAccommodation} utmData={utmData} />
            
            {process.env.THEME_NAME === "TAJAWAL" &&
                <HotelAmenities loading={hotelDetailLoading} hotelDetails={hotelDetails}/>}

            {process.env.THEME_NAME === "TRAVELO" &&
                <HotelAmenitiesTravelo loading={hotelDetailLoading} hotelDetails={hotelDetails}/>}

            {hotelDetails &&
                (hotelDetails.Policies.length > 0 ||
                    hotelAccommodation &&
                    (hotelAccommodation.instruction != null || hotelAccommodation.mendatoryFee != null)
                ) &&
                <HotelTerms hotelDetails={hotelDetails} hotelAccommodation={hotelAccommodation} />}

            {hotelDetails && hotelAccommodation ? 
                <AboutTheHotel loading={hotelDetailLoading} hotelDetails={hotelDetails} hotelAccommodation={hotelAccommodation} /> : null}
            
            <Attractions attractionsData={attractionsData} />

            {process.env.THEME_NAME === "TAJAWAL" &&
                <Reviews loading={hotelDetailLoading} score={score} pageId={pageId} />}
            
            {process.env.THEME_NAME === "TRAVELO" &&
                <ReviewsTravelo loading={hotelDetailLoading} score={score} pageId={pageId} />}
            
            <div id="anchorsimilarhotels">
                <InView triggerOnce={true}>
                    {({ inView, ref }) => 
                    <div ref={ref}>{inView && <SimilarHotelsV4 
                        hotelsArray={hotelDetails?.Similars} 
                        checkin={checkin}
                        checkout={checkout}
                        CityId={hotelDetails?.CityId}
                    /> } </div>}
                </InView>
            </div>
            
            <HotelFaq hotelAccommodation={hotelAccommodation} />

        </div>
    )
}

DetailHotelV4.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
DetailHotelV4.propTypes = {
t: PropTypes.func.isRequired,
}

const mapDispatchToProp = (dispatch) => ({
    saveHotelDetails : (d) => dispatch(setDomesticHotelDetail(d))
});
  
export default withTranslation('common')(connect(null,mapDispatchToProp)(DetailHotelV4))
