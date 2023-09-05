import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import parse from 'html-react-parser';

import styles from '../../../styles/Cip.module.css'
import { Skeleton } from 'antd'

const AboutCip = props =>{
    const { t } = props;
    const [projectName,setProjectName] = useState();
    const [projectAddress,setProjectAddress] = useState();

    useEffect(()=>{
        setProjectAddress(window.location.origin);
        let project = window.localStorage.whiteLabelProjectName;
        setProjectName(project);
    },[]);

    return (
        <div className={styles.aboutAirportCip} id="anchoraboutairport">
            <h3>درباره فرودگاه</h3>
            <div className={styles.content}>
                {
                    props.cipAirPortDetail?
                    props.cipAirPortDetail.description ? parse(props.cipAirPortDetail.description.replace(/سفرانه/g,projectName).replace(/https:\/\/safaraneh.com\/fa\/hotels\/%d8%b1%d8%b2%d8%b1%d9%88-%d9%87%d8%aa%d9%84/g,"/").replace(/http:\/\/www.safaraneh.com/g,projectAddress).replace(/https:\/\/safaraneh.com/g,projectAddress)):null
                    //parse(props.cipAirPortDetail.description)
                    :
                    <Skeleton />
                }
            </div>
        </div>
    )
}

AboutCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AboutCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(AboutCip)
