
import { GiTatteredBanner } from "react-icons/gi";
import { MdAddchart } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdWorkHistory } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";







export const NAV_MENU_ADMIN = [

    {
        name: "ბილბორის დამატება",
        icon: GiTatteredBanner,
        to: "/billboards",
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
    {
        name: "1",
        icon: IoIosAddCircle,
        to: "/addlandinginfo",
    },
    {
        name: "2",
        to: "/addaboutinfo",
        icon: IoIosAddCircle,
    },
];

export const NAV_MENU_ACCOUNTANT = [
    {
        name: "შეკვეთები",
        icon: MdWorkHistory,
        to: "/shipments",
    },
    {
        name: "ბუღალტერი",
        icon: MdWorkHistory,
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
