import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Steps } from 'antd'

import styles from '../../../styles/Bus.module.css'

const { Step } = Steps;

class CheckoutSteps extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className={styles.checkoutSteps}>
                <Steps current={0}>
                    <Step title={t("completing-informations")} />
                    <Step title={t('accept-and-pay')} />
                    <Step title={t('completing-buying')} />
                </Steps>
            </div>
        )
    }
}

CheckoutSteps.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
CheckoutSteps.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(CheckoutSteps)
