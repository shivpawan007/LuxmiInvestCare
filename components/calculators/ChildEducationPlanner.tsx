"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  GraduationCap,
  IndianRupee,
  Percent,
  Share2,
} from "lucide-react";

import ChildEducationInputs from "./ChildEducationInputs";
import ChildEducationResults from "./ChildEducationResults";

import DownloadReport from "./DownloadReport";
import ReportShareDialog from "./sharing/ReportShareDialog";
import ConnectWithLuxmi from "./sharing/ConnectWithLuxmi";

import {
  calculateEducationPlan,
} from "@/lib/education";

export default function ChildEducationPlanner() {
  const [
    currentAge,
    setCurrentAge,
  ] = useState(5);

  const [
    educationStartAge,
    setEducationStartAge,
  ] = useState(18);

  const [
    currentEducationCost,
    setCurrentEducationCost,
  ] = useState(
    2000000,
  );

  const [
    expectedReturn,
    setExpectedReturn,
  ] = useState(12);

  const [
    educationInflation,
    setEducationInflation,
  ] = useState(6);

  const [
    shareOpen,
    setShareOpen,
  ] = useState(false);

  const result =
    useMemo(
      () =>
        calculateEducationPlan(
          currentAge,
          educationStartAge,
          currentEducationCost,
          expectedReturn,
          educationInflation,
        ),
      [
        currentAge,
        educationStartAge,
        currentEducationCost,
        expectedReturn,
        educationInflation,
      ],
    );

  return (
    <section className="section bg-white">
      <div className="container-custom">

        {/* ==================================================
            HERO
        ================================================== */}
        <div className="mx-auto mb-14 max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
            CHILD EDUCATION PLANNER
          </span>

          <h1 className="section-title mt-6">
            Estimate Your Child's
            <span className="block text-green-700">
              Future Education Cost
            </span>
          </h1>

          <p className="section-subtitle">
            Estimate the future cost of education
            and explore illustrative monthly SIP
            or one-time investment requirements
            based on the assumptions entered.
          </p>

        </div>

        {/* ==================================================
            INPUTS
        ================================================== */}
        <ChildEducationInputs
          currentAge={
            currentAge
          }
          setCurrentAge={
            setCurrentAge
          }
          educationStartAge={
            educationStartAge
          }
          setEducationStartAge={
            setEducationStartAge
          }
          currentEducationCost={
            currentEducationCost
          }
          setCurrentEducationCost={
            setCurrentEducationCost
          }
          expectedReturn={
            expectedReturn
          }
          setExpectedReturn={
            setExpectedReturn
          }
          educationInflation={
            educationInflation
          }
          setEducationInflation={
            setEducationInflation
          }
        />

        {/* ==================================================
            RESULTS
        ================================================== */}
        <ChildEducationResults
          currentEducationCost={
            currentEducationCost
          }
          yearsToGoal={
            result.yearsToGoal
          }
          futureEducationCost={
            result.futureEducationCost
          }
          monthlySIP={
            result.monthlySIP
          }
          lumpsumRequired={
            result.lumpsumRequired
          }
        />

        {/* ==================================================
            REPORT ACTIONS
        ================================================== */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <DownloadReport
            calculatorType="child-education"
            investment={
              currentEducationCost
            }
            annualReturn={
              expectedReturn
            }
            years={
              result.yearsToGoal
            }
            investedAmount={
              currentEducationCost
            }
            estimatedReturns={
              Math.max(
                0,
                result.futureEducationCost -
                  currentEducationCost,
              )
            }
            maturityValue={
              result.futureEducationCost
            }
            childEducationData={{
              currentAge,
              educationStartAge,
              currentEducationCost,
              expectedReturn,
              educationInflation,
              yearsToGoal:
                result.yearsToGoal,
              futureEducationCost:
                result.futureEducationCost,
              monthlySIP:
                result.monthlySIP,
              lumpsumRequired:
                result.lumpsumRequired,
            }}
            reportTitle="Child Education Planning Illustration"
            fileName="Luxmi-InvestCare-Child-Education-Planning-Illustration.pdf"
          />

          <ReportShareDialog
            open={
              shareOpen
            }
            onClose={() =>
              setShareOpen(false)
            }
            calculatorType="child-education"
            reportTitle="Child Education Planning Illustration"
            investment={
              currentEducationCost
            }
            years={
              result.yearsToGoal
            }
            annualReturn={
              expectedReturn
            }
            estimatedReturns={
              Math.max(
                0,
                result.futureEducationCost -
                  currentEducationCost,
              )
            }
            maturityValue={
              result.futureEducationCost
            }
          />

          <button
            type="button"
            onClick={() =>
              setShareOpen(true)
            }
            className="flex items-center gap-2 rounded-lg border border-green-700 bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50"
          >
            <Share2 className="h-5 w-5" />
            Share Report
          </button>

          <ConnectWithLuxmi
            calculatorType="child-education"
            reportTitle="Child Education Planning Illustration"
            investment={
              currentEducationCost
            }
            years={
              result.yearsToGoal
            }
            annualReturn={
              expectedReturn
            }
            estimatedReturns={
              Math.max(
                0,
                result.futureEducationCost -
                  currentEducationCost,
              )
            }
            maturityValue={
              result.futureEducationCost
            }
          />

        </div>

        {/* ==================================================
            PLANNING NOTE
        ================================================== */}
        <div className="mt-12 rounded-3xl border border-green-200 bg-green-50 p-8">

          <h2 className="text-xl font-bold text-green-800">
            Planning Note
          </h2>

          <p className="mt-3 leading-7 text-slate-700">
            The figures shown are illustrations
            based on the assumptions entered.
            Actual education costs, investment
            returns and future funding requirements
            may differ.
          </p>

        </div>

      </div>
    </section>
  );
}