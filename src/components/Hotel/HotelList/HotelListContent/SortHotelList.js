import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Radio, Tooltip } from 'antd'
import {InfoCircleOutlined} from '@ant-design/icons'

import styles from '../../../../styles/Hotel.module.css'
import { SortIcon } from '../../../UI/Icons'
class SortHotelList extends React.Component {
    
    render() {
        const { t } = this.props;
        return (
            <>
                {
                    this.props.loading ? 
                        null 
                    :
                    <div className={styles.sortHotelList}>
                        <span className={`padding-end-10 ${styles.sortHotelListText}`}>{t("sort-by")}: </span>
                        <span className={styles.sortHotelListIcon}><SortIcon/></span>
                        <Radio.Group onChange={e=>{this.props.sortHandler(e.target.value)}} defaultValue={this.props.sortedBy}>
                            <Radio.Button value="Priority">
                                 {t("most-popular")}
                                 <Tooltip className="relative" title={<small>{t("we-sort-by-the-top-hotels-recommended-by-our-passionate-travel-team")}</small>} >
                                    <InfoCircleOutlined className="margin-right-small middla-align"/>
                                 </Tooltip>
                            </Radio.Button>
                            <Radio.Button value="HotelName">{t("hotel-name")}</Radio.Button>
                            <Radio.Button value="LowPrice">{t("lowest-price")}</Radio.Button>
                            <Radio.Button value="TopRate">{t("highest-guest-rating")}</Radio.Button>
                            <Radio.Button value="MostStar">{t("highest-star-rating")}</Radio.Button>
                        </Radio.Group>
                    </div>
                }
            </>
        )
    }
}

SortHotelList.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SortHotelList.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(SortHotelList)
