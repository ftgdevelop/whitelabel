import React,{useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link, i18n } from '../../../../i18n'
import parse from 'html-react-parser';
import { Form, Input, Select, Button, Row, Col, Spin, Checkbox, Modal, Skeleton} from 'antd'
import { LoadingOutlined,ExclamationCircleOutlined,CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment-jalaali';
import { LikeOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic'

import {InsertComment} from '../../../actions/index' ;
import styles from '../../../styles/Hotel.module.css'

const HotelPointTravelo = dynamic(() => import('../../UI/HotelPoint/HotelPointTravelo'))
const RatingBar = dynamic(() => import('../../UI/RatingBar/RatingBar'))

const ReviewsTravelo = props => {

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
        
        useEffect(() => {
            document.querySelectorAll('.ant-select-show-arrow').forEach(item => {
                item.removeAttribute('aria-required');
            })
            document.querySelectorAll('.ant-select-selection-search-input').forEach(item => {
                item.setAttribute('aria-hidden', false);
                item.removeAttribute('aria-required');
                item.removeAttribute('aria-haspopup');
                item.removeAttribute('aria-owns');
                item.removeAttribute('aria-autocomplete');
                item.removeAttribute('aria-controls');
                item.removeAttribute('aria-activedescendant');
                item.removeAttribute('aria-hidden');
                item.removeAttribute('aria-expanded');
            })
            document.querySelectorAll('.input-travelo').forEach(item => {
                item.removeAttribute('aria-required');
            })
        });

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
            let parameters = { ...values };
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
        const numbersArray = [10,9,8,7,6,5,4,3,2,1];
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

                    {props.loading ?
                        <div className={`${styles.contentReviews} margin-bottom`}>
                            <Skeleton.Button active size="small" className={styles.subjectGuestReviewsSkeleton} />
                            <Row align="middle">
                                <Col xs={24} md={12}>
                                    <Skeleton.Input active size="large" className={styles.skeletonInputHotelCard} />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Row className={styles.GuestRatingSkeleton}>
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
                        </div> : null}

                    {(props.score && props.score.CommentCount>0)?
                        <div className={`${styles.contentReviews} margin-bottom`}>
                            <Row>
                                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                    <h4 className={styles.subjectGuestReviews}>{t("hotel-score")}</h4>
                                    {(props.score.Satisfaction) ?<div  className="hotel-review-point-travelo"><HotelPointTravelo point={props.score.Satisfaction} reviews={props.score.CommentCount} /></div>:null}
                                    {props.score ?
                                    <Row className="margin-bottom" gutter={[20,20]}>
                                        <Col xs={24} md={24} className="rating-bar-travelo">
                                            <div className="margin-bottom-small">
                                                <span>{t('satisfaction-from-100',{satisfaction : props.score.Satisfaction})}</span>
                                            </div>
                                            <RatingBar persentage= {props.score.Satisfaction} />
                                        </Col>
                                        <Col xs={24} md={24} className="rating-bar-travelo">
                                            <div className="margin-bottom-small">
                                                <span>{t("room-status-from-10",{roomservice : props.score.RoomService})}</span>
                                            </div>
                                        <RatingBar persentage= {props.score.RoomService*10} />
                                        </Col>
                                        <Col xs={24} md={24} className="rating-bar-travelo">
                                            <div className="margin-bottom-small">
                                                <span>{t('restaurant-quality-from-10',{resturantquality: props.score.ResturantQuality})}</span>
                                            </div>
                                        <RatingBar persentage= {props.score.ResturantQuality*10} />
                                        </Col>
                                        <Col xs={24} md={24} className="rating-bar-travelo">
                                            <div className="margin-bottom-small">
                                                <span>{t("employees-treatment-from-10",{dealwithpassanger: props.score.DealWithPassanger})}</span>
                                            </div>
                                        <RatingBar persentage= {props.score.DealWithPassanger*10} />
                                        </Col>
                                    </Row>
                                    :<Spin/>}
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                                    {props.score && props.score.Comments?
                                        <div className={styles.contentListReviewsTravelo}>
                                            {(props.score.Comments.length > 0)?
                                                <>
                                                    <h4 className={styles.subjectGuestReviews}>{t('user-suggestions')}</h4>
                                                    <div className={styles.listGuestReviews}>
                                                        {props.score.Comments.slice(0, 3).map(commentItem =><div key={commentItem.CommentId} className={styles.cardGuestReviews}>
                                                            <div className={styles.detailCardGuestReviews}>
                                                            <div className={styles.pointGuest}>{commentItem.Satisfaction/10} {t("of-10")}</div>
                                                            <div className={styles.stayNameGuest}>
                                                                <div className={styles.nameGuest}>
                                                                    {commentItem.FullName}
                                                                </div>
                                                                {commentItem.IsStay ? <div className={styles.stayGuest}>{t('stay-comment')}</div> : null}
                                                            </div>
                                                            {commentItem.CreateDate && 
                                                                <div className={`margin-top-small ${styles.dateGuest}` }>
                                                                {moment(commentItem.CreateDate).format("jDD jMMMM jYYYY")}
                                                                </div>
                                                            }
                                                            {commentItem.CityName &&  <div className={styles.locationGuest}>
                                                                {commentItem.CityName}
                                                            </div>}
                                                        </div>
                                                        {commentItem.IsRecommended === true &&
                                                            <div className={styles.isRecommended}>
                                                                <LikeOutlined />
                                                                <span>رزرو این هتل را پیشنهاد میکنم</span>
                                                            </div>}
                                                        <div className={styles.textCardGuestReviews}>
                                                            {
                                                                commentItem.Comment && parse(commentItem.Comment)
                                                            }
                                                        </div>
                                                    </div>)}
                                                    {displayAll &&  props.score.Comments.slice(4, props.score.Comments.length).map(
                                                        commentItem =><div key={commentItem.CommentId} className={styles.cardGuestReviews}>
                                                        <div className={styles.detailCardGuestReviews}>
                                                            <div className={styles.pointGuest}>{commentItem.Satisfaction/10} {t("of-10")}</div>
                                                            <div className={styles.nameGuest}>
                                                                {commentItem.FullName}
                                                                {commentItem.IsStay ? <div className={styles.stayGuest}>{t('stay-comment')}</div> : null}
                                                            </div>
                                                            {commentItem.CreateDate && 
                                                                <div className={`margin-top-small ${styles.dateGuest}` }>
                                                                {moment(commentItem.CreateDate).format("jDD jMMMM jYYYY")}
                                                                </div>
                                                            }
                                                            {commentItem.CityName &&  <div className={styles.locationGuest}>
                                                                {commentItem.CityName}
                                                            </div>}
                                                        </div>
                                                        {commentItem.IsRecommended === true &&
                                                            <div className={styles.isRecommended}>
                                                                <LikeOutlined />
                                                                <span>رزرو این هتل را پیشنهاد میکنم</span>
                                                            </div>}
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
                                                        <div>
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
                                </Col>
                            </Row>
                        </div> : null}
                    
                    <div className={`${styles.contentReviews} margin-bottom`}>
                        
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
                                        <h4 className={styles.subjectGuestReviews}>{t("submit-suggestion")}</h4>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                                        <Row gutter={[20,0]}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
                                                <Input
                                                    className={`${process.env.THEME_NAME === "TRAVELO" && "input-travelo"}`}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                                <Form.Item
                                                    label={t('from-city')}
                                                    name="CityName"
                                                    // rules={[
                                                    //     {
                                                    //         required: true,
                                                    //         message: t('please-enter-city'),
                                                    //     },
                                                    // ]}
                                                >
                                                    <Input
                                                        className={`${process.env.THEME_NAME === "TRAVELO" && "input-travelo"}`}
                                                        />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={8} lg={8} xl={8}>
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
                                                    <Input
                                                        className={`${process.env.THEME_NAME === "TRAVELO" && "input-travelo"}`}
                                                        />
                                                </Form.Item>                                        
                                            </Col>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Form.Item
                                                    name="Comment"
                                                    className={`comment-text-form-item ${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                >
                                                    <TextArea rows={3} placeholder={t('suggestion-text')} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                                <Form.Item
                                                    className="score-form-item score-form-item-travelo"
                                                    label={t('satisfaction-percentage')}
                                                    name="Satisfaction"
                                                    rules={[
                                                    {
                                                        required: true,
                                                        message: t('choose-score'),
                                                    },
                                                    ]}
                                                    initialValue="100"
                                                >
                                                        <Select
                                                            defaultValue="100"
                                                            className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                            >
                                                            {/* <Option value={0}>{t('not-satisfied')}</Option> */}
                                                            {numbersArray.map(item=><Option key={item} value={item*10}>{item*10}</Option>)}                                       
                                                        </Select>
                                                    </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                                <Form.Item
                                                    className="score-form-item score-form-item-travelo"
                                                    label={t('room-status')}
                                                    name="RoomService"
                                                    rules={[
                                                    {
                                                        required: true,
                                                        message: t('choose-score'),
                                                    },
                                                    ]}
                                                    initialValue="10"
                                                >
                                                    <Select
                                                        defaultValue="10"
                                                        className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                        >
                                                        {numbersArray.map(item=><Option key={item} value={item}>{item}</Option>)}                                       
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                                <Form.Item
                                                    className="score-form-item score-form-item-travelo"
                                                    label={t('restaurant-quality')}
                                                    name="ResturantQuality"
                                                    rules={[
                                                    {
                                                        required: true,
                                                        message: t('choose-score'),
                                                    },
                                                    ]}
                                                    initialValue="10"
                                                >
                                                    <Select
                                                        defaultValue="10"
                                                        className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                        >
                                                        {numbersArray.map(item=><Option key={item} value={item}>{item}</Option>)}                                       
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                                                <Form.Item
                                                    className="score-form-item score-form-item-travelo"
                                                    label={t("employees-treatment")}
                                                    name="DealWithPassanger"
                                                    rules={[
                                                    {
                                                        required: true,
                                                        message: t('choose-score'),
                                                    },
                                                    ]}
                                                    initialValue="10"
                                                >
                                                    <Select
                                                        defaultValue="10"
                                                        className={`${process.env.THEME_NAME === "TRAVELO" && "form-item-travelo"}`}
                                                        >
                                                        {numbersArray.map(item=><Option key={item} value={item}>{item}</Option>)}                                       
                                                    </Select>
                                                </Form.Item>                                         
                                            </Col>
                                            
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Form.Item>
                                                    <Checkbox onChange={e=>setIsRecommended(e.target.checked)} >{t('suggest-to-other')}</Checkbox>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Button
                                            htmlType="submit"
                                            type="primary"
                                            className={`${process.env.THEME_NAME === "TRAVELO" && "button-travelo"}`}
                                            >
                                            {t('send')}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
}

ReviewsTravelo.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
ReviewsTravelo.propTypes = {
    t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(ReviewsTravelo)
