import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Checkbox, Spin } from 'antd'

class FilterRegion extends React.Component {
    state={
        checkboxValue : []
    }
    onChange = value =>{
        this.setState({checkboxValue:value});
        this.props.handleFilter(value);
    }
    clearFilter = () => {
        this.setState({checkboxValue:[]});
        this.props.handleFilter([]);  
    }

    render() {
        const { t } = this.props;
        let options=[];
        for(let i=0 ; i<this.props.regionList.length ; i++){
            let newOption ={label:this.props.regionList[i].name , value: this.props.regionList[i].id}
            options.push(newOption);
        }
        return (
            <div className="filter-item">
                <div className="filter-lable clearfix">
                    <label className="pull-start">{t("district")}</label>
                    <button type="button" disabled={this.props.loading} className="pull-end filter-reset-btn" onClick={this.clearFilter}>{t("reset-filter")}</button>
                </div>
                {this.props.loading?
                <Spin />:
                <Checkbox.Group className="vertical-checkbox-group" value={this.state.checkboxValue} options={options} onChange={e=>{this.onChange(e)}} />
                }
            </div>
    
        )
    }
}

FilterRegion.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterRegion.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FilterRegion)
