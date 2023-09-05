import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Router} from  '../../i18n';
export default function CheckAuth(ComposedComponent) {
    class IsAuth extends React.Component {
      
        
        async componentWillMount() {
            if(this.props.isAuthenticated) {
                await Router.push('/myaccount/profile');
            }
        }
        
        async componentWillUpdate(nextProps) {
            if(nextProps.isAuthenticated) {
                await Router.push('/myaccount/profile');
            }
        }

        render() {
            return (
                this.props.isAuthenticated? '':
               <ComposedComponent {...this.props} />
            )
        }
    }

    IsAuth.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps)(IsAuth);
}