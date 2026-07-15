import React from 'react';
import HighlightText from './HighlightText';
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./Button"


const LearningLanguageSection = () => {
  return (
    <div className='mt-32.5 '>
      <div className='flex flex-col gap-5 items-center'>
        <div className='text-4xl font-semibold item-center'>
          Your Swiss Knife for
          <HighlightText text={"learning any Language"}/>
        </div>
        <div className='text-center text-richblack-600 mx-auto text-base w-[70%]'>
          Using spin making learning multiple languages esay. With 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className='flex flex-row items-center justify-center mt-5'>
          <img src= {know_your_progress}
          alt= "knowyourprogressImage"
          className='objext-contain -mr-32'/>
          <img src= {compare_with_others}
          alt= "comparewithothersImage"
          className='objext-contain'/>
          <img src= {plan_your_lessons}
          alt= "planyourlessonsImage"
          className='objext-contain -ml-36'/>

        </div>
        <div>
          <CTAButton active={true} linkto={"/signup"}>
            <div>
              Learn more
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;