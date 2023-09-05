import React from 'react';
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Row, Col, Button, Spin } from 'antd';

import { ArrowRightIcon } from '../../UI/Icons'
import styles from '../../../styles/Cip.module.css'

const SubmitDetailCip = props => {
    const {
        t,
        cipAirPortDetail,
        submitLoading
    } = props;
    return (
        <div className={styles.submitDetails}>
            {cipAirPortDetail ? <>
                <button
                    className={styles.submitBtn}
                    disabled={submitLoading ? "disabled" : null}>
                    {submitLoading ? "در حال بارگذاری" : "ادامه فرآیند خرید"}
                    {submitLoading?<Spin style={{ position: "absolute", left: "15px" }} />:<span style={{
                        position: "absolute",
                        left: "15px",
                        top: "16px"
                    }}></span>}
                </button>
            </>
            : <Spin />}
        </div>
    )
}

SubmitDetailCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

SubmitDetailCip.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(SubmitDetailCip)