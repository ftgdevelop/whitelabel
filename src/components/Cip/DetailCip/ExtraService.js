import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Button ,Card} from 'antd';

import styles from '../../../styles/Cip.module.css'
import { PlusOutlined, MinusOutlined, CheckOutlined } from '@ant-design/icons';

const ExtraServices = props => {
    const { selectedServicesArray,updateSelectedServices,addedExtraService } = props;
    
    function numberWithCommas(x) {
        if (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            return "0";
        }
    }

    if (!selectedServicesArray || selectedServicesArray.length === 0) {
        return null;
    }
    
    return (

        <div className={`${styles.serviceCipList} ${process.env.THEME_NAME === "TRAVELO" && styles.serviceCipListTravelo}`} id="extraServices">
            <div className={styles.subject}>
                <h3 className='margin-bottom-30'>انتخاب سرویس های مازاد</h3>
            </div>
            {selectedServicesArray.sort( (a,b)=> b.id - a.id ).map(serviceItem => <Card key={serviceItem.id} className="margin-bottom-15 styled-card">
                <div className={styles.cipExtraServiceItemCard}>
                    <div className={styles.cipExtraServiceItemCardMain}>
                        {serviceItem.picture.path && <img src={serviceItem.picture.path} alt={serviceItem.picture.altAttribute} title={serviceItem.picture.titleAttribute} />}
                        <div>
                            <h5 className='normal-title font-inherit'>{serviceItem.name}</h5>
                            <p>{serviceItem.description}</p>
                        </div>
                        {(serviceItem.type === "Conference" || serviceItem.type === "MeetingRoom") && <div>
                            {[
                                {label:"تعداد میان وعده",property:"extraCount"},
                                {label:"تعداد ساعت اضافه",property:"hourCount"}
                            ].map(countItem => <div key={countItem.property} className={`margin-end-30 ${styles.addRemoveBoxItem}`}>
                                <label className={`margin-end-10 ${styles.itemLabel}`}>{countItem.label}</label>

                                <button
                                    type="button"
                                    onClick = {() => updateSelectedServices(serviceItem.id,countItem.property,"inc")}
                                    disabled={(addedExtraService.includes(serviceItem.id))}
                                    >
                                    <PlusOutlined />
                                </button>
                                <input
                                    type="text"
                                    readOnly
                                    value = {serviceItem[countItem.property] || 0}
                                />
                                <button
                                    type="button"
                                    onClick = {() => updateSelectedServices(serviceItem.id,countItem.property,"dec")}
                                    disabled={(addedExtraService.includes(serviceItem.id))}
                                    >
                                    <MinusOutlined />
                                </button>                            

                            </div>)}
                        </div>}

                        {serviceItem.type === "Pet" && <div className={`margin-end-30 ${styles.addRemoveBoxItem}`}>
                            <button
                                type="button"
                                onClick = {() => updateSelectedServices(serviceItem.id,"count","inc")}
                                disabled={(addedExtraService.includes(serviceItem.id))}
                                >
                                <PlusOutlined />
                            </button>
                            <input
                                type="text"
                                readOnly
                                value = {serviceItem.count || 0}
                            />
                            <button
                                type="button"
                                onClick = {() => updateSelectedServices(serviceItem.id,"count","dec")}
                                disabled={(addedExtraService.includes(serviceItem.id))}
                                >
                                <MinusOutlined />
                            </button>                            

                        </div>}
                    </div>
                    <div className={styles.cipExtraServiceItemCardFooter}>
                        <b>{numberWithCommas(
                            (serviceItem.salePrice * (serviceItem.type === "Pet" ? serviceItem.count : 1))
                            + 
                            ((serviceItem.type === "Conference" || serviceItem.type === "MeetingRoom" ) ? (serviceItem.extraCount * serviceItem.extraSalePrice + serviceItem.hourCount * serviceItem.hourSalePrice) : 0)
                        )} ریال</b>
                        <Button 
                            htmlType='button' 
                            size='small' 
                            className={`button blue-btn inline-btn margin-top-5 ${styles.addExtraSerrviceBtn}`}
                            onClick={() => props.updateAddedExtraService(serviceItem.id)}
                            disabled={addedExtraService.includes(serviceItem.id)}
                        >
                            {(addedExtraService.includes(serviceItem.id)) ?
                            <>
                                <CheckOutlined />
                                <span>انتخاب شد</span>
                            </>
                            : <span>انتخاب کن</span>}
                        </Button>

                    </div>
                </div>
            </Card>)}
        </div>
    )
}

ExtraServices.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
ExtraServices.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ExtraServices)
