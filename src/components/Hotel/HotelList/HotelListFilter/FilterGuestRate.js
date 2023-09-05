import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "next/router"
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Checkbox, Skeleton, Row, Col } from 'antd'

class FilterGuestRate extends React.Component {
    state={
        checkboxValue : [],
        showClearFilterBtn:false
    }
    componentDidMount(){
        const path = this.props.router.asPath;
        if (path.includes('guestrate-')){
            const val = path.split('guestrate-')[1].split('/')[0].split(",");
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
        
        let guestRatingFilterInfo =this.props.guestRateFilterInfo;
        const options = [
        { label:<><span className="option-filter">90+ {t("excellent")}</span> <span className="pull-end counter-filiter">{guestRatingFilterInfo ? "("+guestRatingFilterInfo.excellent+")":<Skeleton.Button style={{ width: 30, height: 15 }}/>}</span></>, value: `90-100` },
            { label:<><span className="option-filter">80+ {t("very-good")}</span> <span className="pull-end counter-filiter">{guestRatingFilterInfo ? "("+guestRatingFilterInfo.veryGood+")":<Skeleton.Button style={{ width: 30, height: 15 }}/>}</span></>, value: `80-89` },
            { label:<><span className="option-filter">70+ {t("good")}</span> <span className="pull-end counter-filiter">{guestRatingFilterInfo ? "("+guestRatingFilterInfo.good+")":<Skeleton.Button style={{ width: 30, height: 15 }}/>}</span></>, value: `70-79` },
            { label:<><span className="option-filter">50+ {t("fair")}</span> <span className="pull-end counter-filiter">{guestRatingFilterInfo ? "("+guestRatingFilterInfo.fair+")":<Skeleton.Button style={{ width: 30, height: 15 }}/>}</span></>, value: `50-69` }
            // ,{ label:<><span className="option-filter">{t("bad")} (-50)</span> <span className="pull-end counter-filiter">{guestRatingFilterInfo ? "("+guestRatingFilterInfo.weak+")":<Skeleton.Button style={{ width: 30, height: 15 }}/>}</span></>, value: `0-49` }
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
                            <label className="pull-start">{t("guest-rating")} </label>
                            {this.state.showClearFilterBtn && <button disabled={this.props.loading} type="button" className="pull-end filter-reset-btn" onClick={this.clearFilter}>{t("reset-filter")}</button>}
                        </div>
                        <Checkbox.Group
                            disabled={this.props.loading}
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

FilterGuestRate.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterGuestRate.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withRouter(withTranslation('common')(FilterGuestRate))
