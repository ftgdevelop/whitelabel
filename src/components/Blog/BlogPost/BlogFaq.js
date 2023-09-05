import PropTypes from 'prop-types'
import { Link, withTranslation, i18n } from '../../../../i18n'
import { Row, Col, Collapse } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import styles from '../../../styles/Home.module.css'
import { QuestionIcon } from '../../UI/Icons'

const { Panel } = Collapse;

const HotelFaq = props => {
    const { t, blogPosts } = props;
    return (
        <>
            {blogPosts && blogPosts[0].acf.pp_faq.pp_subject_q1 && blogPosts[0].acf.pp_faq.pp_answer_q1 ?
                    
                    <div className={`${styles.faq} ${styles.faqBlog} ${process.env.THEME_NAME === "TRAVELO" && styles.faqTravelo}`}>
                        <div className={styles.content}>
                            <h2 className={styles.titleFaq}>{t("faq")}</h2>
                            
                            {blogPosts[0].acf.pp_faq.pp_subject_q1 && blogPosts[0].acf.pp_faq.pp_answer_q1 &&
                                <Collapse bordered={false} expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />} className="faq-travelo">
                                    <Panel header={<div className={styles.subjectFaq}>
                                            <QuestionIcon />
                                            <h2 className="cip-faq-header">{blogPosts[0].acf.pp_faq.pp_subject_q1}</h2>
                                        </div>}
                                        key={1} className={styles.collape}>
                                        <div className={styles.paraghraphFaq}>
                                            {blogPosts[0].acf.pp_faq.pp_answer_q1}
                                        </div>
                                    </Panel>
                                </Collapse>}
                            
                            {blogPosts[0].acf.pp_faq.pp_subject_q2 && blogPosts[0].acf.pp_faq.pp_answer_q2 &&
                                <Collapse bordered={false} expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />} className="faq-travelo">
                                    <Panel header={<div className={styles.subjectFaq}>
                                            <QuestionIcon />
                                            <h2 className="cip-faq-header">{blogPosts[0].acf.pp_faq.pp_subject_q2}</h2>
                                        </div>}
                                        key={2} className={styles.collape}>
                                        <div className={styles.paraghraphFaq}>
                                            {blogPosts[0].acf.pp_faq.pp_answer_q2}
                                        </div>
                                    </Panel>
                                </Collapse>}
                            
                            {blogPosts[0].acf.pp_faq.pp_subject_q3 && blogPosts[0].acf.pp_faq.pp_answer_q3 &&
                                <Collapse bordered={false} expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />} className="faq-travelo">
                                    <Panel header={<div className={styles.subjectFaq}>
                                            <QuestionIcon />
                                            <h2 className="cip-faq-header">{blogPosts[0].acf.pp_faq.pp_subject_q3}</h2>
                                        </div>}
                                        key={2} className={styles.collape}>
                                        <div className={styles.paraghraphFaq}>
                                            {blogPosts[0].acf.pp_faq.pp_answer_q3}
                                        </div>
                                    </Panel>
                                </Collapse>}
                                
                            {blogPosts[0].acf.pp_faq.pp_subject_q4 && blogPosts[0].acf.pp_faq.pp_answer_q4 &&
                                <Collapse bordered={false} expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />} className="faq-travelo">
                                    <Panel header={<div className={styles.subjectFaq}>
                                            <QuestionIcon />
                                            <h2 className="cip-faq-header">{blogPosts[0].acf.pp_faq.pp_subject_q4}</h2>
                                        </div>}
                                        key={2} className={styles.collape}>
                                        <div className={styles.paraghraphFaq}>
                                            {blogPosts[0].acf.pp_faq.pp_answer_q4}
                                        </div>
                                    </Panel>
                                </Collapse>}
                            
                            {blogPosts[0].acf.pp_faq.pp_subject_q5 && blogPosts[0].acf.pp_faq.pp_answer_q5 &&
                                <Collapse bordered={false} expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />} className="faq-travelo">
                                    <Panel header={<div className={styles.subjectFaq}>
                                            <QuestionIcon />
                                            <h2 className="cip-faq-header">{blogPosts[0].acf.pp_faq.pp_subject_q5}</h2>
                                        </div>}
                                        key={2} className={styles.collape}>
                                        <div className={styles.paraghraphFaq}>
                                            {blogPosts[0].acf.pp_faq.pp_answer_q5}
                                        </div>
                                    </Panel>
                                </Collapse>}
                            
                        </div>
                    </div>
                            
                : null
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
