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
import MutualFundRiskWarning from "@/components/compliance/MutualFundRiskWarning";

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
            CHILD EDUCATION COST CALCULATOR
          </span>

          <h1 className="section-title mt-6">
            Explore Your Child's
            <span className="block text-green-700">
              Future Education Cost
            </span>
          </h1>

          <p className="section-subtitle">
            Explore the illustrative future cost of education and the investment amounts shown under the assumptions entered.
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
<<<<<<< HEAD
            reportTitle="Child Education Cost Illustration"
            fileName="Luxmi-InvestCare-Child-Education-Cost-Illustration.pdf"
=======
            reportTitle="Education Cost Planning Illustration"
            fileName="Luxmi-InvestCare-Child-Education-Planning-Illustration.pdf"
>>>>>>> 3009785d61e560b0d68acdde5db65bd016e215b4
          />

          <ReportShareDialog
            open={
              shareOpen
            }
            onClose={() =>
              setShareOpen(false)
            }
            calculatorType="child-education"
<<<<<<< HEAD
            reportTitle="Child Education Cost Illustration"
=======
            reportTitle="Education Cost Planning Illustration"
>>>>>>> 3009785d61e560b0d68acdde5db65bd016e215b4
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
<<<<<<< HEAD
            reportTitle="Child Education Cost Illustration"
=======
            reportTitle="Education Cost Planning Illustration"
>>>>>>> 3009785d61e560b0d68acdde5db65bd016e215b4
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
            ILLUSTRATION NOTE
        ================================================== */}
        <div className="mt-12 rounded-3xl border border-green-200 bg-green-50 p-8">

          <h2 className="text-xl font-bold text-green-800">
            Illustration Note
          </h2>

          <p className="mt-3 leading-7 text-slate-700">
            The figures shown are illustrations
            based on the assumptions entered.
            Actual education costs, investment
            returns and illustrative investment amounts
            may differ.
          </p>

        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="mb-3 text-lg font-bold text-slate-900">Investor Education Disclaimer</h3>
          <p className="mb-4 text-sm leading-7 text-slate-600">
            This calculator provides an educational illustration based on the assumptions entered. Actual education costs and investment outcomes may differ.
          </p>
          <MutualFundRiskWarning />
        </div>

      </div>
    </section>
  );
}