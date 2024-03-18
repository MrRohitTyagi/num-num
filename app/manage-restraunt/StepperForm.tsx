"use client";

import React, { useState } from "react";
import { useShopStore } from "@/utils/store";
import { ArrowRight } from "lucide-react";

import useDimension, { breakpointType } from "@/hooks/useDimension";

function getCssByBreakpoint(breakpoint: breakpointType) {
  let classname = "";
  switch (breakpoint) {
    case "sm":
      classname = "mx-8";
      break;
    case "md":
      classname = "mx-16";
      break;
    case "lg":
      classname = "mx-32";
      break;
    case "xl":
      classname = "mx-64";
      break;
    case "2xl":
      classname = "mx-80";
      break;
    default:
      break;
  }
  return classname;
}

const StepperForm = ({
  steps,
  startFrom = 0,
}: {
  steps: React.JSX.Element[];
  startFrom: number;
}) => {
  const [currentStep, setcurrentStep] = useState<number>(startFrom);

  const { shop } = useShopStore();
  const { breakpoint, lg, md, sm, x2l, xl } = useDimension();

  console.log(
    `%c  breakpoint, lg, md, sm, x2l, xl `,
    "color: red;border:2px dotted red",
    { breakpoint, lg, md, sm, x2l, xl, steps }
  );

  const CurrentContent = steps[currentStep];

  console.log(`%c shop `, "color: green;border:1px solid green", shop);
  return (
    <div className={`${getCssByBreakpoint(breakpoint)} gap-4 flex flex-col`}>
      <div className="top-steps flex flex-row gap-3 items-center">
        {steps.map((step, i) => {
          const isLastStep = i === steps.length - 1;
          console.log(isLastStep);

          return (
            <>
              <div
                onClick={() => setcurrentStep(i)}
                className={`step-circle rounded-full h-12 w-12 
                border-[3px] text-xl flex items-center justify-center
                 border-gray-400 cursor-pointer shadow-md 
                 transition-all transition-500 ${
                   currentStep >= i ? "bg-green-100 border-green-300" : ""
                 }`}
              >
                {i + 1}
              </div>
              {!isLastStep && (
                <div
                  className={`relative rounded
                  flex-grow border-[2px] border-gray-400 shadow-md 
                   transition-all transition-500 ${
                     currentStep > i ? "border-green-300" : ""
                   }`}
                >
                  <ArrowRight
                    className={`absolute right-[-9px] top-[-12px] text-gray-400 ${
                      currentStep > i ? "text-green-300" : ""
                    }`}
                    size={24}
                  />
                </div>
              )}
            </>
          );
        })}
      </div>
      <div className="bottom-area border-[3px]">{CurrentContent}</div>
    </div>
  );
};

export default StepperForm;
