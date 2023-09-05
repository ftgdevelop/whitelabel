import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../i18n'
import Layout from '../components/Layout/Layout'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Collapse } from 'antd'
import { HomeOutlined, DownOutlined } from '@ant-design/icons'

import styles from '../styles/Home.module.css'
import { QuestionIcon } from '../components/UI/Icons'

const { Panel } = Collapse;

const FaqPage = ({ t }) => (
  <Layout>
    <Head>
        <title>{t("faq")}</title>
    </Head>      
    <div
      className={`${styles.otherPage} ${process.env.THEME_NAME === "TRAVELO" && styles.otherPageTravelo}`}
      >
      <div className={styles.container}>
        <Row>
          <Breadcrumb>
              <Breadcrumb.Item>
              <Link as="/" href="/">
                  <a>
                  <HomeOutlined />
                  </a>
              </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
              <span>{t("faq")}</span>
              </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
            <Col span={24}>
                <div
                  className={`${styles.faq} ${process.env.THEME_NAME === "TRAVELO" && styles.faqTravelo}`}
                  >
                    <h1>{t("faq")}</h1>
                    <div className={styles.content}>
                      <h2>{t("domestic-hotel")}</h2>
                      <Collapse
                          bordered={false}
                  expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
                  className="faq-travelo"
                      >
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q1")}</span>
                            </div>
                          }
                          key="1" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q1p1")}</p>
                                <p>{t("q1p2")}</p>
                                <p>{t("q1p3")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q2")}</span>
                            </div>
                          }
                          key="2" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q2p1")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q3")}</span>
                            </div>
                          }
                          
                          key="3" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q3p1")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q4")}</span>
                            </div>
                          }
                          
                          key="4" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q4p1")}</p>
                                <p>{t("q4p2")}</p>
                                <p>{t("q4p3")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q5")}</span>
                            </div>
                          }
                          key="5" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q5p1")}</p>
                                <p>{t("q5p2")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q6")}</span>
                            </div>
                          }
                          key="6" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q6p1")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q7")}</span>
                            </div>
                          }
                          key="7" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q7p1")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q8")}</span>
                            </div>
                          }
                          key="8" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q8p1")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q9")}</span>
                            </div>
                          }
                          key="9" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q9p1")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q10")}</span>
                            </div>
                          }
                          key="10" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q10p1")}</p>
                                <p>{t("q10p2")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q11")}</span>
                            </div>
                          }
                          key="11" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q11p1")}</p>
                                <p>{t("q11p2")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q12")}</span>
                            </div>
                          }
                          key="12" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q12p1")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q13")}</span>
                            </div>
                          }
                          key="13" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q13p1")}</p>
                                <p>{t("q13p2")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q14")}</span>
                            </div>
                          }
                          key="14" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q14p1")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q15")}</span>
                            </div>
                          }
                          key="15" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q15p1")}</p>
                              </div>
                          </Panel>
                          <Panel header={
                            <div className={styles.subjectFaq}>
                              <QuestionIcon/>
                              <span>{t("q16")}</span>
                            </div>
                          }
                          key="16" className={styles.collape}>
                              <div className={styles.paraghraphFaq}>
                                <p>{t("q16p1")}</p>
                              </div>
                          </Panel>
                      </Collapse>
                    </div>
                </div>
            </Col>
        </Row>
      </div>
    </div>
  </Layout>
)

FaqPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

FaqPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(FaqPage)
