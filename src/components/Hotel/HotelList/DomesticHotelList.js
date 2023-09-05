import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { i18n, withTranslation } from '../../../../i18n';
import {useRouter} from 'next/router';
import moment from 'moment-jalaali';
import { Button, Row, Col ,Pagination ,Drawer,Card,Empty} from 'antd';
import { connect } from 'react-redux';
import { FilterFilled } from '@ant-design/icons'
import dynamic from 'next/dynamic'
import parse from 'html-react-parser'
import { Skeleton } from 'antd';

import {HotelDomesticSearchList,DomesticHotelV4Search,setDomesticHotelList,GetHotelRate,HotelRate,GetEntityNameByLocation,GetAllFaqById} from '../../../actions' ;

import styles from '../../../styles/Hotel.module.css';

const HotelSearchResult = dynamic(() => import('./HotelSearchResult/HotelSearchResult'))
const SortHotelList = dynamic(() => import('./HotelListContent/SortHotelList'))
const SimpleRadioSortHotelList = dynamic(() => import('./HotelListContent/SimpleRadioSortHotelList'))
const HotelListCard = dynamic(() => import('./HotelListContent/HotelListCard'))
const HotelListFilter = dynamic(() => import('./HotelListFilter/HotelListFilter'))
const DomesticSearchHotel = dynamic(() => import('../SearchHotel/DomesticSearchHotel'))
const SortHotelListTravelo = dynamic(() => import('./HotelListContent/SortHotelListTravelo'))
const HotelListViewMap = dynamic(() => import('./HotelListViewMap/HotelListViewMap'))
const HotelListFaq = dynamic(() => import('./HotelListContent/HotelListFaq'))


