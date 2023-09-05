import PropTypes from 'prop-types'
import { withTranslation } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import HotelForeignVoucher from '../../components/Hotel/Voucher/HotelForeignVoucher'

const VoucherEnPage = ({ t }) => (
  <div>
        <Head>
            <title>ووچر هتل خارجی</title>
        </Head>
        
        <HotelForeignVoucher/>

  </div>
)

VoucherEnPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

VoucherEnPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(VoucherEnPage)