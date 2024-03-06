import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import moment from "moment-jalaali";
import dynamic from "next/dynamic";

import { i18n, withTranslation, Router } from "../../../../i18n";
import { withRouter } from "next/router";
import { Button, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import styles from "../../../styles/Home.module.css";
import { getExteriorHotels, getHotelDetails,getInteriorHotelsV4} from "../../../actions/hotel/HotelActions";
import { GetEntityNameByLocation } from "../../../actions";
import SearchBoxDatePicker from "../../UI/SearchBoxDatePicker/index";

const SelectHotelV4 = dynamic(() => import("./SelectHotelV4"));

moment.loadPersian({ dialect: "persian-modern" });

class DomesticSearchHotel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      locale: process.env.CALENDAR_LOCALES.includes("fa") ? "fa":"en",
      selectedHotel: props.defaultSearchValue && props.cityId ? {
        id: props.cityId,
        selectedHotelId: props.selectedHotelId,
        name: props.defaultSearchValue,
        typeId: props.typeId,
      } : null,
      interiorHotels: props.interiorHotels || [],
      showing: false,
      hotelNameError: "",
      checkinDate: undefined,
      checkoutDate: undefined,
      loading: false,
    };
  }

  componentWillMount() {
    if (this.props.checkinDate) {
      this.setState({checkinDate:this.props.checkinDate});
    } else {
      this.setState({checkinDate:moment().format("YYYY-MM-DD")});
    }
    if (this.props.checkoutDate) {
      this.setState({checkoutDate:this.props.checkoutDate});
    } else {
      this.setState({checkoutDate:moment().add(1,"day").format("YYYY-MM-DD")});
    }
  }

  async componentDidMount() {
    await this.getHotelsList("");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.t !== this.props.t) {
      this.getFilteredInteriorHotelsList("");
    }
    if(this.props.checkinDate && prevProps.checkinDate !== this.props.checkinDate) {
      this.setState({checkinDate:this.props.checkinDate});
    }
    if (this.props.checkoutDate && prevProps.checkoutDate !== this.props.checkoutDate) {
      this.setState({checkoutDate:this.props.checkoutDate});
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.cityId && nextProps.defaultSearchValue) {
      const newHotelItem = { ...this.state.selectedHotel };
      newHotelItem["name"] = nextProps.defaultSearchValue;
      newHotelItem["id"] = nextProps.cityId;
      newHotelItem["typeId"] = nextProps.typeId;
      newHotelItem["selectedHotelId"] = nextProps.selectedHotelId;
      this.setState({ selectedHotel: newHotelItem });
    }
  };

  deserializeDate = (date) => {
    let transformedDate = moment(date).format("YYYY-MM-DD");
    if (this.state.locale === "fa"){
      transformedDate = moment(date).format("jYYYY-jMM-jDD");
    }
    const formattedDate = transformedDate.split("-");
    return {
      year: parseInt(formattedDate[0]),
      month: parseInt(formattedDate[1]),
      day: parseInt(formattedDate[2]),
    };
  };

  getHotelsList = async (interiorSearchValue) => {
    this.setState({ isDataLoading: true });
    await this.getFilteredInteriorHotelsList(interiorSearchValue);
    this.setState({ isDataLoading: false });
  };

  handleChange = (item) => {
    this.resetErrors();

    this.setState({
      selectedHotel: {
        id: item.id,
        selectedHotelId: item.id,
        name: item.EntityName,
        typeId: item.type,
      },
    });
  };

  onSearch = async (input) => {
    this.resetErrors();
    this.setState({ query: input });
    if (input && input.length >= 2) {
      await this.getHotelsList(input);
    } else {
      await this.getHotelsList("");
    }
    //} else if (!input) {
      // this.setState({
      //   interiorHotels: this.state.defaultInteriorHotels,
      // });
    //}
  };


  getFilteredInteriorHotelsList = async (query, onSuccessCallback) => {
    let requestParams;
    if (i18n.language === "fa") {
      requestParams = {
        Value: query.trim(),
        LanguageIds: [1, 2],
        EntityTypeIds: [2, 3, 4],
      };
    } else if (i18n.language === "ar") {
      requestParams = {
        Value: query.trim(),
        LanguageIds: [3, 2],
        EntityTypeIds: [2, 3, 4],
      };
    }
    const response = await this.props.getInteriorHotelsList(requestParams.Value, i18n.language);
    if (response && response.ok)
      this.setState({ interiorHotels: response.data });
    
    if (onSuccessCallback)
      return onSuccessCallback(response.data);
  };


  onChangeRoomType = (roomType) => {
    this.setState({
      displayMultiRooms: roomType === "more",
      selectedRoom: roomType === "more" ? "more" : roomType,
    });
  };

  ChangeLocale = () => {
    
    if (!process.env.CALENDAR_LOCALES.includes("fa")) return;
    
    this.setState(prevState=>{
      return {locale: prevState.locale === "en" ? "fa" : "en"}
    });

  };

  onChangeDate = (val, label) => {
    const date = val.year+"-"+val.month+"-"+val.day;
    let transformedDate;
    if (this.state.locale === "en"){
      transformedDate = moment(date,'YYYY-MM-DD').format("YYYY-MM-DD");
    }else{
      transformedDate = moment(date,'jYYYY-jMM-jDD').format("YYYY-MM-DD");
    }
    if (label==="checkinDate"){
      if (moment(this.state.checkoutDate).isAfter(transformedDate,"day")){
        this.setState({checkinDate:transformedDate});
      }else{
        const oneDayAfterCheckin = moment(transformedDate).add(1,"day").format("YYYY-MM-DD");
        this.setState({
          checkinDate:transformedDate,
          checkoutDate:oneDayAfterCheckin
        });
      }
    } else if (label==="checkoutDate"){
      this.setState({checkoutDate:transformedDate});
    }
  };

  setTomorrowCheckinTime = (checkinDate) => {
    const { checkoutDate } = this.state;
    const formatDate =
      this.state.locale === "fa" ? "jYYYY-jMM-jDD" : "YYYY-MM-DD";

    const tomorrowDate = moment(
      `${checkinDate.year}-${checkinDate.month}-${checkinDate.day}`,
      formatDate
    ).add(1, "day");

    const initialTomorrowDate =
      this.state.locale === "fa"
        ? {
            day: Number(tomorrowDate.format("jDD")),
            month: Number(tomorrowDate.format("jMM")),
            year: Number(tomorrowDate.format("jYYYY")),
          }
        : {
            day: Number(tomorrowDate.format("DD")),
            month: Number(tomorrowDate.format("MM")),
            year: Number(tomorrowDate.format("YYYY")),
          };

    const checkinDate_getTime = new Date(
      moment(
        `${checkinDate.year}-${checkinDate.month}-${checkinDate.day}`,
        formatDate
      )
    ).getTime();
    const checkoutDate_getTime = new Date(
      moment(
        `${checkoutDate.year}-${checkoutDate.month}-${checkoutDate.day}`,
        formatDate
      )
    ).getTime();

    if (checkinDate_getTime > checkoutDate_getTime) {
      this.setState({ checkoutDate: initialTomorrowDate });
    }
    document.getElementsByName("checkoutDate")[0].focus();
  };

  onChangeExtraRooms = ({ extraRooms }) => {
    this.setState({ extraRooms: extraRooms });
  };

  onSubmit = async () => {
    this.resetErrors();
    const {
      selectedHotel,
      checkinDate,
      checkoutDate,
    } = this.state;

    let searchValueName = this.state.selectedHotel.name;

    const response = await GetEntityNameByLocation(
      selectedHotel.selectedHotelId,
      i18n.language
    );
    if (response && response.data) {
      searchValueName = response.data.EntityName;
    }

    if (!selectedHotel || Object.keys(selectedHotel).length < 1) {
      return this.setState({ hotelNameError: "مقصد نباید خالی باشد" });
    }

    this.setState({ loading: true });
    const siteLanguage = i18n.language;

    let url = "";
    if (selectedHotel && checkinDate && checkoutDate) {
      this.setState({ disableSubmit: true });
      if (selectedHotel.typeId === "Hotel") {

        const hotelDetails = await this.props.GetHotelDetails(
          { hotelId: selectedHotel.selectedHotelId },
          i18n.language
        );
        if (hotelDetails && hotelDetails.ok) {
          url = hotelDetails.data.Url;
        }
      } else {
        if (selectedHotel.typeId === "City") {
          if (siteLanguage === "fa") {
            url = `/hotels/هتل-های-${searchValueName.replace(/ /g, "-")}`;
          } else if (siteLanguage === "ar") {
            url = `/hotels/فنادق-${searchValueName.replace(/ /g, "-")}`;
          } else {
            url = `/hotels/${searchValueName.replace(/ /g, "-")}`;
          }
        } else if (selectedHotel.typeId === "Province") {
          if (siteLanguage === "fa") {
            url = `/hotels/هتل-های-استان-${searchValueName.replace(/ /g, "-")}`;
          } else if (siteLanguage === "ar") {
            url = `/hotels/فنادق-محافظة-${searchValueName.replace(/ /g, "-")}`;
          } else {
            url = `/hotels/${searchValueName.replace(/ /g, "-")}`;
          }
        }
      }

      url += `/location-${selectedHotel.id}/checkin-${checkinDate}/checkout-${checkoutDate}`;

      this.setState({ disableSubmit: false });

      // TODO DELETE process.env.NEW_SITE_URL
      Router.push(process.env.NEW_SITE_URL+url).then();
      
    }
    
    setTimeout(() => {
      this.setState({ loading: false });
    }, "5000")

  };

  resetErrors = () => this.setState({ hotelNameError: "" });

  render() {
    const {
      interiorHotels,
      showing,
      hotelNameError,
      isDataLoading,
      checkoutDate,
      checkinDate,
      disableSubmit,
    } = this.state;

    const { selectedHotelId, defaultSearchValue, t } = this.props;

    return (
      <>
        {process.env.THEME_NAME === "TAJAWAL" && showing ? (
          <div
            className={styles.bgShadowFixed}
            onClick={() => this.setState({ showing: false })}
          />
        ) : null}

        <div
          className={`${styles.searchHotel} ${styles.searchHotelRoot} ${
            process.env.THEME_NAME === "TRAVELO" && styles.searchHotelTravelo
          }`}
          onClick={() => this.setState({ showing: true })}
        >
          <Row gutter={[8, 0]}>
            <Col
              xs={24}
              sm={24}
              md={10}
              className={styles.basicSingleHotel}
            >
              <SelectHotelV4
                // isForeign={this.props.isForeign}
                data={interiorHotels}
                defaultValue={defaultSearchValue}
                tooltipMessage={hotelNameError}
                enableLoading={isDataLoading}
                selectedValueId={selectedHotelId}
                onInputFocusCallback={this.resetErrors}
                onChangeInputCallback={this.onSearch}
                // onChangeTabCallback={(id) =>
                //   this.setState({ selectedHotelGroup: id })
                // }
                onSelectITemCallback={this.handleChange}
                onClearInputCallback={() => {
                  this.setState({ selectedHotel: null });
                }}
              />
            </Col>
            <Col
              xs={24}
              md={10}
            >
              <Row  gutter={process.env.THEME_NAME === "TRAVELO" ? [8, 0] : [0, 0]}>
                <Col span={12}>
                  <SearchBoxDatePicker
                    inputPlaceholder={t('checkin-date')}
                    onChangeDate={this.onChangeDate}
                    selectedDate={this.deserializeDate(checkinDate)}
                    wrapperClassname="search-hotel-datepicker checkin"
                    minimumDate={this.deserializeDate(moment().format("YYYY-MM-DD"))}
                    field="checkinDate"
                    ChangeLocale={process.env.CALENDAR_LOCALES.includes("fa") ? this.ChangeLocale : undefined}
                    locale={process.env.CALENDAR_LOCALES.includes("fa") ? this.state.locale : "en"}
                  />
                </Col>
                <Col span={12}>
                  <SearchBoxDatePicker
                    inputPlaceholder={t('checkout-date')}
                    onChangeDate={this.onChangeDate}
                    selectedDate={this.deserializeDate(checkoutDate)}
                    wrapperClassname="search-hotel-datepicker checkout"
                    minimumDate={this.deserializeDate(moment(checkinDate).add(1,'day').format("YYYY-MM-DD"))}
                    name="checkoutDate"
                    field="checkoutDate"
                    ChangeLocale={process.env.CALENDAR_LOCALES.includes("fa") ? this.ChangeLocale : undefined}
                    locale={process.env.CALENDAR_LOCALES.includes("fa") ? this.state.locale : "en"}
                  />
                </Col>
              </Row>
            </Col>

            {process.env.THEME_NAME === "TAJAWAL" && (
              <Col xs={24} sm={24} md={24} lg={4}>
                <div className={`${styles.btnhotelSearch}`}>
                  <Button
                    className="button red-btn full-width"
                    loading={this.state.loading}
                    size="large"
                    type="myPrimary"
                    htmlType="submit"
                    onClick={!disableSubmit ? this.onSubmit : null}
                  >
                    <SearchOutlined />
                    {t("search")}
                  </Button>
                </div>
              </Col>
            )}

            {process.env.THEME_NAME === "TRAVELO" && (
              <Col
                xs={24}
                sm={24}
                md={4}
              >

                <Button
                  className="button blue-btn full-width button-v4"
                  loading={this.state.loading}
                  size="large"
                  type="myPrimary"
                  htmlType="submit"
                  onClick={!disableSubmit ? this.onSubmit : null}
                >
                  {t("search")}
                </Button>
              </Col>
            )}
          </Row>

        </div>
      </>
    );
  }
}

DomesticSearchHotel.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

const mapDispatchToProps = (dispatch) => ({
  getInteriorHotelsList: (params, currentlang) => dispatch(getInteriorHotelsV4(params, currentlang)),
  getExteriorHotelsList: (params) => dispatch(getExteriorHotels(params)),
  GetHotelDetails: (params, currentlang) => dispatch(getHotelDetails(params, currentlang)),
});

DomesticSearchHotel.propTypes = {
  t: PropTypes.func.isRequired,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(
  withTranslation("common")(withRouter(DomesticSearchHotel))
);
