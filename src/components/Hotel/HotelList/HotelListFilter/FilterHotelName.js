import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from "next/router"
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Input, Skeleton } from 'antd'

import styles from '../../../../styles/Hotel.module.css';

const { Search } = Input;
class FilterHotelName extends React.Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.textInput = React.createRef();
    }
    state={
        inputValue:"",
        showClearFilterBtn:false
    }
    componentDidMount(){
        const path = this.props.router.asPath;
        if (path.includes('name-')){
            const nameVal = decodeURI(path.split('name-')[1].split('/')[0]);
            this.setState({
                inputValue:nameVal,
                showClearFilterBtn:true
            });
            this.props.handleFilter(nameVal);
        } 
    }
    changeInput = (val)=>{
        this.setState({inputValue:val})
    }
    clearFilter = ()=>{
        this.setState({inputValue:""});
        this.props.handleFilter("");
        this.setState({showClearFilterBtn:false});
    }
    render() {
        const { t } = this.props;
        return (
            <>
                {
                    this.props.loading?
                    <div className="filter-item">
                        <div className="filter-lable clearfix">
                            <Skeleton.Button style={{ width: 100, height: 15 }} active size="small" />
                        </div>
                        <Skeleton.Button active size="large" className={styles.skeletonNameHotelFilter} />
                    </div>
                    :
                    <div className={`filter-item ${process.env.THEME_NAME === "TRAVELO" && "filter-item-hotel-name-travelo"}`}>
                        <div className="filter-lable clearfix">
                            <label className="pull-start">{t("hotel-name")}</label>
                            {
                                this.state.showClearFilterBtn &&
                            <button type="button" className="pull-end filter-reset-btn" disabled={this.props.loading} onClick={this.clearFilter}>{t("reset-filter")}</button>
                            }
                        </div>
                        <Search 
                        placeholder={t("search-hotel-name")}  
                        enterButton 
                        disabled={this.props.loading}
                        value={this.state.inputValue} 
                        onChange={(e)=>{this.changeInput(e.target.value)}} 
                        onSearch={e=>{
                            this.props.handleFilter(e);
                            if(e){
                                this.setState({showClearFilterBtn:true});
                            }else{
                                this.setState({showClearFilterBtn:false});
                            }
                            }
                        }
                        />
                    </div>
                }
            </>
        )
    }
}

FilterHotelName.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FilterHotelName.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withRouter(withTranslation('common')(FilterHotelName));
