import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { i18n, withTranslation,Router } from '../../../i18n'

import { logout } from '../../actions/user/authActions'
import styles from '../../styles/Home.module.css'

class logoutAccount extends React.Component {

    constructor(props) {
        super(props)
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
        Router.push('/')
    }

    render() {        
        const { t } = this.props;

        return (
            <a className={styles.signOut} onClick={this.logout.bind(this)}>
                <span>{t('log-out')}</span>
            </a>
        )
    }
}

logoutAccount.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
logoutAccount.propTypes = {
    t: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default (withTranslation('common'))(connect(mapStateToProps, { logout })(logoutAccount))