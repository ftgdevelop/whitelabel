import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Link } from '../../../../../i18n'
import { Checkbox, Skeleton, Row, Col } from 'antd'

import styles from '../../../../styles/Hotel.module.css'

class FilterBoards extends React.Component {
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
        let options=[];
        if(this.props.boardsList){
            for(let i=0 ; i<this.props.boardsList.length ; i++){
                let newOption ={label:<><span className="option-filter">{this.props.boardsList[i].name}</span> <span className="pull-end counter-filiter">({this.props.boardsList[i].number})</span></> , value: this.props.boardsList[i].code}
                options.push(newOption);
            }
        }
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
                        </Row>
                    </div>
                    :
                    <div className="filter-item">
                        <div className="filter-lable clearfix">
                            <label className="pull-start">{t("meals")}</label>
                            {this.state.showClearFilterBtn && <button type="button" disabled={this.props.loading} className="pull-end filter-reset-btn" onClick={this.clearFilter}>{t("reset-filter")}</button>}
                        </div>
                        <Checkbox.Group disabled={this.props.loading} className="vertical-checkbox-group" value={this.state.checkboxValue} options={options} onChange={e=>{this.onChange(e)}} />
                    </div>
                }
            </>    
        )
    }
}

FilterBoards.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterBoards.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FilterBoards)
