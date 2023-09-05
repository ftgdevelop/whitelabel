import React from "react";
import {RoomIcon, RemoveIcon} from "../../../UI/Icons";
import {Select} from "antd";
import _ from 'lodash';
import {withTranslation, Link, i18n} from '../../../../../i18n';
import styles from '../../../../styles/Hotel.module.css';

const {Option} = Select;

class HotelRoomItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {
            item,
            onRemoveItemCallback,
            disableRemoveButton
        } = this.props;

        const {t} = this.props;
        return (
            <div>
                <div className={`${styles.rowRoom} ${styles.hotelRoomItem}`}>
                    <div className={styles.detailsPart}>
                        <div className={`${styles.labelRowRoom} ${styles.labelContainer}`}>
                            <div className={`${styles.iconContainer} margin-end-5`}>
                                <RoomIcon/>
                            </div>
                            <p className={styles.roomName}>{`${t('room')} ${ +item.id + 1}`}</p>
                        </div>
                        <div className={`${styles.countAdult} ${styles.adultContainer}`}>
                            <Select
                                value={item.adultCount}
                                size="default"
                                bordered={false}
                                style={{width: 80}}
                                onChange={this.props.onChangeAdultCallback}
                            >
                                <Option value="1">۱</Option>
                                <Option value="2">۲</Option>
                                <Option value="3">۳</Option>
                                <Option value="4">۴</Option>
                                <Option value="5">۵</Option>
                                <Option value="6">۶</Option>
                                <Option value="7">۷</Option>
                                <Option value="8">8</Option>
                                {/* <c value="8">۸</c> */}
                            </Select>
                        </div>
                        {/* <div className={`${styles.countChildren} ${styles.childCount}`}>
                            <Select
                                value={item.children.length}
                                size="default"
                                bordered={false}
                                style={{width: 80}}
                                onChange={this.props.onChangeChildCallback}
                            >
                                <Option value="0">۰</Option>
                                <Option value="1">۱</Option>
                                <Option value="2">۲</Option>
                                <Option value="3">۳</Option>
                                <Option value="4">۴</Option>
                                <Option value="5">۵</Option>
                                <Option value="6">۶</Option>
                            </Select>
                        </div> */}
                        {/* <div className={styles.ageChildren}>
                            {
                                item.children.map((childItem, index) => {
                                    return <Select
                                        key={index}
                                        defaultValue={childItem}
                                        size="default"
                                        style={{width: 63, marginLeft: 5}}
                                        onChange={value => this.props.onChangeChildAgeCallback(value, index)}
                                    >
                                        <Option value="0">زیر ۱</Option>
                                        <Option value="1">۱</Option>
                                        <Option value="2">۲</Option>
                                        <Option value="3">۳</Option>
                                        <Option value="4">۴</Option>
                                        <Option value="5">۵</Option>
                                        <Option value="6">۶</Option>
                                        <Option value="7">۷</Option>
                                        <Option value="8">۸</Option>
                                        <Option value="9">۹</Option>
                                        <Option value="10">۱۰</Option>
                                        <Option value="11">۱۱</Option>
                                    </Select>
                                })
                            }
                        </div> */}
                    </div>
                    {
                        !disableRemoveButton ?
                            <div className={styles.removeMyRoom}>
                                <div
                                    className="dynamic-delete-button"
                                    style={{margin: '0 8px'}}
                                    onClick={onRemoveItemCallback}
                                >
                                    <RemoveIcon/>
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

HotelRoomItem.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default withTranslation('common')(HotelRoomItem);