import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Skeleton } from 'antd';
import dynamic from 'next/dynamic'

import styles from '../../../styles/Blog.module.css'
import { ArrowRightIcon } from '../../UI/Icons'
const Rating = dynamic(() => import('../../UI/Rating/Rating'))

const BlogListPopularHotel = (props) => {
    // const { t } = props;    
    return (
        <>
            <div className={styles.blogListPopularHotel}>
                <div className={styles.subject}>
                    <h4>پرطرفدارترین هتل‌های تهران</h4>
                </div>
                <div className={styles.listPopularHotel}>
                    <ul>
                        <li>
                            <a
                                href="hotel/هتل-پارسیان-آزادی-تهران"
                                target="_blank"
                                title="هتل پارسیان آزادی تهران"
                                className={styles.itemPostImage}
                            >
                                <div className={styles.smallImagePost}>
                                    <img src="https://cdn2.safaraneh.com/images/blog/hotel-azadi-thumb.jpg" alt="هتل پارسیان آزادی تهران" />
                                </div>
                                <div className={styles.titlePost}>
                                    <span>هتل پارسیان آزادی تهران</span>
                                    <Rating rate="5"/>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                href="hotel/هتل-پارسیان-استقلال-تهران"
                                target="_blank"
                                title="هتل پارسیان استقلال تهران"
                                className={styles.itemPostImage}
                            >
                                <div className={styles.smallImagePost}>
                                    <img src="https://cdn2.safaraneh.com/images/blog/hotel-esteghlal-thumb.jpg" alt="هتل پارسیان استقلال تهران" />
                                </div>
                                <div className={styles.titlePost}>
                                    <span>هتل پارسیان استقلال تهران</span>
                                    <Rating rate="5"/>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a
                                href="hotel/هتل-پارسیان-انقلاب-تهران"
                                target="_blank"
                                title="هتل پارسیان انقلاب تهران"
                                className={styles.itemPostImage}
                            >
                                <div className={styles.smallImagePost}>
                                    <img src="https://cdn2.safaraneh.com/images/blog/hotel-enghelab-thumb.jpg" alt="هتل پارسیان انقلاب تهران" />
                                </div>
                                <div className={styles.titlePost}>
                                    <span>هتل پارسیان انقلاب تهران</span>
                                    <Rating rate="4"/>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

BlogListPopularHotel.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogListPopularHotel.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogListPopularHotel)