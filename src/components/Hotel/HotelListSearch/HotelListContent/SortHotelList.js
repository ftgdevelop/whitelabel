import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Radio } from 'antd'

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
                        <Radio.Group onChange={e=>{this.props.sortHandler(e.target.value)}}>
                            {/* <Radio.Button value="Best">محبوب ترین</Radio.Button> */}
                            <Radio.Button value="HotelName">{t("hotel-name")}</Radio.Button>
                            <Radio.Button value="LowPrice">{t("lowest-price")}</Radio.Button>
                            {/* <Radio.Button value="MostRating">بیشترین امتیاز کاربران</Radio.Button> */}
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
