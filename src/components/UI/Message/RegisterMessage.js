import React from 'react';

import { CheckCircleIcon, RemoveSimpleIcon } from '../Icons'
import styles from '../../../styles/Home.module.css'
import { Link, i18n, withTranslation } from "../../../../i18n";
class RegisterMessage extends React.Component {
    constructor() {
        super()
        this.state = {
            showing: true,
        }
    }

    render() {
        const {t} = this.props;
        const { showing } = this.state;
        const { message } = this.props;
        return (
            <>
                { showing
                    ?
                        <div className={styles.registerAlertEmail}>
                            <div>
                                <CheckCircleIcon/>
                                <span className={styles.textAlert}>
                                    {
                                        message || t('register-completed')
                                    }
                                </span>
                                <button onClick={() => this.setState({ showing: !showing })}><RemoveSimpleIcon/></button>
                            </div>
                        </div>
                    : null
                }
            </>
        );
    }
}
RegisterMessage.getInitialProps = async () => ({
    namespacesRequired: ['common'],
  })
export default withTranslation('common')(RegisterMessage);