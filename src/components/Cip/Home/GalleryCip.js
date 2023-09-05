import React,{ useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import { Spin, Skeleton ,Row,Col} from 'antd'
import { i18n, withTranslation } from '../../../../i18n'
import ReactBnbGallery from 'react-bnb-gallery'

import styles from '../../../styles/Cip.module.css'

const GalleryCip = props => {
    const [galleryOpened, setGalleryOpened] = useState(false);
    const [visible, setVisible] = useState(false);
    const [currentImg, setCurrentImg] = useState(0);
    const { t } = props;

    const openGallery = (a) => {
        setCurrentImg(a);
        setGalleryOpened(true);
    }
    const closeGallery = () => {
        setGalleryOpened(false)
    }

    const showModal = () => {
        setVisible(true)
    };
    
    const handleCancel = () => {
        setVisible(false)
    };

    const photoArray = [
        {
            path: "https://cdn2.safaraneh.com/images/cip/ika/cip-ika-01.jpg"
        },
        {
            path: "https://cdn2.safaraneh.com/images/cip/ika/cip-ika-02.jpg"
        },
        {
            path: "https://cdn2.safaraneh.com/images/cip/thr/cip-thr-02.jpg"
        },
        {
            path: "https://cdn2.safaraneh.com/images/cip/tbz.jpg"
        },
        {
            path: "https://cdn2.safaraneh.com/images/cip/thr/cip-thr-04.jpg"
        },
        {
            path: "https://cdn2.safaraneh.com/images/cip/ika/cip-ika-04.jpg"
        },
        {
            path: "https://cdn2.safaraneh.com/images/cip/awh/cip-awh-02.jpg"
        },
        {
            path: "https://cdn2.safaraneh.com/images/cip/thr/cip-thr-07.jpg"
        }
    ]

    let photos = [];
    if (photoArray){
        for(let i=0 ; i< photoArray.length ; i++){
            let newItem = {};
            newItem.photo = photoArray[i].path;
            photos.push(newItem);
        }
    }

    return (
        props.cipInfo ?   
            <>
                <div className={styles.galleryCip}>
                        <div className={styles.mosaicGallaryCip}>
                            <div className={styles.colMosaic}>
                                <div className={styles.largeMosaic}>
                                    <div className={styles.imageLargeMosaic}>
                                        <img src="https://cdn2.safaraneh.com/images/cip/ika/cip-ika-01.jpg" className="full-width" alt="" onClick={()=>openGallery(0)} />
                                    </div>
                                </div>
                                <div className={styles.xSmallMosaic}>
                                    <div className={styles.imageXSmallMosaic}>
                                        <img src="https://cdn2.safaraneh.com/images/cip/ika/cip-ika-02.jpg" className="full-width" alt="" onClick={()=>openGallery(1)}/>
                                    </div>
                                    <div className={styles.imageXSmallMosaic}>
                                        <img src="https://cdn2.safaraneh.com/images/cip/thr/cip-thr-02.jpg" className="full-width" alt="" onClick={()=>openGallery(2)} />
                                    </div>
                                    <div className={styles.imageXSmallMosaic}>
                                        <img src="https://cdn2.safaraneh.com/images/cip/tbz.jpg" alt="" onClick={()=>openGallery(3)}/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.colMosaic}>
                                <div className={styles.smallMosaic}>
                                    <div className={styles.imageSmallMosaic}>
                                        <img src="https://cdn2.safaraneh.com/images/cip/thr/cip-thr-04.jpg" className="full-width" alt="" onClick={()=>openGallery(4)} />
                                    </div>
                                    <div className={styles.imageSmallMosaic}>
                                        <img src="https://cdn2.safaraneh.com/images/cip/ika/cip-ika-04.jpg" className="full-width" alt="" onClick={()=>openGallery(5)} />
                                    </div>
                                </div>
                                <div className={styles.smallMosaic}>
                                    <div className={styles.imageSmallMosaic}>
                                        <img src="https://cdn2.safaraneh.com/images/cip/awh/cip-awh-02.jpg" className="full-width" alt="" onClick={()=>openGallery(6)} />
                                    </div>
                                    <div className={styles.imageSmallMosaic}>
                                        <img src="https://cdn2.safaraneh.com/images/cip/thr/cip-thr-07.jpg" className="full-width" alt="" onClick={()=>openGallery(7)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <ReactBnbGallery
                    show={galleryOpened}
                    photos={photos}
                    onClose={closeGallery} 
                    showThumbnails={true}
                    activePhotoIndex={currentImg}
                />
            </>
        :
        <div className={styles.galleryCip}>
            <div className={styles.mosaicGallaryCip}>
                <div className={styles.colMosaic}>
                    <div className={styles.largeMosaic}>
                        <div className={styles.imageLargeMosaic}>
                            <Skeleton.Image className={styles.imageLargeMosaicSkeleton} />
                        </div>
                    </div>
                    <div className={styles.xSmallMosaic}>
                        <div className={styles.imageXSmallMap}>
                            <Skeleton.Image className={styles.imageXSmallMapSkeleton} />
                        </div>
                        <div className={styles.imageXSmallMosaic}>
                            <Skeleton.Image className={styles.imageXSmallMosaicSkeleton} />
                        </div>
                        <div className={styles.imageXSmallMosaic}>
                            <Skeleton.Image className={styles.imageXSmallMosaicSkeleton} />
                        </div>
                    </div>
                </div>
                <div className={styles.colMosaic}>
                    <div className={styles.smallMosaic}>
                        <div className={styles.imageSmallMosaic}>
                            <Skeleton.Image className={styles.imageSmallMosaicSkeleton} />
                        </div>
                        <div className={styles.imageSmallMosaic}>
                            <Skeleton.Image className={styles.imageSmallMosaicSkeleton} />
                        </div>
                    </div>
                    <div className={styles.smallMosaic}>
                        <div className={styles.imageSmallMosaic}>
                            <Skeleton.Image className={styles.imageSmallMosaicSkeleton} />
                        </div>
                        <div className={styles.imageSmallMosaic}>
                            <Skeleton.Image className={styles.imageSmallMosaicSkeleton} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

GalleryCip.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

GalleryCip.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(GalleryCip)
