import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withTranslation } from '../../../../i18n'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'
import { ArrowRightIcon } from '../../../components/UI/Icons'

const ForgetForm = dynamic(() => import('./ForgetForm'))

class Forget extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { t } = this.props;
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
                            <div>{t("forget-password")}</div>
                            <span>{t("choose-on-way")}</span>
                        </div>
                    </div>
                    
                    <ForgetForm/>

                    <div className={styles.footForget}>
                        {t("if-forget-phone")}
                        <Link as="/contact" href="/contact">
                            <a target="blank"> {t("contact")} </a>
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}

Forget.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Forget.propTypes = {
    t: PropTypes.func.isRequired,
}

export default (withTranslation('common'))(connect(null, null)(Forget))
