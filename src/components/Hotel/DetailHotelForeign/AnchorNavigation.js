import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withTranslation, i18n } from '../../../../i18n'
import { Anchor } from 'antd'

import styles from '../../../styles/Hotel.module.css'

const { Link } = Anchor;
class AnchorNavigation extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div
                className={styles.anchorNavigation}
                >
                <div
                    className={`ant-affix-travelo ${process.env.THEME_NAME === "TRAVELO" && styles.container}`}
                    >
                    <Anchor
                        affix={true}
                        targetOffset={90}
                        nostyle
                        className="ant-anchor-travelo"
                        >
                        <Link href="#anchorgalleryhotel" title={t('pictures')} />
                        <Link href="#anchorroomchoices" title={t('room-reserve')} />
                        { (!this.props.hotelDetails) || (this.props.hotelDetails?.features && this.props.hotelDetails.features.length>0) &&
                            <Link href="#anchorhotelamenities" title={t('hotel-facilities')} />}
                        {/*
                            {this.props.hotelDetails && (this.props.hotelDetails?.Policies.length > 0) &&
                                <Link href="#anchorterms" title={t('terms')} />
                        */}
                        <Link href="#anchoraboutthehotel" title={t('about-hotel')} />
                        {/* 
                            <Link href="#anchorattractions" title={t('attraction')} />
                            <Link href="#anchorreviews" title={t('suggestion')} />
                            <Link href="#anchorsimilarhotels" title={t('similar-hotels')} /> 
                        */}
                    </Anchor>
                </div>
            </div>
        )
    }
}

AnchorNavigation.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AnchorNavigation.propTypes = {
t: PropTypes.func.isRequired,
}

  
const mapStateToProp = (state) => {
    return {
      hotelDetails: state.hotel.foreignHotelDetail
    };
};

export default withTranslation('common')(connect(mapStateToProp)(AnchorNavigation))
