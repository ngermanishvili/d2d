import React from "react";

// components

import MapExample from "./_components/map-example";


export default function Maps() {
    return (
        <>
            <div className="flex flex-wrap">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
                    კონტაქტი
                </h1>

                <div className="w-full px-4">

                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        D2D საკონტაქტო ინფორმაცია
                    </h3>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        ჩვენი საკონტაქტო ინფორმაცია იხილეთ  ქვევით:
                    </p>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2 ">
                        <li >ტელ: +995 555 31 13 53
                        </li>
                        <li>ნინო აბაშიძე ორბელიანი 74, თბილისი 0159
                        </li>
                        <li>74 Nino Abashidze Orbeliani, Tbilisi 0159</li>
                    </ul>

                </div>
                <div className="relative flex flex-col min-w-0 break-words bg-white mt-4 w-full shadow-lg rounded">
                    <MapExample />
                </div>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    ნებისმიერი კითხვის შესახებ შეგიძლიათ დაგვიკავშირდეთ ელ.ფოსტაზე: dtwodgroup@gmail.com ან მოგვწერეთ Live Chat-ში. <br />
                    © D2D.GE ადმინისტრაცია
                </p>
            </div>
        </>
    );
}
