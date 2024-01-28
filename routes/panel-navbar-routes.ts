import {
    RectangleStackIcon,
    UserCircleIcon,
    CommandLineIcon,
    Squares2X2Icon,
    XMarkIcon,
    Bars3Icon,
} from "@heroicons/react/24/solid";

export const NAV_MENU_ADMIN = [

    {
        name: "ბილბორდები",
        icon: RectangleStackIcon,
        to: "/billboards",
    },
    {
        name: "ბილბორდების დამატება",
        icon: XMarkIcon,
        to: "/billboards/new",
    },
    {
        name: "ჩემი კურიერები",
        icon: Squares2X2Icon,
        to: "/couriers",
    },
    {
        name: "ბლოგპოსტების დამატება",
        icon: Bars3Icon,
        to: "/addblogposts",
    },

    {
        name: "შეკვეთების ისტორია",
        icon: UserCircleIcon,
        to: "/shipments",
    },

    {
        name: "შეკვეთის განთავსება",
        icon: CommandLineIcon,
        to: "/shipments/new",
    },
];

export const NAV_MENU_USER = [

    {
        name: "შეკვეთების ისტორია",
        icon: CommandLineIcon,
        to: "/shipments",
    },

    {
        name: "შეკვეთის განთავსება",
        icon: CommandLineIcon,
        to: "/shipments/new",
    },
];


export const NAV_MENU_COURIER = [
    {
        name: "ჩემი შეკვეთები",
        icon: RectangleStackIcon,
        to: "/couriershipments",
    },

];
