import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'

import styles from '../../../styles/Blog.module.css'

const BlogPagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++ ) {
        pageNumber.push(i);
    }

    return (
        <>
            <div className={styles.blogPagination}>
                <ul>
                    {pageNumber.map(number => (
                        <li key={number}>
                            <a 
                                // href="#"
                                onClick={() => paginate(number)} 
                                className={currentPage === number ? `${styles.active}` : "no"}
                                >
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

BlogPagination.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogPagination.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogPagination)