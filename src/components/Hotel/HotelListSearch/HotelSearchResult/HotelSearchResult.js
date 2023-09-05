import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import Progress from '../../../UI/Progress/Progress';

class HotelSearchResult extends React.Component {
    
    render() {
        const { t } = this.props;
        return (    
            <Progress 
            searchedLocation={this.props.searchedLocation}
            percent={this.props.progressWidth}
            description={this.props.progressdescription}
            total = {this.props.total}
            />
        )
    }

}

HotelSearchResult.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
HotelSearchResult.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(HotelSearchResult)
