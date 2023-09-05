import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { i18n, withTranslation, Link } from '../../../../i18n'
import { Modal, Skeleton } from 'antd'
import ReactBnbGallery from 'react-bnb-gallery'
import parse from 'html-react-parser';
import dynamic from 'next/dynamic';
import defaultBanner from '../../../assets/defaultHotel.svg';
import styles from '../../../styles/Hotel.module.css'
import { GalleryIcon } from '../../UI/Icons'
import Image from 'next/image'

const MapWithNoSSR = dynamic(() => import('../../UI/LeafletMap/LeafletMap'), {
    ssr: false
});

const GalleryHotel = props => {
    const [galleryOpened,setGalleryOpened] = useState(false);
    const [visible,setVisible] = useState(false);
    const [currentImg, setCurrentImg] = useState(0);
    
    // const [isMounted,setMounted]=useState(false);
    // useEffect(()=>{
    //     setMounted(true);
    // },[]);

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

    const { t } = props;

    const photoArray = props.images;
    let photos = [];
    for(let i=0 ; i< photoArray.length ; i++){
        let newItem = {};
        newItem.photo = photoArray[i].Image;
        newItem.caption = photoArray[i].Title;
        newItem.subcaption = photoArray[i].Alt;
        newItem.thumbnail = photoArray[i].Image;
        photos.push(newItem);
    }
        
    let topComment;
    if (props.score && props.score.Comments && (props.score.Comments.length>0)){
        topComment = props.score.Comments[0].Comment;
    }
    return (
        <div
            className={`${styles.gallaryHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.gallaryHotelTravelo}`}
            id="anchorgalleryhotel"
            >
            <div                
                className={`${styles.fluidContainer} ${process.env.THEME_NAME === "TRAVELO" && styles.container}`}
                >
                {props.loading ? 
                    <div className={styles.mosaicGallaryHotel}>
                        <div className={styles.colMosaic}>
                            <div className={styles.largeMosaic}>
                                <div className={styles.imageLargeMosaic}>
                                    <Skeleton.Image className={styles.imageLargeMosaicSkeleton} />
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
                :
                <>
                {
                    (photos.length > 5 )?
                    <div className={styles.mosaicGallaryHotel}>
                        <div className={styles.colMosaic}>
                            <div className={`${styles.largeMosaic} hotel-image-large-mosaic`} onContextMenu={(e)=> e.preventDefault()}>
                                <div
                                    className={`${styles.imageLargeMosaic}`}
                                    onClick={()=>openGallery(0)}
                                    >
                                        <Image
                                            layout='fill'
                                            src={ photos[0].thumbnail }
                                            alt={photos[0].subcaption && photos[0].subcaption}
                                            title={photos[0].subcaption && photos[0].subcaption}
                                        />
                                    {/* <img 
                                        src={ photos[0].thumbnail }
                                        alt={photos[0].subcaption && photos[0].subcaption}
                                        title={photos[0].subcaption && photos[0].subcaption}
                                        /> */}
                                </div>
                            </div>
                            {process.env.THEME_NAME === "TAJAWAL" &&
                                <div className={styles.xSmallMosaic}>
                                    {
                                    (props.mapInfo.lat === 0) && (props.mapInfo.lang === 0)?
                                    null:
                                    <>
                                        <div className={styles.imageXSmallMap} onClick={showModal}>
                                            <span className={styles.textViewMap}>{t('show-hotel-on-map')}</span>
                                            <img alt="img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjc5Ljk2OSIgaGVpZ2h0PSI5MSI+CiAgICA8ZGVmcz4KICAgICAgICA8cmVjdCBpZD0iYSIgd2lkdGg9IjI3OS45NjkiIGhlaWdodD0iOTEiIC8+CiAgICAgICAgPGZpbHRlciBpZD0iYiIgd2lkdGg9IjI3OS45NjkiIGhlaWdodD0iOTEiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgICAgICAgIDxmZU9mZnNldCBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIC8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMSAwIi8+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxtYXNrIGlkPSJjIiBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjYSIvPgogICAgICAgIDwvbWFzaz4KICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNiKSIgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+CiAgICAgICAgPGcgbWFzaz0idXJsKCNjKSI+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNENEU4RjQiIGQ9Ik0uMDE1IDIyOS41MzdoMjc5Ljk3Vi4wMTNILjAxNXoiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTS4wMTUgMjI5LjUzN2gyNzkuOTdWLjAxM0guMDE1eiIvPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjQ0VDRUM4IiBkPSJNMCAyMjkuNTI0aDI3OS45N1YwSDB6Ii8+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiM5NkJCRTciIGQ9Ik04OC4wMTggMjI5LjUzN2w3OC4wODktNDEuODE2YzMuNDk3LTEuODcyIDYuNjQtNC4xMTcgOS4zNjUtNi42NDlhNDAuNjAzIDQwLjYwMyAwIDAgMCAzLjI4NS0zLjQyMiAzOC4wNzIgMzguMDcyIDAgMCAwIDMuNzYyLTUuMjQyYzIuNTI0LTQuMjUyIDQuMDk5LTguODkgNC41NTMtMTMuNjc0IDEuOTg3LTIwLjkxIDE4LjkyLTM4LjgzMyA0My4xNC00NS42NjNsNDkuNzczLTE0LjAzNHYxNS4yNjVsLTQ0LjAzIDEyLjQxNmMtMTcuNTc2IDQuOTU1LTI5Ljg2NSAxNy45NjEtMzEuMzA1IDMzLjEzNS0uNTAyIDUuMjgtMiAxMC41MDYtNC4zOTkgMTUuNDMzYTQ5LjA3MyA0OS4wNzMgMCAwIDEtMy4wMTQgNS4zMSA0OS41NTIgNDkuNTUyIDAgMCAxLTIuMjQ5IDMuMTcxYy0uMTA3LjE0LS4yMTYuMjgtLjMyNS40Mi00Ljg3IDYuMjA1LTExLjM2OCAxMS41NzctMTguOTA1IDE1LjYxNGwtNTUuNTMyIDI5LjczNkg4OC4wMTh6TTE2NC44MDUuMDEzaDExNS4xOHYyOS42NjZjLTExLjkzMiAxLjE0Mi00Mi4wNjYgMy40MS02Ni4wODYuMDMtMjEuNDkyLTMuMDI0LTM5Ljk2Ny0xOS44ODItNDkuMDk0LTI5LjY5NnoiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI0UyRTVFNyIgZD0iTTM4LjcwNSA2My44ODZsNDUuMDg5IDIwLjQ0NyAyLjc5LTEuNDE2aC4wMDJsODQuNTgzLTQyLjkwNS0yMy4yODYtMzEuNDA1LTEwOS4xNzggNTUuMjh6bS04LjAyMyA0LjA2M0wuMDE1IDgzLjQ3NnYtNy45MjNsMjIuNDEyLTExLjM0OEwuMDE1IDU0LjA0M3YtNy43MDFMMzAuNDUgNjAuMTQzIDE0My42MSAyLjg0N2wtMi4xLTIuODM0aDkuNjA4bDI4LjMyNiAzOC4yMDJoMTAwLjU0djYuNzEySDE3Ny4xMDlsLTI1LjA3NyAxMi43MiAzNS43NjUgNDguMzYgOTIuMTg5LTI4LjE5djcuMTg1bC05MC4zMyAyNy42Mi0yMS40NzQgNTUuNDAzLTIuNDY2IDEuMzE1LTMuNTkyIDEuOTE1LS4yNi4xNC4yMDEuMDMyIDM3LjA3IDUuOTkgODAuODUgMTMuMDY5djYuODY4bC04NC45MjYtMTMuNzI2LTE5LjA4OC0zLjA4NS0yMy43ODgtMy44NDUtLjIwNS0uMDMzLS4zNTQuMTg5LTk4LjE1MSA1Mi4zM0gzOC40MDlsNjYuNTQ5LTM1LjQ4Mi02MC4zMDItODEuNTktNDQuNjQgMjIuNjQ0di03LjkyN2w3NC44NzMtMzcuOTguODQ3LS40MjkuMDQyLS4wMjItNDUuMDk2LTIwLjQ1em0xMTMuMzggMTA0LjkwM2wtNjEuMS04MC4xNy0uMDc4LjA0LS44NzEuNDQyLTMwLjM1OCAxNS4zOTkgNjAuMjA2IDgxLjQ1OSAzMi4yMDItMTcuMTd6bTYuODkzLTMuNjc0bDEwLjI4My01LjQ4MyAyMC40OS01Mi44NjItMzYuNzA1LTQ5LjYzLTU1LjA3IDI3LjkzNCA2MS4wMDIgODAuMDR6TS4wMTUgMjQuMjM1TDQ3Ljc0NC4wMTNoMTUuNjg1TC4wMTUgMzIuMTk2di03Ljk2eiIvPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjQTJDMDg5IiBkPSJNLjAxNS4wMTNoMjcuMTc4TC4wMTUgMTMuODA1Vi4wMTN6bTAgMTUwLjEyNmwyMS0xMC42NWMyLjU5My0xLjMxNiA1Ljc4My0xLjU2IDguNjI2LS42NjIgOC4xMjggMi41NjcgMTUuMzkgNi41MDQgMjEuMzgxIDExLjQ3NCA1Ljk5MiA0Ljk3MiAxMC43MTIgMTAuOTc3IDEzLjc1NCAxNy42OCAyLjU0IDUuNTk1IDMuODMgMTEuNTA0IDMuODMgMTcuNDQgMCAyLjI4LS4xOTEgNC41NjMtLjU3MyA2LjgzNWwtMS4yOSA3LjY2MmMtLjM4NiAyLjI5OC0xLjk2NiA0LjM0NS00LjMzIDUuNjE0bC00NC43NjkgMjQuMDA1SC4wMTV2LTc5LjM5OHptMTgxLjEzNi05NS42NjNoODIuOTA1YzEuMTc0IDAgMi4xMjQuNzc4IDIuMTI0IDEuNzM4djE0LjkzYzAgLjczMy0uNTY0IDEuMzg5LTEuNDA5IDEuNjM2bC03MS4yOSAyMC44NWMtLjk0NS4yNzctMS45OTgtLjAyNS0yLjUyNC0uNzI1TDE2OC4xNCA2Mi41NjJjLS42MjItLjgyNy0uMjk1LTEuOTEuNzI1LTIuNDA3bDExLjIwMi01LjQzNmEyLjQ4IDIuNDggMCAwIDEgMS4wODQtLjI0M3ptNTMuOTcgMTc1LjA2bDEuMjgyLTUuNDM4YzMuMjExLTEzLjYyIDE5LjM2My0yMi41NCAzNi4wNzUtMTkuOTIybDcuNTA3IDEuMTc2djI0LjE4NUgyMzUuMTJ6Ii8+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNCQkJCQjciIGQ9Ik0xNjcuMTU0IDExOC41OTRsLTkuNTQgMjQuNjcyYy0xLjQzNSAzLjcxMy03LjUyOCA0LjMwNi05Ljk4Ljk3MmwtMzUuMDY4LTQ3LjY4M2MtMi40NDUtMy4zMjUtMS4yMDUtNy42NDUgMi43OS05LjcyM2wxNy4yNC04Ljk2N2M0LjEyMi0yLjE0MyA5LjU4NS0xLjA4MyAxMi4xIDIuMzUxbDIxLjA4IDI4Ljc2OWMyLjEyIDIuODkyIDIuNjIxIDYuMzkyIDEuMzc4IDkuNjA5em0tNDMuNzktNjIuNTc1Yy0uODg0LjQ0NC0yLjAzNi4yMTItMi41NzQtLjUxOGwtMTIuMjI0LTE2LjYwN2MtLjUzOC0uNzMtLjI1Ni0xLjY4MS42MjgtMi4xMjRsMzQuMDctMTcuMDgyYy44ODQtLjQ0MiAyLjAzNi0uMjEgMi41NzMuNTE5bDEyLjIyNSAxNi42MDhjLjUzNi43My4yNTUgMS42OC0uNjI5IDIuMTIzbC0zNC4wNyAxNy4wODF6bS00My4yMDctNC4wOWwuMDE3LjAyNCAxOC42MzUtOS4yOTYuMDA4LjAxYy44NS0uNDI1IDEuOTU5LS4yMDIgMi40NzcuNDk2bDEyLjM0NSAxNi42OWMuNTE3LjY5OS4yNDYgMS42MS0uNjA1IDIuMDM0bC03Ljg1IDMuOTE2Yy0uODUuNDI0LTEuOTU4LjIwMi0yLjQ3NS0uNDk3bC0zLjAwNC00LjA2Yy0uNTE3LS42OTktMS42MjYtLjkyMi0yLjQ3Ny0uNDk3bC02LjE2NCAzLjA3NGMtLjg1LjQyNS0xLjEyMSAxLjMzNi0uNjA1IDIuMDM1bDIuOTc5IDQuMDI2Yy41MTcuNjk5LjI0NiAxLjYxLS42MDUgMi4wMzRsLTcuODUgMy45MTZjLS44NS40MjQtMS45NTguMjAyLTIuNDc1LS40OTdsLTEyLjM0Ni0xNi42OWMtLjUxNy0uNjk4LS4yNDYtMS42MDkuNjA1LTIuMDMzbDkuMzktNC42ODR6bTMzLjkwMi00My41NmMuNTQuNzI5LjI1NiAxLjY3OC0uNjMyIDIuMTJMODIuMzYxIDI1Ljk2Yy0uODg4LjQ0Mi0yLjA0NS4yMS0yLjU4NS0uNTE3bC00Ljg1OC02LjU1NWMtLjUzOC0uNzI4LS4yNTYtMS42NzcuNjMyLTIuMTJsMzEuMDY2LTE1LjQ2OWMuODg4LS40NDIgMi4wNDYtLjIxIDIuNTg2LjUxOGw0Ljg1NyA2LjU1M3ptLTQ4LjYzLTIuNTRjLS41NC0uNzI1LS4yNTgtMS42NzIuNjMtMi4xMTJMNzMuNTMuMDEzaDI1LjI3NGwtMjUuOTMgMTIuODYxYy0uODg5LjQ0MS0yLjA0Ny4yMS0yLjU4Ny0uNTE2TDY1LjQzIDUuODN6bS0zMy45NDcgNDUuMjRjLS44ODQuNDQyLTIuMDM2LjIxLTIuNTczLS41MThMMTYuNjggMzMuOTU3Yy0uNTM4LS43MjktLjI1Ni0xLjY3OC42MjgtMi4xMjFsMzguMzc5LTE5LjIyYy44ODUtLjQ0MyAyLjAzNy0uMjEyIDIuNTc1LjUxN0w3MC40OSAyOS43MjdjLjUzNi43MjguMjU1IDEuNjc4LS42MyAyLjEyMWwtMzguMzc5IDE5LjIyek0uMDE1IDkxLjI5N2wyOC4wMTYtMTMuOTYzYy44ODctLjQ0MSAyLjA0NC0uMjEgMi41ODIuNTE3TDQyLjg4IDk0LjQxOGMuNTQuNzI3LjI1NyAxLjY3NS0uNjMgMi4xMThMMS40OSAxMTYuODVjLS40Ni4yMjktLjk5My4yNzctMS40NzUuMTY3di0yNS43MnptMTk0LjEyNCAxMzguMjRsNC40MjQtMTguOTQyYy4yNDUtMS4wNSAxLjQ3OC0xLjczNyAyLjc1My0xLjUzNWwyNy4xNTIgNC4yOTRjMS4yNzQuMjAxIDIuMTEgMS4yMTUgMS44NjQgMi4yNjVsLTMuMjUgMTMuOTE4SDE5NC4xNHptOS4yNS0yNS43ODdjLTEuMjgxLS4yLTIuMTItMS4xOTgtMS44NzQtMi4yMzFsMS41NS02LjUwOWMuMjQ3LTEuMDM0IDEuNDg0LTEuNzEgMi43NjQtMS41MTJsMjYuOTQ0IDQuMThjMS4yOC4xOTggMi4xMTkgMS4xOTcgMS44NzMgMi4yM2wtMS41NSA2LjUxYy0uMjQ2IDEuMDMzLTEuNDgzIDEuNzEtMi43NjQgMS41MTFsLTI2Ljk0NC00LjE4em01NS4yMDUtMjYuNzMxYy0xLjI3Mi0uMi0yLjEwNy0xLjIwNS0xLjg2MS0yLjI0NGwzLjYzOS0xNS40NzVjLjI0NC0xLjA0IDEuNDc1LTEuNzIxIDIuNzQ2LTEuNTJsMTYuODY3IDIuNjQ4djE5Ljk1bC0yMS4zOS0zLjM1OXptLTExLjY0My0yNy4yNjhjLTEuMjc1LS4xOTktMi4xMTItMS4yMDMtMS44NjYtMi4yNGwzLjY0OS0xNS40NDZjLjI0Ni0xLjAzNyAxLjQ3OS0xLjcxOCAyLjc1NS0xLjUxOGwyOC40OTYgNC40NTV2MTkuOTEzbC0zMy4wMzQtNS4xNjR6bS0yOS43NzQgMjAuMDg4Yy0xLjI3LS4yLTIuMTAxLTEuMjEtMS44NTgtMi4yNTVsMS45MzMtOC4yNzZjLjI0NC0xLjA0NSAxLjQ3Mi0xLjczIDIuNzQxLTEuNTI5bDI2LjE2OSA0LjEzOGMxLjI3LjIwMiAyLjEwMSAxLjIxMSAxLjg1OCAyLjI1N2wtMS45MzMgOC4yNzRjLS4yNDQgMS4wNDYtMS40NzIgMS43My0yLjc0MSAxLjUzbC0yNi4xNjktNC4xMzl6TTc2LjcxMiAxMjUuMzNjLS42NzUtLjkxMy0uMzE4LTIuMS43OTctMi42NTFMODguOTc0IDExN2MxLjExNS0uNTUyIDIuNTY1LS4yNiAzLjI0LjY1M2wyMC45MTUgMjguM2MuNjc0LjkxMi4zMTggMi4xLS43OTggMi42NTJsLTExLjQ2NSA1LjY3OGMtMS4xMTQuNTUyLTIuNTY0LjI2LTMuMjM4LS42NTJsLTIwLjkxNi0yOC4zMDJ6bTI2LjMyNyAzNS43MjNjLS43LS45NDYtLjMzLTIuMTc2LjgyNy0yLjc0OGwxMS4yNi01LjU3NWMxLjE1NS0uNTcyIDIuNjYtLjI3IDMuMzU4LjY3Nmw4Ljc4IDExLjg3M2MyLjU4IDMuNDkgMS4yMTUgOC4wMzEtMy4wNTEgMTAuMTQyLTQuMjY1IDIuMTEyLTkuODE0Ljk5NC0xMi4zOTUtMi40OTVsLTguNzgtMTEuODczem0tMzcuOTc0LTUwLjk4NmMtLjY3Ni0uOTA2LS4zMTgtMi4wODUuOC0yLjYzM2wxMS41MDUtNS42NDNjMS4xMTgtLjU0OCAyLjU3NC0uMjU5IDMuMjUuNjQ5bDUuMzMgNy4xNDJjLjY3Ny45MDYuMzE5IDIuMDg1LS44IDIuNjM0bC0xMS41MDQgNS42NDJjLTEuMTE4LjU0OS0yLjU3NC4yNTgtMy4yNS0uNjQ4bC01LjMzLTcuMTQzem0xMDkuNjYyIDExOS40N2w1LjA0NS0yMS43NjZjLjI0NC0xLjA1MyAxLjQ3LTEuNzQxIDIuNzM5LTEuNTRsNS44NDguOTMyYzEuMjY4LjIwMyAyLjEgMS4yMiAxLjg1NSAyLjI3MmwtNC42NiAyMC4xMDNoLTEwLjgyN3oiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=" />
                                        </div>
                                        <Modal
                                            title={`${props.hotelDetails.HotelCategoryName} ${props.hotelDetails.HotelName} ${props.hotelDetails.CityName} ${t('on-the-map')}`}
                                            open={visible}
                                            onCancel={handleCancel}
                                            footer={null}
                                            >
                                                <div className="mapModal">
                                                <MapWithNoSSR mapInfo={props.mapInfo}/>
                                                </div>
                                        </Modal>
                                    </>
                                    }
                                    <div className={styles.imageXSmallMosaic} onClick={()=>openGallery(1)} onContextMenu={(e)=> e.preventDefault()}>
                                        <img 
                                            src={ photos[1].thumbnail }
                                            alt={photos[1].subcaption && photos[1].subcaption}
                                            title={photos[1].subcaption && photos[1].subcaption}
                                        />
                                    </div>
                                    <div className={styles.imageXSmallMosaic} onContextMenu={(e)=> e.preventDefault()}>
                                        <img 
                                            src={ photos[2].thumbnail }
                                            alt={photos[2].subcaption && photos[2].subcaption}
                                            title={photos[2].subcaption && photos[2].subcaption}
                                            onClick={()=>openGallery(2)} 
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={styles.colMosaic}>
                            <div className={styles.smallMosaic}>
                                <div className={styles.imageSmallMosaic} onClick={()=>openGallery(process.env.THEME_NAME === "TRAVELO" ? 1 : 3)} onContextMenu={(e)=> e.preventDefault()}>
                                    {/* <img 
                                        src={ photos[process.env.THEME_NAME === "TRAVELO" ? 1 : 3].thumbnail }
                                        alt={photos[process.env.THEME_NAME === "TRAVELO" ? 1 : 3].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 1 : 3].subcaption}
                                        title={photos[process.env.THEME_NAME === "TRAVELO" ? 1 : 3].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 1 : 3].subcaption}
                                    /> */}
                                    <Image
                                        layout='fill'
                                        src={ photos[process.env.THEME_NAME === "TRAVELO" ? 1 : 3].thumbnail }
                                        alt={photos[process.env.THEME_NAME === "TRAVELO" ? 1 : 3].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 1 : 3].subcaption}
                                        title={photos[process.env.THEME_NAME === "TRAVELO" ? 1 : 3].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 1 : 3].subcaption}
                                    />
                                </div>
                                <div className={styles.imageSmallMosaic} onClick={()=>openGallery(process.env.THEME_NAME === "TRAVELO" ? 2 : 4)} onContextMenu={(e)=> e.preventDefault()}>
                                    {process.env.THEME_NAME === "TAJAWAL" && topComment &&
                                        <div className={styles.commentSmallMosaic}>
                                            {parse(topComment)}
                                        </div>
                                        }
                                    {/* <img 
                                        src={ photos[process.env.THEME_NAME === "TRAVELO" ? 2 : 4].thumbnail } 
                                        alt={photos[process.env.THEME_NAME === "TRAVELO" ? 2 : 4].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 2 : 4].subcaption}
                                        title={photos[process.env.THEME_NAME === "TRAVELO" ? 2 : 4].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 2 : 4].subcaption}
                                    /> */}
                                    <Image
                                        layout='fill'
                                        src={ photos[process.env.THEME_NAME === "TRAVELO" ? 2 : 4].thumbnail } 
                                        alt={photos[process.env.THEME_NAME === "TRAVELO" ? 2 : 4].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 2 : 4].subcaption}
                                        title={photos[process.env.THEME_NAME === "TRAVELO" ? 2 : 4].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 2 : 4].subcaption}
                                    />
                                </div>
                            </div>
                            <div className={styles.smallMosaic}>
                                <div className={styles.imageSmallMosaic} onClick={()=>openGallery(process.env.THEME_NAME === "TRAVELO" ? 3 : 5)} onContextMenu={(e)=> e.preventDefault()}>
                                    {/* <img 
                                        src={ photos[process.env.THEME_NAME === "TRAVELO" ? 3 : 5].thumbnail } 
                                        alt={photos[process.env.THEME_NAME === "TRAVELO" ? 3 : 5].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 3 : 5].subcaption}
                                        title={photos[process.env.THEME_NAME === "TRAVELO" ? 3 : 5].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 3 : 5].subcaption}
                                    /> */}
                                    <Image
                                        layout='fill'
                                        src={ photos[process.env.THEME_NAME === "TRAVELO" ? 3 : 5].thumbnail } 
                                        alt={photos[process.env.THEME_NAME === "TRAVELO" ? 3 : 5].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 3 : 5].subcaption}
                                        title={photos[process.env.THEME_NAME === "TRAVELO" ? 3 : 5].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 3 : 5].subcaption}
                                    />
                                </div>
                                <div className={styles.imageSmallMosaic} onClick={()=>openGallery(process.env.THEME_NAME === "TRAVELO" ? 4 : 6)} onContextMenu={(e)=> e.preventDefault()}>
                                <button
                                    onClick={()=>openGallery(process.env.THEME_NAME === "TRAVELO" ? 4 : 6)}
                                    className={`${styles.toggleGalleryHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.toggleGalleryHotelTravelo}`}
                                    >
                                        {process.env.THEME_NAME === "TRAVELO" && <GalleryIcon />}
                                            {`+${photos.length} ${t("picture")}`}
                                        </button>
                                    {/* <img 
                                        src={ photos[process.env.THEME_NAME === "TRAVELO" ? 4 : 6].thumbnail }
                                        alt={photos[process.env.THEME_NAME === "TRAVELO" ? 4 : 6].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 4 : 6].subcaption}
                                        title={photos[process.env.THEME_NAME === "TRAVELO" ? 4 : 6].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 4 : 6].subcaption}
                                        onContextMenu={(e)=> e.preventDefault()}
                                    /> */}
                                    <Image
                                        layout='fill'
                                        src={ photos[process.env.THEME_NAME === "TRAVELO" ? 4 : 6].thumbnail }
                                        alt={photos[process.env.THEME_NAME === "TRAVELO" ? 4 : 6].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 4 : 6].subcaption}
                                        title={photos[process.env.THEME_NAME === "TRAVELO" ? 4 : 6].subcaption && photos[process.env.THEME_NAME === "TRAVELO" ? 4 : 6].subcaption}
                                        onContextMenu={(e)=> e.preventDefault()}
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={()=>openGallery(6)}
                            className={`${styles.mobileToggleGalleryHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.toggleGalleryHotelTravelo}`}
                            >
                                {process.env.THEME_NAME === "TRAVELO" && <GalleryIcon />}
                                    {`+${photos.length} ${t("picture")}`}
                                </button>
                    </div>
                    :(photos.length > 3 )?
                    <div className={styles.mosaicGallaryHotel}>
                        <div className={styles.colMosaic}>
                            <div className={styles.largeMosaic} onContextMenu={(e)=> e.preventDefault()}>
                                <div className={styles.imageLargeMosaic} onClick={()=>openGallery(0)}>
                                    {/* <img 
                                        src={ photos[0].thumbnail }
                                        alt={photos[0].subcaption && photos[0].subcaption}
                                        title={photos[0].subcaption && photos[0].subcaption}
                                    /> */}
                                    <Image
                                        layout='fill'
                                        src={ photos[0].thumbnail }
                                        alt={photos[0].subcaption && photos[0].subcaption}
                                        title={photos[0].subcaption && photos[0].subcaption}
                                    />
                                </div>
                            </div>
                            {process.env.THEME_NAME === "TAJAWAL" &&
                                <div className={styles.xSmallMosaic}>
                                    {
                                    (props.mapInfo.lat === 0) && (props.mapInfo.lang === 0)?
                                    null:
                                    <>
                                        <div className={styles.imageXSmallMap} onClick={showModal}>
                                            <span className={styles.textViewMap}>{t('show-hotel-on-map')}</span>
                                            <img alt="img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjc5Ljk2OSIgaGVpZ2h0PSI5MSI+CiAgICA8ZGVmcz4KICAgICAgICA8cmVjdCBpZD0iYSIgd2lkdGg9IjI3OS45NjkiIGhlaWdodD0iOTEiIC8+CiAgICAgICAgPGZpbHRlciBpZD0iYiIgd2lkdGg9IjI3OS45NjkiIGhlaWdodD0iOTEiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgICAgICAgIDxmZU9mZnNldCBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIC8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMSAwIi8+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxtYXNrIGlkPSJjIiBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjYSIvPgogICAgICAgIDwvbWFzaz4KICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNiKSIgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+CiAgICAgICAgPGcgbWFzaz0idXJsKCNjKSI+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNENEU4RjQiIGQ9Ik0uMDE1IDIyOS41MzdoMjc5Ljk3Vi4wMTNILjAxNXoiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTS4wMTUgMjI5LjUzN2gyNzkuOTdWLjAxM0guMDE1eiIvPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjQ0VDRUM4IiBkPSJNMCAyMjkuNTI0aDI3OS45N1YwSDB6Ii8+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiM5NkJCRTciIGQ9Ik04OC4wMTggMjI5LjUzN2w3OC4wODktNDEuODE2YzMuNDk3LTEuODcyIDYuNjQtNC4xMTcgOS4zNjUtNi42NDlhNDAuNjAzIDQwLjYwMyAwIDAgMCAzLjI4NS0zLjQyMiAzOC4wNzIgMzguMDcyIDAgMCAwIDMuNzYyLTUuMjQyYzIuNTI0LTQuMjUyIDQuMDk5LTguODkgNC41NTMtMTMuNjc0IDEuOTg3LTIwLjkxIDE4LjkyLTM4LjgzMyA0My4xNC00NS42NjNsNDkuNzczLTE0LjAzNHYxNS4yNjVsLTQ0LjAzIDEyLjQxNmMtMTcuNTc2IDQuOTU1LTI5Ljg2NSAxNy45NjEtMzEuMzA1IDMzLjEzNS0uNTAyIDUuMjgtMiAxMC41MDYtNC4zOTkgMTUuNDMzYTQ5LjA3MyA0OS4wNzMgMCAwIDEtMy4wMTQgNS4zMSA0OS41NTIgNDkuNTUyIDAgMCAxLTIuMjQ5IDMuMTcxYy0uMTA3LjE0LS4yMTYuMjgtLjMyNS40Mi00Ljg3IDYuMjA1LTExLjM2OCAxMS41NzctMTguOTA1IDE1LjYxNGwtNTUuNTMyIDI5LjczNkg4OC4wMTh6TTE2NC44MDUuMDEzaDExNS4xOHYyOS42NjZjLTExLjkzMiAxLjE0Mi00Mi4wNjYgMy40MS02Ni4wODYuMDMtMjEuNDkyLTMuMDI0LTM5Ljk2Ny0xOS44ODItNDkuMDk0LTI5LjY5NnoiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI0UyRTVFNyIgZD0iTTM4LjcwNSA2My44ODZsNDUuMDg5IDIwLjQ0NyAyLjc5LTEuNDE2aC4wMDJsODQuNTgzLTQyLjkwNS0yMy4yODYtMzEuNDA1LTEwOS4xNzggNTUuMjh6bS04LjAyMyA0LjA2M0wuMDE1IDgzLjQ3NnYtNy45MjNsMjIuNDEyLTExLjM0OEwuMDE1IDU0LjA0M3YtNy43MDFMMzAuNDUgNjAuMTQzIDE0My42MSAyLjg0N2wtMi4xLTIuODM0aDkuNjA4bDI4LjMyNiAzOC4yMDJoMTAwLjU0djYuNzEySDE3Ny4xMDlsLTI1LjA3NyAxMi43MiAzNS43NjUgNDguMzYgOTIuMTg5LTI4LjE5djcuMTg1bC05MC4zMyAyNy42Mi0yMS40NzQgNTUuNDAzLTIuNDY2IDEuMzE1LTMuNTkyIDEuOTE1LS4yNi4xNC4yMDEuMDMyIDM3LjA3IDUuOTkgODAuODUgMTMuMDY5djYuODY4bC04NC45MjYtMTMuNzI2LTE5LjA4OC0zLjA4NS0yMy43ODgtMy44NDUtLjIwNS0uMDMzLS4zNTQuMTg5LTk4LjE1MSA1Mi4zM0gzOC40MDlsNjYuNTQ5LTM1LjQ4Mi02MC4zMDItODEuNTktNDQuNjQgMjIuNjQ0di03LjkyN2w3NC44NzMtMzcuOTguODQ3LS40MjkuMDQyLS4wMjItNDUuMDk2LTIwLjQ1em0xMTMuMzggMTA0LjkwM2wtNjEuMS04MC4xNy0uMDc4LjA0LS44NzEuNDQyLTMwLjM1OCAxNS4zOTkgNjAuMjA2IDgxLjQ1OSAzMi4yMDItMTcuMTd6bTYuODkzLTMuNjc0bDEwLjI4My01LjQ4MyAyMC40OS01Mi44NjItMzYuNzA1LTQ5LjYzLTU1LjA3IDI3LjkzNCA2MS4wMDIgODAuMDR6TS4wMTUgMjQuMjM1TDQ3Ljc0NC4wMTNoMTUuNjg1TC4wMTUgMzIuMTk2di03Ljk2eiIvPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjQTJDMDg5IiBkPSJNLjAxNS4wMTNoMjcuMTc4TC4wMTUgMTMuODA1Vi4wMTN6bTAgMTUwLjEyNmwyMS0xMC42NWMyLjU5My0xLjMxNiA1Ljc4My0xLjU2IDguNjI2LS42NjIgOC4xMjggMi41NjcgMTUuMzkgNi41MDQgMjEuMzgxIDExLjQ3NCA1Ljk5MiA0Ljk3MiAxMC43MTIgMTAuOTc3IDEzLjc1NCAxNy42OCAyLjU0IDUuNTk1IDMuODMgMTEuNTA0IDMuODMgMTcuNDQgMCAyLjI4LS4xOTEgNC41NjMtLjU3MyA2LjgzNWwtMS4yOSA3LjY2MmMtLjM4NiAyLjI5OC0xLjk2NiA0LjM0NS00LjMzIDUuNjE0bC00NC43NjkgMjQuMDA1SC4wMTV2LTc5LjM5OHptMTgxLjEzNi05NS42NjNoODIuOTA1YzEuMTc0IDAgMi4xMjQuNzc4IDIuMTI0IDEuNzM4djE0LjkzYzAgLjczMy0uNTY0IDEuMzg5LTEuNDA5IDEuNjM2bC03MS4yOSAyMC44NWMtLjk0NS4yNzctMS45OTgtLjAyNS0yLjUyNC0uNzI1TDE2OC4xNCA2Mi41NjJjLS42MjItLjgyNy0uMjk1LTEuOTEuNzI1LTIuNDA3bDExLjIwMi01LjQzNmEyLjQ4IDIuNDggMCAwIDEgMS4wODQtLjI0M3ptNTMuOTcgMTc1LjA2bDEuMjgyLTUuNDM4YzMuMjExLTEzLjYyIDE5LjM2My0yMi41NCAzNi4wNzUtMTkuOTIybDcuNTA3IDEuMTc2djI0LjE4NUgyMzUuMTJ6Ii8+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNCQkJCQjciIGQ9Ik0xNjcuMTU0IDExOC41OTRsLTkuNTQgMjQuNjcyYy0xLjQzNSAzLjcxMy03LjUyOCA0LjMwNi05Ljk4Ljk3MmwtMzUuMDY4LTQ3LjY4M2MtMi40NDUtMy4zMjUtMS4yMDUtNy42NDUgMi43OS05LjcyM2wxNy4yNC04Ljk2N2M0LjEyMi0yLjE0MyA5LjU4NS0xLjA4MyAxMi4xIDIuMzUxbDIxLjA4IDI4Ljc2OWMyLjEyIDIuODkyIDIuNjIxIDYuMzkyIDEuMzc4IDkuNjA5em0tNDMuNzktNjIuNTc1Yy0uODg0LjQ0NC0yLjAzNi4yMTItMi41NzQtLjUxOGwtMTIuMjI0LTE2LjYwN2MtLjUzOC0uNzMtLjI1Ni0xLjY4MS42MjgtMi4xMjRsMzQuMDctMTcuMDgyYy44ODQtLjQ0MiAyLjAzNi0uMjEgMi41NzMuNTE5bDEyLjIyNSAxNi42MDhjLjUzNi43My4yNTUgMS42OC0uNjI5IDIuMTIzbC0zNC4wNyAxNy4wODF6bS00My4yMDctNC4wOWwuMDE3LjAyNCAxOC42MzUtOS4yOTYuMDA4LjAxYy44NS0uNDI1IDEuOTU5LS4yMDIgMi40NzcuNDk2bDEyLjM0NSAxNi42OWMuNTE3LjY5OS4yNDYgMS42MS0uNjA1IDIuMDM0bC03Ljg1IDMuOTE2Yy0uODUuNDI0LTEuOTU4LjIwMi0yLjQ3NS0uNDk3bC0zLjAwNC00LjA2Yy0uNTE3LS42OTktMS42MjYtLjkyMi0yLjQ3Ny0uNDk3bC02LjE2NCAzLjA3NGMtLjg1LjQyNS0xLjEyMSAxLjMzNi0uNjA1IDIuMDM1bDIuOTc5IDQuMDI2Yy41MTcuNjk5LjI0NiAxLjYxLS42MDUgMi4wMzRsLTcuODUgMy45MTZjLS44NS40MjQtMS45NTguMjAyLTIuNDc1LS40OTdsLTEyLjM0Ni0xNi42OWMtLjUxNy0uNjk4LS4yNDYtMS42MDkuNjA1LTIuMDMzbDkuMzktNC42ODR6bTMzLjkwMi00My41NmMuNTQuNzI5LjI1NiAxLjY3OC0uNjMyIDIuMTJMODIuMzYxIDI1Ljk2Yy0uODg4LjQ0Mi0yLjA0NS4yMS0yLjU4NS0uNTE3bC00Ljg1OC02LjU1NWMtLjUzOC0uNzI4LS4yNTYtMS42NzcuNjMyLTIuMTJsMzEuMDY2LTE1LjQ2OWMuODg4LS40NDIgMi4wNDYtLjIxIDIuNTg2LjUxOGw0Ljg1NyA2LjU1M3ptLTQ4LjYzLTIuNTRjLS41NC0uNzI1LS4yNTgtMS42NzIuNjMtMi4xMTJMNzMuNTMuMDEzaDI1LjI3NGwtMjUuOTMgMTIuODYxYy0uODg5LjQ0MS0yLjA0Ny4yMS0yLjU4Ny0uNTE2TDY1LjQzIDUuODN6bS0zMy45NDcgNDUuMjRjLS44ODQuNDQyLTIuMDM2LjIxLTIuNTczLS41MThMMTYuNjggMzMuOTU3Yy0uNTM4LS43MjktLjI1Ni0xLjY3OC42MjgtMi4xMjFsMzguMzc5LTE5LjIyYy44ODUtLjQ0MyAyLjAzNy0uMjEyIDIuNTc1LjUxN0w3MC40OSAyOS43MjdjLjUzNi43MjguMjU1IDEuNjc4LS42MyAyLjEyMWwtMzguMzc5IDE5LjIyek0uMDE1IDkxLjI5N2wyOC4wMTYtMTMuOTYzYy44ODctLjQ0MSAyLjA0NC0uMjEgMi41ODIuNTE3TDQyLjg4IDk0LjQxOGMuNTQuNzI3LjI1NyAxLjY3NS0uNjMgMi4xMThMMS40OSAxMTYuODVjLS40Ni4yMjktLjk5My4yNzctMS40NzUuMTY3di0yNS43MnptMTk0LjEyNCAxMzguMjRsNC40MjQtMTguOTQyYy4yNDUtMS4wNSAxLjQ3OC0xLjczNyAyLjc1My0xLjUzNWwyNy4xNTIgNC4yOTRjMS4yNzQuMjAxIDIuMTEgMS4yMTUgMS44NjQgMi4yNjVsLTMuMjUgMTMuOTE4SDE5NC4xNHptOS4yNS0yNS43ODdjLTEuMjgxLS4yLTIuMTItMS4xOTgtMS44NzQtMi4yMzFsMS41NS02LjUwOWMuMjQ3LTEuMDM0IDEuNDg0LTEuNzEgMi43NjQtMS41MTJsMjYuOTQ0IDQuMThjMS4yOC4xOTggMi4xMTkgMS4xOTcgMS44NzMgMi4yM2wtMS41NSA2LjUxYy0uMjQ2IDEuMDMzLTEuNDgzIDEuNzEtMi43NjQgMS41MTFsLTI2Ljk0NC00LjE4em01NS4yMDUtMjYuNzMxYy0xLjI3Mi0uMi0yLjEwNy0xLjIwNS0xLjg2MS0yLjI0NGwzLjYzOS0xNS40NzVjLjI0NC0xLjA0IDEuNDc1LTEuNzIxIDIuNzQ2LTEuNTJsMTYuODY3IDIuNjQ4djE5Ljk1bC0yMS4zOS0zLjM1OXptLTExLjY0My0yNy4yNjhjLTEuMjc1LS4xOTktMi4xMTItMS4yMDMtMS44NjYtMi4yNGwzLjY0OS0xNS40NDZjLjI0Ni0xLjAzNyAxLjQ3OS0xLjcxOCAyLjc1NS0xLjUxOGwyOC40OTYgNC40NTV2MTkuOTEzbC0zMy4wMzQtNS4xNjR6bS0yOS43NzQgMjAuMDg4Yy0xLjI3LS4yLTIuMTAxLTEuMjEtMS44NTgtMi4yNTVsMS45MzMtOC4yNzZjLjI0NC0xLjA0NSAxLjQ3Mi0xLjczIDIuNzQxLTEuNTI5bDI2LjE2OSA0LjEzOGMxLjI3LjIwMiAyLjEwMSAxLjIxMSAxLjg1OCAyLjI1N2wtMS45MzMgOC4yNzRjLS4yNDQgMS4wNDYtMS40NzIgMS43My0yLjc0MSAxLjUzbC0yNi4xNjktNC4xMzl6TTc2LjcxMiAxMjUuMzNjLS42NzUtLjkxMy0uMzE4LTIuMS43OTctMi42NTFMODguOTc0IDExN2MxLjExNS0uNTUyIDIuNTY1LS4yNiAzLjI0LjY1M2wyMC45MTUgMjguM2MuNjc0LjkxMi4zMTggMi4xLS43OTggMi42NTJsLTExLjQ2NSA1LjY3OGMtMS4xMTQuNTUyLTIuNTY0LjI2LTMuMjM4LS42NTJsLTIwLjkxNi0yOC4zMDJ6bTI2LjMyNyAzNS43MjNjLS43LS45NDYtLjMzLTIuMTc2LjgyNy0yLjc0OGwxMS4yNi01LjU3NWMxLjE1NS0uNTcyIDIuNjYtLjI3IDMuMzU4LjY3Nmw4Ljc4IDExLjg3M2MyLjU4IDMuNDkgMS4yMTUgOC4wMzEtMy4wNTEgMTAuMTQyLTQuMjY1IDIuMTEyLTkuODE0Ljk5NC0xMi4zOTUtMi40OTVsLTguNzgtMTEuODczem0tMzcuOTc0LTUwLjk4NmMtLjY3Ni0uOTA2LS4zMTgtMi4wODUuOC0yLjYzM2wxMS41MDUtNS42NDNjMS4xMTgtLjU0OCAyLjU3NC0uMjU5IDMuMjUuNjQ5bDUuMzMgNy4xNDJjLjY3Ny45MDYuMzE5IDIuMDg1LS44IDIuNjM0bC0xMS41MDQgNS42NDJjLTEuMTE4LjU0OS0yLjU3NC4yNTgtMy4yNS0uNjQ4bC01LjMzLTcuMTQzem0xMDkuNjYyIDExOS40N2w1LjA0NS0yMS43NjZjLjI0NC0xLjA1MyAxLjQ3LTEuNzQxIDIuNzM5LTEuNTRsNS44NDguOTMyYzEuMjY4LjIwMyAyLjEgMS4yMiAxLjg1NSAyLjI3MmwtNC42NiAyMC4xMDNoLTEwLjgyN3oiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=" />
                                        </div>
                                        <Modal
                                            title={`${props.hotelDetails.HotelCategoryName} ${props.hotelDetails.HotelName} ${props.hotelDetails.CityName} ${t('on-the-map')}`}
                                            open={visible}
                                            onCancel={handleCancel}
                                            footer={null}
                                            >
                                                <div className="mapModal">
                                                <MapWithNoSSR mapInfo={props.mapInfo}/>
                                                </div>
                                        </Modal>
                                    </>
                                    }
                                    <div className={styles.imageXSmallMosaic} onClick={()=>openGallery(1)} onContextMenu={(e)=> e.preventDefault()}>
                                        {/* <img 
                                            src={ photos[1].thumbnail } 
                                            alt={photos[1].subcaption && photos[1].subcaption}
                                            title={photos[1].subcaption && photos[1].subcaption}
                                        /> */}
                                        <Image
                                            layout='fill'
                                            src={ photos[1].thumbnail } 
                                            alt={photos[1].subcaption && photos[1].subcaption}
                                            title={photos[1].subcaption && photos[1].subcaption}
                                        />
                                    </div>
                                    <div className={styles.imageXSmallMosaic}>
                                        {/* <img 
                                            src={ photos[2].thumbnail }
                                            alt={photos[2].subcaption && photos[2].subcaption}
                                            title={photos[2].subcaption && photos[2].subcaption}
                                            onClick={()=>openGallery(2)} onContextMenu={(e)=> e.preventDefault()}
                                        /> */}
                                        <Image
                                            layout='fill'
                                            src={ photos[2].thumbnail }
                                            alt={photos[2].subcaption && photos[2].subcaption}
                                            title={photos[2].subcaption && photos[2].subcaption}
                                            onClick={()=>openGallery(2)} onContextMenu={(e)=> e.preventDefault()}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={styles.colMosaic}>
                            <div className={`${styles.smallMosaic}`}>
                                <div className={`${styles.smallMosaic} ${styles.smallMosaicWidth}`}>
                                    <div className={`${styles.imageSmallMosaic} ${styles.imageSmallMosaicThreeImageWidth}`} onClick={()=>openGallery(1)}>
                                        {/* <img 
                                            src={ photos[1].thumbnail } 
                                            alt={photos[1].subcaption && photos[1].subcaption}
                                            title={photos[1].subcaption && photos[1].subcaption}
                                        /> */}
                                        <Image
                                            layout='fill'
                                            src={ photos[1].thumbnail } 
                                            alt={photos[1].subcaption && photos[1].subcaption}
                                            title={photos[1].subcaption && photos[1].subcaption}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.smallMosaic}>
                                <div className={`${styles.smallMosaic} ${styles.smallMosaicWidth}`}>
                                    <div className={`${styles.imageSmallMosaic} ${styles.imageSmallMosaicThreeImageWidth}`} onClick={()=>openGallery(2)}>
                                        <button
                                            onClick={()=>openGallery(2)}
                                            className={`${styles.toggleGalleryHotel} ${styles.toggleGalleryHotelTravelo}`}
                                            >
                                                <GalleryIcon />
                                                {`+${photos.length} ${t("picture")}`}
                                        </button>
                                        {/* <img 
                                            src={ photos[2].thumbnail } 
                                            alt={photos[2].subcaption && photos[2].subcaption}
                                            title={photos[2].subcaption && photos[2].subcaption}
                                            onContextMenu={(e)=> e.preventDefault()}
                                        /> */}
                                        <Image
                                            layout='fill'
                                            src={ photos[2].thumbnail } 
                                            alt={photos[2].subcaption && photos[2].subcaption}
                                            title={photos[2].subcaption && photos[2].subcaption}
                                            onContextMenu={(e)=> e.preventDefault()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={()=>openGallery(6)}
                            className={`${styles.mobileToggleGalleryHotel} ${process.env.THEME_NAME === "TRAVELO" && styles.toggleGalleryHotelTravelo}`}
                            >
                                {process.env.THEME_NAME === "TRAVELO" && <GalleryIcon />}
                                    {`+${photos.length} ${t("picture")}`}
                                </button>
                    </div>
                    :(photos.length > 2 )?
                    <div className={styles.mosaicGallaryHotel}>
                        <div className={styles.colMosaic}>
                            <div className={styles.largeMosaic}>
                                <div className={styles.imageLargeMosaic} onClick={()=>openGallery(0)}>
                                    {/* <img 
                                        src={ photos[0].thumbnail } 
                                        alt={photos[0].subcaption && photos[0].subcaption}
                                        title={photos[0].subcaption && photos[0].subcaption}
                                        onContextMenu={(e)=> e.preventDefault()} 
                                    /> */}
                                    <Image
                                        layout='fill'
                                        src={ photos[0].thumbnail } 
                                        alt={photos[0].subcaption && photos[0].subcaption}
                                        title={photos[0].subcaption && photos[0].subcaption}
                                        onContextMenu={(e)=> e.preventDefault()}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.colMosaic}>
                            <div className={styles.smallMosaic}>
                                <div className={`${styles.imageSmallMosaic} ${styles.imageSmallMosaicThreeImage}`} onClick={()=>openGallery(1)}>
                                    {/* <img 
                                        src={ photos[1].thumbnail } 
                                        alt={photos[1].subcaption && photos[1].subcaption}
                                        title={photos[1].subcaption && photos[1].subcaption}
                                        onContextMenu={(e)=> e.preventDefault()} 
                                    /> */}
                                    <Image
                                        layout='fill'
                                        src={ photos[1].thumbnail } 
                                        alt={photos[1].subcaption && photos[1].subcaption}
                                        title={photos[1].subcaption && photos[1].subcaption}
                                        onContextMenu={(e)=> e.preventDefault()} 
                                    />
                                </div>
                            </div>
                            <div className={styles.smallMosaic}>
                                <div className={`${styles.imageSmallMosaic} ${styles.imageSmallMosaicThreeImage}`} onClick={()=>openGallery(2)}>
                                    <button
                                        onClick={()=>openGallery(2)}
                                        className={`${styles.toggleGalleryHotel} ${styles.toggleGalleryHotelTravelo}`}
                                        >
                                            <GalleryIcon />
                                            {`+${photos.length} ${t("picture")}`}
                                    </button>
                                    {/* <img 
                                        src={ photos[2].thumbnail } 
                                        alt={photos[2].subcaption && photos[2].subcaption}
                                        title={photos[2].subcaption && photos[2].subcaption}
                                        onContextMenu={(e)=> e.preventDefault()}
                                    /> */}
                                    <Image
                                        layout='fill'
                                        src={ photos[2].thumbnail } 
                                        alt={photos[2].subcaption && photos[2].subcaption}
                                        title={photos[2].subcaption && photos[2].subcaption}
                                        onContextMenu={(e)=> e.preventDefault()}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    :(photos.length > 1 )?
                    <div className={styles.mosaicGallaryHotel}>
                        <div className={styles.colMosaic}>
                            <div className={styles.largeMosaic} onContextMenu={(e)=> e.preventDefault()}>
                                <div className={styles.imageLargeMosaic} onClick={()=>openGallery(0)}>
                                    {/* <img 
                                        src={ photos[0].thumbnail }
                                        alt={photos[0].subcaption && photos[0].subcaption}
                                        title={photos[0].subcaption && photos[0].subcaption}
                                     /> */}
                                     <Image
                                        layout='fill'
                                        src={ photos[0].thumbnail }
                                        alt={photos[0].subcaption && photos[0].subcaption}
                                        title={photos[0].subcaption && photos[0].subcaption}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.colMosaic} ${styles.colMosaicTwoColumn}`}>
                            <div className={styles.largeMosaic} onContextMenu={(e)=> e.preventDefault()}>
                                <div className={styles.imageLargeMosaic} onClick={()=>openGallery(1)}>
                                    {/* <img 
                                        src={ photos[1].thumbnail } 
                                        alt={photos[1].subcaption && photos[1].subcaption}
                                        title={photos[1].subcaption && photos[1].subcaption}
                                    /> */}
                                    <Image
                                        layout='fill'
                                        src={ photos[1].thumbnail } 
                                        alt={photos[1].subcaption && photos[1].subcaption}
                                        title={photos[1].subcaption && photos[1].subcaption}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    :(photos.length > 0 )?
                    <div className={styles.onePicGalley}>
                        {process.env.THEME_NAME === "TAJAWAL" && topComment &&
                        <div className={styles.commentSmallMosaic}>
                            <span className={styles.commentSpan}>
                                {parse(topComment)}
                            </span>
                        </div>
                        }
                        {/* <img 
                            src={ photos[0].thumbnail } 
                            alt={photos[0].subcaption && photos[0].subcaption}
                            title={photos[0].subcaption && photos[0].subcaption}
                            className={styles.picture} onContextMenu={(e)=> e.preventDefault()}
                        /> */}
                        <Image
                            layout='fill'
                            src={ photos[0].thumbnail } 
                            alt={photos[0].subcaption && photos[0].subcaption}
                            title={photos[0].subcaption && photos[0].subcaption}
                            className={styles.picture}
                            onContextMenu={(e)=> e.preventDefault()}
                        />
                        {
                            process.env.THEME_NAME === "TRAVELO" ? null :
                                (props.mapInfo.lat === 0) && (props.mapInfo.lang === 0)?
                                null:
                                <>
                                <div className={styles.imageXSmallMap} onClick={showModal}>
                                    <span className={styles.textViewMap}>{t('show-hotel-on-map')}</span>
                                    <img alt="img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjc5Ljk2OSIgaGVpZ2h0PSI5MSI+CiAgICA8ZGVmcz4KICAgICAgICA8cmVjdCBpZD0iYSIgd2lkdGg9IjI3OS45NjkiIGhlaWdodD0iOTEiIC8+CiAgICAgICAgPGZpbHRlciBpZD0iYiIgd2lkdGg9IjI3OS45NjkiIGhlaWdodD0iOTEiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgICAgICAgIDxmZU9mZnNldCBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIC8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMSAwIi8+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxtYXNrIGlkPSJjIiBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjYSIvPgogICAgICAgIDwvbWFzaz4KICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNiKSIgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+CiAgICAgICAgPGcgbWFzaz0idXJsKCNjKSI+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNENEU4RjQiIGQ9Ik0uMDE1IDIyOS41MzdoMjc5Ljk3Vi4wMTNILjAxNXoiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTS4wMTUgMjI5LjUzN2gyNzkuOTdWLjAxM0guMDE1eiIvPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjQ0VDRUM4IiBkPSJNMCAyMjkuNTI0aDI3OS45N1YwSDB6Ii8+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiM5NkJCRTciIGQ9Ik04OC4wMTggMjI5LjUzN2w3OC4wODktNDEuODE2YzMuNDk3LTEuODcyIDYuNjQtNC4xMTcgOS4zNjUtNi42NDlhNDAuNjAzIDQwLjYwMyAwIDAgMCAzLjI4NS0zLjQyMiAzOC4wNzIgMzguMDcyIDAgMCAwIDMuNzYyLTUuMjQyYzIuNTI0LTQuMjUyIDQuMDk5LTguODkgNC41NTMtMTMuNjc0IDEuOTg3LTIwLjkxIDE4LjkyLTM4LjgzMyA0My4xNC00NS42NjNsNDkuNzczLTE0LjAzNHYxNS4yNjVsLTQ0LjAzIDEyLjQxNmMtMTcuNTc2IDQuOTU1LTI5Ljg2NSAxNy45NjEtMzEuMzA1IDMzLjEzNS0uNTAyIDUuMjgtMiAxMC41MDYtNC4zOTkgMTUuNDMzYTQ5LjA3MyA0OS4wNzMgMCAwIDEtMy4wMTQgNS4zMSA0OS41NTIgNDkuNTUyIDAgMCAxLTIuMjQ5IDMuMTcxYy0uMTA3LjE0LS4yMTYuMjgtLjMyNS40Mi00Ljg3IDYuMjA1LTExLjM2OCAxMS41NzctMTguOTA1IDE1LjYxNGwtNTUuNTMyIDI5LjczNkg4OC4wMTh6TTE2NC44MDUuMDEzaDExNS4xOHYyOS42NjZjLTExLjkzMiAxLjE0Mi00Mi4wNjYgMy40MS02Ni4wODYuMDMtMjEuNDkyLTMuMDI0LTM5Ljk2Ny0xOS44ODItNDkuMDk0LTI5LjY5NnoiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI0UyRTVFNyIgZD0iTTM4LjcwNSA2My44ODZsNDUuMDg5IDIwLjQ0NyAyLjc5LTEuNDE2aC4wMDJsODQuNTgzLTQyLjkwNS0yMy4yODYtMzEuNDA1LTEwOS4xNzggNTUuMjh6bS04LjAyMyA0LjA2M0wuMDE1IDgzLjQ3NnYtNy45MjNsMjIuNDEyLTExLjM0OEwuMDE1IDU0LjA0M3YtNy43MDFMMzAuNDUgNjAuMTQzIDE0My42MSAyLjg0N2wtMi4xLTIuODM0aDkuNjA4bDI4LjMyNiAzOC4yMDJoMTAwLjU0djYuNzEySDE3Ny4xMDlsLTI1LjA3NyAxMi43MiAzNS43NjUgNDguMzYgOTIuMTg5LTI4LjE5djcuMTg1bC05MC4zMyAyNy42Mi0yMS40NzQgNTUuNDAzLTIuNDY2IDEuMzE1LTMuNTkyIDEuOTE1LS4yNi4xNC4yMDEuMDMyIDM3LjA3IDUuOTkgODAuODUgMTMuMDY5djYuODY4bC04NC45MjYtMTMuNzI2LTE5LjA4OC0zLjA4NS0yMy43ODgtMy44NDUtLjIwNS0uMDMzLS4zNTQuMTg5LTk4LjE1MSA1Mi4zM0gzOC40MDlsNjYuNTQ5LTM1LjQ4Mi02MC4zMDItODEuNTktNDQuNjQgMjIuNjQ0di03LjkyN2w3NC44NzMtMzcuOTguODQ3LS40MjkuMDQyLS4wMjItNDUuMDk2LTIwLjQ1em0xMTMuMzggMTA0LjkwM2wtNjEuMS04MC4xNy0uMDc4LjA0LS44NzEuNDQyLTMwLjM1OCAxNS4zOTkgNjAuMjA2IDgxLjQ1OSAzMi4yMDItMTcuMTd6bTYuODkzLTMuNjc0bDEwLjI4My01LjQ4MyAyMC40OS01Mi44NjItMzYuNzA1LTQ5LjYzLTU1LjA3IDI3LjkzNCA2MS4wMDIgODAuMDR6TS4wMTUgMjQuMjM1TDQ3Ljc0NC4wMTNoMTUuNjg1TC4wMTUgMzIuMTk2di03Ljk2eiIvPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjQTJDMDg5IiBkPSJNLjAxNS4wMTNoMjcuMTc4TC4wMTUgMTMuODA1Vi4wMTN6bTAgMTUwLjEyNmwyMS0xMC42NWMyLjU5My0xLjMxNiA1Ljc4My0xLjU2IDguNjI2LS42NjIgOC4xMjggMi41NjcgMTUuMzkgNi41MDQgMjEuMzgxIDExLjQ3NCA1Ljk5MiA0Ljk3MiAxMC43MTIgMTAuOTc3IDEzLjc1NCAxNy42OCAyLjU0IDUuNTk1IDMuODMgMTEuNTA0IDMuODMgMTcuNDQgMCAyLjI4LS4xOTEgNC41NjMtLjU3MyA2LjgzNWwtMS4yOSA3LjY2MmMtLjM4NiAyLjI5OC0xLjk2NiA0LjM0NS00LjMzIDUuNjE0bC00NC43NjkgMjQuMDA1SC4wMTV2LTc5LjM5OHptMTgxLjEzNi05NS42NjNoODIuOTA1YzEuMTc0IDAgMi4xMjQuNzc4IDIuMTI0IDEuNzM4djE0LjkzYzAgLjczMy0uNTY0IDEuMzg5LTEuNDA5IDEuNjM2bC03MS4yOSAyMC44NWMtLjk0NS4yNzctMS45OTgtLjAyNS0yLjUyNC0uNzI1TDE2OC4xNCA2Mi41NjJjLS42MjItLjgyNy0uMjk1LTEuOTEuNzI1LTIuNDA3bDExLjIwMi01LjQzNmEyLjQ4IDIuNDggMCAwIDEgMS4wODQtLjI0M3ptNTMuOTcgMTc1LjA2bDEuMjgyLTUuNDM4YzMuMjExLTEzLjYyIDE5LjM2My0yMi41NCAzNi4wNzUtMTkuOTIybDcuNTA3IDEuMTc2djI0LjE4NUgyMzUuMTJ6Ii8+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNCQkJCQjciIGQ9Ik0xNjcuMTU0IDExOC41OTRsLTkuNTQgMjQuNjcyYy0xLjQzNSAzLjcxMy03LjUyOCA0LjMwNi05Ljk4Ljk3MmwtMzUuMDY4LTQ3LjY4M2MtMi40NDUtMy4zMjUtMS4yMDUtNy42NDUgMi43OS05LjcyM2wxNy4yNC04Ljk2N2M0LjEyMi0yLjE0MyA5LjU4NS0xLjA4MyAxMi4xIDIuMzUxbDIxLjA4IDI4Ljc2OWMyLjEyIDIuODkyIDIuNjIxIDYuMzkyIDEuMzc4IDkuNjA5em0tNDMuNzktNjIuNTc1Yy0uODg0LjQ0NC0yLjAzNi4yMTItMi41NzQtLjUxOGwtMTIuMjI0LTE2LjYwN2MtLjUzOC0uNzMtLjI1Ni0xLjY4MS42MjgtMi4xMjRsMzQuMDctMTcuMDgyYy44ODQtLjQ0MiAyLjAzNi0uMjEgMi41NzMuNTE5bDEyLjIyNSAxNi42MDhjLjUzNi43My4yNTUgMS42OC0uNjI5IDIuMTIzbC0zNC4wNyAxNy4wODF6bS00My4yMDctNC4wOWwuMDE3LjAyNCAxOC42MzUtOS4yOTYuMDA4LjAxYy44NS0uNDI1IDEuOTU5LS4yMDIgMi40NzcuNDk2bDEyLjM0NSAxNi42OWMuNTE3LjY5OS4yNDYgMS42MS0uNjA1IDIuMDM0bC03Ljg1IDMuOTE2Yy0uODUuNDI0LTEuOTU4LjIwMi0yLjQ3NS0uNDk3bC0zLjAwNC00LjA2Yy0uNTE3LS42OTktMS42MjYtLjkyMi0yLjQ3Ny0uNDk3bC02LjE2NCAzLjA3NGMtLjg1LjQyNS0xLjEyMSAxLjMzNi0uNjA1IDIuMDM1bDIuOTc5IDQuMDI2Yy41MTcuNjk5LjI0NiAxLjYxLS42MDUgMi4wMzRsLTcuODUgMy45MTZjLS44NS40MjQtMS45NTguMjAyLTIuNDc1LS40OTdsLTEyLjM0Ni0xNi42OWMtLjUxNy0uNjk4LS4yNDYtMS42MDkuNjA1LTIuMDMzbDkuMzktNC42ODR6bTMzLjkwMi00My41NmMuNTQuNzI5LjI1NiAxLjY3OC0uNjMyIDIuMTJMODIuMzYxIDI1Ljk2Yy0uODg4LjQ0Mi0yLjA0NS4yMS0yLjU4NS0uNTE3bC00Ljg1OC02LjU1NWMtLjUzOC0uNzI4LS4yNTYtMS42NzcuNjMyLTIuMTJsMzEuMDY2LTE1LjQ2OWMuODg4LS40NDIgMi4wNDYtLjIxIDIuNTg2LjUxOGw0Ljg1NyA2LjU1M3ptLTQ4LjYzLTIuNTRjLS41NC0uNzI1LS4yNTgtMS42NzIuNjMtMi4xMTJMNzMuNTMuMDEzaDI1LjI3NGwtMjUuOTMgMTIuODYxYy0uODg5LjQ0MS0yLjA0Ny4yMS0yLjU4Ny0uNTE2TDY1LjQzIDUuODN6bS0zMy45NDcgNDUuMjRjLS44ODQuNDQyLTIuMDM2LjIxLTIuNTczLS41MThMMTYuNjggMzMuOTU3Yy0uNTM4LS43MjktLjI1Ni0xLjY3OC42MjgtMi4xMjFsMzguMzc5LTE5LjIyYy44ODUtLjQ0MyAyLjAzNy0uMjEyIDIuNTc1LjUxN0w3MC40OSAyOS43MjdjLjUzNi43MjguMjU1IDEuNjc4LS42MyAyLjEyMWwtMzguMzc5IDE5LjIyek0uMDE1IDkxLjI5N2wyOC4wMTYtMTMuOTYzYy44ODctLjQ0MSAyLjA0NC0uMjEgMi41ODIuNTE3TDQyLjg4IDk0LjQxOGMuNTQuNzI3LjI1NyAxLjY3NS0uNjMgMi4xMThMMS40OSAxMTYuODVjLS40Ni4yMjktLjk5My4yNzctMS40NzUuMTY3di0yNS43MnptMTk0LjEyNCAxMzguMjRsNC40MjQtMTguOTQyYy4yNDUtMS4wNSAxLjQ3OC0xLjczNyAyLjc1My0xLjUzNWwyNy4xNTIgNC4yOTRjMS4yNzQuMjAxIDIuMTEgMS4yMTUgMS44NjQgMi4yNjVsLTMuMjUgMTMuOTE4SDE5NC4xNHptOS4yNS0yNS43ODdjLTEuMjgxLS4yLTIuMTItMS4xOTgtMS44NzQtMi4yMzFsMS41NS02LjUwOWMuMjQ3LTEuMDM0IDEuNDg0LTEuNzEgMi43NjQtMS41MTJsMjYuOTQ0IDQuMThjMS4yOC4xOTggMi4xMTkgMS4xOTcgMS44NzMgMi4yM2wtMS41NSA2LjUxYy0uMjQ2IDEuMDMzLTEuNDgzIDEuNzEtMi43NjQgMS41MTFsLTI2Ljk0NC00LjE4em01NS4yMDUtMjYuNzMxYy0xLjI3Mi0uMi0yLjEwNy0xLjIwNS0xLjg2MS0yLjI0NGwzLjYzOS0xNS40NzVjLjI0NC0xLjA0IDEuNDc1LTEuNzIxIDIuNzQ2LTEuNTJsMTYuODY3IDIuNjQ4djE5Ljk1bC0yMS4zOS0zLjM1OXptLTExLjY0My0yNy4yNjhjLTEuMjc1LS4xOTktMi4xMTItMS4yMDMtMS44NjYtMi4yNGwzLjY0OS0xNS40NDZjLjI0Ni0xLjAzNyAxLjQ3OS0xLjcxOCAyLjc1NS0xLjUxOGwyOC40OTYgNC40NTV2MTkuOTEzbC0zMy4wMzQtNS4xNjR6bS0yOS43NzQgMjAuMDg4Yy0xLjI3LS4yLTIuMTAxLTEuMjEtMS44NTgtMi4yNTVsMS45MzMtOC4yNzZjLjI0NC0xLjA0NSAxLjQ3Mi0xLjczIDIuNzQxLTEuNTI5bDI2LjE2OSA0LjEzOGMxLjI3LjIwMiAyLjEwMSAxLjIxMSAxLjg1OCAyLjI1N2wtMS45MzMgOC4yNzRjLS4yNDQgMS4wNDYtMS40NzIgMS43My0yLjc0MSAxLjUzbC0yNi4xNjktNC4xMzl6TTc2LjcxMiAxMjUuMzNjLS42NzUtLjkxMy0uMzE4LTIuMS43OTctMi42NTFMODguOTc0IDExN2MxLjExNS0uNTUyIDIuNTY1LS4yNiAzLjI0LjY1M2wyMC45MTUgMjguM2MuNjc0LjkxMi4zMTggMi4xLS43OTggMi42NTJsLTExLjQ2NSA1LjY3OGMtMS4xMTQuNTUyLTIuNTY0LjI2LTMuMjM4LS42NTJsLTIwLjkxNi0yOC4zMDJ6bTI2LjMyNyAzNS43MjNjLS43LS45NDYtLjMzLTIuMTc2LjgyNy0yLjc0OGwxMS4yNi01LjU3NWMxLjE1NS0uNTcyIDIuNjYtLjI3IDMuMzU4LjY3Nmw4Ljc4IDExLjg3M2MyLjU4IDMuNDkgMS4yMTUgOC4wMzEtMy4wNTEgMTAuMTQyLTQuMjY1IDIuMTEyLTkuODE0Ljk5NC0xMi4zOTUtMi40OTVsLTguNzgtMTEuODczem0tMzcuOTc0LTUwLjk4NmMtLjY3Ni0uOTA2LS4zMTgtMi4wODUuOC0yLjYzM2wxMS41MDUtNS42NDNjMS4xMTgtLjU0OCAyLjU3NC0uMjU5IDMuMjUuNjQ5bDUuMzMgNy4xNDJjLjY3Ny45MDYuMzE5IDIuMDg1LS44IDIuNjM0bC0xMS41MDQgNS42NDJjLTEuMTE4LjU0OS0yLjU3NC4yNTgtMy4yNS0uNjQ4bC01LjMzLTcuMTQzem0xMDkuNjYyIDExOS40N2w1LjA0NS0yMS43NjZjLjI0NC0xLjA1MyAxLjQ3LTEuNzQxIDIuNzM5LTEuNTRsNS44NDguOTMyYzEuMjY4LjIwMyAyLjEgMS4yMiAxLjg1NSAyLjI3MmwtNC42NiAyMC4xMDNoLTEwLjgyN3oiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=" />
                                </div>
                                <Modal
                                    title={`${props.hotelDetails.HotelCategoryName} ${props.hotelDetails.HotelName} ${props.hotelDetails.CityName} ${t('on-the-map')}`}
                                    open={visible}
                                    onCancel={handleCancel}
                                    footer={null}
                                    >
                                        <div className="mapModal">
                                        <MapWithNoSSR mapInfo={props.mapInfo}/>
                                        </div>
                                </Modal>
                                </>
                        }
                    </div>
                    :
                    <div className={styles.onePicGalley} style={{"backgroundImage":`url(${defaultBanner})`}}>
                        {process.env.THEME_NAME === "TAJAWAL" && topComment &&
                            <div className={styles.commentSmallMosaic}>
                                <span className={styles.commentSpan}>
                                    {parse(topComment)}
                                </span>
                            </div>
                        }

                        {
                            process.env.THEME_NAME === "TRAVELO" ? null :
                            (props.mapInfo.lat === 0) && (props.mapInfo.lang === 0)?
                            null:
                            <>
                            <div className={styles.imageXSmallMap} onClick={showModal}>
                                <span className={styles.textViewMap}>{t('show-hotel-on-map')}</span>
                                <img alt="img" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjc5Ljk2OSIgaGVpZ2h0PSI5MSI+CiAgICA8ZGVmcz4KICAgICAgICA8cmVjdCBpZD0iYSIgd2lkdGg9IjI3OS45NjkiIGhlaWdodD0iOTEiIC8+CiAgICAgICAgPGZpbHRlciBpZD0iYiIgd2lkdGg9IjI3OS45NjkiIGhlaWdodD0iOTEiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+CiAgICAgICAgICAgIDxmZU9mZnNldCBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiIC8+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMSAwIi8+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxtYXNrIGlkPSJjIiBmaWxsPSIjZmZmIj4KICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjYSIvPgogICAgICAgIDwvbWFzaz4KICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNiKSIgeGxpbms6aHJlZj0iI2EiLz4KICAgICAgICA8dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNhIi8+CiAgICAgICAgPGcgbWFzaz0idXJsKCNjKSI+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNENEU4RjQiIGQ9Ik0uMDE1IDIyOS41MzdoMjc5Ljk3Vi4wMTNILjAxNXoiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZD0iTS4wMTUgMjI5LjUzN2gyNzkuOTdWLjAxM0guMDE1eiIvPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjQ0VDRUM4IiBkPSJNMCAyMjkuNTI0aDI3OS45N1YwSDB6Ii8+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiM5NkJCRTciIGQ9Ik04OC4wMTggMjI5LjUzN2w3OC4wODktNDEuODE2YzMuNDk3LTEuODcyIDYuNjQtNC4xMTcgOS4zNjUtNi42NDlhNDAuNjAzIDQwLjYwMyAwIDAgMCAzLjI4NS0zLjQyMiAzOC4wNzIgMzguMDcyIDAgMCAwIDMuNzYyLTUuMjQyYzIuNTI0LTQuMjUyIDQuMDk5LTguODkgNC41NTMtMTMuNjc0IDEuOTg3LTIwLjkxIDE4LjkyLTM4LjgzMyA0My4xNC00NS42NjNsNDkuNzczLTE0LjAzNHYxNS4yNjVsLTQ0LjAzIDEyLjQxNmMtMTcuNTc2IDQuOTU1LTI5Ljg2NSAxNy45NjEtMzEuMzA1IDMzLjEzNS0uNTAyIDUuMjgtMiAxMC41MDYtNC4zOTkgMTUuNDMzYTQ5LjA3MyA0OS4wNzMgMCAwIDEtMy4wMTQgNS4zMSA0OS41NTIgNDkuNTUyIDAgMCAxLTIuMjQ5IDMuMTcxYy0uMTA3LjE0LS4yMTYuMjgtLjMyNS40Mi00Ljg3IDYuMjA1LTExLjM2OCAxMS41NzctMTguOTA1IDE1LjYxNGwtNTUuNTMyIDI5LjczNkg4OC4wMTh6TTE2NC44MDUuMDEzaDExNS4xOHYyOS42NjZjLTExLjkzMiAxLjE0Mi00Mi4wNjYgMy40MS02Ni4wODYuMDMtMjEuNDkyLTMuMDI0LTM5Ljk2Ny0xOS44ODItNDkuMDk0LTI5LjY5NnoiLz4KICAgICAgICAgICAgPHBhdGggZmlsbD0iI0UyRTVFNyIgZD0iTTM4LjcwNSA2My44ODZsNDUuMDg5IDIwLjQ0NyAyLjc5LTEuNDE2aC4wMDJsODQuNTgzLTQyLjkwNS0yMy4yODYtMzEuNDA1LTEwOS4xNzggNTUuMjh6bS04LjAyMyA0LjA2M0wuMDE1IDgzLjQ3NnYtNy45MjNsMjIuNDEyLTExLjM0OEwuMDE1IDU0LjA0M3YtNy43MDFMMzAuNDUgNjAuMTQzIDE0My42MSAyLjg0N2wtMi4xLTIuODM0aDkuNjA4bDI4LjMyNiAzOC4yMDJoMTAwLjU0djYuNzEySDE3Ny4xMDlsLTI1LjA3NyAxMi43MiAzNS43NjUgNDguMzYgOTIuMTg5LTI4LjE5djcuMTg1bC05MC4zMyAyNy42Mi0yMS40NzQgNTUuNDAzLTIuNDY2IDEuMzE1LTMuNTkyIDEuOTE1LS4yNi4xNC4yMDEuMDMyIDM3LjA3IDUuOTkgODAuODUgMTMuMDY5djYuODY4bC04NC45MjYtMTMuNzI2LTE5LjA4OC0zLjA4NS0yMy43ODgtMy44NDUtLjIwNS0uMDMzLS4zNTQuMTg5LTk4LjE1MSA1Mi4zM0gzOC40MDlsNjYuNTQ5LTM1LjQ4Mi02MC4zMDItODEuNTktNDQuNjQgMjIuNjQ0di03LjkyN2w3NC44NzMtMzcuOTguODQ3LS40MjkuMDQyLS4wMjItNDUuMDk2LTIwLjQ1em0xMTMuMzggMTA0LjkwM2wtNjEuMS04MC4xNy0uMDc4LjA0LS44NzEuNDQyLTMwLjM1OCAxNS4zOTkgNjAuMjA2IDgxLjQ1OSAzMi4yMDItMTcuMTd6bTYuODkzLTMuNjc0bDEwLjI4My01LjQ4MyAyMC40OS01Mi44NjItMzYuNzA1LTQ5LjYzLTU1LjA3IDI3LjkzNCA2MS4wMDIgODAuMDR6TS4wMTUgMjQuMjM1TDQ3Ljc0NC4wMTNoMTUuNjg1TC4wMTUgMzIuMTk2di03Ljk2eiIvPgogICAgICAgICAgICA8cGF0aCBmaWxsPSIjQTJDMDg5IiBkPSJNLjAxNS4wMTNoMjcuMTc4TC4wMTUgMTMuODA1Vi4wMTN6bTAgMTUwLjEyNmwyMS0xMC42NWMyLjU5My0xLjMxNiA1Ljc4My0xLjU2IDguNjI2LS42NjIgOC4xMjggMi41NjcgMTUuMzkgNi41MDQgMjEuMzgxIDExLjQ3NCA1Ljk5MiA0Ljk3MiAxMC43MTIgMTAuOTc3IDEzLjc1NCAxNy42OCAyLjU0IDUuNTk1IDMuODMgMTEuNTA0IDMuODMgMTcuNDQgMCAyLjI4LS4xOTEgNC41NjMtLjU3MyA2LjgzNWwtMS4yOSA3LjY2MmMtLjM4NiAyLjI5OC0xLjk2NiA0LjM0NS00LjMzIDUuNjE0bC00NC43NjkgMjQuMDA1SC4wMTV2LTc5LjM5OHptMTgxLjEzNi05NS42NjNoODIuOTA1YzEuMTc0IDAgMi4xMjQuNzc4IDIuMTI0IDEuNzM4djE0LjkzYzAgLjczMy0uNTY0IDEuMzg5LTEuNDA5IDEuNjM2bC03MS4yOSAyMC44NWMtLjk0NS4yNzctMS45OTgtLjAyNS0yLjUyNC0uNzI1TDE2OC4xNCA2Mi41NjJjLS42MjItLjgyNy0uMjk1LTEuOTEuNzI1LTIuNDA3bDExLjIwMi01LjQzNmEyLjQ4IDIuNDggMCAwIDEgMS4wODQtLjI0M3ptNTMuOTcgMTc1LjA2bDEuMjgyLTUuNDM4YzMuMjExLTEzLjYyIDE5LjM2My0yMi41NCAzNi4wNzUtMTkuOTIybDcuNTA3IDEuMTc2djI0LjE4NUgyMzUuMTJ6Ii8+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNCQkJCQjciIGQ9Ik0xNjcuMTU0IDExOC41OTRsLTkuNTQgMjQuNjcyYy0xLjQzNSAzLjcxMy03LjUyOCA0LjMwNi05Ljk4Ljk3MmwtMzUuMDY4LTQ3LjY4M2MtMi40NDUtMy4zMjUtMS4yMDUtNy42NDUgMi43OS05LjcyM2wxNy4yNC04Ljk2N2M0LjEyMi0yLjE0MyA5LjU4NS0xLjA4MyAxMi4xIDIuMzUxbDIxLjA4IDI4Ljc2OWMyLjEyIDIuODkyIDIuNjIxIDYuMzkyIDEuMzc4IDkuNjA5em0tNDMuNzktNjIuNTc1Yy0uODg0LjQ0NC0yLjAzNi4yMTItMi41NzQtLjUxOGwtMTIuMjI0LTE2LjYwN2MtLjUzOC0uNzMtLjI1Ni0xLjY4MS42MjgtMi4xMjRsMzQuMDctMTcuMDgyYy44ODQtLjQ0MiAyLjAzNi0uMjEgMi41NzMuNTE5bDEyLjIyNSAxNi42MDhjLjUzNi43My4yNTUgMS42OC0uNjI5IDIuMTIzbC0zNC4wNyAxNy4wODF6bS00My4yMDctNC4wOWwuMDE3LjAyNCAxOC42MzUtOS4yOTYuMDA4LjAxYy44NS0uNDI1IDEuOTU5LS4yMDIgMi40NzcuNDk2bDEyLjM0NSAxNi42OWMuNTE3LjY5OS4yNDYgMS42MS0uNjA1IDIuMDM0bC03Ljg1IDMuOTE2Yy0uODUuNDI0LTEuOTU4LjIwMi0yLjQ3NS0uNDk3bC0zLjAwNC00LjA2Yy0uNTE3LS42OTktMS42MjYtLjkyMi0yLjQ3Ny0uNDk3bC02LjE2NCAzLjA3NGMtLjg1LjQyNS0xLjEyMSAxLjMzNi0uNjA1IDIuMDM1bDIuOTc5IDQuMDI2Yy41MTcuNjk5LjI0NiAxLjYxLS42MDUgMi4wMzRsLTcuODUgMy45MTZjLS44NS40MjQtMS45NTguMjAyLTIuNDc1LS40OTdsLTEyLjM0Ni0xNi42OWMtLjUxNy0uNjk4LS4yNDYtMS42MDkuNjA1LTIuMDMzbDkuMzktNC42ODR6bTMzLjkwMi00My41NmMuNTQuNzI5LjI1NiAxLjY3OC0uNjMyIDIuMTJMODIuMzYxIDI1Ljk2Yy0uODg4LjQ0Mi0yLjA0NS4yMS0yLjU4NS0uNTE3bC00Ljg1OC02LjU1NWMtLjUzOC0uNzI4LS4yNTYtMS42NzcuNjMyLTIuMTJsMzEuMDY2LTE1LjQ2OWMuODg4LS40NDIgMi4wNDYtLjIxIDIuNTg2LjUxOGw0Ljg1NyA2LjU1M3ptLTQ4LjYzLTIuNTRjLS41NC0uNzI1LS4yNTgtMS42NzIuNjMtMi4xMTJMNzMuNTMuMDEzaDI1LjI3NGwtMjUuOTMgMTIuODYxYy0uODg5LjQ0MS0yLjA0Ny4yMS0yLjU4Ny0uNTE2TDY1LjQzIDUuODN6bS0zMy45NDcgNDUuMjRjLS44ODQuNDQyLTIuMDM2LjIxLTIuNTczLS41MThMMTYuNjggMzMuOTU3Yy0uNTM4LS43MjktLjI1Ni0xLjY3OC42MjgtMi4xMjFsMzguMzc5LTE5LjIyYy44ODUtLjQ0MyAyLjAzNy0uMjEyIDIuNTc1LjUxN0w3MC40OSAyOS43MjdjLjUzNi43MjguMjU1IDEuNjc4LS42MyAyLjEyMWwtMzguMzc5IDE5LjIyek0uMDE1IDkxLjI5N2wyOC4wMTYtMTMuOTYzYy44ODctLjQ0MSAyLjA0NC0uMjEgMi41ODIuNTE3TDQyLjg4IDk0LjQxOGMuNTQuNzI3LjI1NyAxLjY3NS0uNjMgMi4xMThMMS40OSAxMTYuODVjLS40Ni4yMjktLjk5My4yNzctMS40NzUuMTY3di0yNS43MnptMTk0LjEyNCAxMzguMjRsNC40MjQtMTguOTQyYy4yNDUtMS4wNSAxLjQ3OC0xLjczNyAyLjc1My0xLjUzNWwyNy4xNTIgNC4yOTRjMS4yNzQuMjAxIDIuMTEgMS4yMTUgMS44NjQgMi4yNjVsLTMuMjUgMTMuOTE4SDE5NC4xNHptOS4yNS0yNS43ODdjLTEuMjgxLS4yLTIuMTItMS4xOTgtMS44NzQtMi4yMzFsMS41NS02LjUwOWMuMjQ3LTEuMDM0IDEuNDg0LTEuNzEgMi43NjQtMS41MTJsMjYuOTQ0IDQuMThjMS4yOC4xOTggMi4xMTkgMS4xOTcgMS44NzMgMi4yM2wtMS41NSA2LjUxYy0uMjQ2IDEuMDMzLTEuNDgzIDEuNzEtMi43NjQgMS41MTFsLTI2Ljk0NC00LjE4em01NS4yMDUtMjYuNzMxYy0xLjI3Mi0uMi0yLjEwNy0xLjIwNS0xLjg2MS0yLjI0NGwzLjYzOS0xNS40NzVjLjI0NC0xLjA0IDEuNDc1LTEuNzIxIDIuNzQ2LTEuNTJsMTYuODY3IDIuNjQ4djE5Ljk1bC0yMS4zOS0zLjM1OXptLTExLjY0My0yNy4yNjhjLTEuMjc1LS4xOTktMi4xMTItMS4yMDMtMS44NjYtMi4yNGwzLjY0OS0xNS40NDZjLjI0Ni0xLjAzNyAxLjQ3OS0xLjcxOCAyLjc1NS0xLjUxOGwyOC40OTYgNC40NTV2MTkuOTEzbC0zMy4wMzQtNS4xNjR6bS0yOS43NzQgMjAuMDg4Yy0xLjI3LS4yLTIuMTAxLTEuMjEtMS44NTgtMi4yNTVsMS45MzMtOC4yNzZjLjI0NC0xLjA0NSAxLjQ3Mi0xLjczIDIuNzQxLTEuNTI5bDI2LjE2OSA0LjEzOGMxLjI3LjIwMiAyLjEwMSAxLjIxMSAxLjg1OCAyLjI1N2wtMS45MzMgOC4yNzRjLS4yNDQgMS4wNDYtMS40NzIgMS43My0yLjc0MSAxLjUzbC0yNi4xNjktNC4xMzl6TTc2LjcxMiAxMjUuMzNjLS42NzUtLjkxMy0uMzE4LTIuMS43OTctMi42NTFMODguOTc0IDExN2MxLjExNS0uNTUyIDIuNTY1LS4yNiAzLjI0LjY1M2wyMC45MTUgMjguM2MuNjc0LjkxMi4zMTggMi4xLS43OTggMi42NTJsLTExLjQ2NSA1LjY3OGMtMS4xMTQuNTUyLTIuNTY0LjI2LTMuMjM4LS42NTJsLTIwLjkxNi0yOC4zMDJ6bTI2LjMyNyAzNS43MjNjLS43LS45NDYtLjMzLTIuMTc2LjgyNy0yLjc0OGwxMS4yNi01LjU3NWMxLjE1NS0uNTcyIDIuNjYtLjI3IDMuMzU4LjY3Nmw4Ljc4IDExLjg3M2MyLjU4IDMuNDkgMS4yMTUgOC4wMzEtMy4wNTEgMTAuMTQyLTQuMjY1IDIuMTEyLTkuODE0Ljk5NC0xMi4zOTUtMi40OTVsLTguNzgtMTEuODczem0tMzcuOTc0LTUwLjk4NmMtLjY3Ni0uOTA2LS4zMTgtMi4wODUuOC0yLjYzM2wxMS41MDUtNS42NDNjMS4xMTgtLjU0OCAyLjU3NC0uMjU5IDMuMjUuNjQ5bDUuMzMgNy4xNDJjLjY3Ny45MDYuMzE5IDIuMDg1LS44IDIuNjM0bC0xMS41MDQgNS42NDJjLTEuMTE4LjU0OS0yLjU3NC4yNTgtMy4yNS0uNjQ4bC01LjMzLTcuMTQzem0xMDkuNjYyIDExOS40N2w1LjA0NS0yMS43NjZjLjI0NC0xLjA1MyAxLjQ3LTEuNzQxIDIuNzM5LTEuNTRsNS44NDguOTMyYzEuMjY4LjIwMyAyLjEgMS4yMiAxLjg1NSAyLjI3MmwtNC42NiAyMC4xMDNoLTEwLjgyN3oiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=" />
                            </div>
                            <Modal
                                title={`${props.hotelDetails.HotelCategoryName} ${props.hotelDetails.HotelName} ${props.hotelDetails.CityName} ${t('on-the-map')}`}
                                open={visible}
                                onCancel={handleCancel}
                                footer={null}
                                >
                                    <div className="mapModal">
                                        <MapWithNoSSR mapInfo={props.mapInfo}/>
                                    </div>
                            </Modal>
                            </>
                        }
                    </div>
                }
                <ReactBnbGallery
                    show={galleryOpened}
                    photos={photos}
                    onClose={closeGallery} 
                    showThumbnails={true}
                    activePhotoIndex={currentImg}
                    /> 
                </>
                }                    
            </div>
        </div>
    )
}

GalleryHotel.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})
  
GalleryHotel.propTypes = {
t: PropTypes.func.isRequired,
}
  
export default withTranslation('common')(GalleryHotel)
