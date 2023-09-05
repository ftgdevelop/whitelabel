import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import { withTranslation, Link } from '../../../../i18n'
import { Row, Col, Button, Skeleton, Breadcrumb } from 'antd'
import AnimatedShowMore from "react-animated-show-more";

import styles from '../../../styles/Cip.module.css'
import { LocationCircleIcon } from '../../UI/Icons'
import { LeftOutlined, HomeOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import parse from 'html-react-parser';

const AirportCip = props =>  {
    const { t } = props;
    const [projectName,setProjectName] = useState();
    const [projectAddress,setProjectAddress] = useState();

    useEffect(()=>{
        setProjectAddress(window.location.origin);
        let project = window.localStorage.whiteLabelProjectName;
        setProjectName(project);
    },[]);
    const numberWithCommas = (x) => {
        return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
    }

    let skeletonCipItem = (
        <Row className={styles.airportListItem}>
            <Col xs={24} sm={8} className={styles.airportItemImageBg}>
                <Skeleton.Image className={styles.airportItemImageBgSkeleton} />
            </Col>
            <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                <div className={styles.airportItemContent}>
                    <span className={styles.airportNameItem}>
                        <Skeleton.Button active size="medium" className={styles.airportNameItemSkeleton} />
                    </span>
                    <div className={styles.airportSummaryItem}>
                        <Skeleton active className={styles.airportSummaryItemSkeleton} />
                    </div>
                    <div className={styles.airportFooterItem}>
                        <span className={styles.airportStartPrice}>
                            <Skeleton.Button active size="small" className={styles.airportStartPriceSkeleton} />
                        </span>
                        <a>
                            <Skeleton.Button active size="large" className={styles.airportFooterBtnSkeleton} />
                        </a>
                    </div>
                </div>
            </Col>
        </Row>
    )

    return (
        <div
            className={`${styles.airportCip} ${process.env.THEME_NAME === "TRAVELO" && styles.airportCipTravelo}`}
            >
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link as="/" href="/"><a><HomeOutlined /></a></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {props.cipInfo ? <span>تشریفات فرودگاهی</span> : <Skeleton.Button active size="small" className={styles.skeletonCipBreadcrumb} />}
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.whyCip}>
                {props.cipInfo?
                    <div className={styles.contentWhyCip}>
                        <AnimatedShowMore
                            height={300}
                            toggle={({ isOpen }) =>
                                isOpen ? <span>بستن <UpOutlined /></span> : <span>اطلاعات بیشتر <DownOutlined className={styles.BtnIcon}/></span>
                            }
                            speed={0}
                            shadowColor="transparent"
                            className={styles.contentWhyCip2}
                        >
                            <h2>تشریفات فرودگاهی(CIP)</h2>
                            {parse(`${props.cipInfo.Content.replace(/سفرانه/g,projectName).replace(/https:\/\/safaraneh.com\/fa\/hotels\/%d8%b1%d8%b2%d8%b1%d9%88-%d9%87%d8%aa%d9%84/g,"/").replace(/http:\/\/www.safaraneh.com/g,projectAddress).replace(/https:\/\/safaraneh.com/g,projectAddress)}`)}
                        </AnimatedShowMore>
                    </div>
                :
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2>تشریفات فرودگاهی(CIP)</h2>
                            <Skeleton className={styles.cipInfoParaghraphSkeleton} />
                        </Col>
                        {/* <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                            <div className={styles.moreAboutCip}>
                                <a href="#cip_service">
                                    <span>در مورد CIP</span>
                                    <span>بیشتر بدانید</span>
                                    <ArrowLeftIcon/>
                                </a>
                            </div>
                        </Col> */}
                    </Row>
                }
            </div>
            <div className={styles.airportCipList}>
                <h2>رزرو تشریفات فرودگاهی CIP</h2>
                {(props.cipAirPortList) ?
                    props.cipAirPortList.map(item => <Row key={item.id} className={styles.airportListItem}>
                        <Col xs={24} sm={8} style={{"backgroundImage":`url(${item.picture.path})`}} className={styles.airportItemImageBg}>
                            <Link as={"/"+item.url} href={"/"+item.url}><a></a></Link>
                        </Col>
                        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                            <div className={styles.airportItemContent}>
                                <Link as={"/"+item.url} href={"/"+item.url}>
                                    <a>
                                        <span className={styles.airportNameItem}>{item.name}</span>
                                    </a>
                                </Link>
                                <div className={styles.airportAddressItem}>
                                    <LocationCircleIcon/>
                                    {item.address}
                                </div>
                                <div className={styles.airportSummaryItem}>{item.description && <>
                                    {parse(`${item.description.replace(/سفرانه/g,projectName).replace(/https:\/\/safaraneh.com\/fa\/hotels\/%d8%b1%d8%b2%d8%b1%d9%88-%d9%87%d8%aa%d9%84/g,"/").replace(/http:\/\/www.safaraneh.com/g,projectAddress).replace(/https:\/\/safaraneh.com/g,projectAddress)}`)}
                                </>}</div>
                                <div className={styles.airportFooterItem}>
                                    {props.cipInfo ?
                                        item.availabilityPrice?
                                        <>
                                            <span className={styles.airportStartPrice}>
                                                {/* <small>{numberWithCommas(item.availabilityPrice.filter(item => item.boardPrice).map(x => x.boardPrice).sort()[0])} ریال</small> */}

                                                {numberWithCommas(item.availabilityPrice.filter(item => item.salePrice).map(x => x.salePrice).sort()[0])} ریال
                                                <span>شروع قیمت</span>
                                            </span>
                                        </>
                                        : <><span className={styles.airportStartPrice}><span>قیمت موجود نیست</span></span><div/></>
                                    :
                                        <Skeleton.Input active/>
                                    }
                                    <Link as={"/"+item.url} href={"/"+item.url}>
                                        <a>
                                        <Button>
                                            مشاهده جزئیات و رزرو
                                            <LeftOutlined className={styles.BtnIcon}/>
                                        </Button>
                                        </a>
                                    </Link>
                           
                                </div>
                            </div>
                        </Col>
                    </Row>
                )
                :
                    [1,2,3,4,5].map(item=>
                        <>
                            {skeletonCipItem}
                            {skeletonCipItem}
                            {skeletonCipItem}
                            {skeletonCipItem}
                            {skeletonCipItem}
                        </>
                    ) 
                }
            </div>
        </div>
    )
}

AirportCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
AirportCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(AirportCip)
