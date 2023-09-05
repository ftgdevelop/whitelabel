import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Link } from '../../../../i18n'
import parse from 'html-react-parser';
import { Form, Input, Select, Button, Row, Col, Spin, Checkbox, Modal, Skeleton} from 'antd'
import { LoadingOutlined,MessageFilled,ExclamationCircleOutlined,CheckCircleOutlined, CloseCircleOutlined,UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import moment from 'moment-jalaali';
import dynamic from 'next/dynamic'

import {InsertComment} from '../../../actions/index' ;
import styles from '../../../styles/Hotel.module.css'

const HotelPoint = dynamic(() => import('../../UI/HotelPoint/HotelPoint'))
const RatingBar = dynamic(() => import('../../UI/RatingBar/RatingBar'))

const Reviews = props => {

        const { t } = props;
        const [form] = Form.useForm();

        const [isRecommended,setIsRecommended] = useState(false);
        const [newCommentSubmitMessage,setNewCommentSubmitMessage] = useState(); 
        const [newCommentSubmitStatus,setNewCommentSubmitStatus] = useState("pending"); 
        const [newCommentModalVisible,setNewCommentModalVisible] = useState(false); 
        const [displayAll,setDisplayAll] = useState(false);
        const toggleDisplayAll = ()=>{
            setDisplayAll(!displayAll);
        }

        const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
        let icon;
        switch (newCommentSubmitStatus){
            case "pending":
                icon = <Spin indicator={antIcon} />;
                break;
            case "success":
                icon = <CheckCircleOutlined />;
                break;
            case "error":
                icon = <CloseCircleOutlined />;
                break;
            default:
                icon = <Spin indicator={antIcon} />;
        }
        const handleSubmit = async (values) => {
            setNewCommentModalVisible(true);
            setNewCommentSubmitStatus("pending");
            setNewCommentSubmitMessage(t('sending-information-please-wait'));
            let parameters = {...values};
            parameters.IsRecommended = isRecommended;
            parameters.PageId= props.pageId;
            const insertCommentResponse = await InsertComment(parameters);
            if(insertCommentResponse.data){
                setNewCommentModalVisible(true);
                setNewCommentSubmitMessage(insertCommentResponse.data);
                setNewCommentSubmitStatus("success");
                form.resetFields();
            }else{
                setNewCommentModalVisible(true);
                setNewCommentSubmitMessage(t('error-in-submiting-opinion'));
                setNewCommentSubmitStatus("error");
                form.resetFields();
            }
        }
        const closeNewCommentModal = ()=>{
            setNewCommentModalVisible(false);
        }
        const onFinishFailed= ()=>{
            alert(t('please-enter-star-input'));
        }
        const { TextArea } = Input;
        const { Option } = Select;
        const numbersArray = [1,2,3,4,5,6,7,8,9,10];
        moment.loadPersian();
        return (
            <div
                className={`${styles.reviews} ${process.env.THEME_NAME === "TRAVELO" && styles.reviewsTravelo}`}
                id="anchorreviews"
                >
                <Modal
                open={newCommentModalVisible}
                onCancel={closeNewCommentModal}
                footer={null}
                >
                    <div className="newComentStatusIconHolder">
                        {icon}
                    </div>
                    <div className={newCommentSubmitStatus!=="pending"?"bold newCommentSubmitMessage":"newCommentSubmitMessage"}>
                    {newCommentSubmitMessage}
                    </div>
                    <div className="newCommentSubmitModalFooter"> <Button  htmlType="button" type="primary" loading={newCommentSubmitStatus==="pending"} onClick={closeNewCommentModal}>
                      {newCommentSubmitStatus==="pending"?" ":t('very-good')}
                    </Button></div>
                </Modal>
                <div className={styles.container}>
                    <div className={styles.subjectReviews}>
                        {t('suggestion')}
                    </div>
                    {
                        props.loading ?
                        <div className={`${styles.contentReviews} margin-bottom`}>
                            <Skeleton.Button active size="small" className={styles.subjectGuestReviewsSkeleton} />
                            <Row align="middle">
                                <Col xs={24} md={12}>
                                    <Skeleton.Input active size="large" className={styles.skeletonInputHotelCard} />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Row className={styles.GuestRatingSkeleton}  >
                                        <Col xs={24} md={12}>
                                            <Skeleton.Button active size="small" className={styles.subjectGuestRatingSkeleton} />
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Skeleton.Button active size="small" className={styles.subjectGuestRatingSkeleton} />
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Skeleton.Button active size="small" className={styles.subjectGuestRatingSkeleton} />
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Skeleton.Button active size="small" className={styles.subjectGuestRatingSkeleton} />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                        : 
                        null
                    }

                    {
                        (props.score && props.score.CommentCount>0)?
                        <div className={`${styles.contentReviews} margin-bottom`}>
                            <h4 className={styles.subjectGuestReviews}>{t("hotel-score")}</h4>
                            <Row align="middle">
                                <Col xs={24} md={12}>
                                    {(props.score.Satisfaction) ?<HotelPoint point={props.score.Satisfaction} reviews={props.score.CommentCount} />:null}
                                </Col>
                                <Col xs={24} md={12}>
                                {props.score ?
                                    <Row className="margin-bottom" gutter={[20,20]}>
                                        <Col xs={24} md={12}>
                                            <div className="margin-bottom-small">
                                                {t('satisfaction-from-100',{satisfaction: props.score.Satisfaction})}
                                            </div>
                                            <RatingBar persentage= {props.score.Satisfaction} />
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <div className="margin-bottom-small">
                                                {t("room-status-from-10",{roomservice: props.score.RoomService})}
                                            </div>
                                        <RatingBar persentage= {props.score.RoomService*10} />
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <div className="margin-bottom-small">
                                                {t('restaurant-quality-from-10',{resturantquality: props.score.ResturantQuality})}
                                            </div>
                                        <RatingBar persentage= {props.score.ResturantQuality*10} />
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <div className="margin-bottom-small">
                                                {t("employees-treatment-from-10",{dealwithpassanger: props.score.DealWithPassanger})}
                                            </div>
                                        <RatingBar persentage= {props.score.DealWithPassanger*10} />
                                        </Col>
                                    </Row>
                                :<Spin/>}
                                </Col>
                            </Row>
                        </div>
                        :
                        null
                    }
                    
                    <div className={`${styles.contentReviews} margin-bottom`}>
                        <h4 className={styles.subjectGuestReviews}>{t("submit-suggestion")}</h4>
                        <div className="review-form-holder">
                            <Form
                            form={form}
                            // {...layout}
                            name="basic"
                            // initialValues={{
                            //     remember: true,
                            // }}
                            onFinish={handleSubmit}
                            onFinishFailed={onFinishFailed}
                            >
                                <Row gutter={[20,0]}>
                                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                                        <Form.Item
                                            label={t('name-family')}
                                            name="FullName"
                                            rules={[
                                            {
                                                required: true,
                                                message: t('please-enter-name'),
                                            },
                                            ]}
                                        >
                                        <Input />
                                    </Form.Item>
                                        <Form.Item
                                            label={t('from-city')}
                                            name="CityName"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: t('please-enter-city'),
                                                },
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label={t('email')}
                                            name="Email"
                                            rules={[
                                            {
                                                required: true,
                                                message: t('enter-email-address'),
                                            },
                                            { type: 'email',
                                            message: t('invalid-email'), }
                                            ]}
                                        >
                                            <Input />
                                        </Form.Item>                                        
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                                        <Form.Item
                                        className="score-form-item"
                                        label={t('satisfaction-percentage')}
                                        name="Satisfaction"
                                        rules={[
                                        {
                                            required: true,
                                            message: t('choose-score'),
                                        },
                                        ]}
                                    >
                                            <Select>
                                                {/* <Option value={0}>{t('not-satisfied')}</Option> */}
                                                {numbersArray.map(item=><Option key={item} value={item*10}>{item*10}</Option>)}                                       
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            className="score-form-item"
                                            label={t('room-status')}
                                            name="RoomService"
                                            rules={[
                                            {
                                                required: true,
                                                message: t('choose-score'),
                                            },
                                            ]}
                                        >
                                            <Select>
                                                {numbersArray.map(item=><Option key={item} value={item}>{item}</Option>)}                                       
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            className="score-form-item"
                                            label={t('restaurant-quality')}
                                            name="ResturantQuality"
                                            rules={[
                                            {
                                                required: true,
                                                message: t('choose-score'),
                                            },
                                            ]}
                                        >
                                            <Select>
                                                {numbersArray.map(item=><Option key={item} value={item}>{item}</Option>)}                                       
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            className="score-form-item"
                                            label={t("employees-treatment")}
                                            name="DealWithPassanger"
                                            rules={[
                                            {
                                                required: true,
                                                message: t('choose-score'),
                                            },
                                            ]}
                                        >
                                            <Select>
                                                {numbersArray.map(item=><Option key={item} value={item}>{item}</Option>)}                                       
                                            </Select>
                                        </Form.Item>                                         
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                                        <Form.Item
                                            className="comment-text-form-item"
                                            name="Comment"
                                        >
                                            <TextArea rows={7} placeholder={t('suggestion-text')} />
                                        </Form.Item>
                                        <Form.Item>
                                            <Checkbox onChange={e=>setIsRecommended(e.target.checked)} >{t('suggest-to-other')}</Checkbox>
                                        </Form.Item> 
                                    </Col>
                                </Row>
                                <Button htmlType="submit" >{t('send')}</Button>
                            </Form>
                        </div>
                    </div>

                    {
                        props.score && props.score.Comments?
                        <div className={styles.contentReviews}>
                            {(props.score.Comments.length > 0)?
                                <>
                                    <h4 className={styles.subjectGuestReviews}>{t('user-suggestions')}</h4>
                                    <div className={styles.listGuestReviews}>
                                        {props.score.Comments.slice(0, 4).map(commentItem =><div key={commentItem.CommentId} className={styles.cardGuestReviews}>
                                        <div className={styles.detailCardGuestReviews}>
                                            <div className={styles.nameGuest}>
                                                <UserOutlined className="margin-end-5" />
                                                {commentItem.FullName}
                                            </div>
                                            {commentItem.CityName &&  <div className={styles.locationGuest}>
                                                <EnvironmentOutlined />
                                                {commentItem.CityName}
                                            </div>}
                                            <div className="margin-top">
                                                <Row gutter={[10,0]} align="middle">
                                                    <Col flex="auto"><RatingBar persentage= {commentItem.DealWithPassanger*10} /></Col>
                                                    <Col flex="50px"><div className={styles.pointGuest}>{commentItem.DealWithPassanger} {t("of-10")}</div></Col>
                                                </Row>
                                                
                                            </div>
                                            {commentItem.CreateDate && 
                                                <div className={`margin-top-small ${styles.pointGuest}` }>
                                                {moment(commentItem.CreateDate).format("jDD jMMMM jYYYY")}
                                                </div>
                                            }
                                        </div>
                                        <div className={styles.textCardGuestReviews}>
                                            {
                                                commentItem.Comment && parse(commentItem.Comment)
                                            }
                                        </div>
                                    </div>)}
                                    {displayAll &&  props.score.Comments.slice(4, props.score.Comments.length).map(
                                        commentItem =><div key={commentItem.CommentId} className={styles.cardGuestReviews}>
                                        <div className={styles.detailCardGuestReviews}>
                                            <div className={styles.nameGuest}>
                                                <UserOutlined className="margin-end-5" />
                                                {commentItem.FullName}
                                            </div>
                                            {commentItem.CityName &&  <div className={styles.locationGuest}>
                                                <EnvironmentOutlined />
                                                {commentItem.CityName}
                                            </div>}
                                            <div className="margin-top">
                                                <RatingBar persentage= {commentItem.DealWithPassanger*10} />
                                            </div>
                                            <div className={`${styles.pointGuest} margin-top-small`}>
                                                {t('score-of-10',{dealwithpassanger:commentItem.DealWithPassanger })}
                                            </div>
                                        </div>
                                        <div className={styles.textCardGuestReviews}>
                                            {
                                                commentItem.Comment && parse(commentItem.Comment)
                                            }
                                        </div>
                                    </div>
                                    )}
                                    </div>
                                    {
                                        (props.score && props.score.Comments && props.score.Comments.length>3)&&
                                        <div className="text-center">
                                            <Button htmlType="button" className="margin-top-small" onClick={toggleDisplayAll}>{t("view-suggestions")}{displayAll?t('less'):t('more')}</Button>
                                        </div>
                                    }
                                </>
                            :<><ExclamationCircleOutlined /> {t("no-suggestions")}</>}
                        </div>
                    :
                        <div className={styles.contentReviews}>
                            <div className={styles.subjectGuestReviews}>
                                <Skeleton.Button active size="small" className={styles.subjectGuestReviewsSkeleton} />
                            </div>
                            <div className={styles.listGuestReviews}>
                                <div className={styles.cardGuestReviews}>
                                    <div className={styles.detailCardGuestReviews}>
                                        <div className={styles.detailCardGuestReviews}>
                                            <div className={styles.nameGuest}>
                                                <Skeleton.Avatar active size="medium" className={styles.reviewsAvatarSkeleton} />
                                                <Skeleton.Button active size="small" className={styles.reviewsNameSkeleton} />
                                            </div>
                                            <div className="margin-top">
                                                <Skeleton.Button active size="small" className={styles.reviewsRatingSkeleton} />
                                            </div>
                                        </div>
                                    </div>
                                    <Skeleton.Button active size="small" className={styles.textCardGuestReviewsSkeleton} />
                                </div>
                                <div className={styles.cardGuestReviews}>
                                    <div className={styles.detailCardGuestReviews}>
                                        <div className={styles.detailCardGuestReviews}>
                                            <div className={styles.nameGuest}>
                                                <Skeleton.Avatar active size="medium" className={styles.reviewsAvatarSkeleton} />
                                                <Skeleton.Button active size="small" className={styles.reviewsNameSkeleton} />
                                            </div>
                                            <div className="margin-top">
                                                <Skeleton.Button active size="small" className={styles.reviewsRatingSkeleton} />
                                            </div>
                                        </div>
                                    </div>
                                    <Skeleton.Button active size="small" className={styles.textCardGuestReviewsSkeleton} />
                                </div>
                                <div className={styles.cardGuestReviews}>
                                    <div className={styles.detailCardGuestReviews}>
                                        <div className={styles.detailCardGuestReviews}>
                                            <div className={styles.nameGuest}>
                                                <Skeleton.Avatar active size="medium" className={styles.reviewsAvatarSkeleton} />
                                                <Skeleton.Button active size="small" className={styles.reviewsNameSkeleton} />
                                            </div>
                                            <div className="margin-top">
                                                <Skeleton.Button active size="small" className={styles.reviewsRatingSkeleton} />
                                            </div>
                                        </div>
                                    </div>
                                    <Skeleton.Button active size="small" className={styles.textCardGuestReviewsSkeleton} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
}

Reviews.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
Reviews.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(Reviews)
