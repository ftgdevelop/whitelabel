import PropTypes from 'prop-types'
import { withTranslation } from '../../../i18n'
import Layout from '../../components/Layout/Layout'
import Head from 'next/head'
import HotelVoucher from '../../components/Hotel/Voucher/HotelVoucher'

const VoucherPage = ({ t }) => (
  <div>
        <Head>
            <title>ووچر هتل داخلی</title>
        </Head>
        
        <HotelVoucher/>

  </div>
)

VoucherPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

VoucherPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(VoucherPage)