"use client";
import React from "react";
import Link from "next/link";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlineDeliveryDining } from "react-icons/md";
import useAboutPageData from "@/hooks/use-about-info";
import ImageUrl1 from "@/assets/images/1.png";
import ImageUrl2 from "@/assets/images/2.jpeg";
import ImageUrl3 from "@/assets/images/3.jpeg";
import ImageUrl4 from "@/assets/images/4.jpeg";
import ImageUrl5 from "@/assets/images/5.png";
import ImageUrl6 from "@/assets/images/6.jpeg";
import ImageUrl7 from "@/assets/images/courier.jpeg";
import Image from "next/image";

const AboutUs = () => {
  const {
    title,
    description,
    coverImageUrl,
    boxImageUrl,
    boxTitle,
    boxDescription,
    panjara1Description,
    freqAskedQuestionsTitle,
    freqAskedQuestionsDescription,
    freqAskedQuestions2Title,
    freqAskedQuestions2Description,
    freqAskedQuestions3Title,
    freqAskedQuestions3Description,
    freqAskedQuestions4Title,
    freqAskedQuestions4Description,
    whatWeOfferTitle,
    whatWeOfferDescription,
    whatWeOffer2Title,
    whatWeOffer2Description,
    whatWeOffer3Title,
    whatWeOffer3Description,
    whatWeOfferToCourierTitle,
    whatWeOfferToCourierDescription,
  } = useAboutPageData();

  return (
    <>
      <div className="container overflow-hidden pb-20 ">
        <div className="flex flex-wrap items-center">
          <div className="w-full  px-12 md:px-4 ml-auto mr-auto">
            <div className="mt-[20px] w-full bg-center ">
              <Image
                style={{ width: "100%", height: "300px" }}
                src={coverImageUrl}
                alt="დაბალი ტარიფები, saqartveloshi, dabali, taripi"
                width={800}
                height={300}
              />
            </div>
            <h3 className=" mt-8 text-2xl mb-2 font-semibold leading-normal">
              {title}
            </h3>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
              {panjara1Description}
            </p>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
              {description}
              <Link href="/about">D2D GROUP</Link>
            </p>
            <div className="block pb-6">
              <h3 className="text-sm mb-2 font-semibold leading-normal">
                ჩვენ მოგიტანთ{" "}
              </h3>
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
                  width={3270}
                  height={300}
                  alt="დაბალი ტარიფები, saqartveloshi, dabali, taripi"
                  src={boxImageUrl}
                  className="w-full align-middle rounded-t-lg object-cover"
                />
                <blockquote className="relative p-8 mb-4">
                  <h3 className="text-xl font-bold text-black">{boxTitle}</h3>

                  <p className="text-md font-light mt-2 text-black">
                    {boxDescription}
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
                        {freqAskedQuestionsTitle}
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        {freqAskedQuestionsDescription}
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-4 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-black text-white">
                        <CiDeliveryTruck />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        {freqAskedQuestions2Title}
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        {freqAskedQuestions2Description}
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
                      <h6 className="text-xl mb-1 font-semibold">
                        {freqAskedQuestions3Title}
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        {freqAskedQuestions3Description}
                      </p>
                    </div>
                  </div>
                  <div className="relative flex flex-col min-w-0">
                    <div className="px-4 py-5 flex-auto">
                      <div className="text-blueGray-500 p-4 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-black text-white">
                        <CiDeliveryTruck />
                      </div>
                      <h6 className="text-xl mb-1 font-semibold">
                        {freqAskedQuestions4Title}
                      </h6>
                      <p className="mb-4 text-blueGray-500">
                        {freqAskedQuestions4Description}
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
                <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                  <Image
                    width={100}
                    height={100}
                    alt="დაბალი ტარიფი, სერვისი, გამგზავნა, მიტანა, გადახდა, საკომისიო, გარანტირებული"
                    className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                    src={ImageUrl1}
                  />
                  <p className="text-lg text-white mt-4 font-semibold">
                    გარანტირებული მიტანის თარიღი
                  </p>
                </div>

                <div className="bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8">
                  <Image
                    width={100}
                    height={100}
                    alt="გარანტირებული, garantirebuli, mitana, სერვისი"
                    className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                    src={ImageUrl2}
                  />
                  <p className="text-lg text-black mt-4 font-semibold">
                    თანხის ჩარიცხვა
                  </p>
                </div>

                <div className="bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8">
                  <Image
                    width={100}
                    height={100}
                    alt="tracking-sms, თრექინგ ნომერი, იაფი, ყველაზე იაფი"
                    className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                    src={ImageUrl3}
                  />
                  <p className="text-lg text-black mt-4 font-semibold">
                    მეორედ გატანა
                  </p>
                </div>
              </div>
              <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                <div className="bg-yellow-500 shadow-lg rounded-lg text-center p-8">
                  <Image
                    width={100}
                    height={100}
                    alt="sakomisio, d2d, საკომისიო"
                    className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                    src={ImageUrl4}
                  />
                  <p className="text-lg text-black mt-4 font-semibold">
                    ადგილზე გადახდის 0% საკომისიო
                  </p>
                </div>

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
                      src={ImageUrl5}
                    />
                    <p className="text-lg text-white mt-4 font-semibold">
                      თრექინგ სისტემა
                    </p>
                  </div>
                </Link>

                <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8">
                  <Image
                    width={120}
                    height={120}
                    alt="shipping, mitana, payment, delivery, tracking, sms, მიტანა, გადახდა, გამგზავნა, თრექინგი, sms"
                    className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                    src={ImageUrl6}
                  />
                  <p className="text-lg text-white mt-4 font-semibold">
                    დაბალი ტარიფი
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto ">
            <h3 className="text-2xl mb-2 font-semibold leading-normal">
              {whatWeOfferTitle}
            </h3>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
              {whatWeOfferDescription}
            </p>

            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
              {whatWeOffer2Title}
            </p>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
              {whatWeOffer2Description}
            </p>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
              {whatWeOffer3Title}
            </p>
            <h3 className="text-sm mb-2 font-semibold leading-normal">
              {whatWeOffer3Description}
            </h3>
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
                  {whatWeOfferToCourierTitle}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  {whatWeOfferToCourierDescription}
                </p>
              </div>
            </div>

            <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
              <Image
                width={800}
                height={400}
                alt="მარტივი, სწრაფი, swrafi, uswrafesi, saxlshi, mitana, swrapad"
                className="max-w-full rounded-lg shadow-xl flex justify-center items-center"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(-4deg) rotateX(2deg) rotate(2deg)",
                  width: "100%",
                }}
                src={ImageUrl7}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
