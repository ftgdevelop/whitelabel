import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'

import styles from '../../../styles/Cip.module.css'
import {GetCipAirPortList,GetCipAirPortListPrice,CipAirPortAvailability} from '../../../actions'; 
import GalleryCip from './GalleryCip';
import AirportCip from './AirportCip';
import FaqCip from './FaqCip';
import ServiceCip from './ServiceCip';
import TermsCip from './TermsCip';

const CipHome = props => {

    const [cipInfo,setCipInfo] = useState();
    const [cipAirPortList,setCipAirPortList] = useState();
    const [cipPriceAvailability,setCipPriceAvailability] = useState();

    useEffect(()=>{
        const fetchData = async () => {
            const response = await GetCipAirPortList();
            if (response.data) {
                setCipAirPortList(response.data.result.items);
                const priceResponse = await GetCipAirPortListPrice();
                let iataItems =[];
                if(priceResponse.data){
                    setCipInfo(priceResponse.data);
                    let items = [...response.data.result.items];
                    let updatedItems =[];                    
                    for (let i=0 ; i< items.length ; i++){
                        let newItem = items[i];
                        let itemWithPrice = priceResponse.data.AirPorts.filter(item => item.AirportId === items[i].id)[0];
                        if(itemWithPrice && itemWithPrice.Price){
                            newItem.updatedPrice = itemWithPrice.Price;
                            updatedItems.push(newItem);
                        }
                        iataItems.push(newItem.code);
                    }
                }

                if (iataItems) {
                    const availabilityResponse = await CipAirPortAvailability({"iataCodes": iataItems,"adults": 1,"children": 0,"accompanying": 0});
                    if(availabilityResponse.data){
                        setCipPriceAvailability(availabilityResponse.data);
                        let items = [...response.data.result.items];
                        let updatedItems =[];
                        for (let i=0 ; i< items.length ; i++){
                            let newItem = items[i];
                            let itemWithPrice = availabilityResponse.data.result.filter(item => item.id === items[i].id)[0];
                            if(itemWithPrice && itemWithPrice.availability){
                                newItem.availabilityPrice = itemWithPrice.availability;
                                updatedItems.push(newItem);
                            }
                        }
                        setCipAirPortList(items);
                    }
                }
            }
        };
        
        fetchData();
        
    },[]);

    const { t } =props;
    return (
        <div
            className={`${styles.cip} ${process.env.THEME_NAME === "TRAVELO" && styles.cipTravelo}`}
            >
            <GalleryCip cipInfo={cipInfo} />
            
            <div className={styles.container}>

                <AirportCip cipInfo={cipInfo} cipAirPortList={cipAirPortList} cipPriceAvailability={cipPriceAvailability}/>
                
                <ServiceCip />
                
                <TermsCip/>

                <FaqCip />

            </div>
        </div>
    )

}

CipHome.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
CipHome.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(CipHome)
