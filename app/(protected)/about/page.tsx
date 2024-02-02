"use client"
import React from 'react'
import Link from 'next/link'
import { Image } from 'antd'
import Logo from '@/assets/images/d2d.jpg'
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineDeliveryDining } from "react-icons/md";
import BillBoardUi from '@/components/billboard/billboard-ui';
import useBillboardData from '@/hooks/use-billboard-data';


const AboutUs = () => {
    const { imageUrl, loading, label } = useBillboardData();

    const yourWidthValue = "100%";
    const yourHeightValue = "400px";
    return (

        <>
            <div className="container mx-auto overflow-hidden pb-20 ">
                <div className="flex flex-wrap items-center">

                    <div className="w-full  px-12 md:px-4 ml-auto mr-auto">
                        <div className='mt-[80px] w-full'>
                            <BillBoardUi label={label} imageUrl={imageUrl} loading={loading} />
                        </div>
                        <h3 className="text-3xl mb-2 font-semibold leading-normal">
                            ჩვენს შესახებ
                        </h3>
                        <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                            ჩვენ ვქნით მარტივ და მოხერხებულ სერვის მომხმარებლისთვის, გაზრდილი ეფექტურობით და კომფორტით.
                        </p>
                        <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                            ჩვენი მისიაა  – ქვეყანაში ლოჯისტიკური ქსელის დალაგება და განვითარება.
                            ჩვენ ვქნით მარტივ და მოხერხებულ სერვის მომხმარებლისთვის, გაზრდილი ეფექტურობით და კომფორტით !
                            ონლაინ მაღაზიის გაყიდვების ზრდას მხოლოდ დაბალი ფასი და პროდუქციის ხარისხი არ განაპირობებს.  მნიშვნელოვანია სწრაფი და ხარისხიანი მიწოდების გეგმის შემუშავება რათა გახადო ეს შენ ძლიერ ინსტრუმენტად.
                            <Link href="/about">D2D GROUP</Link></p>
                        <div className="block pb-6">

                            <h3 className="text-sm mb-2 font-semibold leading-normal">ჩვენ მოვიტანთ </h3>
                            <span className="text-xs font-semibold inline   -block py-1 px-2  rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                საბუთებს
                            </span>
                            <span className="text-xs font-semibold inline-block py-1 px-2  rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                საჩუქრებს
                            </span>
                            <span className="text-xs font-semibold inline-block py-1 px-2  rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                საამანათო ზომის ნივთებს
                            </span>
                            <span className="text-xs font-semibold inline-block py-1 px-2  rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                საყოფაცხოვრებო ტექნიკას
                            </span>
                            <span className="text-xs font-semibold inline-block py-1 px-2  rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                ჭურჭელს
                            </span>
                            <span className="text-xs font-semibold inline-block py-1 px-2  rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                ტანსაცმელს
                            </span>
                            <span className="text-xs font-semibold inline-block py-1 px-2  rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                ტექნიკას
                            </span>
                            <span className="text-xs font-semibold inline-block py-1 px-2  rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                                ...
                            </span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto pt-32">
                    <div className="flex flex-wrap items-center">
                        <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                                <Image
                                    width={yourWidthValue}
                                    height={yourHeightValue}
                                    alt="დაბალი ტარიფები, saqartveloshi, dabali, taripi"
                                    src="https://plus.unsplash.com/premium_photo-1682090260563-191f8160ca48?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    className="w-full align-middle rounded-t-lg object-cover"
                                />
                                <blockquote className="relative p-8 mb-4">
                                    <h3 className="text-xl font-bold text-black">
                                        ხშირად დასმული კითხვები
                                    </h3>

                                    <p className="text-md font-light mt-2 text-black">
                                        რატომ უნდა დახარჯოთ დრო და ნერვები იმის გამო რომ სხვა საკურიერო შეკვეთებს გიგვიანებთ,კარგადვს და თანაც საკმაოდ ძვირად გიჯდებათ ეს ყველაფერი?
                                    </p>
                                </blockquote>
                            </div>
                        </div>


                        <div className="w-full md:w-6/12 px-4">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-6/12 px-4">
                                    <div className="relative flex flex-col mt-4">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full text-white bg-red-500">
                                                <MdOutlineDeliveryDining />
                                            </div>
                                            <h6 className="text-xl mb-1 font-semibold">
                                                ნივთების აღება/ჩაბარება ხდება ყოველდღე
                                            </h6>
                                            <p className="mb-4 text-blueGray-500">
                                                ჩვენთან ნივთების აღება/ჩაბარება ხდება ყოველდღე კვირა დღის გარდა.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col min-w-0">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-4 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-black text-white">
                                                <CiDeliveryTruck />
                                            </div>
                                            <h6 className="text-xl mb-1 font-semibold">
                                                დღეს გავაფორმე შეკვეთა როდის მომიტანენ?                                            </h6>
                                            <p className="mb-4 text-blueGray-500">
                                                აღებული ნივთის ჩაბარება ხდება გარანტირებულად მეორე დღეს
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-6/12 px-4">
                                    <div className="relative flex flex-col min-w-0 mt-4">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full text-white bg-red-500">
                                                <MdOutlineDeliveryDining />
                                            </div>
                                            <h6 className="text-xl mb-1 font-semibold">როგორ გადავიხადო?</h6>
                                            <p className="mb-4 text-blueGray-500">
                                                გადახდა შეუძლია როგორც გამგზავნს ასევე მიმღებ ადამიანს შეკვეთის აღების მომენტში.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex flex-col min-w-0">
                                        <div className="px-4 py-5 flex-auto">
                                            <div className="text-blueGray-500 p-4 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-black text-white">
                                                <CiDeliveryTruck />
                                            </div>
                                            <h6 className="text-xl mb-1 font-semibold">
                                                როგორ ვადევნო შეკვეთებს თვალი?
                                            </h6>
                                            <p className="mb-4 text-blueGray-500">
                                                შეკვეთის წარმატებით გაფორმების შემდეგ თქვენს ამანათს მიენიჭება TRACKIN ნომერი რომლის საშუალებითაც ვებსაიტზე Live რეჟიმში შეგიძლიათ ადევნოთ თვალი შეკვეთის სტატუსს და ადგილმდებარეობას.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="flex flex-wrap items-center pt-32">
                    <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-12">
                        <div className="justify-center flex flex-wrap relative">
                            <div className="my-4 w-full lg:w-6/12 px-4">
                                <Link
                                    href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index"
                                    target="_blank"
                                >
                                    <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                                        <Image
                                            width={100}
                                            height={100}
                                            alt="დაბალი ტარიფები, saqartveloshi, dabali, taripi, "
                                            className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                            src="https://images.unsplash.com/photo-1653330963134-329a61aedc68?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        />
                                        <p className="text-lg text-white mt-4 font-semibold">
                                            დაბალი ტარიფი
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=vtw-index"
                                    target="_blank"
                                >
                                    <div className="bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8">
                                        <Image
                                            width={100}
                                            height={100}
                                            alt="გარანტირებული, garantirebuli, mitana, სერვისი"
                                            className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                            src="https://images.unsplash.com/photo-1465844880937-7c02addc633b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        />
                                        <p className="text-lg text-black mt-4 font-semibold">
                                            გარანტირებული მიტანის თარიღი
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=vtw-index"
                                    target="_blank"
                                >
                                    <div className="bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8">
                                        <Image
                                            width={100}
                                            height={100}
                                            alt="tracking-sms, თრექინგ ნომერი, იაფი, ყველაზე იაფი"
                                            className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                            src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        />
                                        <p className="text-lg text-black mt-4 font-semibold">
                                            თრექინგ SMS სისტემა
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                                <Link
                                    href="https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index"
                                    target="_blank"
                                >
                                    <div className="bg-yellow-500 shadow-lg rounded-lg text-center p-8">
                                        <Image
                                            width={100}
                                            height={100}
                                            alt="sakomisio, d2d, საკომისიო"
                                            className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                            src="https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?q=80&w=3267&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        />
                                        <p className="text-lg text-black mt-4 font-semibold">
                                            ადგილზე გადახდის 0% საკომისიო
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    href="https://www.creative-tim.com/learning-lab/tailwind/angular/alerts/notus?ref=vtw-index"
                                    target="_blank"
                                >
                                    <div className="bg-red-700 shadow-lg rounded-lg text-center p-8 mt-8">
                                        <Image
                                            width={100}
                                            height={100}
                                            alt="upaso მიტანა, გადახდა, გამგზავნა, თრექინგი, sms, უფასო, შეკვეთა, ყიდვა , yidva, kidva."
                                            className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                            src="https://images.unsplash.com/photo-1577702312572-5bb9328a9f15?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        />
                                        <p className="text-lg text-white mt-4 font-semibold">
                                            მეორედ გატანა უფასოდ.
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    href="https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vtw-index"
                                    target="_blank"
                                >
                                    <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8">
                                        <Image
                                            width={120}
                                            height={120}
                                            alt="shipping, mitana, payment, delivery, tracking, sms, მიტანა, გადახდა, გამგზავნა, თრექინგი, sms"
                                            className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                                            src="https://images.unsplash.com/photo-1625027589035-0844e7f91b1b?q=80&w=3346&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        />
                                        <p className="text-lg text-white mt-4 font-semibold">
                                            თანხის ჩარიცხვა იმავე დღეს
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>


                    <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto ">
                        <h3 className="text-2xl mb-2 font-semibold leading-normal">
                            რას ვთავაზობთ ჩვენს კლიენტებს?
                        </h3>
                        <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                            კომპანია ფლობს საკუთარ ავტოპარკს და ჰყავს გამოცდილი, მაღალკვალიფიციური კურიერები
                            კომპანიას გააჩნია სასაწყობე ფართები და ხდება დროული და გარანტირებული მიწოდება ქალაქის მასშტაბით.
                        </p>
                        <ul className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                            <li className='text-red-400'>ნივთების აღება/ჩაბარება ხდება ყოველდღე</li>
                            <li className='text-red-400'>აღებული ნივთის ჩაბარება ხდება გარანტირებულად მეორე დღეს </li>
                            <li className='text-red-400'>ქეშად გადახდის სისტემა, საკომისიოს გარეშე  ჩგდ 0% </li>
                            <li className='text-red-400'>Tracking SMS სისტემა </li>
                        </ul>
                        <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                            კომპანიისგან ავტომატურად იგზავნება სმს შეტყობინება ადრესატთან როდესაც მოხდება ამანათის გატანა ჩასაბარებლად. ამ სისტემის მიზანია, რომ მიმღები იყოს ინფორმირებული და დახვდეს კურიერს მისამართზე.
                        </p>
                        <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                            თუ ადრესატთან ვერ მოხერხდა მიწოდება იმის გამო რომ არ იმყოფებოდა მისამართზე, ტელეფონი გათშული ჰქონდა ან სხვა მსგავსი მიზეზის გამო მეორედ ჩასაბარებლად გატანა ჩვენთან არის უფასო
                        </p>
                        <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                            მისამართებიდან აღებული თანხის ჩარიცხვა ხდება იმავე დღეს
                        </p>
                        <h3 className="text-sm mb-2 font-semibold leading-normal">რატომ უნდა დახარჯოთ დრო და ნერვები იმის გამო რომ სხვა საკურიერო შეკვეთებს გიგვიანებთ,კარგადვს და თანაც საკმაოდ ძვირად გიჯდებათ ეს ყველაფერი? </h3>


                    </div>
                </div>
            </div>

            <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
                <div
                    className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
                    style={{ transform: "translateZ(0)" }}
                >
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                            className="text-blueGray-100 fill-current"
                            points="2560 0 2560 100 0 100"
                        ></polygon>
                    </svg>
                </div>




                <div className="container mx-auto px-4 pb-32 pt-48">
                    <div className="items-center flex flex-wrap">
                        <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
                            <div className="md:pr-12">

                                <h3 className="text-3xl font-semibold">
                                    რას ვთავაზობთ კურიერებს ?
                                </h3>
                                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                                    D2D GROUP-ს კურიერებისთვის აქვს გამოყოფილი ცალკე სექცია რომელიც განსაზღვრავს მიწოდების სისტემას და მისი გამოყენების პირობებს.

                                </p>
                                <ul className="list-none mt-6">
                                    <div>
                                        <div className="flex items-center">
                                            <div>
                                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                                                    <i className="fas fa-fingerprint"></i>
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="text-md font-semibold mt-2 text-black">
                                                    ადმინისტრაცია გაძლევთ შეკვეთას
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <div className="flex items-center">
                                            <div>
                                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                                                    <i className="fab fa-html5"></i>
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="text-md font-semibold mt-2 text-black">
                                                    შეკვეთა ჩანს თქვენს კაბინეტში
                                                </h4>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-2">
                                        <div className="flex items-center">
                                            <div>
                                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                                                    <i className="far fa-paper-plane"></i>
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="text-md font-semibold mt-2 text-black">
                                                    კურიერს აქვს შესაძლებლობა დასკანერებით მოძებნოს მისთვის გასატანად განკუთვნილი შეკვეთები. შეცვალოს სტატუსი დაწეროს კომენტარი და ა.შ.
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
                            <Image
                                width={yourWidthValue}
                                height={yourHeightValue}
                                alt="მარტივი, სწრაფი, swrafi, uswrafesi, saxlshi, mitana, swrapad"
                                className="max-w-full rounded-lg shadow-xl"
                                style={{
                                    transform:
                                        "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                                }}
                                src="https://plus.unsplash.com/premium_photo-1661766131927-5026561fd0cc?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            />
                        </div>
                    </div>
                </div>
            </section>




        </>
    )
}

export default AboutUs