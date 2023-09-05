import {Form} from 'antd';
import {withTranslation, Link, i18n} from '../../../../../i18n';
import styles from '../../../../styles/Hotel.module.css'
import React from "react";
import {PlusIcon} from "../../../UI/Icons";
import dynamic from 'next/dynamic';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd'

const loadingIcon = <LoadingOutlined style={{ fontSize: 32, color: '#0a438b' }} spin />;

const HotelRoomItem = dynamic(
    () => import('../HotelRoomItem/HotelRoomItem'),
    { loading: () => <div style={{ textAlign: 'center' }}><Spin indicator={loadingIcon} /></div> }
)

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 24, offset: 0},
    },
};

class MultiRoom extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            enableExtraRooms: true,
            extraRooms: [
                {
                    id: 0,
                    adultCount: 1,
                    children: []
                }
            ],
            roomsLimit: props.roomsLimit
        };

        this.roomsCount = 1;
    }

    componentDidMount = () => {
        if (this.props.onChangeRoomsCallback){
            this.props.onChangeRoomsCallback({extraRooms: this.state.extraRooms})
        }
        if (this.props.defaultRooms){
            let extra=[];
            for (let i=0 ; i< this.props.defaultRooms.length ; i++){
                let extraItem = {id:i,adultCount:this.props.defaultRooms[i].adultNo,children:this.props.defaultRooms[i].childrenAges}
                extra.push (extraItem);
            }
            this.setState({extraRooms:extra}); 
            if (this.props.onChangeRoomsCallback){
                this.props.onChangeRoomsCallback({extraRooms: extra})
            }   
        }

    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.roomsLimit !== this.props.roomsLimit)
            this.setState({roomsLimit: nextProps.roomsLimit});
    };

    addExtraRoom = () => {
        if (this.state.extraRooms.length < this.state.roomsLimit) {
            const newList = [...this.state.extraRooms];
            const defaultRoom = {
                id: this.roomsCount,
                adultCount: 1,
                children: []
            };
            newList.push(defaultRoom);
            this.setState({extraRooms: newList});
            this.roomsCount++;
            if (this.props.onChangeRoomsCallback)
                this.props.onChangeRoomsCallback({extraRooms: newList})
        }
    };

    onRemoveExtraRoom = targetRoomIndex => {
        let newList = [...this.state.extraRooms];
        newList.splice(targetRoomIndex, 1);
        this.setState({extraRooms: newList});
        if (this.props.onChangeRoomsCallback)
            this.props.onChangeRoomsCallback({extraRooms: newList})
    };

    updateExtraRoomItem = (targetRoomIndex, room) => {
        let newList = [...this.state.extraRooms];
        newList[targetRoomIndex] = room;
        this.setState({extraRooms: newList});
        if (this.props.onChangeRoomsCallback)
            this.props.onChangeRoomsCallback({extraRooms: newList})
    };
    updateExtraRoomItemAdults = (roomIndex, value)=>{
        let updatingItem =  this.state.extraRooms.filter(item => item.id === roomIndex)[0];
        const otherItems =  this.state.extraRooms.filter(item => item.id !== roomIndex);
        updatingItem.adultCount = +value;
        this.setState({...this.state,extraRooms:[...otherItems,updatingItem]});
    }
    updateExtraRoomItemChildren = (roomIndex, value)=>{
        let updatingItem =  this.state.extraRooms.filter(item => item.id === roomIndex)[0];
        const otherItems =  this.state.extraRooms.filter(item => item.id !== roomIndex);
        
        let updatingItemChildren = updatingItem.children;
        if (+value < updatingItemChildren.length ){
            updatingItemChildren.splice(+value);
        }else{
            const newChildren =  parseInt(value) - updatingItem.children.length;
            for(let i = 0 ; i < newChildren ;i++){
                updatingItemChildren.push(0);
            }
        }
        updatingItem.children = updatingItemChildren;
        this.setState({...this.state,extraRooms:[...otherItems,updatingItem]});
    }

    updateExtraRoomItemChildAge = (roomIndex,index,value) => {

        let updatingItem =  this.state.extraRooms.filter(item => item.id === roomIndex)[0];
        const otherItems =  this.state.extraRooms.filter(item => item.id !== roomIndex);

        updatingItem.children[index] = +value;
        this.setState({...this.state,extraRooms:[...otherItems,updatingItem]});
    }

    render() {
        const {
            extraRooms,
            roomsLimit
        } = this.state;
        const {t} = this.props;

        return (
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
                <div className={styles.guestPicker}>
                    <div className={styles.myLabel}>
                        <div className={styles.myLabelGap} />
                        <div className={styles.singleLabel}>{t('adult+12')}</div>
                        {/* <div className={styles.singleLabel}>{t('child0-12')}</div> */}
                        {/* <div className={styles.singleLabel}>{t('child-age')} </div> */}
                    </div>
                    {
                        extraRooms.sort( (a,b) => a.id - b.id ).map((item,index) => {
                            return <HotelRoomItem
                                item={item}
                                key={`room_${item.id}`}
                                roomNumber={item.id}
                                onChangeAdultCallback={value =>{this.updateExtraRoomItemAdults(item.id, value)}}
                                // onChangeChildCallback={value => this.updateExtraRoomItemChildren(item.id, value)}
                                // onChangeChildAgeCallback={(value,index) => this.updateExtraRoomItemChildAge(item.id,index, value)}
                                onRemoveItemCallback={() => this.onRemoveExtraRoom(item.id)}
                                disableRemoveButton = {extraRooms.length<2 && index===0}
                            />
                        })
                    }
                    {
                        extraRooms.length < roomsLimit ?
                            <div className={styles.addRoom}>
                                <button onClick={this.addExtraRoom}>
                                    <PlusIcon/>
                                </button>
                                <span className='margin-start-10'>{t("add-room",{roomslimit: roomsLimit})}</span>
                            </div>
                            :
                            null
                    }
                </div>
            </Form>
        );
    }
}

MultiRoom.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default withTranslation('common')(MultiRoom)