import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import moment from 'moment-jalaali'
import { Button } from 'antd'

import styles from '../../../styles/Blog.module.css'
import { CommentOutlined, LoadingOutlined } from '@ant-design/icons';
import BlogPostCommentAddRoot from './BlogPostCommentAddRoot'
import { ReplyIcon, DateIcon } from '../../UI/Icons'

const BlogPostCommentList = (props) => {
    const { t } = props;
    const [addComment, setAddComment] = useState(false);
    const [parentId, setParentId] = useState('');
    const [postNumber, setPostNumber] = useState('');
    const [displayAll, setDisplayAll] = useState(false);
    const toggleDisplayAll = ()=>{
        setDisplayAll(!displayAll);
    }
    
    const { commetnsPost } = props;

    const addCommentRoot = (id, number) => {
        setParentId(id)
        setPostNumber(number)
        setAddComment(true)
    }

    const [sortedComments, setSortedComments] = useState([])
    useEffect(() => {
        if (commetnsPost) {
            const commentContainer = []
            const Paremts = commetnsPost.filter(c => c.parent === 0)
            Paremts.forEach(parent => {
                commentContainer.push(parent)
                
                const children = commetnsPost.filter(comment => comment.parent === parent.id)
                children.length > 0 ? children.forEach(child => commentContainer.push(child)) : null;
            })
            setSortedComments(commentContainer)
      }
    }, [commetnsPost])

    let commetnsPostList = (
        sortedComments ?
            sortedComments.slice(0, 5).map((comment, index) =>
                <li key={index}>
                    {comment.parent === 0 ?
                        <div className={styles.commentItem}>
                            <div className={styles.commentDetail}>
                                <div>
                                    <img src={comment.author_avatar_urls[96]} alt={comment.author_name} />
                                </div>
                            </div>
                            <div className={styles.commentContent}>
                                <div className={styles.commentHeader}>
                                    <span>{comment.author_name} می گوید</span>
                                    <small>
                                        <DateIcon/>
                                        {moment(comment.date.split("T")[0], "YYYY-MM-DD").format("jYYYY/jM/jD")}
                                    </small>
                                </div>
                                <div>
                                    <div dangerouslySetInnerHTML = {{__html: comment.content.rendered}} />
                                    <div className={styles.reply}>
                                        <span onClick={() => addCommentRoot(comment.id, comment.post)}>
                                            <ReplyIcon/>
                                            پاسخ
                                        </span>
                                    </div>
                                </div>
                                {addComment & parentId === comment.id ? <>
                                    <BlogPostCommentAddRoot
                                            setAddComment={setAddComment}
                                            parentId={parentId}
                                            postNumber={postNumber}
                                        />        
                                </> : null}
                            </div>
                        </div> : null}
                    {sortedComments.map((com, i) => <>
                        {comment.id === com.parent && <div className={`${styles.commentItem} ${styles.commentItemRoot}`} key={i}>
                            <div className={styles.commentDetail}>
                                <div>
                                    <img
                                        src={com.author_avatar_urls[96]}
                                        alt={com.author_name}
                                        title={com.author_name}
                                    />
                                </div>
                            </div>
                            <div className={styles.commentContent}>
                                <div className={styles.commentHeader}>
                                    <span>{com.author_name} می گوید</span>
                                    <small>
                                        <DateIcon/>
                                        {moment(com.date.split("T")[0], "YYYY-MM-DD").format("jYYYY/jM/jD")}
                                    </small>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: com.content.rendered }} />
                            </div>
                        </div>}
                    </>)}
                </li>
        )
        : <div className={styles.loadingPost}> <LoadingOutlined spin /> </div>
    )

    let moreCommetnsPostList = (
        displayAll && sortedComments.slice(5, sortedComments.length).map((comment, index) =>
            <li key={index}>
                {comment.parent === 0 ?
                    <div className={styles.commentItem}>
                        <div className={styles.commentDetail}>
                            <div>
                                <img src={comment.author_avatar_urls[96]} alt={comment.author_name} />
                            </div>
                        </div>
                        <div className={styles.commentContent}>
                            <div className={styles.commentHeader}>
                                <span>{comment.author_name} می گوید</span>
                                <small>
                                    <DateIcon/>
                                    {moment(comment.date.split("T")[0], "YYYY-MM-DD").format("jYYYY/jM/jD")}
                                </small>
                            </div>
                            <div>
                                <div dangerouslySetInnerHTML = {{__html: comment.content.rendered}} />
                                <div className={styles.reply}>
                                    <span onClick={() => addCommentRoot(comment.id, comment.post)}>
                                        <ReplyIcon/>
                                        پاسخ
                                    </span>
                                </div>
                            </div>
                            {addComment & parentId === comment.id ? <>
                                <BlogPostCommentAddRoot
                                        setAddComment={setAddComment}
                                        parentId={parentId}
                                        postNumber={postNumber}
                                    />        
                            </> : null}
                        </div>
                    </div> : null}
                {sortedComments.map((com, i) => <>
                    {comment.id === com.parent && <div className={`${styles.commentItem} ${styles.commentItemRoot}`} key={i}>
                        <div className={styles.commentDetail}>
                            <div>
                                <img
                                    src={com.author_avatar_urls[96]}
                                    alt={com.author_name}
                                    title={com.author_name}
                                />
                            </div>
                        </div>
                        <div className={styles.commentContent}>
                            <div className={styles.commentHeader}>
                                <span>{com.author_name} می گوید</span>
                                <small>
                                    <DateIcon/>
                                    {moment(com.date.split("T")[0], "YYYY-MM-DD").format("jYYYY/jM/jD")}
                                </small>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: com.content.rendered }} />
                        </div>
                    </div>}
                </>)}
            </li>
        )
    )

    let noCommentPost = (
        commetnsPost.length == 0 ?
        <div className={styles.noComment}>
            <CommentOutlined />
            <span>برای این پست نظری ثبت نشده است</span>
        </div> : null
    )

    return (
        <>
            <div className={styles.blogPostCommentList}>
                <div className={styles.subject}>
                    <h2>نظرات شما</h2>
                </div>
                <div className={styles.content}>
                     <div className={styles.commentsList}>
                        <ul>
                            {commetnsPostList}
                            {moreCommetnsPostList}
                        </ul>
                        {sortedComments && sortedComments.length > 3 ?  <>
                            <Button htmlType="button" className="margin-top-small" onClick={toggleDisplayAll}>{displayAll?<> بستن نظرات بیشتر </>:<> نظرات بیشتر </>}</Button>
                        </> : null}
                    </div>
                    {noCommentPost}
                </div>
            </div>
        </>
    )
}

BlogPostCommentList.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogPostCommentList.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogPostCommentList)