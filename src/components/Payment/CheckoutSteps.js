import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../i18n'
import { Steps } from 'antd'

import styles from '../../styles/Flight.module.css'

const { Step } = Steps

class CheckoutSteps extends React.Component {
  render() {
    const { t } = this.props
    return (
      <div className={styles.checkoutSteps}>
        <Steps current={1}>
          <Step title={t('bank-page')} />
          <Step title={t('confirm-pay')} />
          <Step title={t('complete-buying')} />
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
