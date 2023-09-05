import React,{useEffect, useState,useRef} from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n ,Router} from '../../../../i18n'
import { Button, Row, Col, Tooltip, Typography, Skeleton,Collapse,Tag  } from 'antd'
import { useRouter } from 'next/router';
import moment from 'moment-jalaali';
import _ from "lodash";
import {HotelDomesticPreReserve} from '../../../actions';

import defaultRoomImage from '../../../assets/defaultRoom.svg';
import bedSvg from '../../../assets/bed.svg';
import personSvg from '../../../assets/person.svg';
import restaurantSvg from '../../../assets/restaurant.svg';

import styles from '../../../styles/Hotel.module.css'
import { ClockCircleOutlined ,InfoCircleOutlined,CheckOutlined} from '@ant-design/icons'

const RoomChoices = props => {
    const { t } = props;
    const { Text } = Typography;
    const { Panel } = Collapse;
    const router = useRouter();

    const [singleRoomRph,setSingleRoomRph] = useState(); 
    const [selectedRooms,setSelectedRooms] =useState([]);
    const [roomsActiveKey,setRoomsActiveKey] = useState([]);
    const [selectedRoomsQuantity,setSelectedRoomsQuantity] = useState(0);
    const [preReserveLoading,setPreReserveLoading] = useState(false);
    
    useEffect(()=>{
        if (props.availability && props.availability[0] && props.availability[0].roomGroups){
            // const  groups = props.availability[0].roomGroups;
            // let activPanelsArray = ["1"];
            // for (let i = 0 ; i< groups.length ; i++){
            //     activPanelsArray.push(groups[i].roomNo.toString())
            // }
            setRoomsActiveKey(["1"]);

        }
    },[props.availability]);

    useEffect(()=>{
        if (singleRoomRph){
            onPrereserveHandler();
        }
    },[singleRoomRph]);

    useEffect(()=>{
        let selected = 0;
        for (let i=0; i<selectedRooms.length; i++ ){
            if (selectedRooms[i]){
                selected++;
            }
        }
        setSelectedRoomsQuantity(selected);
    },[selectedRooms])

    const roomsHolder = useRef();
    const executeScroll = () => { if(roomsHolder && roomsHolder.current ){ roomsHolder.current.scrollIntoView({behavior: "smooth"})}} ;

    function numberWithCommas(x) {
        if (x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            return "0";
        }
    }
    const selectRoomHandle = (groupItem,roomItem)=>{
        const selected = [...selectedRooms];
        selected[groupItem.roomNo-1] = roomItem;
        setSelectedRooms(selected);
        let updatedKeyArray = roomsActiveKey.filter(panelItem=>panelItem !== groupItem.roomNo.toString() ) 
        if (
            (props.availability[0].roomGroups.length > groupItem.roomNo)
            &&
            ! roomsActiveKey.includes((groupItem.roomNo+1).toString() )
            &&
            !selectedRooms[groupItem.roomNo]
            ){
            updatedKeyArray.push((groupItem.roomNo+1).toString());
        }
        setRoomsActiveKey(updatedKeyArray);
        executeScroll();
    }

    const onPrereserveHandler = async () =>{
        setPreReserveLoading(true);
        let hotelId,checkin,checkout,rooms;
        hotelId = props.hotelId;

        const clearUrlPath = router.asPath.split("?")[0];
        
        if (clearUrlPath.includes("checkin-") && clearUrlPath.includes("location-") && clearUrlPath.includes("adult-")){
            let pathName = clearUrlPath.split("location-")[1];
            checkin = moment(pathName.split("checkin-")[1].split("/")[0]).format("YYYY-MM-DD");
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
                roomInfo['childAges'] = children;
                roomInfo['boardType'] = 0;
                if (singleRoomRph){
                    roomInfo['rph'] = singleRoomRph;
                }else{
                    roomInfo['rph'] = selectedRooms[i].rph;
                }
                rooms.push(roomInfo);
            }

        }else{
            checkin = moment().format("YYYY-MM-DD");
            checkout = moment().add(1, 'day').format("YYYY-MM-DD");
            rooms=[{roomNo:1,adultNo:1,childAges:[],rph:singleRoomRph,boardType:0}]
        }

        let params={
            "hotelId":hotelId,
            "checkinDate":checkin,
            "checkoutDate":checkout,
            "rooms":rooms
        }

        const prereserveResponse = await HotelDomesticPreReserve(params);
        if (prereserveResponse.data ) {
            
            let key = prereserveResponse.data.result;
            Router.push(`/hotel/checkout${props.searchedInfo}/key=${key}`);
        }
    
    }

    const calulateDiscount = (sale,board) => {
        let discountPercentage,fixedDiscountPercentage;
        discountPercentage = ((board-sale)*100/board);
        if (discountPercentage > 0 && discountPercentage < 1){
            fixedDiscountPercentage = 1;
        } else {
            fixedDiscountPercentage = discountPercentage.toFixed(0);
        }
        return (fixedDiscountPercentage);
    }

    const boardProperties = (board) => {
        if(board === 0)
            return "بدون صبحانه"
        else if(board === 1)
            return "به همراه صبحانه"
        else if(board === 2)
            return "صبحانه + ناهار یا شام"
        else if(board === 3)
            return "تمام وعده های غذایی شامل می شود"
        else
            return null
    }

    return (
        <div className={styles.roomChoices} id="anchorroomchoices" ref={roomsHolder}>
            <div className={styles.container}>
                <div className={styles.subjectRoomChoices}>
                    {t('room-reserve')}
                </div>
                {props.hotelAccommodation && props.hotelAccommodation.alertNote && <div className={`${styles.contenthotelAccommodation} ${process.env.THEME_NAME === "TRAVELO" && styles.contenthotelAccommodationTravelo}`}>
                        <p>{props.hotelAccommodation.alertNote}</p>
                    </div>}
            </div>
            <div className={`${styles.contentRoomChoices} ${process.env.THEME_NAME === "TRAVELO" && styles.contentRoomChoicesTravelo}`}>
                {
                    props.availability?<>
                    { (props.availability.length>0)?
                        props.availability[0] && 
                            props.availability[0].roomGroups.length > 1 ? 
                                //multippleRooms start
                                <>
                                <Collapse activeKey={roomsActiveKey} onChange ={e=>{setRoomsActiveKey(e)}} >
                                {props.availability[0].roomGroups.map(groupItem => {
                                    let itemTitle = <div className={styles.container}>  اتاق {groupItem.roomNo} را انتخاب کنید</div>
                                    const selectedItem = selectedRooms[groupItem.roomNo - 1];
                                    if (selectedItem){
                                        itemTitle = <div className={styles.container}>
                                            <Row gutter={[20,0]}>
                                                <Col>اتاق انتخاب شده برای گروه {groupItem.roomNo} :</Col>
                                                <Col><b>{selectedItem.roomTypeName}</b></Col>
                                                <Col>|</Col>
                                                <Col><b>{numberWithCommas(selectedItem.salePrice)} ریال</b></Col>
                                                <Col><div className={styles.changeRoomBtn}>تغییر اتاق</div></Col>
                                            </Row>
                                        </div>;
                                    }

                                    return <Panel showArrow={false} header={itemTitle} key={groupItem.roomNo}>
                                        <div className="multippleRoomItemSection">
                                            <div className={styles.container} >                                    
                                                {groupItem.rooms.sort((a,b)=>{
                                                    if ((a.finalAvalablityMode===0) && b.finalAvalablityMode !== 0){
                                                        return 1;
                                                    }
                                                    if ((b.finalAvalablityMode===0) && a.finalAvalablityMode !== 0){
                                                        return -1;
                                                    }
                                                    if ( (a.salePrice < 10000) &&( b.salePrice > 10000)) {
                                                        return 1;
                                                    } 
                                                    if ( (a.salePrice > 10000) &&( b.salePrice < 10000)) {
                                                        return -1;
                                                    }                                      
                                                    if (b.salePrice === a.salePrice || (a.salePrice < 10000 && b.salePrice <10000)){
                                                        return(a.beds - b.beds);
                                                    }
                                                    return(a.salePrice - b.salePrice);                                                 
                                                }).map(roomItem => <div key={roomItem.rph} className={`${styles.cardRoomChoices} ${process.env.THEME_NAME === "TRAVELO" && styles.cardRoomChoicesTravelo}`}>
                                                    <Row>
                                                        <Col
                                                            xs={24}
                                                            md={6}
                                                            style={{"backgroundImage":`url(${roomItem.icon?roomItem.icon:defaultRoomImage})`}}
                                                            className={`room-thumbnail ${roomItem.icon?"":"default-icon"} ${process.env.THEME_NAME === "TRAVELO" && "room-thumbnail-travelo" }`}
                                                            onContextMenu={(e) => e.preventDefault()}
                                                        />
                                                        <Col xs={24} md={12}>
                                                            <div className="padding-1">
                                                                <h4 className={styles.roomTypeName}>{roomItem.roomTypeName}</h4>
                                                                <div className="margin-bottom line-height">
                                                                        <img src={personSvg} alt="" className="inline-icon" /> {roomItem.beds} {t('individual')}
                                                                    {roomItem.exServiceSalePrice ? <>
                                                                        {(roomItem.exBeds>0)?<div>
                                                                            <img src={bedSvg} alt="" className="inline-icon" />
                                                                            <span> {roomItem.exBeds} {t('extra-bed')} </span>
                                                                            {roomItem.exServiceSalePrice ? <> ({t('every-extra-individual')} {numberWithCommas(roomItem.exServiceSalePrice)} {t('rial')})</>:null}
                                                                        </div> : null}
                                                                    </> : null}
                                                                    {/* <div><img src={bedSvg} alt="" className="inline-icon" /> {t('without-extra-bed')}</div> */}
                                                                    {boardProperties(roomItem.board) !== null ? <div>
                                                                        <img src={restaurantSvg} alt="" className="inline-icon" />
                                                                        <span style={{ fontSize: 14, marginRight: 3, color: "#217d57" }}>{boardProperties(roomItem.board)}</span>
                                                                    </div> : null}
                                                                </div>
                                                                {roomItem.description && <div className="margin-bottom"><Text type="warning"><InfoCircleOutlined /> {roomItem.description}</Text></div>}
                                                            </div>
                                                        </Col>
                                                        <Col xs={24} md={6} className="text-end align-self-flex-end">
                                                            <div className="padding-1 margin-top-xs--30">                                        
                                                                <div className="margin-bottom-small">
                                                                    <div className={styles.detailPackagePrice}>
                                                                        {(roomItem.boardPrice && (roomItem.boardPrice !== roomItem.salePrice)) && <>
                                                                            <span className="red-tag margin-bottom-small green-tag-travelo">{calulateDiscount(roomItem.salePrice , roomItem.boardPrice)}% {t('discount')}</span>
                                                                            <div className={styles.oldPrice}>
                                                                                {numberWithCommas(roomItem.boardPrice)} {t('rial')}
                                                                            </div>
                                                                        </>}

                                                                        <Tooltip placement="topLeft" title={
                                                                            <div>
                                                                                {roomItem.salePrice >= 10000 ? <>
                                                                                    <div>
                                                                                        <span>{numberWithCommas((roomItem.salePrice/props.nights).toFixed(0))}</span>
                                                                                        <span> {t('rial')} </span>
                                                                                    </div>
                                                                                    <small>
                                                                                        {t("Avg-per-night")}
                                                                                    </small>
                                                                                </> : <span>قیمت نیازمند استعلام است</span>}
                                                                            </div>
                                                                        }>
                                                                            {roomItem.salePrice >= 10000 ?
                                                                                <div className="new-price">
                                                                                        {numberWithCommas(roomItem.salePrice)} {t('rial')}
                                                                                    <b className="font-20"></b>
                                                                                </div> :
                                                                                <div className="new-price">
                                                                                    <span style={{color:"red",fontSize: "12px"}}>قیمت نیازمند استعلام است</span>
                                                                                </div>}
                                                                        </Tooltip>
                                                                        <span className={styles.detailsmall}> {t('price-start-from')} {props.availability[0].diffDays} {t('night')}</span>
                                                                    </div>
                                                                </div>
                                                                <div className={styles.bedRoomPackageBtn}>
                                                                    {roomItem && roomItem.finalAvalablityMode === 0 ?
                                                                        <span style={{color:"red",fontSize: "12px"}}>ظرفیت تکمیل</span>
                                                                        : <>
                                                                        {selectedRooms[groupItem.roomNo - 1] && selectedRooms[groupItem.roomNo - 1].rph === roomItem.rph ?
                                                                            <Tag className={styles.selectedRoomTag}><CheckOutlined /> انتخاب شده</Tag>
                                                                            :
                                                                            <Button 
                                                                            type="primary" 
                                                                            danger 
                                                                            className={`min-width-150 antd-btn-loading-end ${process.env.THEME_NAME === "TRAVELO" && "antd-btn-select-room-travelo"}`}
                                                                            onClick = {(e)=>{selectRoomHandle(groupItem,roomItem)
                                                                                // const selected = [...selectedRooms];
                                                                                // selected[roomItem.roomNo-1] = item;
                                                                                // setSelectedRooms(selected);
                                                                                // let updatedKeyArray = roomsActiveKey.filter(panelItem=>panelItem !== roomItem.roomNo.toString() ) 
                                                                                // setRoomsActiveKey(updatedKeyArray);
                                                                                }}
                                                                            >
                                                                                {/* {item.isOnline?t('online-reserve'):t("room-reserve")} */}
                                                                                انتخاب
                                                                            </Button>
                                                                            }
                                                                        </>}
                                                                </div> 
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>)}
                                            </div>
                                        </div>
                                    </Panel>
                                })}
                                </Collapse>
                                <div className={styles.container}>
                                    <div className={`text-center ${styles.multipleRoomSelectState}`}>
                                        {selectedRoomsQuantity>0 ?
                                        <b>{selectedRoomsQuantity}  اتاق انتخاب شده است.</b>
                                        :
                                        <b>اتاقی انتخاب نشده</b>
                                        }
                                    </div>
                                    <div className={`text-center ${styles.multipleRoomContinueBtnHolder}`}>
                                        {selectedRoomsQuantity === props.availability[0].roomGroups.length && <>
                                            <div className={styles.price}><b>{numberWithCommas(_.sumBy(selectedRooms, 'salePrice'))} ریال</b></div>
                                            <Button 
                                                type="primary" 
                                                danger 
                                                size="large"
                                                className={`min-width-150 antd-btn-loading-end ${process.env.THEME_NAME === "TRAVELO" && "antd-btn-select-room-travelo"}`}
                                                loading={preReserveLoading}
                                                onClick = {(e)=>{
                                                    onPrereserveHandler();
                                                    }}
                                                >
                                                رزرو اتاق ها
                                            </Button></>
                                            }
                                    </div>
                                </div>
                                </>
                                //multippleRooms ends
                            : 
                                <div className={styles.container}>
                                    {props.availability[0].roomGroups[0].rooms.sort((a,b)=>{
                                        if ((a.finalAvalablityMode===0) && b.finalAvalablityMode !== 0){
                                            return 1;
                                        }
                                        if ((b.finalAvalablityMode===0) && a.finalAvalablityMode !== 0){
                                            return -1;
                                        }
                                        if ( (a.salePrice < 10000) &&( b.salePrice > 10000)) {
                                            return 1;
                                        } 
                                        if ( (a.salePrice > 10000) &&( b.salePrice < 10000)) {
                                            return -1;
                                        }                                      
                                        if (b.salePrice === a.salePrice || (a.salePrice < 10000 && b.salePrice <10000)){
                                            return(a.beds - b.beds);
                                        }
                                        return(a.salePrice - b.salePrice);
                                    }).map(roomItem => <div key={roomItem.rph} className={`${styles.cardRoomChoices} ${process.env.THEME_NAME === "TRAVELO" && styles.cardRoomChoicesTravelo}`}>
                                    <Row>
                                        <Col
                                            xs={24}
                                            md={6}
                                            style={{"backgroundImage":`url(${roomItem.icon?roomItem.icon:defaultRoomImage})`}}
                                            className={`room-thumbnail ${roomItem.icon ? "" : "default-icon"} ${process.env.THEME_NAME === "TRAVELO" && "room-thumbnail-travelo"}`}
                                            onContextMenu={(e)=> e.preventDefault()}
                                            />
                                        <Col xs={24} md={12}>
                                            {/* <h1>price: {roomItem.salePrice}</h1>
                                            <h1>bed: {roomItem.beds}</h1> */}
                                            <div className="padding-1">
                                                <h4 className={styles.roomTypeName}>{roomItem.roomTypeName}</h4>
                                                <div className="margin-bottom line-height">
                                                        <img src={personSvg} alt="" className="inline-icon" /> {roomItem.beds} {t('individual')}
                                                        {roomItem.exServiceSalePrice ? <>
                                                            {(roomItem.exBeds>0)?<div>
                                                                <img src={bedSvg} alt="" className="inline-icon" />
                                                                <span> {roomItem.exBeds} {t('extra-bed')} </span>
                                                                {roomItem.exServiceSalePrice ? <> ({t('every-extra-individual')} {numberWithCommas(roomItem.exServiceSalePrice)} {t('rial')})</>:null}
                                                            </div> : null}
                                                        </> : null}
                                                    {/* <div><img src={bedSvg} alt="" className="inline-icon" /> {t('without-extra-bed')}</div> */}
                                                    {boardProperties(roomItem.board) !== null ? <div>
                                                        <img src={restaurantSvg} alt="" className="inline-icon" />
                                                        <span style={{ fontSize: 14, marginRight: 3, color: "#217d57" }}>{boardProperties(roomItem.board)}</span>
                                                    </div> : null}
                                                </div>
                                                {roomItem.description && <div className="margin-bottom"><Text type="warning"><InfoCircleOutlined /> {roomItem.description}</Text></div>}
                                            </div>
                                        </Col>
                                        <Col xs={24} md={6} className="text-end align-self-flex-end">
                                            <div className="padding-1 margin-top-xs--30">                                        
                                                <div className="margin-bottom-small">
                                                    <div className={styles.detailPackagePrice}>
                                                        {(roomItem.boardPrice && (roomItem.boardPrice !== roomItem.salePrice)) && <>
                                                            <span className="red-tag margin-bottom-small green-tag-travelo">{calulateDiscount(roomItem.salePrice,roomItem.boardPrice)}% {t('discount')}</span>
                                                            <div className={styles.oldPrice}>
                                                                {numberWithCommas(roomItem.boardPrice)} {t('rial')}
                                                            </div>
                                                        </>}


                                                        <Tooltip placement="topLeft" title={
                                                            <div>
                                                                {roomItem.salePrice >= 10000 ? <>
                                                                    <div>
                                                                        <span>{numberWithCommas((roomItem.salePrice/props.nights).toFixed(0))}</span>
                                                                        <span> {t('rial')} </span>
                                                                    </div>
                                                                    <small>
                                                                        میانگین قیمت برای هر شب
                                                                    </small>
                                                                </> : <span>قیمت نیازمند استعلام است</span>}
                                                            </div>
                                                        }>
                                                            {roomItem.salePrice >= 10000 ?
                                                                <div className="new-price">
                                                                        {numberWithCommas(roomItem.salePrice)} {t('rial')}
                                                                    <b className="font-20"></b>
                                                                </div> :
                                                                <div className="new-price">
                                                                    <span style={{color:"red",fontSize: "12px"}}>قیمت نیازمند استعلام است</span>
                                                                </div>}
                                                        </Tooltip>
                                                            {roomItem.salePrice >= 10000 ?
                                                                <span className={styles.detailsmall}> {t('price-start-from')} {props.availability[0].diffDays} {t('night')}</span> : null}
                                                    </div>
                                                </div>
                                                <div
                                                    className={styles.bedRoomPackageBtn}
                                                >
                                                    {roomItem &&roomItem.finalAvalablityMode === 0 ?
                                                        <span style={{color:"red",fontSize: "12px"}}>ظرفیت تکمیل</span>
                                                        :
                                                        <Button 
                                                            type="primary" 
                                                            danger 
                                                            className={`min-width-150 antd-btn-loading-end ${process.env.THEME_NAME === "TRAVELO" && "antd-btn-select-room-travelo"}`}
                                                            disabled={singleRoomRph && (singleRoomRph!==roomItem.rph)}
                                                            loading={singleRoomRph && (singleRoomRph===roomItem.rph)}
                                                            onClick = {(e)=>{setSingleRoomRph(roomItem.rph)}}
                                                        >
                                                            {roomItem.salePrice >= 10000 ?
                                                                roomItem.isOnline ? t('online-reserve') : t("room-reserve")
                                                                : "درخواست رزرو"}
                                                        </Button>}
                                                </div> 
                                            </div>
                                        </Col>
                                    </Row>
                                </div>)}
                            </div>
                    :
                    <div className={styles.container}>
                        <div className={styles.noRoomsAvailableCard}>
                            <div className={styles.noRoomsAvailableInner}>
                                <Row >
                                    <Col flex="25px"><ClockCircleOutlined className="red" /></Col>
                                    <Col flex="auto">
                                        <h4 className={`red ${styles.noRoomsAvailableTitle}`}>{t('no-room')}</h4>
                                        <p>
                                        {t('no-room-change-date')}
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    }
                    </>
                    :
                    <div className={styles.container}>
                        <div className={styles.cardRoomChoices}>
                            <Row>
                                <Col xs={24} md={6}>
                                    <Skeleton.Image className={styles.roomChoicesImageSkeleton} />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Skeleton active className={styles.roomChoicesDetailSkeleton} />
                                </Col>
                                <Col xs={24} md={6}>
                                    <div className={styles.roomChoicesBtnSkeleton}>
                                        <Skeleton.Button active size="small" className={styles.roomChoicesPriceSkeleton} />
                                        <Skeleton.Input active size="large" className={styles.roomChoicesButtonSkeleton} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.cardRoomChoices}>
                            <Row>
                                <Col xs={24} md={6}>
                                    <Skeleton.Image className={styles.roomChoicesImageSkeleton} />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Skeleton active className={styles.roomChoicesDetailSkeleton} />
                                </Col>
                                <Col xs={24} md={6}>
                                    <div className={styles.roomChoicesBtnSkeleton}>
                                        <Skeleton.Button active size="small" className={styles.roomChoicesPriceSkeleton} />
                                        <Skeleton.Input active size="large" className={styles.roomChoicesButtonSkeleton} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.cardRoomChoices}>
                            <Row>
                                <Col xs={24} md={6}>
                                    <Skeleton.Image className={styles.roomChoicesImageSkeleton} />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Skeleton active className={styles.roomChoicesDetailSkeleton} />
                                </Col>
                                <Col xs={24} md={6}>
                                    <div className={styles.roomChoicesBtnSkeleton}>
                                        <Skeleton.Button active size="small" className={styles.roomChoicesPriceSkeleton} />
                                        <Skeleton.Input active size="large" className={styles.roomChoicesButtonSkeleton} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.cardRoomChoices}>
                            <Row>
                                <Col xs={24} md={6}>
                                    <Skeleton.Image className={styles.roomChoicesImageSkeleton} />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Skeleton active className={styles.roomChoicesDetailSkeleton} />
                                </Col>
                                <Col xs={24} md={6}>
                                    <div className={styles.roomChoicesBtnSkeleton}>
                                        <Skeleton.Button active size="small" className={styles.roomChoicesPriceSkeleton} />
                                        <Skeleton.Input active size="large" className={styles.roomChoicesButtonSkeleton} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

RoomChoices.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
RoomChoices.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(RoomChoices)