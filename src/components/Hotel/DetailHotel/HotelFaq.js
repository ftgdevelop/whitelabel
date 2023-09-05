import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../../i18n'
import { Row, Col, Collapse } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import styles from '../../../styles/Home.module.css'
import { QuestionIcon } from '../../UI/Icons'

const { Panel } = Collapse;

const HotelFaq = props => {
    const { t, hotelAccommodation } = props;
    return (
        <>
            {hotelAccommodation && hotelAccommodation.faqs.length !== 0 ?
                <div className={styles.container}>
                    <Row>
                        <Col span={24}>
                            <div className={`${styles.faq} ${process.env.THEME_NAME === "TRAVELO" && styles.faqTravelo}`}>
                                <div className={styles.content}>
                                <strong className={styles.titleFaq}>{t("faq")}</strong>
                                    {hotelAccommodation.faqs.map((item,key) =>
                                        <Collapse bordered={false} expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />} className="faq-travelo" key={key}>
                                            <Panel
                                                header={<div className={styles.subjectFaq}>
                                                <QuestionIcon />
                                                <h2 className="cip-faq-header">{item.question}</h2>
                                                </div>}
                                                 className={styles.collape}>
                                                <div className={styles.paraghraphFaq}>
                                                    {item.answer && <div dangerouslySetInnerHTML={{__html: item.answer.replace('\r\n', `<br />`)}} />}
                                                </div>
                                            </Panel>
                                        </Collapse>
                                    )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div> : null
            }
        </>
    )
}

HotelFaq.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

HotelFaq.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(HotelFaq)
