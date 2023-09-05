import React, { useEffect, useState }  from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Skeleton, Form, Input, Button, Row, Col, Alert } from 'antd'
import { PostComment } from '../../../actions/blog/blogActions'

import styles from '../../../styles/Blog.module.css'

const { TextArea } = Input;

const BlogPostCommentAddRoot = (props) => {
    // const { t } = props;
    const [newCommentSubmitMessage,setNewCommentSubmitMessage] = useState(); 
    const [newCommentSubmitStatus,setNewCommentSubmitStatus] = useState("pending");
    
    const { postNumber, parentId } = props;
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        setNewCommentSubmitStatus("pending");
        let parameters = {...values};
        parameters.post = postNumber;
        parameters.parent = parentId;
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

    const closeCommentRoot = (id) => {
        props.setAddComment(false);
    }
    
    return (
        <>
            <div>
                <div className={styles.blogPostCommentRootcontent}>
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
                                <Button htmlType="submit" type="primary">ارسال نظر</Button>
                                <Button onClick={() => closeCommentRoot()} style={{ marginRight:10 }}>انصراف</Button>
                                
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

BlogPostCommentAddRoot.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
BlogPostCommentAddRoot.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(BlogPostCommentAddRoot)