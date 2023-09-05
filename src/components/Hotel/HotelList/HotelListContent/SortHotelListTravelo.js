import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Select, Row, Col } from 'antd'
import styles from '../../../../styles/Hotel.module.css'

const { Option } = Select;
class SortHotelList extends React.Component {

    onChange = value => {
        this.props.sortHandler(value)
    }
    
    render() {
        const { t } = this.props;
        return (
            <>
                {
                    this.props.loading ? 
                        null 
                    :
                    <div
                        className={`${styles.sortHotelList} ${process.env.THEME_NAME === "TRAVELO" && "sort-hotel-list-travelo"}`}
                        >
                        <Row>
                            <Col xs={0} sm={0} md={0} lg={16} xl={16}>
                                {this.props.total && <>
                                    <div className="ui-progress-text">
                                    <strong className="margin-right-small margin-left-small"> {this.props.total} </strong> {t('hotel-in')}<strong className="margin-right-small margin-left-small"> 
                                    {this.props.searchedLocation?this.props.searchedLocation:<span className="small-loading" />}
                                    </strong> {t('found')} </div>
                                    <div className="ui-progress-text">{this.props.description}</div></>}
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                <Select
                                    defaultValue={{ value: 'Priority' }}
                                    onChange={this.onChange}
                                    defaultValue={this.props.sortedBy}
                                    >
                                    <Option value="Priority">{t("most-popular")}</Option>
                                    <Option value="HotelName">{t("hotel-name")}</Option>
                                    <Option value="LowPrice">{t("lowest-price")}</Option>
                                    <Option value="TopRate">{t("highest-guest-rating")}</Option>
                                    <Option value="MostStar">{t("highest-star-rating")}</Option>
                                </Select>  
                            </Col>
                        </Row>
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
