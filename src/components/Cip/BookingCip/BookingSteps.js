import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Steps } from 'antd'
import styles from '../../../styles/Flight.module.css'
const { Step } = Steps
class BookingSteps extends React.Component {
  render() {
    const { t } = this.props
    return (
      <div className={styles.checkoutSteps}>
        <Steps current={2}>
          <Step title={t('bank-page')} />
          <Step title={t('confirm-pay')} />
          <Step title={t('complete-buying')} />
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
