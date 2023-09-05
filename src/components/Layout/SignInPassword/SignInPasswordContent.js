import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withTranslation } from '../../../../i18n'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'

const SignInPasswordContentForm = dynamic(() => import('./SignInPasswordContentForm'))

class SignInPasswordContent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { t } = this.props;

        return (
            <>
                <div className={styles.modalContentSignIn}>
                    <SignInPasswordContentForm />
                </div>
            </>
        )
    }
}

SignInPasswordContent.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SignInPasswordContent.propTypes = {
    t: PropTypes.func.isRequired,
}

export default (withTranslation('common'))(connect(null, null)(SignInPasswordContent))
