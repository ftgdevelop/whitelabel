import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { connect } from 'react-redux'
import { userSignupRequest } from '../../../actions/user/signupActions'
import dynamic from 'next/dynamic'

const CreateAccountContentForm = dynamic(() => import('./CreateAccountContentForm'))

class CreateAccountContent extends React.Component {
    render() {
        const { t, userSignupRequest } = this.props;
        return (
            <>
                <CreateAccountContentForm userSignupRequest={userSignupRequest} />
            </>
        )
    }
}


CreateAccountContent.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
CreateAccountContent.propTypes = {
    t: PropTypes.func.isRequired,
    userSignupRequest: PropTypes.func.isRequired,
}

export default (withTranslation('common'))(connect( null, {userSignupRequest} )(CreateAccountContent))