const DomesticHotelList = props => {
    const { t, dataFaq } = props;
    const router = useRouter();
    
    const [loadingHotelList,setLoadingHotelList] = useState(true);
    const [loadingHotelListPrices,setLoadingHotelListPrices] = useState(true);
    
    const [allHotelList,setAllHotelList] = useState([]);
    const [filteredHotelList,setFilteredHotelList] = useState([]);
    const [pagedHotelList,setPagedHotelList] = useState([]);

    const [filterNameValue,setFilterNameValue] = useState("");
    const [filterPriceRange,setFilterPriceRange] = useState();
    const [filterPriceValue,setFilterPriceValue] = useState();
    const [filterRatingValue,setFilterRatingValue] = useState([]);
    const [filterAmenitiesValue,setFilterAmenitiesValue] = useState([]);
    const [filterTypeValue,setFilterTypeValue] = useState([]);
    const [filterGuestRateValue,setFilterGuestRateValue] = useState([]);
    const [filterAvailabilityValue,setFilterAvailabilityValue] = useState(false);
    
    const [featuresList,setFeaturesList] = useState([]);
    const [typesList,setTypesList] = useState([]);
    
    
    const [ratingFilterInfo,setRatingFilterInfo] = useState();
    
    
    const [availabilityFilterInfo,setAvailabilityFilterInfo] = useState();
    const [guestRateFilterInfo,setGuestRateFilterInfo] = useState();
    
    const [progressWidth,setProgressWidth] = useState(0);
    
    const [progressdescription,setProgressdescription] = useState(t("getting-the-best-prices-and-availability")+" ...");
    
    
    const [sortedBy,setSortedBy] = useState("Priority");
    
    const [locationEntity,setLocationEntity] = useState();
      
    const [visible, setVisible] = useState(false);
      
    const [mapInfo,setMapinfo]=useState({lat:35.7896811,lang:51.39010280000002,zoom:15});
   
    const [hotelsDescriptions,setHotelsDescriptions] = useState();

    const [faqList,setFaqList] = useState();

    const [translationLoaded,setTranslationLoaded] = useState(false);

    let checkin = moment().format("YYYY-MM-DD");
    let checkout = moment().add(1, 'day').format("YYYY-MM-DD");

    const urlParameters = router.asPath.split("hotels/")[1];

    if (urlParameters.includes("checkin-")){
        checkin= moment(urlParameters.split("/")[2].split("checkin-")[1]).format("YYYY-MM-DD");
        checkout= moment(urlParameters.split("/")[3].split("checkout-")[1]).format("YYYY-MM-DD");
    }
    const nights = moment(checkout).diff(moment(checkin), 'days');
    
    const redusedUrlParametersArray = urlParameters.split("/");
    redusedUrlParametersArray.shift();
    const searchedInfo = redusedUrlParametersArray.join("/");


    let cityId = "";
    let searchedLocationCityName = "";
    let entityName="";
    let entityId;
    
    if (urlParameters.split("/")[1]){
        cityId= urlParameters.split("/")[1].split("location-")[1];
    }

    if (cityId){
        if (locationEntity){
            entityId= process.env.DomesticHotelV4 ? "City" : locationEntity.EntityTypeId;
            entityName = locationEntity.EntityName;
        }
    } else {
        entityId= process.env.DomesticHotelV4 ? "City" : 3;
    }

    if(allHotelList && allHotelList.length > 0){
        cityId=allHotelList[0].CityId;
        searchedLocationCityName=allHotelList[0].CityName;
    }

    let noHotels = false;
    if (!loadingHotelList && allHotelList.length===0 ){
        noHotels = true;
    }

    useEffect(()=>{
        setTranslationLoaded(true);
    },[t]);

    useEffect(()=>{
        if (translationLoaded){
            const fetchData = async () => {
                if (cityId){
                    const locationResponse = await GetEntityNameByLocation(cityId ,i18n.language);
                    if (locationResponse){
                        setLocationEntity(locationResponse.data);
                    }
                }
    
                let fetchedData;
                let parameters ={"IsInstant":null,"MaxPrice":20000000,"SortColumn":"Priority","SortDirection":"Desc","PageSize":500,"PageNumber":1} ;
                if (cityId){
                    parameters ={"CityId":cityId,"IsInstant":null,"MaxPrice":20000000,"SortColumn":"Priority","SortDirection":"Desc","PageSize":500,"PageNumber":1} ;
                }
    
                //progressbar width:
                setTimeout(()=>{                
                    setProgressWidth(30);
                },100);
                setTimeout(()=>{                
                    setProgressWidth(50);
                },800);
    
                const urlPathArray = router.asPath.split("/");
                const decodedSearchValue = decodeURI(urlPathArray[3]);
                parameters.filterUrl="/"+urlPathArray[1]+"/"+urlPathArray[2]+"/"+decodedSearchValue;
    
                const response = await HotelDomesticSearchList(parameters,i18n.language);
                if (response.data && response.data.Content){
                    setHotelsDescriptions(response.data.Content);
                }
                if (response.data && response.data.Hotels) { 
                    
                    setLoadingHotelList(false);
                    fetchedData = [...response.data.Hotels];
                    
                    setAllHotelList(fetchedData);
                    setFilteredHotelList(fetchedData);
                    props.saveSearchResults(fetchedData);
                    
                    setProgressWidth(65);                
                    setProgressdescription(t("getting-guest-ratings")+" ...");
    
                    const searchedHotelsId = response.data.Hotels.map(item => item.HotelId);
    
    
                    const reviewRespons = await HotelRate ({HotelIds:searchedHotelsId});
                    if (reviewRespons && reviewRespons.data){
                        let reviewsData = reviewRespons.data;
    
                        for (let i=0 ; i< reviewsData.length ; i++){
                            let itemIndex = fetchedData.findIndex(x => x.HotelId === reviewsData[i].HotelId );
                            if(itemIndex !== -1){
                                fetchedData[itemIndex].Satisfaction = reviewsData[i].Satisfaction;
                                fetchedData[itemIndex].TotalRowCount = reviewsData[i].TotalRowCount;
                            }
                        }
    
                        let filterGuestRatingInformation = {};
                        
                        filterGuestRatingInformation.excellent = fetchedData.filter(item => item.Satisfaction >= 90 ).length;
                        filterGuestRatingInformation.veryGood = fetchedData.filter(item => (item.Satisfaction >= 80 && item.Satisfaction < 90 )).length;
                        filterGuestRatingInformation.good = fetchedData.filter(item => (item.Satisfaction >= 70 && item.Satisfaction < 80 )).length;
                        filterGuestRatingInformation.fair = fetchedData.filter(item => (item.Satisfaction >= 50 && item.Satisfaction < 70 )).length;
                        filterGuestRatingInformation.bad = fetchedData.filter(item => item.Satisfaction < 50 ).length;
                        setGuestRateFilterInfo(filterGuestRatingInformation);
                        
                        setAllHotelList(fetchedData);
                        setFilteredHotelList(fetchedData);
                        props.saveSearchResults(fetchedData);                    
                        
                        setProgressWidth(85);                
                        setProgressdescription(t("looking-for-cheaper-rates")+ " ...");
    
                    }  
    
                    let params = {"hotelIds":searchedHotelsId,"checkIn":checkin,"checkOut":checkout};
                    const priceResponse = await DomesticHotelV4Search(params);
                    if (priceResponse.data ) {
                          
                        setProgressWidth(99.9);
                        setTimeout(()=>{                
                            setProgressWidth(100);
                        },1000);
    
                        let priceResult = priceResponse.data.result.hotels;
    
                        for (let i=0 ; i< priceResult.length ; i++){
                            let itemIndex = fetchedData.findIndex(x => x.HotelId === priceResult[i].id );
                            if(itemIndex !== -1){
                                fetchedData[itemIndex].boardPriceFrom = priceResult[i].boardPrice;
                                fetchedData[itemIndex].salePriceFrom = priceResult[i].salePrice;
                                fetchedData[itemIndex].averagePrice = priceResult[i].averagePrice;
                            }
                        }
    
                        let sortedFetchedDataByPrice = fetchedData.sort((a,b) => {
                            if (b.salePriceFrom < 10000){
                                return -1
                            }
                            return 1
                        }).sort((a, b)=>{
                            if(a.Priority && b.Priority){
                                return b.Priority - a.Priority
                            }else if(a.Priority){
                                return -1
                            }else{
                                return 1
                            }                   
                        });
    
                        let availableSortedList = [...sortedFetchedDataByPrice].sort((a, b)=>{
                            if(a.salePriceFrom && b.salePriceFrom){
                                return 1
                            }else if(a.salePriceFrom){
                                return -1
                            }else{
                                return 1
                            }                   
                        });
                
                        setAllHotelList(availableSortedList);
    
                        setFilteredHotelList(sortedFetchedDataByPrice);
                        props.saveSearchResults(sortedFetchedDataByPrice);
                        setLoadingHotelListPrices(false);
    
                        //set price filter min and max:
                        let sortByPrices = priceResult.sort((a, b)=>{return a.salePrice - b.salePrice});
                        if(sortByPrices.length > 0){
                            setFilterPriceRange([sortByPrices[0].salePrice ,sortByPrices[sortByPrices.length-1].salePrice]);
                        }
                    }
                }
            };
            fetchData();
    
            const getFaqData = async () => {
                if (cityId !== undefined) {
                    const response = await GetAllFaqById(cityId, i18n.language);
                    if (response) {
                        setFaqList(response.data.result);
                    }   
                }
            };
            getFaqData();
        }

    },[translationLoaded]);

    useEffect(()=>{
        paginate(1,20);        
    },[filteredHotelList]); 

    useEffect(()=>{
        if (allHotelList.length > 0){

            let features =[];            
            for(let i=0 ; i < allHotelList.length ; i++){
                for (let j=0 ; j < allHotelList[i].Facilities.length;j++){
                    if(features.filter(item=>item.Keyword === allHotelList[i].Facilities[j].Keyword ).length === 0){
                        let newitem = allHotelList[i].Facilities[j];
                        newitem.number = 1;
                        features.push(newitem);
                    }else{
                        let itemIndex = features.findIndex(x => x.Keyword === allHotelList[i].Facilities[j].Keyword );
                        features[itemIndex].number = features[itemIndex].number + 1
                    }
                }
            }
            setFeaturesList(features);  


            let itemTypes =[];
            for(let i=0 ; i < allHotelList.length ; i++){
                if(itemTypes.find(item=>item.name === allHotelList[i].HotelTypeName)){
                    const updatingItem = itemTypes.find(x => x.name === allHotelList[i].HotelTypeName);
                    const otherItems = itemTypes.filter(x => x.name !== allHotelList[i].HotelTypeName);
                    updatingItem.number = updatingItem.number + 1;
                    itemTypes = [updatingItem,...otherItems];
                }else{
                    itemTypes.push({name:allHotelList[i].HotelTypeName,HotelTypeId:allHotelList[i].HotelTypeId,number:1});
                }
            }
            itemTypes = itemTypes.filter(val => val.name !== null);
            setTypesList(itemTypes);
             
            let filterRatingInformation = {};
            filterRatingInformation.stars5 = allHotelList.filter(item => item.HotelRating === 5).length;
            filterRatingInformation.stars4 = allHotelList.filter(item => item.HotelRating === 4).length;
            filterRatingInformation.stars3 = allHotelList.filter(item => item.HotelRating === 3).length;
            filterRatingInformation.stars2 = allHotelList.filter(item => item.HotelRating === 2).length;
            filterRatingInformation.stars1 = allHotelList.filter(item => item.HotelRating === 1).length;
            filterRatingInformation.stars0 = allHotelList.filter(item => item.HotelRating === 0).length;
            
            setRatingFilterInfo(filterRatingInformation);            

            let availableList = allHotelList.filter(item => item.salePriceFrom).length;
            setAvailabilityFilterInfo(availableList);
        }

    },[allHotelList]);    

    useEffect(()=>{
        let filteredResults = [...allHotelList].filter(hotelItem=>{   
            let itemAmenities=[];
            for(let i=0 ; i<hotelItem.Facilities.length ; i++){
                itemAmenities.push(hotelItem.Facilities[i].Keyword);
            }  
            if(
                (hotelItem.HotelName.includes(filterNameValue))
                &&
                (!filterPriceValue || (hotelItem.salePriceFrom ? (hotelItem.salePriceFrom >= filterPriceValue[0]) : true))
                &&
                (!filterPriceValue || (hotelItem.salePriceFrom ? (hotelItem.salePriceFrom <= filterPriceValue[1]) : true))
                &&
                (filterRatingValue.length === 0 || filterRatingValue.includes(hotelItem.HotelRating))
                &&
                (filterAmenitiesValue.length === 0 || filterAmenitiesValue.every(item => itemAmenities.includes(item)))
                &&
                (filterTypeValue.length === 0 || filterTypeValue.includes(hotelItem.HotelTypeId))
                &&
                (filterGuestRateValue.length === 0 || filterGuestRateValue.some(item => hotelItem.Satisfaction >= item.split('-')[0] & hotelItem.Satisfaction <= item.split('-')[1]))
                &&
                (!filterAvailabilityValue || hotelItem.salePriceFrom)                
            ){
                return true;
            }else{
                return false;
            }
        });
        setFilteredHotelList(filteredResults);
    },[filterNameValue,filterPriceValue,filterRatingValue,filterAmenitiesValue,filterTypeValue,allHotelList,filterGuestRateValue,filterAvailabilityValue]);  

    const paginate = (x,y)=>{
        let startIndex = (x-1)*y;
        let endIndex = startIndex + y;
        let newList = [...filteredHotelList].slice(startIndex, endIndex);
        setPagedHotelList(newList);
    }
        
    const sortHandler =(sortFactor)=>{
        let sortedList;
        setSortedBy(sortFactor);
        switch (sortFactor){
            case "LowPrice":
                sortedList = [...allHotelList].sort((a, b)=>{
                    if(a.salePriceFrom && b.salePriceFrom){
                        return a.salePriceFrom - b.salePriceFrom
                    }else if(a.salePriceFrom){
                        return -1
                    }else{
                        return 1
                    }
                });
                break;
            case "HotelName":
                sortedList = [...allHotelList].sort((a, b)=>{
                    let x = a.HotelName.toLowerCase().trim();
                    let y = b.HotelName.toLowerCase().trim();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                });
                break;
            case "MostStar":
                sortedList = [...allHotelList].sort((a, b) => { return b.HotelRating - a.HotelRating });
                break;
            case "Priority":
                sortedList = [...allHotelList].sort((a, b)=>{return b.Priority - a.Priority});
                break;
            case "TopRate":
                sortedList = [...allHotelList].sort((a, b)=>{
                    if(a.Satisfaction && b.Satisfaction){
                        return b.Satisfaction - a.Satisfaction
                    }else if(a.Satisfaction){
                        return -1
                    }else{
                        return 1
                    } 
                });
                break;            
            default:
                sortedList = [...allHotelList]
        }

        let availableSortedList = [...sortedList].sort((a, b)=>{
            if(a.salePriceFrom && b.salePriceFrom){
                if (b.salePriceFrom < 10000){
                    return -1
                }
                return 1
            }else if(a.salePriceFrom){
                return -1
            }else{
                return 1
            }                   
        });

        setAllHotelList(availableSortedList);
        paginate(1,20);
    }
    const filterHandler = (parameters)=>{
        switch (parameters.type) {
            case "name":
                setFilterNameValue(parameters.value);
                break;
            case "price":
                setFilterPriceValue(parameters.value)
                break;
            case "rating":
                setFilterRatingValue(parameters.value)
                break;
            case "amenities":
                setFilterAmenitiesValue(parameters.value)
                break;
            case "type":
                setFilterTypeValue(parameters.value)
                break;
            case "guestRate":
                setFilterGuestRateValue(parameters.value)
                break;
            case "availability":
                setFilterAvailabilityValue(parameters.value)
                break;
            default:
                console.log("its unknown filter");
        }
    }
    let searchedLocationId;
    if (router.asPath.includes("location-")){
        searchedLocationId = router.asPath.split("location-")[1]?.split("/")[0];
    }
    let searchedCheckin ,searchedCheckout;
    if (router.asPath.includes("checkin-")){
        searchedCheckin = moment(router.asPath.split("checkin-")[1]?.split("/")[0]).format("YYYY-MM-DD");
        searchedCheckout = moment(router.asPath.split("checkout-")[1]?.split("/")[0]).format("YYYY-MM-DD");
    }else{
        searchedCheckin = moment().format("YYYY-MM-DD");
        searchedCheckout = moment().add(1, 'day').format("YYYY-MM-DD");
    }
    
    let adults;
    let childrenAges = [];
    
    if (router.asPath.includes("adult-")){
        //!!! if there is only 1 room always:
        adults = router.asPath.split("adult-")[1].split("/")[0];

        const childrenArray = router.asPath.split("child-");
        childrenArray.shift();
        
        for (let i = 0 ; i < childrenArray.length ; i++){
            childrenAges.push(childrenArray[i].split("/")[0]); 
        }
    }else{
        adults="1";
    }

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const filter = <HotelListFilter
    loadingPrices={loadingHotelListPrices}  
    guestRateFilterInfo={guestRateFilterInfo} 
    ratingFilterInfo={ratingFilterInfo} 
    loading ={loadingHotelList}
    filtered ={filteredHotelList.length } 
    total={allHotelList.length} 
    typesList={typesList} 
    featuresList={featuresList} 
    filterPriceRange={filterPriceRange} 
    nameFilter={filterNameValue} 
    filterHandler={x => {filterHandler(x)}}
    availabilityFilterInfo={availabilityFilterInfo}
    />

    return (
        <div className={`${styles.hotelList} ${process.env.THEME_NAME === "TRAVELO" && styles.hotelListTravelo}`}>
            {/* <div>
                <span className="small-loading"/>
            </div> */}
            <div className={`${styles.hotelListSearchHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.hotelListSearchHotelTravelo}`}>
                <div className={styles.container}>
                    <DomesticSearchHotel
                        typeId={entityId}
                        defaultSearchValue={entityName ?? searchedLocationCityName}
                        cityId={cityId}
                        selectedHotelId={searchedLocationId || cityId}
                        checkinDate={searchedCheckin}
                        checkoutDate={searchedCheckout}
                        // defaultRooms={[{adultsNo:+adults,childrenAges:childrenAges}]}
                        //defaultRooms={defaultRooms ? defaultRooms : null}
                    />
                </div>
            </div>
            <div className={styles.container}>

                <HotelSearchResult total={allHotelList.length} progressWidth={progressWidth} progressdescription={progressdescription} searchedLocation={searchedLocationCityName}/>

                <Button type="text" onClick={showDrawer} className={styles.btnListFilterOpenSidebar}>
                    <FilterFilled />
                    {t("filter")}
                </Button>
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    open={visible}
                >
                    <div className={styles.sidebarListFilter}>
                        {filter}
                    </div>
                </Drawer>

                <Row>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>                        
                        <HotelListViewMap
                            hotels={filteredHotelList}
                            mapInfo={mapInfo}
                            searchedInfo={searchedInfo}
                            filter={filter}
                            sort ={<SimpleRadioSortHotelList sortedBy={sortedBy} loading ={loadingHotelList} sortHandler={x => {sortHandler(x)}}/>}
                        />

                        {filter}
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                        {
                            noHotels?<Card>
                                <Empty description={t("there-is-no-hotel-search")} />
                            </Card>:
                            <>
                                <div className={styles.hotelListContent}>
                                    {process.env.THEME_NAME === "TAJAWAL" &&
                                        <SortHotelList sortedBy={sortedBy} loading ={loadingHotelList} sortHandler={x => {sortHandler(x)}}/>}

                                {process.env.THEME_NAME === "TRAVELO" &&
                                        <SortHotelListTravelo
                                            sortedBy={sortedBy}
                                            loading ={loadingHotelList}
                                            sortHandler={x => {sortHandler(x)}}
                                            total={allHotelList.length}
                                            searchedLocation={searchedLocationCityName}
                                            />}
                                {loadingHotelList ||
                                    <div
                                        className={`${styles.hotelPagination}
                                        ${process.env.THEME_NAME === "TRAVELO" && "hotelPagination-Travelo" }`}
                                        >
                                        <Pagination 
                                            defaultCurrent={1}
                                            total={filteredHotelList.length}
                                            defaultPageSize={20}
                                            onChange={(currentPage,itemPerPage)=>{
                                                paginate(currentPage,itemPerPage);
                                            }}
                                        />
                                    </div>
                                }
                                    <div className={styles.hotelResultList}>
                                    <HotelListCard
                                        nights={nights}
                                        hotelList={pagedHotelList}
                                        loadingPrices={loadingHotelListPrices}
                                        loading ={loadingHotelList}
                                        searchedInfo={searchedInfo}
                                    />
                                    </div>
                                </div>
                                                            
                                {loadingHotelList ||
                                    <div
                                        className={`${styles.hotelPagination} ${process.env.THEME_NAME === "TRAVELO" && "hotelPagination-Travelo" }`}
                                        >
                                        <Pagination 
                                            defaultCurrent={1}
                                            total={filteredHotelList.length}
                                            defaultPageSize={20}
                                            onChange={(currentPage,itemPerPage)=>{
                                                paginate(currentPage,itemPerPage);
                                            }}
                                        />
                                    </div>}
                                    
                                    {
                                        hotelsDescriptions && <div className="text-justify">
                                            <br />
                                            {parse(hotelsDescriptions)}
                                        </div>}
                                    {/* <Skeleton /> */}

                                    {dataFaq && <HotelListFaq dataFaq={dataFaq} />}
                            </>
                        }
                    </Col>
                </Row>

            </div>
        </div>
    )
}

DomesticHotelList.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
DomesticHotelList.propTypes = {
t: PropTypes.func.isRequired,
}

const mapDispatchToProp = (dispatch) => ({
    saveSearchResults : (d) => dispatch(setDomesticHotelList(d))
});
    
export default (withTranslation('common'))(connect(null,mapDispatchToProp)(DomesticHotelList));