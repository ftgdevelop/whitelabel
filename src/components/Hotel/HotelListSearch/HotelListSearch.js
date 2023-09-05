import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { withTranslation, Link, i18n } from '../../../../i18n';
import {useRouter} from 'next/router';
import { Row, Col ,Pagination, Empty ,Drawer, Button } from 'antd';
import {connect} from 'react-redux';
import moment from 'moment-jalaali';
import {HotelForeignSearchList,setForeignHotelList} from '../../../actions' ;
import { FilterFilled } from '@ant-design/icons'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Hotel.module.css';

const HotelSearchResult = dynamic(() => import('./HotelSearchResult/HotelSearchResult'))
const SortHotelList = dynamic(() => import('./HotelListContent/SortHotelList'))
const HotelListCard = dynamic(() => import('./HotelListContent/HotelListCard'))
const HotelListFilter = dynamic(() => import('./HotelListFilter/HotelListFilter'))
const SearchHotel = dynamic(() => import('../SearchHotel/SearchHotel'))
const HotelListViewMap = dynamic(() => import('./HotelListViewMap/HotelListViewMap'))
const SimpleRadioSortHotelList = dynamic(() => import('./HotelListViewMap/SimpleRadioSortHotelList'))

const HotelListSearch = props => {

    const { t } = props;
    const router = useRouter();
    const [loadingHotelList,setLoadingHotelList] = useState(true);
    const [allHotelList,setAllHotelList] = useState([]);
    const [filteredHotelList,setFilteredHotelList] = useState([]);
    const [pagedHotelList,setPagedHotelList] = useState([]);
    const [filterNameValue,setFilterNameValue] = useState("");
    const [filterMinPrice,setFilterMinPrice] = useState(0);
    const [filterMaxPrice,setFilterMaxPrice] = useState(10000000000);
    const [filterPriceValue,setFilterPriceValue] = useState([filterMinPrice,filterMaxPrice]);
    const [filterRatingValue,setFilterRatingValue] = useState([]);
    const [featuresList,setFeaturesList] = useState([]);
    const [boardsList,setBoardsList] = useState([]);
    const [regionList,setRegionList] = useState([]);
    const [filterAmenitiesValue,setFilterAmenitiesValue] = useState([]);
    const [filterRegionValue,setFilterRegionValue] = useState([]);
    const [filterBoardValue,setFilterBoardValue] = useState([]);
    const [searchedLocation,setSearchedLocation] = useState("");
    const [ratingFilterInfo,setRatingFilterInfo] = useState();
    const [progressWidth,setProgressWidth] = useState(0);
    const [progressdescription,setProgressdescription] = useState(t("getting-the-best-prices-and-availability")+" ...");
    const [nights,setNights] = useState();
    const [searchedInfo,setSearchedInfo] = useState(); 
    const [defaultRooms,setDefaultRooms] = useState(); 
    const [visible, setVisible] = useState(false);
    const [mapInfo,setMapinfo]=useState({lat:35.7896811,lang:51.39010280000002,zoom:15});
    const [sortedBy,setSortedBy] = useState("LowPrice");
 
    useEffect(()=>{
        const fetchData = async () => {
            setTimeout(()=>{                
                setProgressWidth(40);
            },100);
            setTimeout(()=>{                
                setProgressWidth(70);
            },800);
            
            if(router.asPath.includes('/checkin')){
                let urlSearchedParameters = router.asPath.split('/checkin')[1]
                setSearchedInfo("checkin"+urlSearchedParameters);
            } else{
                setSearchedInfo(`checkin-${moment().format("YYYY-MM-DD")}/checkout-${moment().add(1, 'day').format("YYYY-MM-DD")}/adult-1`);
            }

            let urlParameters = router.asPath.split("hotels-foreign/")[1];
            const cityId= urlParameters.split("/")[1].split("location-")[1];

            let checkin,checkout,roomGuests;
            if(urlParameters.includes("checkin-")){
                checkin =moment(urlParameters.split("/")[2].split("checkin-")[1]).format("YYYY-MM-DD");
                checkout =moment(urlParameters.split("/")[3].split("checkout-")[1]).format("YYYY-MM-DD");
            }else{
                checkin = moment().format("YYYY-MM-DD");
                checkout = moment().add(1, 'day').format("YYYY-MM-DD");
            }

            let nightsN = moment(checkout).diff(moment(checkin), 'days');
            setNights(nightsN);

            if(urlParameters.includes("adult-")){
                const roomsGuestsArray = urlParameters.split("adult-");
                roomsGuestsArray.shift();
                let adults = "",
                children ="",
                ages="";
                let roomsArray=[];
                for( let i=0 ; i<roomsGuestsArray.length ; i++){
                    let roomGuestsObject={adultsNo:undefined,childrenAges:[]};
                    let RoomAdults = roomsGuestsArray[i].split("/")[0];
                    adults+= `adults=${RoomAdults}&`;
    
                    roomGuestsObject.adultsNo = +RoomAdults;
    
                    let roomChildrenArray = roomsGuestsArray[i].split('child-');
                    roomChildrenArray.shift();
                    children+= `children=${roomChildrenArray.length}&`;
                    for( let j=0 ; j<roomChildrenArray.length ; j++){
                        let childAges = roomChildrenArray[j].split("/")[0];
                        ages+= `ages=${childAges}&`;
                        roomGuestsObject.childrenAges.push(childAges);
                    }
                    roomsArray.push(roomGuestsObject);
                }
                setDefaultRooms(roomsArray);
                roomGuests  = adults+children+ages; 

            }else{
                setDefaultRooms([{adultsNo: 1, childrenAges: []}]);
                roomGuests  = "adults=1&children=0&"; 
            }

            const response = await HotelForeignSearchList(`${roomGuests}LocationId=${cityId}&checkin=${checkin}&checkout=${checkout}&NationalityCode=IR`);
            if (response.data && response.data.result) {
                
                setProgressWidth(99.9);                
                setProgressdescription(t("looking-for-cheaper-rates")+ " ...");
                setTimeout(()=>{                
                    setProgressWidth(100);
                },1000);
                let resultsList=[];
                if(response.data.result.hotels && response.data.result.hotels.length){
                    resultsList = [...response.data.result.hotels].sort((a, b)=>{return a.salePrice - b.salePrice});
                    //set price filter min and max:
                    setFilterMinPrice(resultsList[0].salePrice);
                    setFilterMaxPrice(resultsList[resultsList.length-1].salePrice);
                }else{
                    setFilterMinPrice(0);
                    setFilterMaxPrice(1000000);
                }
                setLoadingHotelList(false);
                setAllHotelList(resultsList);
                setFilteredHotelList(resultsList);
                props.saveSearchResults(resultsList);
                setSearchedLocation(response.data.result.city.name); 
                
            }
          };
          fetchData();
    },[]);

    useEffect(()=>{
        paginate(1,20);
    },[filteredHotelList]); 

    useEffect(()=>{
        if (allHotelList.length > 0){
    
            let regions =[];
            for(let i=0 ; i < allHotelList.length ; i++){
                for (let j=0 ; j < allHotelList[i].regions.length;j++){
                    if(regions.filter(item=>item.id === allHotelList[i].regions[j].id ).length === 0){
                        let newitem = allHotelList[i].regions[j];
                        newitem.number = 1;
                        regions.push(newitem);
                    }else{
                        let itemIndex = regions.findIndex(x => x.id === allHotelList[i].regions[j].id );
                        regions[itemIndex].number = regions[itemIndex].number + 1
                    }
                }
            }
            setRegionList(regions);
            
            let filterRatingInformation = {};
            filterRatingInformation.stars5 = allHotelList.filter(item => (item.rating === 5)).length;
            filterRatingInformation.stars4 = allHotelList.filter(item => (item.rating === 4)).length;
            filterRatingInformation.stars3 = allHotelList.filter(item => (item.rating === 3)).length;
            filterRatingInformation.stars2 = allHotelList.filter(item => (item.rating === 2)).length;
            filterRatingInformation.stars1 = allHotelList.filter(item => (item.rating === 1)).length;
            filterRatingInformation.stars0 = allHotelList.filter(item => (item.rating === 0)).length;
            setRatingFilterInfo(filterRatingInformation);


            let features =[];            
            for(let i=0 ; i < allHotelList.length ; i++){
                for (let j=0 ; j < allHotelList[i].features.length;j++){
                    if(features.filter(item=>item.keyword === allHotelList[i].features[j].keyword ).length === 0){
                        let newitem = allHotelList[i].features[j];
                        newitem.number = 1;
                        features.push(newitem);
                    }else{
                        let itemIndex = features.findIndex(x => x.keyword === allHotelList[i].features[j].keyword );
                        features[itemIndex].number = features[itemIndex].number + 1
                    }
                }
            }
            setFeaturesList(features); 


            let boardsArray =[];            
            for(let i=0 ; i < allHotelList.length ; i++){
                for (let j=0 ; j < allHotelList[i].boards.length;j++){
                    if(boardsArray.filter(item=>item.name === allHotelList[i].boards[j].name ).length === 0){
                        let newitem = allHotelList[i].boards[j];
                        newitem.number = 1;
                        boardsArray.push(newitem);
                    }else{
                        let itemIndex = boardsArray.findIndex(x => x.name === allHotelList[i].boards[j].name );
                        boardsArray[itemIndex].number = boardsArray[itemIndex].number + 1
                    }
                }
            }
            setBoardsList(boardsArray);          
        }



    },[allHotelList]);    

    useEffect(()=>{
        let results = [...allHotelList].filter(hotelItem=>{   
            let itemAmenities=[];
            for(let i=0 ; i<hotelItem.features.length ; i++){
                itemAmenities.push(hotelItem.features[i].keyword);
            }  
            let itemRegions=[];
            for(let i=0 ; i<hotelItem.regions.length ; i++){
                itemRegions.push(hotelItem.regions[i].id);
            }  
            let itemBoards=[];
            for(let i=0 ; i<hotelItem.boards.length ; i++){
                itemBoards.push(hotelItem.boards[i].code);
            }                     
            if(
                hotelItem.name.toLowerCase().includes(filterNameValue.toLowerCase())
                &&
                hotelItem.salePrice >= filterPriceValue[0]
                &&
                hotelItem.salePrice <= filterPriceValue[1]
                &&
                (filterRatingValue.length === 0 || filterRatingValue.includes(hotelItem.rating))
                &&
                (filterAmenitiesValue.length === 0 || filterAmenitiesValue.every(item => itemAmenities.includes(item)))
                &&
                (filterRegionValue.length === 0 || filterRegionValue.some(item => itemRegions.includes(item)))
                &&
                (filterBoardValue.length === 0 || filterBoardValue.some(item => itemBoards.includes(item)))
                ){
                return true;
            }else{
                return false;
            }
        });
        setFilteredHotelList(results);
    },[filterNameValue,filterPriceValue,filterRatingValue,filterAmenitiesValue,filterRegionValue,allHotelList,filterBoardValue]);  

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
                sortedList = [...allHotelList].sort((a, b)=>{return a.salePrice - b.salePrice});
                break;
            case "HotelName":
                sortedList = [...allHotelList].sort((a, b)=>{
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                });
                break;
            case "MostStar":
                sortedList = [...allHotelList].sort((a, b)=>{return b.rating - a.rating});
                break;
            default:
                sortedList = [...allHotelList]
        }
        setAllHotelList(sortedList);
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
            case "region":
                setFilterRegionValue(parameters.value)
                break;
            case "boards":
                setFilterBoardValue(parameters.value)
                break;
            default:
                console.log("its unknown filter");
        }
    }

    const searchedCityId = router.asPath.split("location-")[1].split("/")[0];
    const searchedLocationId = router.asPath.split("location-")[1].split("/")[0];

    let searchedCheckin ,searchedCheckout;
    if (router.asPath.includes("checkin-")){
        searchedCheckin = moment(router.asPath.split("checkin-")[1].split("/")[0]).format("YYYY-MM-DD");
        searchedCheckout = moment(router.asPath.split("checkout-")[1].split("/")[0]).format("YYYY-MM-DD");
    }else{
        searchedCheckin = moment().format("YYYY-MM-DD");
        searchedCheckout = moment().add(1, 'day').format("YYYY-MM-DD");
    }

    const locationName = router.asPath.split("hotels-foreign/")[1].split("/")[0];
    
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const filter = <HotelListFilter 
    ratingFilterInfo={ratingFilterInfo} 
    loading ={loadingHotelList} 
    filtered ={filteredHotelList.length } 
    total={allHotelList.length} 
    regionList={regionList} 
    featuresList={featuresList} 
    minPrice={filterMinPrice}
    maxPrice={filterMaxPrice}
    nameFilter={filterNameValue} 
    filterHandler={x => {filterHandler(x)}}
    boardsList={boardsList}
    />

    return (
        <div className={`${styles.hotelList} ${process.env.THEME_NAME === "TRAVELO" && styles.hotelListTravelo}`}>
            <div className={`${styles.hotelListSearchHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.hotelListSearchHotelTravelo}`}>
                <div className={styles.container}>
                    <SearchHotel
                        isForeign
                        defaultSearchValue={locationName}
                        cityId={searchedCityId}
                        selectedHotelId={searchedLocationId}
                        checkinDate={searchedCheckin}
                        checkoutDate={searchedCheckout}
                        defaultRooms={defaultRooms ? defaultRooms : null}
                    />
                </div>
            </div>
            <div className={styles.container}>
                { ((allHotelList.length > 0) || (loadingHotelList))?
                <>
                    <HotelSearchResult total={allHotelList.length} progressWidth={progressWidth} progressdescription={progressdescription} searchedLocation={searchedLocation} />

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

                    <Row gutter={[15,15]}>
                        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <HotelListViewMap
                                hotels={pagedHotelList}
                                mapInfo={mapInfo}
                                searchedInfo={searchedInfo}
                                filter={filter}
                                sort ={<SimpleRadioSortHotelList sortedBy={sortedBy} loading ={loadingHotelList} sortHandler={sortHandler}/>}
                            />
                            {filter}
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                        <div className={styles.hotelListContent}>
                            <div
                                className={`${styles.stayFlexible} ${process.env.THEME_NAME === "TRAVELO" && styles.stayFlexibleTravelo}`}
                                >
                                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1IDMpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IHN0cm9rZT0iIzM2NjVBQyIgc3Ryb2tlLXdpZHRoPSIxLjA3NSIgZmlsbD0iI0VBRUZGNiIgZmlsbC1ydWxlPSJub256ZXJvIiB4PSIuNTM3IiB5PSI2LjU2MyIgd2lkdGg9IjM4LjM0MSIgaGVpZ2h0PSIzMS44MjkiIHJ4PSIyLjE1Ii8+CiAgICAgICAgPGVsbGlwc2UgZmlsbD0iI0VBRUZGNiIgZmlsbC1ydWxlPSJub256ZXJvIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDgyLjc2NykiIGN4PSIyMC4xNTYiIGN5PSI0MS4zODMiIHJ4PSIxMy40MzgiIHJ5PSIxLjM0NCIvPgogICAgICAgIDxwYXRoIGQ9Ik0uODk2IDE0LjU4NmgzNy42MjV2MjIuMDQyYzAgLjU5NC0uNDgxIDEuMDc1LTEuMDc1IDEuMDc1SDEuOTcxYTEuMDc1IDEuMDc1IDAgMDEtMS4wNzUtMS4wNzVWMTQuNTg2eiIgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIi8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOC45NTkgLjAzMikiIGZpbGw9IiNFQUVGRjYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMzY2NUFDIiBzdHJva2Utd2lkdGg9IjEuMDc1Ij4KICAgICAgICAgICAgPHJlY3QgeD0iLjUzNyIgeT0iLjUzNyIgd2lkdGg9IjQuMjg4IiBoZWlnaHQ9IjEwLjAwMyIgcng9IjIuMTQ0Ii8+CiAgICAgICAgICAgIDxyZWN0IHg9IjguNiIgeT0iLjUzNyIgd2lkdGg9IjQuMjg4IiBoZWlnaHQ9IjEwLjAwMyIgcng9IjIuMTQ0Ii8+CiAgICAgICAgICAgIDxyZWN0IHg9IjE2LjY2MyIgeT0iLjUzNyIgd2lkdGg9IjQuMjg4IiBoZWlnaHQ9IjEwLjAwMyIgcng9IjIuMTQ0Ii8+CiAgICAgICAgPC9nPgogICAgICAgIDxwYXRoIGQ9Ik04Ljk1OSAzMy45MXYuODU2SDUuMzc1di0uODU2aDMuNTg0em02LjI3IDB2Ljg1NmgtMy41ODN2LS44NTZoMy41ODN6bTYuMjcxIDB2Ljg1NmgtMy41ODR2LS44NTZIMjEuNXptNi4yNzEgMHYuODU2aC0zLjU4NHYtLjg1NmgzLjU4NHptNi4yNyAwdi44NTZIMzAuNDZ2LS44NTZoMy41ODJ6TTguOTYgMzEuMzQydi44NTZINS4zNzV2LS44NTZoMy41ODR6bTYuMjcgMHYuODU2aC0zLjU4M3YtLjg1NmgzLjU4M3ptNi4yNzEgMHYuODU2aC0zLjU4NHYtLjg1NkgyMS41em02LjI3MSAwdi44NTZoLTMuNTg0di0uODU2aDMuNTg0em02LjI3IDB2Ljg1NkgzMC40NnYtLjg1NmgzLjU4MnpNOC45NiAyOC43NzJ2Ljg1OEg1LjM3NXYtLjg1OGgzLjU4NHptNi4yNyAwdi44NThoLTMuNTgzdi0uODU4aDMuNTgzem02LjI3MSAwdi44NThoLTMuNTg0di0uODU4SDIxLjV6bTYuMjcxIDB2Ljg1OGgtMy41ODR2LS44NThoMy41ODR6bTYuMjcgMHYuODU4SDMwLjQ2di0uODU4aDMuNTgyek04Ljk2IDI2LjIwNHYuODU2SDUuMzc1di0uODU2aDMuNTg0em02LjI3IDB2Ljg1NmgtMy41ODN2LS44NTZoMy41ODN6bTYuMjcxIDB2Ljg1NmgtMy41ODR2LS44NTZIMjEuNXptNi4yNzEgMHYuODU2aC0zLjU4NHYtLjg1NmgzLjU4NHptNi4yNyAwdi44NTZIMzAuNDZ2LS44NTZoMy41ODJ6TTguOTYgMjMuNjM3di44NTZINS4zNzV2LS44NTZoMy41ODR6bTYuMjcgMHYuODU2aC0zLjU4M3YtLjg1NmgzLjU4M3ptNi4yNzEgMHYuODU2aC0zLjU4NHYtLjg1NkgyMS41em02LjI3MSAwdi44NTZoLTMuNTg0di0uODU2aDMuNTg0em02LjI3IDB2Ljg1NkgzMC40NnYtLjg1NmgzLjU4MnoiIGZpbGw9IiMzNjY1QUMiIGZpbGwtcnVsZT0ibm9uemVybyIvPgogICAgICAgIDxwYXRoIHN0cm9rZT0iIzM2NjVBQyIgc3Ryb2tlLXdpZHRoPSIxLjA3NSIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgZD0iTTEuMzQ0IDE0LjE1OWgzNi43MjgiLz4KICAgICAgICA8cGF0aCBkPSJNLjg5NiAxNC41ODZoMS43OTJ2MjMuMTE3SDEuOTdhMS4wNzUgMS4wNzUgMCAwMS0xLjA3NS0xLjA3NVYxNC41ODZ6IiBmaWxsPSIjRUFFRkY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICAgICAgICA8cGF0aCBmaWxsPSIjRUFFRkY2IiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0uODcgMTYuMjY3di0xLjcxNGgzNy42MjR2MS43MTN6Ii8+CiAgICAgICAgPHJlY3QgZmlsbD0iI0U3NDEyQSIgZmlsbC1ydWxlPSJub256ZXJvIiB4PSIxMi4wOTQiIHk9IjE4LjE0MSIgd2lkdGg9IjE0Ljc4MSIgaGVpZ2h0PSIyLjY4OCIgcng9IjEuMzQ0Ii8+CiAgICAgICAgPGNpcmNsZSBmaWxsPSIjRTc0MTJBIiBjeD0iMzIiIGN5PSIzMy41IiByPSI4LjUiLz4KICAgICAgICA8cGF0aCBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTI3LjUgMzNsMyAzIDUtNSIvPgogICAgPC9nPgo8L3N2Zz4K" alt="free cancellation" width="48" height="48"/>
                                <div className={`margin-start-10 ${styles.text}`}>
                                    <h3>{t('stay-flexible')}</h3>
                                    <span>{t('stay-flexible-description')}</span>
                                </div>
                                <button type="button" className="btn btn-default">{t('filter-by-free-cancellation')}</button>
                            </div>
                            <SortHotelList loading ={loadingHotelList} sortHandler={x => {sortHandler(x)}}/>
                            <div className={styles.hotelResultList}>
                            <HotelListCard 
                            nights={nights} 
                            hotelList={pagedHotelList} 
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
                            </div>
                        }
                        </Col>
                    </Row>
                    <br/>
                </>
                :<div>
                    <br/><br/>
                    <Empty />
                    <br/><br/>
                </div>
                }

            </div>
        </div>
    )

}

HotelListSearch.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelListSearch.propTypes = {
t: PropTypes.func.isRequired,
}
  

const mapDispatchToProp = (dispatch) => ({
    saveSearchResults : (d) => dispatch(setForeignHotelList(d))
});
    
export default (withTranslation('common'))(connect(null,mapDispatchToProp)(HotelListSearch));