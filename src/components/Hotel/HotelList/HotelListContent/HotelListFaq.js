import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../../../i18n'
import { Row, Col, Collapse } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import styles from '../../../../styles/Home.module.css'
import { QuestionIcon } from '../../../UI/Icons'

const { Panel } = Collapse;

const HotelListFaq = props => {
    const { t, dataFaq } = props;
    return (
        <>
            {dataFaq && dataFaq.result.items.length !== 0 ?
                <Row>
                        <Col span={24}>
                            <div className={`${styles.faq} ${process.env.THEME_NAME === "TRAVELO" && styles.faqTravelo}`}>
                                <div className={styles.content}>
                                    <strong className={styles.titleFaq}>{t("faq")}</strong>
                                    <Collapse
                                        bordered={false}
                                        expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                                        className="faq-travelo"
                                    >
                                        {dataFaq.result.items.map((item, key) =>
                                            <Panel header={
                                                <div className={styles.subjectFaq}>
                                                    <QuestionIcon />
                                                    <h2 className="cip-faq-header">{item.question}</h2>
                                                </div>
                                            }
                                                key={key} className={styles.collape}>
                                                <div className={styles.paraghraphFaq}>
                                                    {item.answer && <div dangerouslySetInnerHTML={{__html: item.answer.replace('\r\n', `<br />`)}} />}
                                                </div>
                                            </Panel>
                                        )}
                                    </Collapse>
                                </div>
                            </div>
                        </Col>
                </Row> :null
            }
        </>
    )
}

HotelListFaq.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

HotelListFaq.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(HotelListFaq)
