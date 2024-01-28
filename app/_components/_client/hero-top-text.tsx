import VideoThumb from '@/assets/images/hero-image.png'
import ModalVideo from "@/app/_components/_client/modal-video"
import useBillboardData from '@/hooks/use-billboard-data';
import BillBoardUi from "@/components/billboard/billboard-ui";


export default function TopText() {
    const { imageUrl, loading, label } = useBillboardData();
    return (
        <section className="relative">

            {/* Illustration behind hero content */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
                <svg className='md:w-1360 h-auto hidden md:block' width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                            <stop stopColor="#FFF" offset="0%" />
                            <stop stopColor="#EAEAEA" offset="77.402%" />
                            <stop stopColor="#DFDFDF" offset="100%" />
                        </linearGradient>
                    </defs>
                    <g fill="url(#illustration-01)" fillRule="evenodd">
                        <circle cx="1232" cy="240" r="88" />
                        <circle cx="155" cy="443" r="64" />
                    </g>
                </svg>
            </div>


            <div className="max-w-6xl mx-auto px-4 sm:px-6">


                {/* Hero content */}
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">

                    {/* Section header */}
                    <div className="text-center pb-12 md:pb-16">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 uppercase" data-aos="zoom-y-out" >d2d <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-400">GEORGIA</span></h1>

                        <div className="max-w-3xl mx-auto">
                            <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150"> ქვეყნის მაშტაბით, ჩვენ ვუზრუნველვყოფთ სწრაფ და უსაფრთხო მიწოდებას. თვალყური ადევნეთ თქვენს გვერდს  და ისიამოვნეთ უსწრაფესი მიწოდებით კონკურენტულ ფასებში. </p>
                        </div>
                    </div>

                    {/* Hero image */}
                    {/* <ModalVideo
                        thumb={VideoThumb}
                        thumbWidth={768}
                        thumbHeight={432}
                        thumbAlt="Modal video thumbnail"
                        video="https://www.youtube.com/watch?v=7JdSjdY6h7c"
                        videoWidth={1920}
                        videoHeight={1080} /> */}

                </div>


            </div>


        </section>
    )
}