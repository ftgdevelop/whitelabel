import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setCurrentUser } from '../actions/user/authActions'
import { Router } from '../../i18n'

export default function Auth(ComposedComponent) {
  class RequireAuth extends React.Component {
    // componentDidMount() {
    //   if (!this.props.isAuthenticated) {
    //     Router.push("/signin");
    //   }
    // }
    componentWillMount = async () => {
      if (!this.props.isAuthenticated && !this.props.loadingGetUser) {
        Router.push('/signin')
      }
    }
    componentDidUpdate = () => {
      if (!this.props.isAuthenticated && !this.props.loadingGetUser) {
        Router.push('/signin')
      }
    }

    render() {
      return this.props.isAuthenticated ? (
        <ComposedComponent {...this.props} />
      ) : (
        ''
      )
    }
  }

  RequireAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      loadingGetUser: state.auth.loadingGetUser,
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (params) => dispatch(setCurrentUser(params)),
  })

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth)
}
