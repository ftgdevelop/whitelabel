import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import { Link, withTranslation } from '../../../../i18n'
import dynamic from 'next/dynamic'

import * as actions from '../../../actions' 
import styles from '../../../styles/Home.module.css'

const CreateAccountContentForm = dynamic(() => import('./CreateAccountContentForm'))

class CreateAccount extends React.Component {

    changeStatus = () =>{
        
        this.props.setModalSignIn(true)
    }

    render() {
        const { t } = this.props;
        return (
            <>
                <Button
                type="secondary"
                className={`${process.env.THEME_NAME === "TRAVELO"?"link-style-btn margin-start-30":"margin-start-10"}`}
                onClick={() => this.props.setModalCreateAccount(true)}
                >{t('create-account')}</Button>
                <Modal
                    title={
                        <div className={styles.modalCreateAccountLink}>
                            <Link as="/register" href="/register">
                                <a>{t('register-page')}</a>
                            </Link>
                            <div className={styles.modalCreateAccountTitle}>
                                <h6>{t("why-register")}</h6>
                                <span>{t('why-register-desc')}</span>
                            </div>
                        </div>
                    }
                    className={styles.modalCreateAccount}
                    open={this.props.modalCreateAccount}
                    onOk={() => this.props.setModalCreateAccount(false)}
                    onCancel={() => this.props.setModalCreateAccount(false)}
                    footer={null}
                    style={{'height': '100vh'}}
                    >
                        <CreateAccountContentForm changeTab={true} changeStatus={this.changeStatus} />
                </Modal>
            </>
        )
    }
}

// const mapState = (state) => {
    
// }

CreateAccount.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
CreateAccount.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default (withTranslation('common'))(connect(null, { actions })(CreateAccount))
