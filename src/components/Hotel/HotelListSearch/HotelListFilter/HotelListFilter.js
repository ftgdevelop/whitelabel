import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Skeleton } from 'antd'
import dynamic from 'next/dynamic'

import styles from '../../../../styles/Hotel.module.css'

const FilterHotelName = dynamic(() => import('./FilterHotelName'))
const FilterPrice = dynamic(() => import('./FilterPrice'))
const FilterStarRating = dynamic(() => import('./FilterStarRating'))
const FilterPropertyAmenities = dynamic(() => import('./FilterPropertyAmenities'))
const FilterRegion = dynamic(() => import('./FilterRegion'))
const FilterBoards = dynamic(() => import('./FilterBoards'))

class HotelListFilter extends React.Component {
    
    render() {
        const { t } = this.props;
        return (
            <>  
                <div className={ this.props.loading? `${styles.hotelListFilter} ${styles.hotelListFilterLoading}` : styles.hotelListFilter}>

                    {
                        this.props.loading?
                        <div className={styles.textFilter}>
                            <Skeleton.Button style={{ width: 100 }} active size="small" />
                        </div>
                        :
                        <div className={styles.textFilter}>
                            {t("filter")}
                            {
                                (this.props.filtered< this.props.total)&&
                                <div className="count-filter">
                                        {t("hotels-filtered-from-total", { total: this.props.total ,filtered:this.props.filtered})}
                                </div>
                            }
                        </div>
                    }
                   
                    <FilterHotelName loading={this.props.loading} handleFilter={x => {this.props.filterHandler({type:"name",value:x})}}/>

                    <FilterPrice loading={this.props.loading} minPrice={this.props.minPrice} maxPrice={this.props.maxPrice} handleFilter={x => {this.props.filterHandler({type:"price",value:x})}}/>

                    <FilterStarRating ratingFilterInfo={this.props.ratingFilterInfo} loading={this.props.loading} handleFilter={x => {this.props.filterHandler({type:"rating",value:x})}}/>

                    <FilterBoards loading={this.props.loading} boardsList={this.props.boardsList} handleFilter={x => {this.props.filterHandler({type:"boards",value:x})}} />
                    
                    <FilterPropertyAmenities loading={this.props.loading} featuresList={this.props.featuresList} handleFilter={x => {this.props.filterHandler({type:"amenities",value:x})}} />
                    
                    <FilterRegion loading={this.props.loading} regionList={this.props.regionList} handleFilter={x => {this.props.filterHandler({type:"region",value:x})}} />

                    {/* <FilterPopular/> */}

                    {/* <FilterAvailability/> */}

                    {/* <FilterPropertyType/> */}

                </div>
            </>
        )
    }
}

HotelListFilter.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelListFilter.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(HotelListFilter)
