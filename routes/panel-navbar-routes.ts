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
  {
    name: "3",
    to: "/shippingcost",
    icon: IoIosAddCircle,
  },
];

export const NAV_MENU_ACCOUNTANT = [


    {
        name: "მომხმარებლები და კურიერები",
        icon: CiDeliveryTruck,
        to: "/couriers",
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
        to: "/myinvoices"
    }
];

export const NAV_MENU_COURIER = [
  {
    name: "ჩემი შეკვეთები",
    icon: MdWorkHistory,
    to: "/couriershipments",
  },
];
