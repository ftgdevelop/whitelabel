
import React,{useState,useEffect} from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link, withTranslation } from '../../../../i18n';
import ReactDOMServer from 'react-dom/server';
import Rating from "../../UI/Rating/Rating"
import Leaflet from 'leaflet'
import _, { size } from "lodash";
import {Row,Col,Tag} from "antd";

const LeafletMap = (props) =>{
    const { t } = props;
    const [isMounted,setMounted] = useState(false);    
    useEffect(()=>{
        setMounted(true);
    },[]);

    const numberWithCommas = (x)=> {
      if (x){
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }else{
          return "0";
      }
    }

    
    const customMarkerElement = (item) => {
      const iconHTML = ReactDOMServer.renderToString(<div>
        <div className="hotelMarkerWrapper">
          {item.price ?
            <span>{numberWithCommas(item.price)} ریال</span>
            :<span>{t('There-is-no-price-for-this-hotel')}!</span>}
        <div className={`hotelMarkerInner ${props.hoveredMarkerId === item.id ? "isHovered":""}`}>
          <div className="content">
            <img src={item.image} className="marker-image" />
            <div className="marker-popup-text">
              <h4 className="title" style={{marginBottom:"3px"}}>{item.name}</h4>
              <div style={{marginBottom:"5px"}}>
                <Rating rate={item.rating} />
              </div>
              {item.satisfaction && <div className="hotel-point-holder hotel-point-holder-travelo"><b>{item.satisfaction} / 100</b><span className="hotel-point-text-travelo">
              {(item.satisfaction>90)?t("excellent"):(item.satisfaction>80)?t("very-good"):(item.satisfaction>70)?t("good"):(item.satisfaction>50)?t("fair"):t("bad")}
                </span><span className="hotel-point-text-travelo">({item.totalRowCount} نظر)</span></div>}
              {item.boards && item.boards.length > 0 && <div> <Row gutter={[5,15]}>
                {item.boards.map(board=><Col key={board.name}><Tag className='no-margin' color="green">{board.code}</Tag></Col>)}
              </Row></div>}
            </div>
          </div>
        </div>        
        <div className={`hotelMarkerInner large-card ${props.clickedMarkerId === item.id ? "isClicked":""}`}>
          <div className="content" >
            <img src={item.image} className="marker-large-image" />
            <div className="marker-popup-text">
              <Row gutter={[10,10]} style={{marginBottom:'5px'}}>
                <Col><h4 className="title no-margin">{item.name}</h4></Col>
                <Col><Rating rate={item.rating} /></Col>
              </Row>
              {item.satisfaction && <div className="hotel-point-holder hotel-point-holder-travelo"><b>{item.satisfaction} / 100</b><span className="hotel-point-text-travelo">
              {(item.satisfaction>90)?t("excellent"):(item.satisfaction>80)?t("very-good"):(item.satisfaction>70)?t("good"):(item.satisfaction>50)?t("fair"):t("bad")}
                </span><span className="hotel-point-text-travelo">({item.totalRowCount} نظر)</span></div>}
              
              {item.boards && item.boards.length > 0 && <Row gutter={[10,10]}>
                {item.boards.map(board=><Col key={board.name}><Tag className='no-margin' color="green">{board.name}</Tag></Col>)}
              </Row>}                
            
              <div className="margin-top">
                <Row justify="space-between" gutter={[10,10]} >
                  <Col>
                    {item.price ?
                      <span>{numberWithCommas(item.price)} ریال</span>
                      : <span style={{ fontSize: 12, color: '#e7412a' }}>{t('There-is-no-price-for-this-hotel')}!</span>}
                  </Col>
                  <Col>
                    <Link as={item.url+"/"+props.searchedInfo} href={item.url+"/"+props.searchedInfo}>
                      <a target="_blank" rel="noreferrer" title={item.name}>  
                          <button className="button">{t('see-rooms')}</button>
                      </a>
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
      </div>)
      const customMarkerIcon = new Leaflet.DivIcon({
        html: iconHTML,
      });
      return(customMarkerIcon);
    }

    let averageCenter,
    zoom;
    if (props.mapInfo){
      averageCenter = [props.mapInfo.lat, props.mapInfo.lang];
      zoom = props.mapInfo.zoom;
    }



    if (props.hotelList && props.hotelList.length > 0){
      //calculate center & zoom:
        let minLat = _.minBy(props.hotelList, 'latitude').latitude;
        let maxLat = _.maxBy(props.hotelList, 'latitude').latitude;
        let minLong = _.minBy(props.hotelList, 'longitude').longitude;
        let maxLong = _.maxBy(props.hotelList, 'longitude').longitude;
  
        averageCenter = [(minLat+maxLat)/2 , (minLong+maxLong)/2]; 
        
        const latdif= maxLat - minLat;
        const longdif= maxLong - minLong;
        zoom = 14;
        if ((latdif > .03) || longdif > .08){
          zoom = 13;
        }
        if ((latdif > .1) || longdif > .1){
          zoom = 11;
        }
                
    }  
    return<div>
        {isMounted && ((props.hotelList && props.hotelList.length > 0) || props.mapInfo ) && <Map center={averageCenter} zoom={zoom} onClick={()=>{props.onMarkerClick(undefined)}} >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.hotelList ?
          props.hotelList.map(item=><Marker icon={customMarkerElement(item)} key={item.id} position={[item.latitude,item.longitude]} 
          onMouseOver={()=>{props.onMarkerHover(item.id)}}
          onMouseOut={()=>{props.onMarkerHover();}}
          onClick={()=>{props.onMarkerClick(item.id)}}
          >
          </Marker>)      
        :<Marker position={averageCenter}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>}


      </Map>}
        
    </div>
}
export default withTranslation('common')(LeafletMap);