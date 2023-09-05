import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../../i18n'
import { Radio, Row, Col } from 'antd'

import styles from '../../../../styles/Hotel.module.css'
import { RemoveOutlineIcon } from '../../../UI/Icons'

const ViewMapSort =  props => {
    const { t } = props;

    return (
        <div className={styles.contentSort}>
            <div className={styles.subjectSort}>
                <span>مرتب سازی</span>
                <div onClick={props.onClickShowHotel}>
                    <RemoveOutlineIcon/>
                </div>
            </div>
            <div className={styles.hotelListViewSort}>
                <Radio.Group defaultValue={['01']}>
                    <Row style={{ lineHeight: "32px" }}>
                        <Col xs={24}>
                            <Radio value="01">اولویت</Radio>
                        </Col>
                        <Col xs={24}>
                            <Radio value="02">نام هتل</Radio>
                        </Col>
                        <Col xs={24}>
                            <Radio value="03">کمترین قیمت</Radio>
                        </Col>
                        <Col xs={24}>
                            <Radio value="04">بالاترین امتیاز مهمان ها</Radio>
                        </Col>
                        <Col xs={24}>
                            <Radio value="05">بیشترین ستاره</Radio>
                        </Col>
                    </Row>
                </Radio.Group>
            </div>
            <div className={styles.footerSort}>
                <button className={styles.sortRemove}>حذف فیلتر</button>
                <button className={styles.sortApply}>اعمال تغییرات</button>
            </div>
        </div>
    )
}

ViewMapSort.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
ViewMapSort.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ViewMapSort)