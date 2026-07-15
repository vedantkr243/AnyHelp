import React from 'react';
import {FaArrowRight} from 'react-icons/fa'
import {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'; // Assuming this is the ya component
import CTAButton from '../components/core/HomePage/Button'; // Assuming this is the ga component
import Banner from '../assets/Images/banner.mp4';
import BgHome from '../assets/Images/bghome.svg';
import CodeBlocks from '../components/core/HomePage/CodeBlocks'; // Assuming this is the b9 component
import '../App.css';
import TimelineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'; // Assuming this is the Ub component
import InstructorSection from "../components/core/HomePage/InstructorSection" // Assuming this is the Zb component
import ExploreMore from '../components/core/HomePage/ExploreMore' // Assuming this is the Jb component
import ReviewSlider from "../components/common/ReviewSlider"
import Footer from "../components/common/Footer"
const Home = () => {
  return (
    <div className='relative mx-auto text-white flex flex-col w-11/12 items-center justify-between'>
       
        <div>

        <Link to={"/signup"}>
        
        
            <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-100
            transition-all duration-200 hover:scale-95 w-fit'>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-1.25
                transition-all duration-200 group-hover:bg-richblack-900'>
                <p className=''>Become an Instructor</p>
                
                <FaArrowRight/>
            </div>
        </div>
        </Link>

        </div>
        <div className='text-center text-4xl font-semibold mt-8'>
            Empower your future with <HighlightText text = {"Coding Skills"}/>
        </div>

         {/* intro */}
            <div className=' mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            {/* Buttons */}
            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}> 
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}> 
                    Book a Demo 
                </CTAButton>
            </div>
            <div className='mx-3 my-12 shadow-blue-200 ' >
                <video
                muted
                loop
                autoPlay
                >
                    <source src={Banner} type="video/mp4"/>
                </video>
            </div>
            <div>
                {/* codeblocks 1 */}
                <div>
                    <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your 
                            <HighlightText text={" Coding Potential "}/>
                            with our online courses.
                            </div>
                    }
                    subheading ={
                        "Our courses are designed by industry experts who have years of experience in coding and are passionate about sharing their kowledge with you"
                    }
                    ctabtn1={
                        {
                        btnText:"Try it yourself",
                        linkto: "/signup",
                        active:true,
                        }
                    }
                    ctabtn2={
                        {
                        btnText:"Learn more",
                        linkto: "/login",
                        active:false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>\n</html>` }
                    codeColor={"text-yellow-25"}
                    />
                </div>

        
                   
                    {/* codeblocks2 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='w-[100%] text-4xl font-semibold lg:w-[50%]'>
                            Start 
                            <HighlightText text={`coding in seconds`}/>
                        </div>
                    }
                    subheading = {
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }

                    codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                    codeColor={"text-blue-25"}
                />
            </div>

            <ExploreMore />
        </div>

        {/* section 2 */}
        <div className='relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-puregreys-5 text-richblack-700'>
            <div
              className='h-[310px] w-full bg-cover bg-center bg-no-repeat'
              style={{ backgroundImage: `url(${BgHome})` }}
            >
                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between mx-auto gap-5'>
                <div className='h-[150px]'/>
                <div className='flex flex-row gap-7 text-white'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex gap-3 items-center'>
                            Explore full catalog
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        <div>
                            Learn more
                        </div>
                    </CTAButton>
                </div>
                </div>
            </div>
            {/* Section 2 header, timeline, learning */}
            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
            {/* section header */}
                    <div className='flex flex-row gap-5 mb-10 mt-[95px]'>
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get the skills you need for a
                            <HighlightText text={"Job that is in high demand"}/>

                        </div>
                    
            <div className='flex flex-col gap-10 w-[40%]'>
                <div className='text-[16px]'>
                    The modern AnyHelp is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </div>
                <CTAButton active={true} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                </CTAButton>
            </div>
            </div>
            {/* Timeline section */}
                <TimelineSection />

                <LearningLanguageSection />

            </div>          
        </div>
        {/* {section 3} */}
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center
             justify-between gap-8 first-letter bg-richblack-900 text-white'>
                <InstructorSection/>

                <h2 className='text-center text-4xl font-semibold mt-10'>Review from others Learners</h2>
            {/* Review Slider here */}
            <ReviewSlider />
            </div>
                    
        {/* Footer */}
        <Footer /> 

     
      </div>
      
  
    
    

                        

           
            
            
      
     
        
      
  
    
    );
};

export default Home;
