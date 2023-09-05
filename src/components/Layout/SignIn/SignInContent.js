import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'

const SignInContentForm = dynamic(() => import('./SignInContentForm'))

class SignInContent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { t } = this.props;

        return (
            <>
                <div className={styles.modalContentSignIn}>
                    <SignInContentForm />
                </div>
            </>
        )
    }
}

SignInContent.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SignInContent.propTypes = {
    t: PropTypes.func.isRequired,
}

export default (withTranslation('common'))(connect(null, null)(SignInContent))
