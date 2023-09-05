import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Steps } from 'antd'
import styles from '../../../styles/Flight.module.css'
const { Step } = Steps;
class DetailCipSteps extends React.Component {
   
   render() {
      const { t } = this.props;
      return (
         <div className={styles.checkoutSteps} style={{paddingTop:0, paddingBottom:50}}>
            <Steps current={0}>
               <Step title="تکمیل اطلاعات" />
               <Step title={t('bank-page')} />
               <Step title={t('confirm-pay')} />
               <Step title={t('complete-buying')} />
            </Steps>
         </div>
      )
   }
}
DetailCipSteps.getInitialProps = async () => ({
   namespacesRequired: ['common'],
})
DetailCipSteps.propTypes = {
   t: PropTypes.func.isRequired,
}
export default withTranslation('common')(DetailCipSteps)