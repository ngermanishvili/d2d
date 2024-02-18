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
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Once upon a time, in a far-off land, there was a very lazy king who
                    spent all day lounging on his throne. One day, his advisors came to him
                    with a problem: the kingdom was running out of money.
                </p>
                <div className="w-full px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white mt-4 w-full shadow-lg rounded">
                        <MapExample />
                    </div>
                    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                        სათაური
                    </h3>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        The kings subjects were not amused. They grumbled and complained, but
                        the king was firm:
                    </p>
                    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                        <li>1st level of puns: 5 gold coins</li>
                        <li>2nd level of jokes: 10 gold coins</li>
                        <li>3rd level of one-liners : 20 gold coins</li>
                    </ul>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        As a result, people stopped telling jokes, and the kingdom fell into a
                        gloom. But there was one person who refused to let the kings
                        foolishness get him down: a court jester named Jokester.
                    </p>
                </div>
            </div>
        </>
    );
}
