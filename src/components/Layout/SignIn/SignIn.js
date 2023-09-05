import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd';
import { Link, i18n, withTranslation } from '../../../../i18n'
import dynamic from 'next/dynamic'

import styles from '../../../styles/Home.module.css'

const SignInContentForm = dynamic(() => import('./SignInContentForm'))

class SignIn extends React.Component {

    changeStatus = () =>{
        this.props.setModalCreateAccount(true)
    }

    render() {
        const { t } = this.props;
        return (
            <>
                <Button
                type="secondary"
                className={`${process.env.THEME_NAME === "TRAVELO" ? "link-style-btn margin-start-30":"margin-start-10"}`}
                onClick={() => this.props.setModalSignIn(true)}
                >{t('sign-in')}</Button>
                <Modal
                    // title={t('sign-in')}
                    title={
                        <div className={styles.modalCreateAccountLink}>
                            <Link as="/signin" href="/signin">
                                <a>{t("sign-in-page")}</a>
                            </Link>
                            <div className={styles.modalCreateAccountTitle}>
                                <h6>{t('sign-in-h6')}</h6>
                                {/* <span>{t('sign-in-desc')}</span> */}
                                <ul>
                                    <li>{t('sign-in-desc-list-1')}</li>
                                    <li>{t('sign-in-desc-list-2')}</li>
                                    <li>{t('sign-in-desc-list-3')}</li>
                                    <li>{t('sign-in-desc-list-4')}</li>
                                    <li>{t('sign-in-desc-list-5')}</li>
                                    <li>{t('sign-in-desc-list-6')}</li>
                                </ul>
                            </div>
                        </div>
                    }
                    className={`${styles.modalSignIn} ${process.env.THEME_NAME === "TRAVELO" && styles.modalSignInTravelo}`}
                    open={this.props.modalSignIn}
                    onOk={() => this.props.setModalSignIn(false)}
                    onCancel={() => this.props.setModalSignIn(false)}
                    footer={null}
                    style={{'height': '100vh'}}
                    >
                    <SignInContentForm changeTab={true} changeStatus={this.changeStatus} />
                </Modal>
            </>
        )
    }
}

SignIn.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
SignIn.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(SignIn)
