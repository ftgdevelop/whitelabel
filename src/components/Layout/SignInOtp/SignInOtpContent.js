import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'

const SignInOtpContentForm = dynamic(() => import('./SignInOtpContentForm'))

class SignInOtpContent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { t } = this.props;

        return (
            <>
                <div className={styles.modalContentSignIn}>
                    <SignInOtpContentForm changeStatus={this.props.changeStatus}/>
                </div>
            </>
        )
    }
}

SignInOtpContent.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SignInOtpContent.propTypes = {
    t: PropTypes.func.isRequired,
}

export default (withTranslation('common'))(connect(null, null)(SignInOtpContent))
