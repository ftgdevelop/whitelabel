import React from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation } from '../../../../i18n'
import { Row, Col,Card,Skeleton } from 'antd'

import styles from '../../../styles/Cip.module.css'

const FacilitiesCip = props => {
    const { t } = props;
    return (
        <div className={`${styles.facilitiesCip} ${process.env.THEME_NAME === "TRAVELO" && styles.facilitiesCipTravelo}`}  id="anchorfacilityairport">
            <h3>امکانات فرودگاه</h3>
            <div className={styles.content}>
                {props.cipAirPortDetail ?
                props.cipAirPortDetail?.facilities.map(item=><div key={item.id} className={styles.categoryCip}>
                        <Row>
                            {item.picture && item.picture.path && 
                                <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                                    <div className={styles.subject}>
                                        <img 
                                            src={item.picture?.path || "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDU1LjQzMSA0NTUuNDMxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTUuNDMxIDQ1NS40MzE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiM4REM2NDA7IiBkPSJNNDA1LjQ5Myw0MTIuNzY0Yy02OS42ODksNTYuODg5LTI4Ny4yODksNTYuODg5LTM1NS41NTYsMGMtNjkuNjg5LTU2Ljg4OS02Mi41NzgtMzAwLjA4OSwwLTM2NC4wODkNCglzMjkyLjk3OC02NCwzNTUuNTU2LDBTNDc1LjE4MiwzNTUuODc2LDQwNS40OTMsNDEyLjc2NHoiLz4NCjxnIHN0eWxlPSJvcGFjaXR5OjAuMjsiPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjI5LjEzOCwzMTMuMjA5Yy02Mi41NzgsNDkuNzc4LTEzMi4yNjcsNzUuMzc4LTE5Ny42ODksNzYuOA0KCQljLTQ4LjM1Ni04Mi40ODktMzguNC0yODMuMDIyLDE4LjQ4OS0zNDEuMzMzYzUxLjItNTIuNjIyLDIxMS45MTEtNjIuNTc4LDMwNC4zNTYtMjkuODY3DQoJCUMzNzcuMDQ5LDExMi42NzYsMzMwLjExNiwyMzIuMTQyLDIyOS4xMzgsMzEzLjIwOXoiLz4NCjwvZz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMTk1LjAwNCwzNTQuNDUzYy05Ljk1NiwwLTE5LjkxMS00LjI2Ny0yNS42LTEyLjhsLTc5LjY0NC0xMDIuNA0KCWMtMTEuMzc4LTE0LjIyMi04LjUzMy0zNC4xMzMsNS42ODktNDUuNTExczM0LjEzMy04LjUzMyw0NS41MTEsNS42ODlsNTQuMDQ0LDY5LjY4OWwxMTkuNDY3LTE1NS4wMjINCgljMTEuMzc4LTE0LjIyMiwzMS4yODktMTcuMDY3LDQ1LjUxMS01LjY4OXMxNy4wNjcsMzEuMjg5LDUuNjg5LDQ1LjUxMUwyMjAuNjA0LDM0MS42NTMNCglDMjEzLjQ5MywzNDguNzY0LDIwNC45NiwzNTQuNDUzLDE5NS4wMDQsMzU0LjQ1M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K"} 
                                            alt={item.picture?.altAttribute}
                                            title={item.picture?.titleAttribute}
                                            />
                                        <h6>{item.picture?.name}</h6>
                                    </div>
                                </Col>
                            }
                            <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                                <div className={styles.list}>
                                    <ul>
                                        {item.description.split(',').map(facilityItem=><li key={facilityItem}>
                                            <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDU1LjQzMSA0NTUuNDMxIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0NTUuNDMxIDQ1NS40MzE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiM4REM2NDA7IiBkPSJNNDA1LjQ5Myw0MTIuNzY0Yy02OS42ODksNTYuODg5LTI4Ny4yODksNTYuODg5LTM1NS41NTYsMGMtNjkuNjg5LTU2Ljg4OS02Mi41NzgtMzAwLjA4OSwwLTM2NC4wODkNCglzMjkyLjk3OC02NCwzNTUuNTU2LDBTNDc1LjE4MiwzNTUuODc2LDQwNS40OTMsNDEyLjc2NHoiLz4NCjxnIHN0eWxlPSJvcGFjaXR5OjAuMjsiPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjI5LjEzOCwzMTMuMjA5Yy02Mi41NzgsNDkuNzc4LTEzMi4yNjcsNzUuMzc4LTE5Ny42ODksNzYuOA0KCQljLTQ4LjM1Ni04Mi40ODktMzguNC0yODMuMDIyLDE4LjQ4OS0zNDEuMzMzYzUxLjItNTIuNjIyLDIxMS45MTEtNjIuNTc4LDMwNC4zNTYtMjkuODY3DQoJCUMzNzcuMDQ5LDExMi42NzYsMzMwLjExNiwyMzIuMTQyLDIyOS4xMzgsMzEzLjIwOXoiLz4NCjwvZz4NCjxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMTk1LjAwNCwzNTQuNDUzYy05Ljk1NiwwLTE5LjkxMS00LjI2Ny0yNS42LTEyLjhsLTc5LjY0NC0xMDIuNA0KCWMtMTEuMzc4LTE0LjIyMi04LjUzMy0zNC4xMzMsNS42ODktNDUuNTExczM0LjEzMy04LjUzMyw0NS41MTEsNS42ODlsNTQuMDQ0LDY5LjY4OWwxMTkuNDY3LTE1NS4wMjINCgljMTEuMzc4LTE0LjIyMiwzMS4yODktMTcuMDY3LDQ1LjUxMS01LjY4OXMxNy4wNjcsMzEuMjg5LDUuNjg5LDQ1LjUxMUwyMjAuNjA0LDM0MS42NTMNCglDMjEzLjQ5MywzNDguNzY0LDIwNC45NiwzNTQuNDUzLDE5NS4wMDQsMzU0LjQ1M3oiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K" />
                                            <span>{facilityItem}</span>
                                        </li>)}
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    )
                :
                <>
                    <div className={styles.categoryCip}>
                        <Row>
                            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                <Skeleton.Image className={styles.imageCategoryCipSkeleton} />
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={18} xl={18}>
                                <div className={styles.list}>
                                    <ul>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                <Skeleton.Image className={styles.imageCategoryCipSkeleton} />
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={18} xl={18}>
                                <div className={styles.list}>
                                    <ul>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                        <li>
                                            <Skeleton.Button active size="small" className={styles.skeletonListCategoryCip} />
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </> }
            </div>
        </div>
    )
}

FacilitiesCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
FacilitiesCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(FacilitiesCip)
