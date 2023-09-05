import React from 'react'
import PropTypes from 'prop-types'
import { Link, i18n, withTranslation } from '../../../../i18n'
import { Breadcrumb, Row, Col, Spin, Skeleton } from 'antd'
import { HomeOutlined, EnvironmentOutlined,StarFilled, MessageFilled } from '@ant-design/icons';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../../UI/LeafletMap/LeafletMap'), {
    ssr: false
});

import styles from '../../../styles/Cip.module.css'

const CipName = props => {
    const { t } = props;
    
    return (
        <div className={styles.cipName}>
            <Row gutter={[15,15]}>
                <Col xs={24} md={16}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link as="/" href="/">
                                <a>
                                    <HomeOutlined />
                                </a>
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                        {props.cipAirPortDetail ? <Link as="/cip-home" href="/cip-home">
                                <a><span>تشریفات فرودگاهی</span></a>
                            </Link> : <Skeleton.Button active size="small" className={styles.skeletonCipBreadcrumb} />}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <span> {props.cipAirPortDetail ? `خدمات CIP ${props.cipAirPortDetail.name}` : <Skeleton.Button active size="small" className={styles.skeletonCipBreadcrumb} />}</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        <Col>
                            {props.cipAirPortDetail ? <h1 className="xlarge-title">خدمات CIP {props.cipAirPortDetail.name}</h1> : <Skeleton.Button active size="large" className={styles.skeletonCipNameText} />}
                            {props.cipAirPortDetail ?<>
                                <div className="margin-top font-12">
                                    <EnvironmentOutlined className="margin-end-5" />
                                    {props.cipAirPortDetail.address}
                                </div>
                                </>
                            : 
                                <div className="margin-top font-12">
                                    <Skeleton.Button active size="small" className={styles.skeletonCipAddress} />
                                </div>
                            }
                        </Col>
                    </Row>                
                </Col>
                {!!props.mapInfo && <Col xs={24} md={8} className="cip-detail-map-wrapper">
                    <MapWithNoSSR mapInfo={props.mapInfo} />
                </Col>}
            </Row>
        </div>
    )
}

CipName.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
CipName.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(CipName)
