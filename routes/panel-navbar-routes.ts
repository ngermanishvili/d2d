
import { GiTatteredBanner } from "react-icons/gi";
import { MdAddchart } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdWorkHistory } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";







export const NAV_MENU_ADMIN = [

    {
        name: "ბილბორდები",
        icon: GiTatteredBanner,
        to: "/billboards",
    },
    {
        name: "ბილბორდების დამატება",
        to: "/billboards/new",
        icon: MdAddchart,

    },
    {
        name: "ჩემი კურიერები",
        icon: CiDeliveryTruck,
        to: "/couriers",
    },
    {
        name: "ბლოგპოსტების დამატება",
        icon: GiTatteredBanner,
        to: "/addblogposts",
    },

    {
        name: "შეკვეთების ისტორია",
        icon: MdWorkHistory,
        to: "/shipments",
    },

    {
        name: "შეკვეთის განთავსება",
        icon: IoIosAddCircle,
        to: "/shipments/new",
    },
];

export const NAV_MENU_USER = [

    {
        name: "შეკვეთების ისტორია",
        icon: MdWorkHistory,
        to: "/shipments",
    },

    {
        name: "შეკვეთის განთავსება",
        icon: IoIosAddCircle,
        to: "/shipments/new",
    },
];


export const NAV_MENU_COURIER = [
    {
        name: "ჩემი შეკვეთები",
        icon: MdWorkHistory,
        to: "/couriershipments",
    },

];
