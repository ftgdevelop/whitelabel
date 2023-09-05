import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Skeleton } from 'antd'
import dynamic from 'next/dynamic'

import styles from '../../../../styles/Hotel.module.css'

const FilterHotelName = dynamic(() => import('./FilterHotelName'))
const FilterPrice = dynamic(() => import('./FilterPrice'))
const FilterAvailability = dynamic(() => import('./FilterAvailability'))
const FilterStarRating = dynamic(() => import('./FilterStarRating'))
const FilterPropertyAmenities = dynamic(() => import('./FilterPropertyAmenities'))
const FilterPropertyType = dynamic(() => import('./FilterPropertyType'))
const FilterGuestRate = dynamic(() => import('./FilterGuestRate'))

const HotelListFilter = props => {

    const filterHandler = data => {
        const urlParameters =  window.location.pathname;
        const filterValues = {};
        if (urlParameters.includes('price-')){
            let val = urlParameters.split('price-')[1].split("/")[0].split(",");
            filterValues.price= val;
        }
        if (urlParameters.includes('rating-')){
            let val = urlParameters.split('rating-')[1].split("/")[0].split(",");
            filterValues.rating= val;
        }
        if (urlParameters.includes('amenities-')){
            let val = urlParameters.split('amenities-')[1].split("/")[0].split(",");
            filterValues.amenities= val;
        }
        if (urlParameters.includes('guestrate-')){
            let val = urlParameters.split('guestrate-')[1].split("/")[0].split(",");
            filterValues.guestrate= val;
        }
        if (urlParameters.includes('type-')){
            let val = urlParameters.split('type-')[1].split("/")[0].split(",");
            filterValues.type= val;
        }
        if (urlParameters.includes('available')){
            filterValues.availability= true;
        }
        if (urlParameters.includes('name-')){
            let val = urlParameters.split('name-')[1].split("/")[0];
            filterValues.name= val;
        }

        filterValues[data.type] = data.value;

        let activeFilterParameters ='';
        if (filterValues.name){
            activeFilterParameters += `/name-${filterValues.name}`;
        }
        if (filterValues.price?.length){
            activeFilterParameters += `/price-${filterValues.price.join(",")}`;
        }
        if (filterValues.rating?.length){
            activeFilterParameters += `/rating-${filterValues.rating.join(",")}`;
        }
        if (filterValues.amenities?.length){
            activeFilterParameters += `/amenities-${filterValues.amenities.join(",")}`;
        }
        if (filterValues.type?.length){
            activeFilterParameters += `/type-${filterValues.type.join(",")}`;
        }
        if (filterValues.guestrate?.length){
            activeFilterParameters += `/guestrate-${filterValues.guestrate.join(",")}`;
        }
        if (filterValues.availability){
            activeFilterParameters += `/available`;
        }

        let path = urlParameters
        .split('/available')[0]
        .split('/guestrate')[0]
        .split('/type')[0]
        .split('/amenities')[0]
        .split('/rating')[0]
        .split('/price')[0]
        .split('/name')[0];
        path += activeFilterParameters;
        
        window.history.replaceState({}, "", path);

        props.filterHandler(data);

    }
    const { t } = props;
    
    return (
        <>
            <div className={ props.loading? `${styles.hotelListFilter} ${process.env.THEME_NAME === "TRAVELO" && styles.hotelListFilterTravelo} ${styles.hotelListFilterLoading}` : `${styles.hotelListFilter} ${process.env.THEME_NAME === "TRAVELO" && styles.hotelListFilterTravelo}` }>

                <FilterHotelName loading={props.loading} handleFilter={x => {filterHandler({type:"name",value:x})}}/>

                {props.loading?
                    <div className={styles.textFilter}>
                        <Skeleton.Button style={{ width: 100 }} active size="small" />
                    </div>
                    :
                    <div className={styles.textFilter}>{t("filter")}
                    {
                        (props.filtered< props.total) &&
                        <div className="count-filter">
                            {t("hotels-filtered-from-total", { total: props.total ,filtered:props.filtered})}
                        </div>
                    }
                    </div>}

                <FilterAvailability loading={props.loadingPrices} handleFilter={x => {filterHandler({type:"availability",value:x})}} availabilityFilterInfo={props.availabilityFilterInfo}/>

                <FilterPrice loading={props.loadingPrices} filterPriceRange={props.filterPriceRange} handleFilter={x => {filterHandler({type:"price",value:x})}}/>

                <FilterStarRating ratingFilterInfo={props.ratingFilterInfo} loading={props.loading} handleFilter={x => {filterHandler({type:"rating",value:x})}}/>

                <FilterPropertyAmenities loading={props.loading} featuresList={props.featuresList} handleFilter={x => {filterHandler({type:"amenities",value:x})}} />

                <FilterGuestRate loading={props.loading} guestRateFilterInfo={props.guestRateFilterInfo} handleFilter={x => {filterHandler({type:"guestrate",value: x })}} />
                
                {/* <FilterRegion loading={props.loading} regionList={props.regionList} handleFilter={x => {filterHandler({type:"region",value:x})}} /> */}

                {/* <FilterPopular/> */}

                <FilterPropertyType loading={props.loading} typesList={props.typesList} handleFilter={x => {filterHandler({type:"type",value:x})}} />

            </div>
        </>
    )

}

HotelListFilter.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelListFilter.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(HotelListFilter);
