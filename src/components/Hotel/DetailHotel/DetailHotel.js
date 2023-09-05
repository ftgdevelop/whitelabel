import React,{useEffect,useState,useRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { i18n, withTranslation, Router, Link } from '../../../../i18n';
import { useRouter } from 'next/router';
import moment from 'moment-jalaali';
import { InView } from 'react-intersection-observer';
import dynamic from 'next/dynamic'

import styles from '../../../styles/Hotel.module.css';

import {GetDomesticHotelDetails,setDomesticHotelDetail,GetpageByUrl,GetScore,GetDomesticHotelRooms, GetAccommodationById} from '../../../actions'
import Search from './Search';
import HotelBackLink from './HotelBackLink';
import GalleryHotelTravelo from './GalleryHotelTravelo';

const GalleryHotel = dynamic(() => import('./GalleryHotel'))
const AnchorNavigation = dynamic(() => import('./AnchorNavigation'))
const RoomChoices = dynamic(() => import('./RoomChoices'))
const Reviews = dynamic(() => import('./Reviews'))
const ReviewsTravelo = dynamic(() => import('./ReviewsTravelo'))
const HotelAmenities = dynamic(() => import('./HotelAmenities'))
const HotelAmenitiesTravelo = dynamic(() => import('./HotelAmenitiesTravelo'))
const Attractions = dynamic(() => import('./Attractions'))
const AboutTheHotel = dynamic(() => import('./AboutTheHotel'))
const SimilarHotels = dynamic(() => import('./SimilarHotels'))
const HotelName = dynamic(() => import('./HotelName'))
const HotelTerms = dynamic(() => import('./HotelTerms'))
const HotelFaq = dynamic(() => import('./HotelFaq'))

const DetailHotel = props => {
    const { t } = props;
    const router = useRouter();

    const [hotelDetailLoading,setHotelDetailLoading] = useState(true);
    const [hotelDetails,setHotelDetails] = useState();
    const [images,setImages] = useState([]);
    const [score,setScore] = useState();
    const [availability,setAvailability] = useState();
    const [nights,setNights] = useState();
    const [attractionsData,setAttractionsData] = useState();
    const [searchedInfo,setSearchedInfo] = useState(); 
    const [pageId,setPageId] = useState();
    const [hotelId,setHotelId] = useState();
    const [mapInfo,setMapinfo]=useState({lat:0,lang:0,zoom:10});
    const [selectedRoomsArray,setSelectedRoomsArray] = useState();
    const [selectedCheckin,setSelectedCheckin] = useState(); 
    const [selectedCheckout, setSelectedCheckout] = useState();
    const [hotelAccommodation, setHotelAccommodation] = useState();

    useEffect(()=>{

        const fetchData = async () => {
            let url;
            const clearUrlPath = router.asPath.split("?")[0];
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
            const response = await GetDomesticHotelDetails(url,i18n.language);
            if (response.data) {

                setHotelDetails(response.data);
                let mapParams = {
                    lat:response.data.Latitude,
                    lang:response.data.Longitude,
                    zoom:response.data.Zoom || 13
                }
                if(response.data.Latitude && response.data.Longitude){
                    setMapinfo(mapParams);
                }
                setHotelId(response.data.HotelId);
                props.saveHotelDetails(response.data);
                setImages(response.data.Gallery)
                setHotelDetailLoading(false);
                setAttractionsData(response.data.DistancePoints);

                

                if (clearUrlPath.includes("checkin-") && clearUrlPath.includes("checkin-") && clearUrlPath.includes("location-")){
                    let pathName = clearUrlPath.split("location-")[1];
                    checkin =moment(pathName.split("checkin-")[1].split("/")[0]).format("YYYY-MM-DD");
                    checkout =  moment(pathName.split("checkout-")[1].split("/")[0]).format("YYYY-MM-DD");
            
                    const roomsGuestsArray = pathName.split("adult-");
                    roomsGuestsArray.shift();      
                    rooms = [];
                    for( let i=0 ; i<roomsGuestsArray.length ; i++){
                        let roomInfo ={};
                        roomInfo['roomNo'] = i+1;
                        roomInfo['adultNo'] = +roomsGuestsArray[i].split("/")[0];
                        let children =[];
                        let roomChildrenData = roomsGuestsArray[i].split('child-');
                        roomChildrenData.shift();
                        for( let j=0 ; j<roomChildrenData.length ; j++){
                            let childAge = +roomChildrenData[j].split("/")[0];
                            children.push(childAge);
                        }
                        roomInfo['childAges']=children;
                        rooms.push(roomInfo);
                    }
                }else{
                    checkin = moment().format("YYYY-MM-DD");
                    checkout = moment().add(1, 'day').format("YYYY-MM-DD");
                    rooms=[{roomNo:1,adultNo:1,childAges:[]}]
                }

                let searchParams = {
                    hotelCodes: [response.data.HotelId],
                    checkinDate:checkin,
                    checkoutDate : checkout,
                    rooms:rooms    
                }
                const roomsResponse = await GetDomesticHotelRooms(searchParams);
                if(roomsResponse.data){
                    setAvailability(roomsResponse.data.result);
                }
            }
            const getPageByUrlResponse = await GetpageByUrl(url,i18n.language);
            if (getPageByUrlResponse.data){
                setPageId(getPageByUrlResponse.data.Id);
                const scoreResponse = await GetScore(getPageByUrlResponse.data.Id);
                if (scoreResponse.data){
                    setScore(scoreResponse.data);
                }
            }

            const urlParameters = clearUrlPath.split("/location-")[1];
            let checkin,checkout;
            let rooms = [];
            if (urlParameters && urlParameters.includes("checkin-")){
                checkin =  moment(urlParameters.split("/")[1].split("checkin-")[1]).format("YYYY-MM-DD");
                checkout = moment(urlParameters.split("/")[2].split("checkout-")[1]).format("YYYY-MM-DD");
                const roomsGuestsArray = urlParameters.split("adult-");
                roomsGuestsArray.shift();            
                
                for( let i=0 ; i<roomsGuestsArray.length ; i++){
                    let roomInfo ={};
                    roomInfo['roomNo'] = i;
                    roomInfo['adultNo'] = +roomsGuestsArray[i].split("/")[0];
                    let children =[];
                    let roomChildrenData = roomsGuestsArray[i].split('child-');
                    roomChildrenData.shift();
                    for( let j=0 ; j<roomChildrenData.length ; j++){
                        let childAge = +roomChildrenData[j].split("/")[0];
                        children.push(childAge);
                    }
                    roomInfo['childAges']=children;
                    rooms.push(roomInfo);
                }

            }else {
                checkin = moment().format("YYYY-MM-DD");
                checkout = moment().add(1, 'day').format("YYYY-MM-DD");
                rooms=[{roomNo:1,adultNo:1,childAges:[]}]
            }

            setSelectedRoomsArray(rooms);
            setSelectedCheckin(moment(checkin,'YYYY-MM-DD').format());
            setSelectedCheckout(moment(checkout,'YYYY-MM-DD').format());
            
            let nightsN = moment(checkout).diff(moment(checkin), 'days');
            if (checkin === "2021-03-22" ){
                setNights(nightsN+1);
            }else{
                setNights(nightsN);
            }
        };

        fetchData();

    }, []);
    
    useEffect(() => {
        const fetchAccommodationData = async () => {
            if (hotelId) {
                const GetAccommodationByIdResponse = await GetAccommodationById(hotelId, i18n.language);
                if (GetAccommodationByIdResponse.data) {
                    setHotelAccommodation(GetAccommodationByIdResponse.data.result);
                }
            }
        }
        fetchAccommodationData();
    }, [hotelId]);

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
                const clearUrlPath = router.asPath.split("?")[0];
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

            <HotelBackLink hotelDetails={hotelDetails}/>

             {process.env.THEME_NAME === "TRAVELO" &&
                <GalleryHotelTravelo hotelDetails={hotelDetails} loading={hotelDetailLoading} images={images} score={score} mapInfo={mapInfo}/>}

            {process.env.THEME_NAME === "TAJAWAL" &&
                <GalleryHotel hotelDetails={hotelDetails} loading={hotelDetailLoading} images={images} score={score} mapInfo={mapInfo} />}
            
            <AnchorNavigation hotelDetails={hotelDetails} hotelAccommodation={hotelAccommodation} />
            
            <HotelName hotelDetails={hotelDetails} score={score} mapInfo={mapInfo} attractionsData={attractionsData} />

            <Search hotelDetails={hotelDetails} />
            
            <RoomChoices availability={availability} nights={nights} searchedInfo={searchedInfo} hotelId={hotelId} hotelAccommodation={hotelAccommodation} />
            
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
                    {({ inView, ref, entry }) => 
                    <div ref={ref}>{inView && <SimilarHotels 
                    selectedRoomsArray={selectedRoomsArray}
                    hotelDetails={hotelDetails} 
                    searchedInfo={searchedInfo}
                    selectedCheckin={selectedCheckin}
                    selectedCheckout={selectedCheckout}
                    nights={nights}
                    /> } </div>}
                </InView>
            </div>
            
            <HotelFaq hotelAccommodation={hotelAccommodation} /> 

        </div>
    )
}

DetailHotel.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
DetailHotel.propTypes = {
t: PropTypes.func.isRequired,
}

const mapDispatchToProp = (dispatch) => ({
    saveHotelDetails : (d) => dispatch(setDomesticHotelDetail(d))
});
  
export default withTranslation('common')(connect(null,mapDispatchToProp)(DetailHotel))
