import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, i18n } from '../../../../i18n'
import { Anchor } from 'antd'

import styles from '../../../styles/Hotel.module.css'

const { Link } = Anchor;

class AnchorNavigation extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={styles.anchorNavigation}>
                <div className={`${process.env.THEME_NAME === "TRAVELO" && styles.container}`}>
                    <Anchor
                        affix={true}
                        targetOffset={90}
                        nostyle
                        className="ant-anchor-travelo"
                        >
                        <Link href="#anchorgalleryhotel" title={t('pictures')} />
                        <Link href="#anchorroomchoices" title={t('room-reserve')} />
                        {(!this.props.hotelDetails) || (this.props.hotelDetails && this.props.hotelDetails.Facilities && this.props.hotelDetails.Facilities.length > 0)
                            && <Link href="#anchorhotelamenities" title={t('hotel-facilities')} />}
                        {this.props.hotelDetails && (this.props.hotelDetails.Policies.length > 0 || this.props.hotelAccommodation &&
                            (this.props.hotelAccommodation.instruction != null || this.props.hotelAccommodation.mendatoryFee != null))
                            && <Link href="#anchorterms" title={t('terms')} />}
                        <Link href="#anchoraboutthehotel" title={t('about-hotel')} />
                        {this.props.hotelDetails && (this.props.attractionsData && this.props.attractionsData.length > 0)
                            && <Link href="#anchorattractions" title={t('attraction')} />}
                        <Link href="#anchorreviews" title={t('suggestion')} />
                        <Link href="#anchorsimilarhotels" title={t('similar-hotels')} />
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
  
export default withTranslation('common')(AnchorNavigation)
