import { GiTatteredBanner } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdWorkHistory } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

export const NAV_MENU_ADMIN = [
  {
    name: "ბილბორდი",
    icon: GiTatteredBanner,
    to: "/billboards",
  },

  {
    name: "მომხმარებლები",
    icon: CiDeliveryTruck,
    to: "/couriers",
  },
  {
    name: "ბონუსები",
    to: "/couriersbonuses",
    icon: CiDeliveryTruck,
  },
  {
    name: "ბლოგპოსტები",
    icon: GiTatteredBanner,
    to: "/addblogposts",
  },

  {
    name: "შეკვეთები",
    icon: MdWorkHistory,
    to: "/shipments",
  },

  {
    name: "შეკვეთის განთავსება",
    icon: IoIosAddCircle,
    to: "/shipments/new",
  },
  {
    name: "მთავარი",
    icon: IoIosAddCircle,
    to: "/addlandinginfo",
  },
  {
    name: "ჩვენს შესახებ",
    to: "/addaboutinfo",
    icon: IoIosAddCircle,
  },
  {
    name: "ფასები",
    to: "/shippingcost",
    icon: IoIosAddCircle,
  },
];

export const NAV_MENU_MODERATOR = [

  {
    name: "შეკვეთები",
    icon: MdWorkHistory,
    to: "/shipments",
  },

  {
    name: "შეკვეთის განთავსება",
    icon: IoIosAddCircle,
    to: "/shipments/new",
  },

];

export const NAV_MENU_INACTIVEUSER = [

  {
    name: "ანგარიშის გასააქტიურებლად გთხოვთ შეავსოთ ყველა ველი პირად კაბინეტში",
    icon: MdWorkHistory,
    to: "/inactive",
  },



];


export const NAV_MENU_ACCOUNTANT = [
  {
    name: "მომხმარებლები და კურიერები",
    icon: CiDeliveryTruck,
    to: "/couriers",
  },
  {
    name: "შეკვეთების ისტორია",
    icon: MdWorkHistory,
    to: "/accountantshipments",
  },
  {
    name: "დასრულებული შეკვეთების ისტორია",
    icon: MdWorkHistory,
    to: "/accountantfinished",
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
  {
    name: "ფინანსები",
    icon: MdWorkHistory,
    to: "/myinvoices",
  },
];

export const NAV_MENU_COURIER = [
  {
    name: "ჩემი შეკვეთები",
    icon: MdWorkHistory,
    to: "/couriershipments",
  },
  {
    name: "ბონუსები",
    icon: MdWorkHistory,
    to: "/bonus",
  },
];
