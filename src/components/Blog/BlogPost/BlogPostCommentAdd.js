import React, { useEffect, useState }  from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Skeleton, Form, Input, Button, Row, Col, Alert } from 'antd'
import { PostComment } from '../../../actions/blog/blogActions'

import styles from '../../../styles/Blog.module.css'

const { TextArea } = Input;

const BlogPostCommentAdd = (props) => {
    // const { t } = props;
    const [newCommentSubmitMessage,setNewCommentSubmitMessage] = useState(); 
    const [newCommentSubmitStatus,setNewCommentSubmitStatus] = useState("pending");
    
    const { commetnsId } = props;
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        setNewCommentSubmitStatus("pending");
        let parameters = {...values};
        parameters.post= commetnsId;
        const insertCommentPost = await PostComment(parameters);
        if(insertCommentPost.data){
            setNewCommentSubmitMessage("نظر شما با موفقیت ثبت شد.");
            setNewCommentSubmitStatus("success");
            form.resetFields();
        } else {
            setNewCommentSubmitMessage("نظر شما ثبت نشد!");
            setNewCommentSubmitStatus("error");
            form.resetFields();
        }
    }
    
    return (
        <>
            <div className={styles.blogPostCommentAdd}>
                <div className={styles.subject}>
                    <h2>ثبت نظر</h2>
                </div>
                <div className={styles.content}>
                    <Form                            
                        name="basic"
                        onFinish={handleSubmit}
                        form={form}
                        >
                        <Row gutter={[20,0]}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item
                                    label="نام شما"
                                    name="author_name"
                                    rules={[
                                    {
                                        required: true,
                                        message: "لطفا نام خود را وارد نمایید.",
                                    },
                                    ]}
                                >
                                    <Input size="large" />
                                </Form.Item>
                                <Form.Item 
                                    label="ایمیل"
                                    name="author_email"
                                    rules={[{ 
                                        type: 'email',
                                        message: "ایمیل خود را صحیح وارد نمایید",
                                    }]}
                                >
                                    <Input size="large"/>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Form.Item label="متن" name="content"
                                    rules={[
                                        {
                                            required: true,
                                            message: "متن نظر را وارد نمایید.",
                                        },
                                    ]}
                                >
                                    <TextArea rows={5} size="large" />
                                </Form.Item>
                                <Button htmlType="submit" type="primary" >ارسال نظر</Button>
                                
                                <div className={newCommentSubmitStatus!=="pending"?"bold newCommentSubmitMessage":"newCommentSubmitMessage"}>
                                    {newCommentSubmitMessage}
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    )
}

BlogPostCommentAdd.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

BlogPostCommentAdd.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogPostCommentAdd)