"use client";

import { Divide } from "lucide-react";

export const Footer = () => {

    const currentYear = new Date().getFullYear();


    return (
        <footer>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Top area: Blocks */}
                <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">

                    {/* 1st block */}
                    <div className="sm:col-span-12 lg:col-span-3">
                        <div className="mb-2">
                            {/* <Logo /> */}
                        </div>
                        <div className="text-sm text-gray-600">
                            <h1 className="my-2">D2D • საკურიერო კომპანია</h1>
                        </div>

                        <div className="text-sm text-gray-600">
                            <a href="/info/privacy-policy" className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out">კონფიდენციალურობა</a> · <a href="/info/privacy-policy" className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out"> პირობები</a>
                        </div>
                    </div>

                    {/* 2nd block */}
                    <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                        <h6 className="text-gray-800 font-medium mb-2">მომსახურება</h6>
                        <ul className="text-sm">
                            <li className="mb-2">
                                <a href="/" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">მთავარი</a>
                            </li>
                            <li className="mb-2">
                                <a href="/about" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">ჩვენს შესახებ</a>
                            </li>
                            <li className="mb-2">
                                <a href="/about" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"> როგორ შევუკვეთო? </a>
                            </li>
                            <li className="mb-2">
                                <a href="/about" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">ფასები</a>
                            </li>

                        </ul>
                    </div>

                    {/* 3rd block */}
                    <div className="sm:col-span-6 md:col-span-3 lg:col-span-2 ">
                        {/* <h6 className="text-gray-800 font-medium mb-2">კონტაქტი</h6>
                        <ul className="text-sm">
                            <li className="mb-2">
                                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Documentation</a>
                            </li>
                            <li className="mb-2">
                                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Tutorials & Guides</a>
                            </li>
                            <li className="mb-2">
                                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Blog</a>
                            </li>
                            <li className="mb-2">
                                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Support Center</a>
                            </li>
                            <li className="mb-2">
                                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">Partners</a>
                            </li>
                        </ul> */}
                        <h6 className="text-gray-800 font-medium mb-2">სერვისები</h6>
                        <ul className="text-sm">
                            <li className="mb-2">
                                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out hidden">Home</a>
                                <a href="/about" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">რას ვთავაზობთ მომხმარებლებს?</a>

                            </li>
                            <li className="mb-2">
                                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out hidden">About us</a>
                                <a href="/about" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">რას ვთავაზობთ კურიერებს?</a>

                            </li>


                        </ul>
                    </div>

                    {/* 4th block */}
                    <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                        <h6 className="text-gray-800 font-medium mb-2">კონტაქტი</h6>
                        <ul className="text-sm">
                            <li className="mb-2">
                                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out hidden">contact</a>
                                <a href="/contact" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">როგორ დაგიკავშირდეთ?</a>

                            </li>


                            <li className="mb-2">
                                <a href="#0" className="text-gray-600 hidden hover:text-gray-900 transition duration-150 ease-in-out">Pricing</a>
                                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">ფასები</a>

                            </li>
                            <li className="mb-2">
                                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out hidden">Privacy Policy</a>
                                <a href="#0" className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out">პირობები</a>

                            </li>
                        </ul>
                    </div>

                    {/* 5th block */}
                    <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
                        <h6 className="text-gray-800 font-medium mb-2">კონტაქტი</h6>
                        <p className="text-sm text-gray-600 mb-4">მიიღე ყველა ინფორმაცია D2D * დითუდი / საკურიერო სერვისებთან დაკავშირებით </p>
                        <form>
                            <div className="flex flex-wrap mb-4">
                                <div className="w-full">
                                    <label className="block text-sm sr-only" htmlFor="newsletter">Email</label>
                                    <div className="relative flex items-center max-w-xs">
                                        <input id="newsletter" type="email" className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm" placeholder="ელ-ფოსტა" required />
                                        <button type="submit" className="absolute inset-0 left-auto" aria-label="Subscribe">
                                            <span className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300" aria-hidden="true"></span>
                                            <svg className="w-3 h-3 fill-current text-blue-600 mx-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>

                </div>

                {/* Bottom area */}
                <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
                    {/* Social as */}
                    <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
                        <li>
                            <a href="#0" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Twitter">
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                                </svg>
                            </a>
                        </li>
                        <li className="ml-4">
                            <a href="https://facebook.com/d2ddelivery1" className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Facebook">
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <div className="text-sm text-gray-600 mr-4">
                        <a href="https://www.linkedin.com/company/visionary-labb"> © Developed by Visionary Lab</a>
                    </div>

                    {/* Copyrights note */}
                    <div className="text-sm text-gray-600 mr-4">
                        &copy; D2D.GE ყველა უფლება დაცულია. {currentYear}
                    </div>

                </div>

            </div>
        </footer>
    );
}

export default Footer;
