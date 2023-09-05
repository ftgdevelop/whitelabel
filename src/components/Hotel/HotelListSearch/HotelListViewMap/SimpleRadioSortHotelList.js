
import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Radio, Tooltip,Space } from 'antd'
import {InfoCircleOutlined} from '@ant-design/icons'

import styles from '../../../../styles/Hotel.module.css'
import { SortIcon } from '../../../UI/Icons'
class SimpleRadioSortHotelList extends React.Component {
    
    render() {
        const { t } = this.props;
        return (
            <>
                {
                    this.props.loading ? 
                        null 
                    :
                    <div>
                        <span className={styles.sortHotelListText}>{t("sort-by")}: </span>
                        <span className={`padding-end-10 ${styles.sortHotelListText}`}><SortIcon/></span>
                        <Radio.Group onChange={e=>{this.props.sortHandler(e.target.value)}} defaultValue={this.props.sortedBy}>
                            <Space direction="vertical">
                                <Radio value="LowPrice">{t("lowest-price")}</Radio>
                                <Radio value="HotelName">{t("hotel-name")}</Radio>
                                <Radio value="MostStar">{t("highest-star-rating")}</Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                }
            </>
        )
    }
}

SimpleRadioSortHotelList.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SimpleRadioSortHotelList.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(SimpleRadioSortHotelList)
