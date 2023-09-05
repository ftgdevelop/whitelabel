import moment from 'moment-jalaali';

const Time = (props) =>{
    const { date } = props;
    // let time = '--:--';
    let time = '';
    if(date){
        time = date.replace('T', ' ');
        time = moment(time).format('HH:mm');
    }

    return<span >
        {time}
    </span>
}
export default Time;