import React from 'react'
import {connect} from 'react-redux';
import {i18n, withTranslation, Router} from '../../../../i18n'
import {setNewPassword, loginUser} from '../../../actions/user/authActions';
import {Textbox} from 'react-inputs-validation';
import {notification} from 'antd';
import styles from '../../../styles/Home.module.css';
import dynamic from 'next/dynamic'

import style from "./reset-form-style.module.css";

const DotsLoading = dynamic(() => import('../../DotsLoading'))

const openNotification = (type, placement, msg) => {
    notification[type]({
        message: msg,
        description: "",
        placement,
        style: {
            color: "#fff",
            background: "rgba(0,0,0,0.8)",
        },
    });
};

let username = '';
let t ;
class ResetForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        t= props.t;
    }

    onSubmit = async e => {
        e.preventDefault();
        this.resetErrors();
        if (this.isFormValid()) {
            this.setState({isSubmitLoading: true});
            
            const response = await this.props.setNewPassword({
                userId: this.props.userId,
                code: encodeURIComponent(this.props.code),
                password: this.state.password
            });
            if (response.status === 200){
                username = response.data.result.userName
                this.onSuccessSubmit();
            }
            else this.onFailureSubmit(response && response.data ? response.data.error.message : null);
        }
    };

    resetErrors = () => this.setState({errorMessage: ""});

    isFormValid = () => {
        const {
            password,
            confirmPassword
        } = this.state;

        if (!password) {
            this.setState({errorMessage: t("password-error1")});
            return false;
        } else if (password.length < 6) {
            this.setState({errorMessage: t("password-error2")});
            return false;
        } else if (!confirmPassword) {
            this.setState({errorMessage: t("password-error3")});
            return false;
        } else if (password !== confirmPassword) {
            this.setState({errorMessage: t("password-error4")});
            return false;
        }
        return true;
    };

    onSuccessSubmit = () => {
        
        openNotification('success','bottomRight',t("recovery-success"))
        this.login();
        // setTimeout(() => {
        //     Router.push('/myaccount/profile');
        // }, 3000);
    };

    onFailureSubmit = (message = t("error-in-operation")) => {
        this.setState({
            errorMessage: message,
            isSubmitLoading: false
        });
    };

    login = async() => {
        
        const response = await this.props.login({
          emailOrPhoneNumber: username,
          password: this.state.password,
        });
        if (response.status == 200) return this.onSuccessLogin();
        else
        this.onFailureSubmit(
            response && response.data
              ? response.data.error.message
              : "عملیات با خطا مواجه شد"
        );
    }
    
    onSuccessLogin = () => {
        Router.push("/myaccount/profile");
    };

    render() {

        const {
            isSubmitLoading,
            errorMessage,
        } = this.state;


        return (
            <div className={style.reset-form}>
                <form onSubmit={!isSubmitLoading ? this.onSubmit : e => e.preventDefault()}>
                    <div
                        className={`${styles.inputStyle} ${process.env.THEME_NAME === "TRAVELO" && "input-style-travelo"}`}
                        >
                        <label>{t("new-password")}</label>
                        <Textbox
                            attributesInput={{
                                name: 'password',
                                type: 'password',
                            }}
                            validationOption={{
                                required: false
                            }}
                            onChange={password => {
                                this.setState({password});
                            }}
                            onBlur={() => {
                            }}
                        />
                    </div>
                    <div
                        className={`${styles.inputStyle} ${process.env.THEME_NAME === "TRAVELO" && "input-style-travelo"}`}
                        >
                        <label>{t("repeat-password")}</label>
                        <Textbox
                            attributesInput={{
                                name: 'confirm-password',
                                type: 'password',
                            }}
                            validationOption={{
                                required: false
                            }}
                            onChange={confirmPassword => {
                                this.setState({confirmPassword});
                            }}
                            onBlur={() => {
                            }}
                        />
                    </div>
                    <p className="reset-form__error">{errorMessage}</p>
                    <button
                        type="submit"
                        className={`${styles.buttonStyle} reset-form__submit ${process.env.THEME_NAME === "TRAVELO" && styles.buttonStyleTravelo}`}
                    >
                        {
                            !isSubmitLoading ?
                                t("recover-password")
                                :
                                <DotsLoading/>
                        }

                    </button>
                </form>

                {/* {
                    displaySuccessMessage ?
                        <div className="reset-form__success-message">
                            <RegisterMessage message={t("recovery-success")}/>
                        </div>
                        :
                        null
                } */}
            </div>
        )
    }
}

ResetForm.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

const mapDispatchToProps = dispatch => ({
    setNewPassword: params => dispatch(setNewPassword(params, i18n.language)),
    login: (params) => dispatch(loginUser(params, i18n.language)),
});

export default (withTranslation('common'))(connect(null, mapDispatchToProps)(ResetForm))
