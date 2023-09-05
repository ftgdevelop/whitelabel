import { useState , useEffect} from 'react';
import moment from 'moment-jalaali'
import { Link, i18n, withTranslation } from "../../../../i18n";
import { Form, Input, Button, Row, Col, Table, Skeleton } from 'antd'
import pickBy from 'lodash/pickBy'
import { connect } from "react-redux";
import styles from '../../../styles/Home.module.css'
import { GetTransactionDeposit } from '../../../actions/user/authActions'
import SearchBoxDatePicker from "../../UI/SearchBoxDatePicker/index";



const columns = [
    {
        title: 'زمان',
        dataIndex: 'creationTime',
        key: 'creationTime',
        // sorter: {
        //     compare: (a, b) => a.time - b.time,
        //     multiple: 2,
        // },
        render: (text) => i18n.language === 'fa' ?
             moment(text, 'YYYY-MM-DD HH:mm').format('jYYYY-jMM-jDD HH:mm') 
             : moment(text, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm') 
    },
    {
        title: 'نوع تراکنش',
        dataIndex: 'type',
        key: 'type'
    },
    // {
    //     title: 'توضیح',
    //     dataIndex: 'information',
    //     key: 'information'
    // },
    {
        title: 'مبلغ',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: 'باقی مانده',
        dataIndex: 'initialAmount',
        key: 'initialAmount'
    },
];



const TransactionList = (props) => {
    const { t } = props;
    const [data, setData] = useState([]);
    const [loading, setLoading]= useState(true);
    const [page, setPage]= useState(1);
    const [total, setTotal]= useState(0);
    const [local, setLocal] = useState(i18n.language === 'fa' ? 'fa' : 'en');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');



    const getData = async(currentPage = 1, filterValues = {}) => {

        const params = filterValues;
        params.CurrencyType = props.currency;
        params.SkipCount = currentPage-1;
        params.MaxResultCount = 10;
        const query = _.map(params, (value, key) => `${key}=${value}`).join('&')

        const res = await GetTransactionDeposit(query);
        setLoading(false);
        if(res.status === 200){
            setData(res.data.result.items.map((item, index) => ({...item, key: index})));
            setTotal(res.data.result.totalCount)
        }

    }

    useEffect(()=>{
        getData(page);
    },[])

    const onChange = (val) => {
        setPage(val);
        setLoading(true);
        getData(val);
    }

    const changeFormatDate = (date) => {
        if(local === 'fa'){
            const newDate = moment(
                `${date.year}-${date.month}-${date.day}`,
                "jYYYY-jMM-jDD"
            ).format("YYYY-MM-DD");
            return newDate;
        }else{
            const newDate = moment(
                `${date.year}-${date.month}-${date.day}`,
                "YYYY-MM-DD"
            ).format("YYYY-MM-DD");
            return newDate;
        }
         
    }

    const submit = (values) =>{
        setPage(1);
        setLoading(true);
        const params = pickBy(values);
        if(fromDate) params.CreationTimeFrom = changeFormatDate(fromDate);
        if(toDate) params.CreationTimeTo = changeFormatDate(toDate);
        getData(1, params);
    }

    const ChangeLocale = () => {
        const locale= local == 'en' ? 'fa': 'en';
        setLocal(locale);
        if(locale === 'en'){
            if(fromDate) setFromDate(convertToMiladi(fromDate))
            if(toDate) setToDate(convertToMiladi(toDate))
        }else{
            if(fromDate) setFromDate(convertToJalali(fromDate))
            if(toDate) setToDate(convertToJalali(toDate))
        }
    }

    const convertToMiladi = (date) => {
        const newDate = moment(
            `${date.year}-${date.month}-${date.day}`,
            "jYYYY-jMM-jDD"
        );
        return {
            day: Number(newDate.format("DD")),
            month: Number(newDate.format("MM")),
            year: Number(newDate.format("YYYY")),
        };
    }

    const convertToJalali = (date) => {
        const newDate = moment(
            `${date.year}-${date.month}-${date.day}`,
            "YYYY-MM-DD"
        );
        return {
            day: Number(newDate.format("jDD")),
            month: Number(newDate.format("jMM")),
            year: Number(newDate.format("jYYYY")),
        };
    }

    const onChangeDate = (date, label) => {
        if (label == "fromDate") {
            setFromDate(date)
        }else if (label == "toDate") {
            setToDate(date)
        }
    }

    return (
        <div className={styles.noTransation}>
        <h3>{t('search-transaction')}</h3>
        <Form
            layout="vertical"
            className={styles.walletSearch}
            onFinish={submit}
            >
                <Row gutter={[20, 20]}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                        <Form.Item
                            label={t('order-no')}
                            tooltip={t('order-no-desc')}
                            name="reserveId"
                            className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo}`}
                            >
                            <Input style={{ height: "46px" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item
                            label="تاریخ"
                            className={`${process.env.THEME_NAME === "TRAVELO" && styles.formItemTravelo} ${styles.formItemTraveloDate}`}
                            >
                            <SearchBoxDatePicker
                                defaultValue={fromDate}
                                inputPlaceholder={t('from-date')}
                                locale={local}
                                ChangeLocale={ChangeLocale}
                                field='fromDate'
                                onChangeDate={onChangeDate}
                                selectedDate={fromDate}
                            />
                            <SearchBoxDatePicker
                                defaultValue={toDate}
                                inputPlaceholder={t("to-date")}
                                locale={local}
                                ChangeLocale={ChangeLocale}
                                field='toDate'
                                onChangeDate={onChangeDate}
                                selectedDate={toDate}/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={3} md={3} lg={3} xl={3}>
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="button"
                                style={{ height: "46px" }}
                                className={`ant-btn-secondary ${process.env.THEME_NAME === "TRAVELO" && styles.btnPaymentTravelo}`}
                                >
                                {t('search')}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
        </Form>
        {!loading?(
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: info => <span>توضیحات : {info.information}</span>,
                    rowExpandable: info => info.name !== 'توضیحات وجود ندارد!',
                  }}
                dataSource={data}
                pagination={{total: total, pageSize: 10, current: page, onChange: (val)=>onChange(val)}}
            />
        ):<Skeleton />}
    </div>

    )

}


const mapStateToProp = (state) => {
    return {
      currency: state.currency
    };
  };
  
export default withTranslation("common")(
connect(mapStateToProp, null)(TransactionList)
);
  