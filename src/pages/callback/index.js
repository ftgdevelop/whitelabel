import React,{ useEffect } from "react";
import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../i18n'
import Callback from '../../components/Callback/Callback'

const callbackPage = ({ t }) =>{ 
  return <Callback />
}

callbackPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

callbackPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(callbackPage)