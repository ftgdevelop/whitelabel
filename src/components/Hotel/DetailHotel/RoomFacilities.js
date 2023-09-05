import React from 'react'
import { withTranslation } from "../../../../i18n";
import AnimatedShowMore from "react-animated-show-more";

const RoomFacilities = (props) => {
    const { t, availabilityItem } = props;
    
    const facilitieItem = (keyword) => {
        switch (keyword) {
            case "hairdryer":
                return "https://cdn2.safaraneh.com/images/hotel/facilities/hairdryer.png";

            case "closet":
                return "https://cdn2.safaraneh.com/images/hotel/facilities/closet.png";
            
            case "tea-maker":
                return "https://cdn2.safaraneh.com/images/hotel/facilities/tea-maker.png";
            
            case "free-wifi":
                return "https://cdn2.safaraneh.com/images/hotel/facilities/free-wifi.png";
            
            case "safe-box-room":
                return "https://cdn2.safaraneh.com/images/hotel/facilities/safe-box-room.png";
                
            case " refrigerator":
                return "https://cdn2.safaraneh.com/images/hotel/facilities/refrigerator.png";
            
            case "furniture":
                return "https://cdn2.safaraneh.com/images/hotel/facilities/furniture.png";
            
            case "toilet":
                return "https://cdn2.safaraneh.com/images/hotel/facilities/toilet.png";
            
            case "tv":
                return "https://cdn2.safaraneh.com/images/hotel/facilities/tv.png";
            
            default:
                ""
        }
    }

    return (
        <div className="list-facilities">
            <AnimatedShowMore
            height={103}
            toggle={({ isOpen }) =>
                isOpen ? t("less") : t("more")
            }
            speed={0}
            shadowColor="transparent"
            >
                <ul className="table-facilities">
                    {availabilityItem.rooms[0].facilities && availabilityItem.rooms[0].facilities.map((fac) => (
                        <li>
                            <img
                                src={facilitieItem(fac.keyword)}
                                alt={fac.name}
                                title={fac.name}
                            />
                            <span>{fac.name}</span>
                        </li>
                    ))}
                </ul>
            </AnimatedShowMore>
        </div>
    )
}

RoomFacilities.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(RoomFacilities);