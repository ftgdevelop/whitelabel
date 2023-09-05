import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Link } from '../../../../i18n'
import { Steps } from 'antd'

import styles from '../../../styles/Home.module.css'

const { Step } = Steps;

class BookingSteps extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={styles.bookingSteps}>
                <Steps current={3}>
                    <Step title={t("completing-informaion")} />
                    <Step title={t("confirm-pay")} />
                    <Step title={t("completing-pay")} />
                </Steps>
            </div>
        )
    }
}

BookingSteps.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BookingSteps.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BookingSteps)
