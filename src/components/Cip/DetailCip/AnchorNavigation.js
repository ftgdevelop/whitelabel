import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, i18n } from '../../../../i18n'
import { Anchor } from 'antd';

import styles from '../../../styles/Hotel.module.css'

const { Link } = Anchor;

class AnchorNavigation extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={styles.anchorNavigation}>
                <Anchor
                    affix={true}
                    targetOffset={90}
                    nostyle
                    className="ant-anchor-travelo">
                        <Link href="#anchorgalleryhotel" title={t("pictures")} />
                        {/* <Link href="#anchorservicetype" title="انتخاب نوع سرویس" /> */}
                        <Link href="#anchorflightinfo" title="اطلاعات سفر" />
                        <Link href="#anchorreservercip" title="مشخصات رزروگیرنده و مسافران" />
                        <Link href="#extraServices" title="سرویس های مازاد" />
                        <Link href="#anchoraboutairport" title="درباره فرودگاه" />
                        <Link href="#anchorfacilityairport" title="امکانات فرودگاه" />
                </Anchor>
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
