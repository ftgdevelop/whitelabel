import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withTranslation } from '../../../../i18n'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'
import { ArrowRightIcon } from '../../UI/Icons'

const ForgetForm = dynamic(() => import('./ResetForm'))

const Reset = (props) =>{

    const { code, userId, t } = props;

    return (
        <>
            <div className={styles.modalContentSignIn}>
                <div className={styles.Forget}>
                    <Link as="/signin" href="/signin">
                        <a>
                            <ArrowRightIcon/>
                            {t("return-home-page")}
                        </a>
                    </Link>

                    <div className={styles.subjectForget}>
                        <div>{t("password-recovery")}</div>
                        <span>{t("enter-new-password")}</span>
                    </div>
                </div>
                
                <ForgetForm
                    code={code}
                    userId={userId}
                />
            </div>
        </>
    )
}

Reset.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Reset.propTypes = {
    t: PropTypes.func.isRequired,
}

export default (withTranslation('common'))(connect(null, null)(Reset))
