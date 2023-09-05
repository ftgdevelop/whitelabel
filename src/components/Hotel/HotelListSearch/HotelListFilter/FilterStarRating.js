import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Checkbox, Skeleton, Row, Col } from 'antd'

class FilterStarRating extends React.Component {
    state={
        checkboxValue : [],
        showClearFilterBtn:false
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
        let ratingFilterInfo =this.props.ratingFilterInfo;
        const options = [
            { label:<><span className="option-filter">{t("5-stars")}</span> <span className="pull-end counter-filiter">{ratingFilterInfo ? "("+ratingFilterInfo.stars5+")":<Skeleton.Button style={{ width: 30, height: 15 }}/>}</span></>, value: 5 },
            { label:<><span className="option-filter">{t("4-stars")}</span> <span className="pull-end counter-filiter">{ratingFilterInfo ? "("+ratingFilterInfo.stars4+")":<Skeleton.Button style={{ width: 30, height: 15 }}/>}</span></>, value: 4 },
            { label:<><span className="option-filter">{t("3-stars")}</span> <span className="pull-end counter-filiter">{ratingFilterInfo ? "("+ratingFilterInfo.stars3+")":<Skeleton.Button style={{ width: 30, height: 15 }}/>}</span></>, value: 3 },
            { label:<><span className="option-filter">{t("2-stars")}</span> <span className="pull-end counter-filiter">{ratingFilterInfo ? "("+ratingFilterInfo.stars2+")":<Skeleton.Button style={{ width: 30, height: 15 }}/>}</span></>, value: 2 },
            { label:<><span className="option-filter">{t("1-stars")}</span> <span className="pull-end counter-filiter">{ratingFilterInfo ? "("+ratingFilterInfo.stars1+")":<Skeleton.Button style={{ width: 30, height: 15 }}/>}</span></>, value: 1 },
            { label:<><span className="option-filter">{t("unrated")}</span> <span className="pull-end counter-filiter">{ratingFilterInfo ? "("+ratingFilterInfo.stars0+")":<Skeleton.Button style={{ width: 30, height: 15 }}/>}</span></>, value: 0 }
        ];
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
                            <label className="pull-start">{t("star-rating")}</label>
                            {this.state.showClearFilterBtn && <button disabled={this.props.loading} type="button" className="pull-end filter-reset-btn" onClick={this.clearFilter}>{t("reset-filter")} </button>}
                        </div>
                        <Checkbox.Group disabled={this.props.loading} className="vertical-checkbox-group" value={this.state.checkboxValue} options={options} onChange={e=>{this.onChange(e)}} />
                    </div>
                }  
            </>    
        )
    }
}

FilterStarRating.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterStarRating.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FilterStarRating)
