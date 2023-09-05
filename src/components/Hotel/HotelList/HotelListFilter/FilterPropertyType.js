import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "next/router"
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Checkbox, Row ,Col ,Skeleton } from 'antd'

class FilterPropertyType extends React.Component {
    
    state={
        checkboxValue : [],
        showClearFilterBtn:false
    }
    componentDidMount(){
        const path = this.props.router.asPath;
        if (path.includes('type-')){
            const val = path.split('type-')[1].split('/')[0].split(",").map(item => Number(item));
            this.setState({
                checkboxValue:val,
                showClearFilterBtn:true
            });
            this.props.handleFilter(val);
        } 
    }
    onChange = value =>{
        this.setState({checkboxValue:value});
        this.props.handleFilter(value);
        if (value.length > 0){
            this.setState({showClearFilterBtn:true});
        }else{
            this.setState({showClearFilterBtn:false});
        }        
    }
    clearFilter = () => {
        this.setState({checkboxValue:[]});
        this.props.handleFilter([]);  
        this.setState({showClearFilterBtn:false});
    }

    render() {
        const { t } = this.props;
        const options = this.props.typesList.map(item =>{return({label:<><span className="option-filter">{item.name}</span> <span className="pull-end counter-filiter">({item.number})</span></> , value: item.HotelTypeId})} );
        return (
            <>
                {
                    this.props.loading?
                    <div className="filter-item">
                        <div className="filter-lable clearfix">
                            <Skeleton.Button style={{ width: 100, height: 15 }} active size="small" />
                        </div>
                        <Row style={{ lineHeight: 2 }}>
                            <Col flex="auto">
                                <Checkbox disabled>
                                    <Skeleton.Button style={{ width: 100, height: 15, margin: 5 }} active size="small" />
                                </Checkbox>
                            </Col>
                            <Col flex="auto">
                                <Checkbox disabled>
                                    <Skeleton.Button style={{ width: 100, height: 15, margin: 5 }} active size="small" />
                                </Checkbox>
                            </Col>
                            <Col flex="auto">
                                <Checkbox disabled>
                                    <Skeleton.Button style={{ width: 100, height: 15, margin: 5 }} active size="small" />
                                </Checkbox>
                            </Col>
                            <Col flex="auto">
                                <Checkbox disabled>
                                    <Skeleton.Button style={{ width: 100, height: 15, margin: 5 }} active size="small" />
                                </Checkbox>
                            </Col>
                        </Row>
                    </div>
                    :
                    <div className="filter-item">
                        <div className="filter-lable clearfix">
                            <label className="pull-start"> {t("property-type")}</label>
                            {this.state.showClearFilterBtn && <button type="button" disabled={this.props.loading} className="pull-end filter-reset-btn" onClick={this.clearFilter}>{t("reset-filter")}</button>}
                        </div>
                        <Checkbox.Group
                            className={`vertical-checkbox-group ${process.env.THEME_NAME === "TRAVELO" && "vertical-checkbox-group-travelo"}`}
                            value={this.state.checkboxValue}
                            options={options}
                            onChange={e=>{this.onChange(e)}}
                            />
                    </div>
                }
            </>
        )
    }
}

FilterPropertyType.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterPropertyType.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withRouter(withTranslation('common')(FilterPropertyType))
