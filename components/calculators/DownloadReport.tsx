"use client";

import { Download } from "lucide-react";
import jsPDF from "jspdf";

import type { SIPProjection } from "@/lib/sip";
import type { LumpsumProjection } from "@/lib/lumpsum";
import type { SWPProjection } from "@/lib/swp";

interface StepUpSIPProjection {
  year: number;
  monthlySIP: number;
  annualInvestment: number;
  totalInvested: number;
  estimatedValue: number;
}

interface GoalPlannerReportData {
  goal: string;
  targetAmount: number;
  years: number;
  expectedReturn: number;
  inflation: number;
  futureValue: number;
  monthlySIP: number;
  lumpsumRequired: number;
}

interface ChildEducationReportData {
  currentAge: number;
  educationStartAge: number;
  currentEducationCost: number;
  expectedReturn: number;
  educationInflation: number;
  yearsToGoal: number;
  futureEducationCost: number;
  monthlySIP: number;
  lumpsumRequired: number;
}

interface DownloadReportProps {
  calculatorType:
  | "sip"
  | "lumpsum"
  | "swp"
  | "step-up-sip"
  | "goal-planner"
  | "child-education";


  investment: number;
  annualReturn: number;
  years: number;

  investedAmount: number;
  estimatedReturns: number;
  maturityValue: number;

  yearlyGrowth?:
  | SIPProjection[]
  | LumpsumProjection[]
  | SWPProjection[]
  | StepUpSIPProjection[]
  | Array<{
    year: number;
    monthlySIP: number;
    annualInvestment: number;
    totalInvested: number;
    estimatedValue: number;
  }>;

  swpData?: { initialCorpus: number; monthlyWithdrawal: number; totalWithdrawn: number; remainingCorpus: number; estimatedGrowth: number; sustainable: boolean; exhaustionYear: number | null; };

  stepUpData?: {
    startingMonthlySIP: number;
    annualStepUp: number;
    annualReturn: number;
    years: number;
    totalInvested: number;
    estimatedValue: number;
    wealthGain: number;
    finalMonthlySIP: number;
    projections: Array<{
      year: number;
      monthlySIP: number;
      annualInvestment: number;
      totalInvested: number;
      estimatedValue: number;
    }>;
  };

  goalData?: GoalPlannerReportData;

  childEducationData?: ChildEducationReportData;

  reportTitle?: string;
  fileName?: string;
}

const BRAND = {
  name: "Luxmi InvestCare",
  subtitle: "AMFI Registered Mutual Fund Distributor",
  website: "www.luxmiInvestCare.com",
  email: "info@luxmiinvestcare.com",
  whatsapp: "9650060044",
  facebook: "facebook.com/luxmiinvestcare",
  instagram: "instagram.com/luxmiinvestcare",
  youtube: "youtube.com/@Luxmiinvestcare",
  arn: "ARN-365140",
};

const C = {
  green: [0, 128, 72] as const,
  darkGreen: [0, 102, 58] as const,
  teal: [0, 126, 118] as const,
  gold: [194, 145, 45] as const,
  dark: [25, 45, 40] as const,
  text: [65, 75, 75] as const,
  muted: [105, 115, 115] as const,
  border: [218, 226, 222] as const,
  light: [247, 250, 249] as const,
  white: [255, 255, 255] as const,
  greyLine: [145, 160, 180] as const,
};

type ProjectionRow = {
  year: number;
  invested: number;
  value: number;
  estimatedReturns: number;
};

function formatCurrency(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function formatLakh(value: number): string {
  const lakh = value / 100000;

  if (lakh >= 100) {
    return `₹${lakh.toFixed(0)} L`;
  }

  if (lakh >= 10) {
    return `₹${lakh.toFixed(1)} L`;
  }

  return `₹${lakh.toFixed(2)} L`;
}

function formatStepUpChartAxis(
  value: number,
): string {
  if (
    !Number.isFinite(value) ||
    value <= 0
  ) {
    return "₹0";
  }

  const crore =
    value / 10000000;

  if (crore >= 1) {
    const display =
      Number(
        crore.toFixed(1),
      );

    return `₹${display.toLocaleString(
      "en-IN",
    )} Cr`;
  }

  const lakh =
    value / 100000;

  const display =
    Number(
      lakh.toFixed(1),
    );

  return `₹${display.toLocaleString(
    "en-IN",
  )} L`;
}

function formatStepUpCompact(
  value: number,
): string {
  if (
    !Number.isFinite(value) ||
    value <= 0
  ) {
    return "₹0";
  }

  if (value >= 10000000) {
    return `₹${(
      value / 10000000
    ).toFixed(1)} Cr`;
  }

  return `₹${(
    value / 100000
  ).toFixed(1)} L`;
}

function formatSWPChartAxis(value: number): string {
  if (!Number.isFinite(value) || value <= 0) {
    return "₹0";
  }

  const crore = value / 10000000;

  if (crore >= 1) {
    const display = Number(crore.toFixed(1));

    return `₹${display.toLocaleString("en-IN")} Cr`;
  }

  const lakh = value / 100000;
  const display = Number(lakh.toFixed(1));

  return `₹${display.toLocaleString("en-IN")} L`;
}

function normalizeRows(
  rows:
    | SIPProjection[]
    | LumpsumProjection[]
    | SWPProjection[]
    | StepUpSIPProjection[]
    | undefined,
): ProjectionRow[] {
  if (!rows?.length) {
    return [];
  }

  return rows.map((row) => {
    const item =
      row as unknown as Record<
        string,
        unknown
      >;

    const invested = Number(
      item.invested ??
      item.investment ??
      item.openingCorpus ??
      item.totalInvested ??
      0,
    );

    const value = Number(
      item.value ??
      item.maturityValue ??
      item.closingCorpus ??
      item.estimatedValue ??
      0,
    );

    const estimatedReturns = Number(
      item.estimatedReturns ??
      item.returns ??
      item.growth ??
      (
        value - invested
      ),
    );

    return {
      year: Number(
        item.year ?? 0,
      ),
      invested,
      value,
      estimatedReturns,
    };
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);

    image.onerror = () =>
      reject(new Error(`Unable to load image: ${src}`));

    image.src = src;
  });
}

async function loadPdfFont(
  pdf: jsPDF,
  url: string,
  fileName: string,
  fontName: string,
  style: "normal" | "bold",
) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Unable to load PDF font: ${url}`);
  }

  const buffer = await response.arrayBuffer();

  const bytes = new Uint8Array(buffer);

  let binary = "";

  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(
      ...bytes.subarray(
        i,
        Math.min(i + chunkSize, bytes.length),
      ),
    );
  }

  const base64 = btoa(binary);

  pdf.addFileToVFS(fileName, base64);

  pdf.addFont(
    fileName,
    fontName,
    style,
  );
}

function setFont(
  pdf: jsPDF,
  bold = false,
) {
  pdf.setFont(
    "NotoSans",
    bold ? "bold" : "normal",
  );
}

function addPageHeader(
  pdf: jsPDF,
  reportTitle: string,
  logo: HTMLImageElement,
) {
  const pageWidth =
    pdf.internal.pageSize.getWidth();

  pdf.setFillColor(...C.green);

  pdf.rect(
    0,
    0,
    pageWidth,
    10,
    "F",
  );

  pdf.addImage(
    logo,
    "PNG",
    18,
    15,
    25,
    25,
  );

  setFont(pdf, true);

  pdf.setFontSize(17);

  pdf.setTextColor(...C.darkGreen);

  pdf.text(
    BRAND.name,
    48,
    23,
  );

  setFont(pdf);

  pdf.setFontSize(8);

  pdf.setTextColor(...C.muted);

  pdf.text(
    BRAND.subtitle,
    48,
    29,
  );

  pdf.setFontSize(7.5);

  pdf.text(
    BRAND.website,
    pageWidth - 18,
    21,
    {
      align: "right",
    },
  );

  pdf.text(
    `WhatsApp: ${BRAND.whatsapp}`,
    pageWidth - 18,
    27,
    {
      align: "right",
    },
  );

  setFont(pdf, true);

  pdf.setFontSize(14);

  pdf.setTextColor(...C.dark);

  pdf.text(
    reportTitle,
    18,
    52,
  );

  pdf.setDrawColor(...C.green);

  pdf.setLineWidth(0.65);

  pdf.line(
    18,
    57,
    pageWidth - 18,
    57,
  );
}

function addPageFooter(pdf: jsPDF) {
  const pageWidth =
    pdf.internal.pageSize.getWidth();

  const pageHeight =
    pdf.internal.pageSize.getHeight();

  pdf.setDrawColor(...C.green);

  pdf.setLineWidth(0.45);

  pdf.line(
    18,
    pageHeight - 27,
    pageWidth - 18,
    pageHeight - 27,
  );

  setFont(pdf, true);

  pdf.setFontSize(7.5);

  pdf.setTextColor(...C.darkGreen);

  pdf.text(
    BRAND.name,
    18,
    pageHeight - 20,
  );

  setFont(pdf);

  pdf.setFontSize(6.8);

  pdf.setTextColor(...C.muted);

  pdf.text(
    `${BRAND.website} | ${BRAND.email} | WhatsApp: ${BRAND.whatsapp}`,
    18,
    pageHeight - 15,
  );

  pdf.text(
    `Facebook: ${BRAND.facebook} | Instagram: ${BRAND.instagram} | ${BRAND.arn}`,
    18,
    pageHeight - 10,
  );

  pdf.text(
    `Page ${pdf.getCurrentPageInfo().pageNumber}`,
    pageWidth - 18,
    pageHeight - 10,
    {
      align: "right",
    },
  );
}

function addSectionTitle(
  pdf: jsPDF,
  number: string,
  title: string,
  subtitle: string,
  y: number,
) {
  setFont(pdf, true);

  pdf.setFontSize(14);

  pdf.setTextColor(...C.darkGreen);

  pdf.text(
    `${number}. ${title}`,
    18,
    y,
  );

  setFont(pdf);

  pdf.setFontSize(8);

  pdf.setTextColor(...C.muted);

  pdf.text(
    subtitle,
    18,
    y + 7,
  );
}

function addCard(
  pdf: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  value: string,
  accent: readonly [
    number,
    number,
    number,
  ] = C.green,
) {
  pdf.setFillColor(...C.light);

  pdf.setDrawColor(...C.border);

  pdf.setLineWidth(0.35);

  pdf.roundedRect(
    x,
    y,
    w,
    h,
    3,
    3,
    "FD",
  );

  pdf.setFillColor(...accent);

  pdf.roundedRect(
    x,
    y,
    2.2,
    h,
    1,
    1,
    "F",
  );

  setFont(pdf);

  pdf.setFontSize(8);

  pdf.setTextColor(...C.muted);

  pdf.text(
    label,
    x + 8,
    y + 10,
  );

  setFont(pdf, true);

  pdf.setFontSize(12);

  pdf.setTextColor(...C.dark);

  pdf.text(
    value,
    x + 8,
    y + 22,
  );
}

function addGrowthChart(
  pdf: jsPDF,
  rows: ProjectionRow[],
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const chartX = x + 13;

  const chartY = y + 8;

  const chartW = w - 22;

  const chartH = h - 28;

  if (!rows.length) {
    setFont(pdf);

    pdf.setFontSize(8);

    pdf.setTextColor(...C.muted);

    pdf.text(
      "Year-wise projection data is not available.",
      x,
      y + 20,
    );

    return;
  }

  const maxValue = Math.max(
    ...rows.map((r) => r.value),
    1,
  );

  pdf.setDrawColor(...C.border);

  pdf.setLineWidth(0.3);

  for (let i = 0; i <= 4; i++) {
    const gy =
      chartY +
      chartH -
      (chartH * i) / 4;

    pdf.line(
      chartX,
      gy,
      chartX + chartW,
      gy,
    );

    setFont(pdf);

    pdf.setFontSize(6.5);

    pdf.setTextColor(...C.muted);

    pdf.text(
      formatLakh(
        (maxValue * i) / 4,
      ),
      chartX - 3,
      gy + 2,
      {
        align: "right",
      },
    );
  }

  pdf.setDrawColor(...C.greyLine);

  pdf.line(
    chartX,
    chartY,
    chartX,
    chartY + chartH,
  );

  pdf.line(
    chartX,
    chartY + chartH,
    chartX + chartW,
    chartY + chartH,
  );

  const point = (
    index: number,
    value: number,
  ) => {
    const px =
      chartX +
      (rows.length === 1
        ? chartW / 2
        : (chartW * index) /
        (rows.length - 1));

    const py =
      chartY +
      chartH -
      (value / maxValue) *
      chartH;

    return [px, py] as const;
  };

  const drawSeries = (
    key: "invested" | "value",
    color: readonly [
      number,
      number,
      number,
    ],
  ) => {
    pdf.setDrawColor(...color);

    pdf.setLineWidth(1.25);

    for (
      let i = 1;
      i < rows.length;
      i++
    ) {
      const a = point(
        i - 1,
        rows[i - 1][key],
      );

      const b = point(
        i,
        rows[i][key],
      );

      pdf.line(
        a[0],
        a[1],
        b[0],
        b[1],
      );
    }

    pdf.setFillColor(...color);

    for (
      let i = 0;
      i < rows.length;
      i++
    ) {
      const p = point(
        i,
        rows[i][key],
      );

      if (
        rows.length <= 20 ||
        i === 0 ||
        i === rows.length - 1
      ) {
        pdf.circle(
          p[0],
          p[1],
          1.15,
          "F",
        );
      }
    }
  };

  drawSeries(
    "invested",
    C.greyLine,
  );

  drawSeries(
    "value",
    C.green,
  );

  const labelIndexes =
    new Set<number>([
      0,
      Math.max(
        0,
        Math.floor(
          (rows.length - 1) /
          3,
        ),
      ),
      Math.max(
        0,
        Math.floor(
          (2 *
            (rows.length - 1)) /
          3,
        ),
      ),
      rows.length - 1,
    ]);

  setFont(pdf);

  pdf.setFontSize(6.5);

  pdf.setTextColor(...C.muted);

  labelIndexes.forEach((i) => {
    const p = point(
      i,
      0,
    );

    pdf.text(
      `Y${rows[i].year}`,
      p[0],
      chartY + chartH + 8,
      {
        align: "center",
      },
    );
  });

  const legendY =
    y + h - 9;

  pdf.setFillColor(
    ...C.greyLine,
  );

  pdf.circle(
    x + 5,
    legendY - 1,
    1.8,
    "F",
  );

  setFont(pdf);

  pdf.setFontSize(7);

  pdf.setTextColor(...C.text);

  pdf.text(
    "Total Investment",
    x + 10,
    legendY + 1,
  );

  pdf.setFillColor(
    ...C.green,
  );

  pdf.circle(
    x + 72,
    legendY - 1,
    1.8,
    "F",
  );

  pdf.text(
    "Estimated Portfolio Value",
    x + 77,
    legendY + 1,
  );
}

function addDonutChart(
  pdf: jsPDF,
  investment: number,
  returns: number,
  maturity: number,
  centerX: number,
  centerY: number,
) {
  const total =
    Math.max(
      maturity,
      1,
    );

  const investmentAngle =
    (investment / total) *
    Math.PI *
    2;

  const outer = 23;

  const inner = 14;

  const drawSegment = (
    start: number,
    end: number,
    color: readonly [
      number,
      number,
      number,
    ],
  ) => {
    const steps = 40;

    pdf.setFillColor(...color);

    for (
      let i = 0;
      i < steps;
      i++
    ) {
      const a1 =
        start +
        ((end - start) *
          i) /
        steps;

      const a2 =
        start +
        ((end - start) *
          (i + 1)) /
        steps;

      const x1 =
        centerX +
        outer *
        Math.cos(a1);

      const y1 =
        centerY +
        outer *
        Math.sin(a1);

      const x2 =
        centerX +
        outer *
        Math.cos(a2);

      const y2 =
        centerY +
        outer *
        Math.sin(a2);

      const ix1 =
        centerX +
        inner *
        Math.cos(a1);

      const iy1 =
        centerY +
        inner *
        Math.sin(a1);

      const ix2 =
        centerX +
        inner *
        Math.cos(a2);

      const iy2 =
        centerY +
        inner *
        Math.sin(a2);

      pdf.lines(
        [
          [
            x1 - centerX,
            y1 - centerY,
          ],
          [
            ix1 - x1,
            iy1 - y1,
          ],
          [
            ix2 - ix1,
            iy2 - iy1,
          ],
          [
            x2 - ix2,
            y2 - iy2,
          ],
        ],
        centerX,
        centerY,
        [1, 1],
        "F",
        true,
      );
    }
  };

  drawSegment(
    -Math.PI / 2,
    -Math.PI / 2 +
    investmentAngle,
    C.green,
  );

  drawSegment(
    -Math.PI / 2 +
    investmentAngle,
    (3 * Math.PI) / 2,
    C.teal,
  );

  pdf.setFillColor(
    ...C.white,
  );

  pdf.circle(
    centerX,
    centerY,
    inner - 0.5,
    "F",
  );

  setFont(pdf, true);

  pdf.setFontSize(11);

  pdf.setTextColor(
    ...C.darkGreen,
  );

  pdf.text(
    formatLakh(maturity),
    centerX,
    centerY - 1,
    {
      align: "center",
    },
  );

  setFont(pdf);

  pdf.setFontSize(6.5);

  pdf.setTextColor(...C.muted);

  pdf.text(
    "Projected Corpus",
    centerX,
    centerY + 6,
    {
      align: "center",
    },
  );
}

function addYearTable(
  pdf: jsPDF,
  rows: ProjectionRow[],
) {
  const pageWidth =
    pdf.internal.pageSize.getWidth();

  const x = 18;

  const y = 72;

  const tableW =
    pageWidth - 36;

  const rowH = 6.15;

  const headerH = 8;

  const col = [
    24,
    50,
    50,
    tableW - 124,
  ];

  pdf.setFillColor(
    ...C.green,
  );

  pdf.roundedRect(
    x,
    y,
    tableW,
    headerH,
    2,
    2,
    "F",
  );

  setFont(pdf, true);

  pdf.setFontSize(7.2);

  pdf.setTextColor(
    ...C.white,
  );

  const headers = [
    "Year",
    "Total Investment",
    "Estimated Value",
    "Estimated Gain",
  ];

  let cx = x;

  headers.forEach(
    (header, i) => {
      pdf.text(
        header,
        cx +
        (i === 0
          ? col[i] / 2
          : col[i] - 3),
        y + 5.2,
        {
          align:
            i === 0
              ? "center"
              : "right",
        },
      );

      cx += col[i];
    },
  );

  rows.forEach(
    (row, index) => {
      const ry =
        y +
        headerH +
        index * rowH;

      const rowFill: readonly [
        number,
        number,
        number,
      ] =
        index % 2 === 0
          ? [248, 251, 250]
          : C.white;

      pdf.setFillColor(...rowFill);

      pdf.setDrawColor(
        ...C.border,
      );

      pdf.rect(
        x,
        ry,
        tableW,
        rowH,
        "FD",
      );

      setFont(
        pdf,
        index ===
        rows.length - 1,
      );

      pdf.setFontSize(7.1);

      pdf.setTextColor(
        ...C.dark,
      );

      let px = x;

      pdf.text(
        String(row.year),
        px +
        col[0] / 2,
        ry + 4.2,
        {
          align: "center",
        },
      );

      px += col[0];

      pdf.text(
        formatCurrency(
          row.invested,
        ),
        px +
        col[1] -
        3,
        ry + 4.2,
        {
          align: "right",
        },
      );

      px += col[1];

      pdf.text(
        formatCurrency(
          row.value,
        ),
        px +
        col[2] -
        3,
        ry + 4.2,
        {
          align: "right",
        },
      );

      px += col[2];

      pdf.setTextColor(
        ...C.darkGreen,
      );

      pdf.text(
        formatCurrency(
          row.estimatedReturns,
        ),
        px +
        col[3] -
        3,
        ry + 4.2,
        {
          align: "right",
        },
      );
    },
  );
}

function addDisclaimer(pdf: jsPDF) {
  const pageWidth = pdf.internal.pageSize.getWidth();

  const items = [
    "This calculator is provided for investor education and illustration purposes only.",
    "The projections shown are based on the assumptions entered by the user and an assumed rate of return.",
    "Actual investment returns may vary depending on market conditions, scheme performance, costs, taxes and other factors.",
    "Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.",
    "Past performance does not guarantee future returns.",
    "The projected values shown in this report are not guaranteed returns and should not be interpreted as a promise of future performance.",
    "This calculator output should not by itself be construed as personalised investment advice.",
  ];

  /*
   * Page 5 disclaimer content starts below the section
   * title + subtitle to avoid overlap.
   */
  let y = 91;

  const numberX = 20;
  const textX = 30;
  const textWidth = pageWidth - 50;

  items.forEach((item, index) => {
    const lines = pdf.splitTextToSize(
      item,
      textWidth,
    );

    /*
     * Number
     */
    setFont(pdf, true);
    pdf.setFontSize(8.5);
    pdf.setTextColor(...C.darkGreen);

    pdf.text(
      `${index + 1}.`,
      numberX,
      y,
    );

    /*
     * Disclaimer text
     */
    setFont(pdf);
    pdf.setFontSize(8.5);
    pdf.setTextColor(...C.text);

    pdf.text(
      lines,
      textX,
      y,
      {
        lineHeightFactor: 1.45,
      },
    );

    /*
     * Dynamic spacing based on wrapped lines.
     */
    const lineHeight = 4.8;
    const itemHeight = Math.max(
      11,
      lines.length * lineHeight + 4,
    );

    y += itemHeight;
  });

  /*
   * Contact / brand information box
   */
  const boxY = y + 5;
  const boxX = 18;
  const boxWidth = pageWidth - 36;
  const boxHeight = 30;

  pdf.setFillColor(...C.light);
  pdf.setDrawColor(...C.border);
  pdf.setLineWidth(0.4);

  pdf.roundedRect(
    boxX,
    boxY,
    boxWidth,
    boxHeight,
    3,
    3,
    "FD",
  );

  /*
   * Brand name
   */
  setFont(pdf, true);
  pdf.setFontSize(8.5);
  pdf.setTextColor(...C.darkGreen);

  pdf.text(
    BRAND.name,
    boxX + 7,
    boxY + 8,
  );

  /*
   * Distributor status
   */
  setFont(pdf);
  pdf.setFontSize(7);
  pdf.setTextColor(...C.muted);

  pdf.text(
    BRAND.subtitle,
    boxX + 7,
    boxY + 14,
  );

  /*
   * Website + email
   */
  pdf.text(
    `${BRAND.website} | ${BRAND.email}`,
    boxX + 7,
    boxY + 20,
  );

  /*
   * WhatsApp + ARN
   */
  pdf.text(
    `WhatsApp: ${BRAND.whatsapp} | ${BRAND.arn}`,
    boxX + 7,
    boxY + 26,
  );
}

function addSWPDisclaimer(pdf: jsPDF) {
  const pageWidth = pdf.internal.pageSize.getWidth();

  const items = [
    "This SWP calculator is provided for investor education and illustration purposes only.",
    "The projection is based on the assumptions entered by the user, including the assumed annual rate of return and withdrawal amount.",
    "Actual investment outcomes may vary depending on market conditions, scheme performance, costs, taxes and other factors.",
    "Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.",
    "The projected values shown in this report are illustrative and are not guaranteed returns.",
    "The calculator does not account for all possible market conditions, changes in withdrawal requirements or taxation implications.",
    "This calculator output should not by itself be construed as personalised investment advice.",
  ];

  let y = 82;

  items.forEach((item, index) => {
    setFont(pdf, true);
    pdf.setFontSize(8);
    pdf.setTextColor(...C.darkGreen);

    pdf.text(
      `${index + 1}.`,
      20,
      y,
    );

    const lines = pdf.splitTextToSize(
      item,
      pageWidth - 54,
    );

    setFont(pdf);
    pdf.setFontSize(8);
    pdf.setTextColor(...C.text);

    pdf.text(
      lines,
      29,
      y,
      {
        lineHeightFactor: 1.35,
      },
    );

    y += Math.max(
      10,
      lines.length * 4.3 + 5,
    );
  });

  const boxY = Math.min(y + 5, 218);

  pdf.setFillColor(...C.light);
  pdf.setDrawColor(...C.border);

  pdf.roundedRect(
    18,
    boxY,
    pageWidth - 36,
    40,
    3,
    3,
    "FD",
  );

  setFont(pdf, true);
  pdf.setFontSize(9);
  pdf.setTextColor(...C.darkGreen);

  pdf.text(
    BRAND.name,
    25,
    boxY + 10,
  );

  setFont(pdf);
  pdf.setFontSize(7.5);
  pdf.setTextColor(...C.muted);

  pdf.text(
    BRAND.subtitle,
    25,
    boxY + 17,
  );

  pdf.text(
    `${BRAND.website} | ${BRAND.email}`,
    25,
    boxY + 24,
  );

  pdf.text(
    `WhatsApp: ${BRAND.whatsapp} | ${BRAND.arn}`,
    25,
    boxY + 31,
  );
}

export default function DownloadReport({
  calculatorType,
  investment,
  annualReturn,
  years,
  investedAmount,
  estimatedReturns,
  maturityValue,
  yearlyGrowth,
  swpData,
  stepUpData,
  goalData,
  childEducationData,
  reportTitle = "Investment Projection Report",
  fileName = "Luxmi-InvestCare-Investment-Report.pdf",
}: DownloadReportProps) {
  const generatePDF =
    async () => {
      try {
        const pdf =
          new jsPDF({
            orientation:
              "portrait",
            unit: "mm",
            format: "a4",
          });

        /*
         * Noto Sans is used because jsPDF's built-in Helvetica
         * does not reliably contain the Indian Rupee glyph.
         *
         * Required files:
         *
         * public/fonts/NotoSans-Regular.ttf
         * public/fonts/NotoSans-Bold.ttf
         */

        await loadPdfFont(
          pdf,
          "/fonts/NotoSans-Regular.ttf",
          "NotoSans-Regular.ttf",
          "NotoSans",
          "normal",
        );

        await loadPdfFont(
          pdf,
          "/fonts/NotoSans-Bold.ttf",
          "NotoSans-Bold.ttf",
          "NotoSans",
          "bold",
        );

        const logo =
          await loadImage(
            "/images/logo.png",
          );

        /*
* ============================================================
* DEDICATED SWP PDF REPORT
* ============================================================
*
* SWP requires a different report structure from SIP/Lumpsum.
* Do not use the generic investment-growth / maturity-value
* layout for SWP.
*/

        if (
          calculatorType === "swp" &&
          swpData
        ) {
          const swpRows = (
            yearlyGrowth as SWPProjection[] | undefined
          ) ?? [];

          const initialCorpus =
            Math.max(
              0,
              swpData.initialCorpus,
            );

          const monthlyWithdrawal =
            Math.max(
              0,
              swpData.monthlyWithdrawal,
            );

          const totalWithdrawn =
            Math.max(
              0,
              swpData.totalWithdrawn,
            );

          const remainingCorpus =
            Math.max(
              0,
              swpData.remainingCorpus,
            );

          const estimatedGrowth =
            swpData.estimatedGrowth;

          const isSustainable =
            swpData.sustainable;

          const exhaustionYear =
            swpData.exhaustionYear;

          const annualWithdrawal =
            monthlyWithdrawal * 12;

          /*
           * PAGE 1
           * SWP SUMMARY
           */

          addPageHeader(
            pdf,
            reportTitle || "SWP Projection Report",
            logo,
          );

          addSectionTitle(
            pdf,
            "1",
            "SWP Summary",
            "Illustrative systematic withdrawal projection",
            69,
          );

          const swpCardW = 54.7;
          const swpCardH = 31;
          const swpGap = 5;

          addCard(
            pdf,
            18,
            84,
            swpCardW,
            swpCardH,
            "Initial Corpus",
            formatCurrency(initialCorpus),
          );

          addCard(
            pdf,
            18 + swpCardW + swpGap,
            84,
            swpCardW,
            swpCardH,
            "Monthly Withdrawal",
            formatCurrency(monthlyWithdrawal),
            C.teal,
          );

          addCard(
            pdf,
            18 + (swpCardW + swpGap) * 2,
            84,
            swpCardW,
            swpCardH,
            "Expected Return",
            `${annualReturn}%`,
            C.gold,
          );

          addCard(
            pdf,
            18,
            121,
            swpCardW,
            swpCardH,
            "Withdrawal Period",
            `${years} ${years === 1 ? "Year" : "Years"}`,
          );

          addCard(
            pdf,
            18 + swpCardW + swpGap,
            121,
            swpCardW,
            swpCardH,
            "Total Withdrawn",
            formatCurrency(totalWithdrawn),
            C.gold,
          );

          addCard(
            pdf,
            18 + (swpCardW + swpGap) * 2,
            121,
            swpCardW,
            swpCardH,
            "Remaining Corpus",
            formatCurrency(remainingCorpus),
            C.teal,
          );

          /*
           * Status panel
           */

          const statusFill: readonly [number, number, number] =
            isSustainable
              ? [236, 249, 243]
              : [255, 246, 235];

          const statusBorder: readonly [number, number, number] =
            isSustainable
              ? [205, 231, 218]
              : [238, 215, 180];

          const statusTextColor: readonly [number, number, number] =
            isSustainable
              ? C.darkGreen
              : C.gold;

          pdf.setFillColor(...statusFill);

          pdf.setDrawColor(...statusBorder);

          pdf.roundedRect(
            18,
            163,
            174,
            39,
            4,
            4,
            "FD",
          );

          setFont(pdf, true);
          pdf.setFontSize(9);
          pdf.setTextColor(...statusTextColor);
          pdf.text(
            isSustainable
              ? "SWP STATUS: CORPUS REMAINS"
              : "SWP STATUS: CORPUS EXHAUSTED",
            25,
            174,
          );

          setFont(pdf);
          pdf.setFontSize(7.7);
          pdf.setTextColor(...C.text);

          const statusText = isSustainable
            ? `Illustrative remaining corpus after ${years} ${years === 1 ? "year" : "years"
            }: ${formatCurrency(remainingCorpus)}.`
            : exhaustionYear
              ? `Under the entered assumptions, the illustrative corpus is projected to be exhausted during Year ${exhaustionYear}, before the selected ${years}-year withdrawal period ends.`
              : `Under the entered assumptions, the illustrative corpus may be exhausted before the selected ${years}-year withdrawal period ends.`;
          pdf.text(
            pdf.splitTextToSize(
              statusText,
              158,
            ),
            25,
            184,
            {
              lineHeightFactor: 1.35,
            },
          );

          setFont(pdf, true);
          pdf.setFontSize(8.2);
          pdf.setTextColor(...C.darkGreen);

          pdf.text(
            "Annual withdrawal at the current rate",
            25,
            196,
          );

          setFont(pdf);
          pdf.setTextColor(...C.text);

          pdf.text(
            formatCurrency(annualWithdrawal),
            25,
            201,
          );

          addPageFooter(pdf);

          /*
           * PAGE 2
           * SWP CORPUS TREND
           */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle || "SWP Projection Report",
            logo,
          );

          addSectionTitle(
            pdf,
            "2",
            "SWP Corpus Trend",
            "Illustrative year-wise movement of the remaining corpus",
            69,
          );

          const chartX = 20;
          const chartY = 88;
          const chartW = 170;
          const chartH = 90;

          pdf.setFillColor(...C.white);
          pdf.setDrawColor(...C.border);

          pdf.roundedRect(
            chartX,
            chartY,
            chartW,
            chartH,
            4,
            4,
            "FD",
          );

          const chartRows = swpRows
            .filter(
              (row) =>
                Number.isFinite(row.year) &&
                Number.isFinite(row.closingCorpus),
            )
            .slice(0, 40);

          const maxCorpus = Math.max(
            initialCorpus,
            ...chartRows.map(
              (row) =>
                Math.max(
                  0,
                  row.closingCorpus,
                ),
            ),
            1,
          );

          const plotLeft = chartX + 14;
          const plotRight = chartX + chartW - 9;
          const plotTop = chartY + 12;
          const plotBottom = chartY + chartH - 16;

          /*
           * Grid lines
           */

          pdf.setLineWidth(0.25);
          pdf.setDrawColor(...C.border);

          for (let i = 0; i <= 4; i++) {
            const gy =
              plotBottom -
              ((plotBottom - plotTop) * i) / 4;

            pdf.line(
              plotLeft,
              gy,
              plotRight,
              gy,
            );

            setFont(pdf);
            pdf.setFontSize(6.5);
            pdf.setTextColor(...C.muted);

            const labelValue =
              (maxCorpus * i) / 4;

            pdf.text(
              formatSWPChartAxis(labelValue),
              plotLeft - 3,
              gy + 2,
              {
                align: "right",
              },
            );
          }

          /*
           * Corpus line
           */

          if (chartRows.length > 0) {
            pdf.setDrawColor(...C.green);
            pdf.setLineWidth(1.4);

            chartRows.forEach(
              (row, index) => {
                if (index === 0) {
                  return;
                }

                const previous =
                  chartRows[index - 1];

                const x1 =
                  plotLeft +
                  ((index - 1) /
                    Math.max(
                      chartRows.length - 1,
                      1,
                    )) *
                  (plotRight - plotLeft);

                const x2 =
                  plotLeft +
                  (index /
                    Math.max(
                      chartRows.length - 1,
                      1,
                    )) *
                  (plotRight - plotLeft);

                const y1 =
                  plotBottom -
                  (Math.max(
                    0,
                    previous.closingCorpus,
                  ) /
                    maxCorpus) *
                  (plotBottom - plotTop);

                const y2 =
                  plotBottom -
                  (Math.max(
                    0,
                    row.closingCorpus,
                  ) /
                    maxCorpus) *
                  (plotBottom - plotTop);

                pdf.line(
                  x1,
                  y1,
                  x2,
                  y2,
                );
              },
            );

            chartRows.forEach(
              (row, index) => {
                const x =
                  plotLeft +
                  (index /
                    Math.max(
                      chartRows.length - 1,
                      1,
                    )) *
                  (plotRight - plotLeft);

                const y =
                  plotBottom -
                  (Math.max(
                    0,
                    row.closingCorpus,
                  ) /
                    maxCorpus) *
                  (plotBottom - plotTop);

                pdf.setFillColor(...C.green);

                pdf.circle(
                  x,
                  y,
                  1.5,
                  "F",
                );
              },
            );

            setFont(pdf);
            pdf.setFontSize(6.5);
            pdf.setTextColor(...C.muted);

            chartRows.forEach(
              (row, index) => {
                const showLabel =
                  chartRows.length <= 12 ||
                  index === 0 ||
                  index === chartRows.length - 1 ||
                  index % 5 === 0;

                if (!showLabel) {
                  return;
                }

                const x =
                  plotLeft +
                  (index /
                    Math.max(
                      chartRows.length - 1,
                      1,
                    )) *
                  (plotRight - plotLeft);

                pdf.text(
                  `Y${row.year}`,
                  x,
                  plotBottom + 9,
                  {
                    align: "center",
                  },
                );
              },
            );
          }

          /*
 * Chart legend
 */

          pdf.setFillColor(...C.green);

          pdf.circle(
            chartX + 8,
            chartY + 8,
            1.6,
            "F",
          );

          setFont(pdf);

          pdf.setFontSize(7);

          pdf.setTextColor(...C.text);

          pdf.text(
            "Closing Corpus",
            chartX + 13,
            chartY + 10,
          );

          /*
           * Summary cards
           */

          addCard(
            pdf,
            18,
            190,
            54.7,
            31,
            "Initial Corpus",
            formatCurrency(initialCorpus),
          );

          addCard(
            pdf,
            77.65,
            190,
            54.7,
            31,
            "Total Withdrawn",
            formatCurrency(totalWithdrawn),
            C.gold,
          );

          addCard(
            pdf,
            137.3,
            190,
            54.7,
            31,
            "Remaining Corpus",
            formatCurrency(remainingCorpus),
            C.teal,
          );

          addPageFooter(pdf);

          /*
           * PAGE 3
           * YEAR-WISE SWP ANALYSIS
           */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle || "SWP Projection Report",
            logo,
          );

          addSectionTitle(
            pdf,
            "3",
            "Year-wise SWP Analysis",
            "Illustrative opening corpus, growth, withdrawal and closing corpus",
            69,
          );

          const tableX = 18;
          const tableY = 84;
          const tableW = 174;

          const columns = [
            {
              label: "Year",
              width: 18,
            },
            {
              label: "Opening Corpus",
              width: 42,
            },
            {
              label: "Growth",
              width: 32,
            },
            {
              label: "Withdrawal",
              width: 38,
            },
            {
              label: "Closing Corpus",
              width: 44,
            },
          ];

          pdf.setFillColor(...C.darkGreen);
          pdf.roundedRect(
            tableX,
            tableY,
            tableW,
            13,
            2,
            2,
            "F",
          );

          let tx = tableX;

          columns.forEach(
            (column, index) => {
              setFont(pdf, true);
              pdf.setFontSize(7);
              pdf.setTextColor(...C.white);

              pdf.text(
                column.label,
                tx + column.width / 2,
                tableY + 8,
                {
                  align: "center",
                },
              );

              tx += column.width;
            },
          );

          const tableRows =
            swpRows.slice(0, 10);

          tableRows.forEach(
            (row, index) => {
              const ry =
                tableY + 13 + index * 9;

              if (index % 2 === 0) {
                pdf.setFillColor(
                  ...C.light,
                );

                pdf.rect(
                  tableX,
                  ry,
                  tableW,
                  9,
                  "F",
                );
              }

              const values = [
                `Y${row.year}`,
                formatCurrency(
                  row.openingCorpus,
                ),
                formatCurrency(
                  row.growth,
                ),
                formatCurrency(
                  row.annualWithdrawal,
                ),
                formatCurrency(
                  row.closingCorpus,
                ),
              ];

              let px = tableX;

              values.forEach(
                (value, valueIndex) => {
                  const column =
                    columns[valueIndex];

                  setFont(
                    pdf,
                    valueIndex === 4,
                  );

                  pdf.setFontSize(7);

                  const cellTextColor: readonly [number, number, number] =
                    valueIndex === 4
                      ? C.darkGreen
                      : C.text;

                  pdf.setTextColor(...cellTextColor);

                  pdf.text(
                    value,
                    px +
                    column.width -
                    3,
                    ry + 5.8,
                    {
                      align: "right",
                    },
                  );

                  px += column.width;
                },
              );
            },
          );

          const analysisY =
            tableY +
            13 +
            tableRows.length * 9 +
            10;

          pdf.setFillColor(...C.light);
          pdf.setDrawColor(...C.border);

          pdf.roundedRect(
            18,
            analysisY,
            174,
            32,
            3,
            3,
            "FD",
          );

          setFont(pdf, true);
          pdf.setFontSize(8.5);
          pdf.setTextColor(...C.darkGreen);

          pdf.text(
            "SWP Cash flow Summary",
            25,
            analysisY + 10,
          );

          setFont(pdf);
          pdf.setFontSize(7.5);
          pdf.setTextColor(...C.text);

          pdf.text(
            `Net Wealth Gain (Illustrative): ${formatCurrency(
              estimatedGrowth,
            )}`,
            25,
            analysisY + 18,
          );

          pdf.text(
            `Total withdrawn: ${formatCurrency(
              totalWithdrawn,
            )}`,
            25,
            analysisY + 24,
          );

          pdf.text(
            `Remaining corpus: ${formatCurrency(
              remainingCorpus,
            )}`,
            110,
            analysisY + 24,
          );

          addPageFooter(pdf);

          /*
           * PAGE 4
           * SWP OUTCOME + LEAD GENERATION
           */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle || "SWP Projection Report",
            logo,
          );

          addSectionTitle(
            pdf,
            "4",
            "SWP Outcome Analysis",
            "Understanding the projected withdrawal outcome",
            69,
          );

          const outcomeCards = [
            [
              "Initial Corpus",
              formatCurrency(initialCorpus),
            ],
            [
              "Net Wealth Gain (Illustrative)",
              formatCurrency(estimatedGrowth),
            ],
            [
              "Total Withdrawn",
              formatCurrency(totalWithdrawn),
            ],
            [
              "Remaining Corpus",
              formatCurrency(remainingCorpus),
            ],
          ];

          let outcomeY = 78;

          outcomeCards.forEach(
            ([label, value], index) => {
              const bx =
                index % 2 === 0
                  ? 18
                  : 105;

              if (
                index > 0 &&
                index % 2 === 0
              ) {
                outcomeY += 33;
              }

              pdf.setFillColor(...C.light);
              pdf.setDrawColor(...C.border);

              pdf.roundedRect(
                bx,
                outcomeY,
                82,
                29,
                3,
                3,
                "FD",
              );

              setFont(pdf);
              pdf.setFontSize(7.5);
              pdf.setTextColor(...C.muted);

              pdf.text(
                label,
                bx + 7,
                outcomeY + 10,
              );

              setFont(pdf, true);
              pdf.setFontSize(10);
              pdf.setTextColor(...C.darkGreen);

              pdf.text(
                value,
                bx + 7,
                outcomeY + 21,
              );
            },
          );

          const outcomeBoxY =
            outcomeY + 36;

          const outcomeFill: readonly [number, number, number] =
            isSustainable
              ? [236, 249, 243]
              : [255, 246, 235];

          const outcomeBorder: readonly [number, number, number] =
            isSustainable
              ? [205, 231, 218]
              : [238, 215, 180];

          const outcomeTextColor: readonly [number, number, number] =
            isSustainable
              ? C.darkGreen
              : C.gold;

          pdf.setFillColor(...outcomeFill);

          pdf.setDrawColor(...outcomeBorder);

          pdf.roundedRect(
            18,
            outcomeBoxY,
            174,
            43,
            4,
            4,
            "FD",
          );

          setFont(pdf, true);
          pdf.setFontSize(9);

          pdf.setTextColor(...outcomeTextColor);

          pdf.text(
            isSustainable
              ? "Projected corpus remains at the end of the selected period"
              : "Projected corpus may be exhausted",
            25,
            outcomeBoxY + 11,
          );

          setFont(pdf);
          pdf.setFontSize(7.7);
          pdf.setTextColor(...C.text);

          const outcomeText =
            isSustainable
              ? `Based on the entered assumptions, the illustrative projection shows a remaining corpus of ${formatCurrency(
                remainingCorpus,
              )} after ${years} ${years === 1
                ? "year"
                : "years"
              }.`
              : exhaustionYear
                ? `Based on the entered assumptions, the illustrative corpus is projected to be exhausted during Year ${exhaustionYear}, before the selected ${years}-year withdrawal period ends.`
                : `Based on the entered assumptions, the illustrative corpus may be exhausted before the selected ${years}-year withdrawal period ends.`;
          pdf.text(
            pdf.splitTextToSize(
              outcomeText,
              158,
            ),
            25,
            outcomeBoxY + 21,
            {
              lineHeightFactor: 1.35,
            },
          );

          /*
           * Lead generation
           */

          const leadY =
            outcomeBoxY + 51;

          pdf.setFillColor(
            236,
            249,
            243,
          );

          pdf.setDrawColor(
            205,
            231,
            218,
          );

          pdf.roundedRect(
            18,
            leadY,
            174,
            48,
            4,
            4,
            "FD",
          );

          setFont(pdf, true);
          pdf.setFontSize(9.5);
          pdf.setTextColor(...C.darkGreen);

          pdf.text(
            "Discuss Your SWP Requirements",
            25,
            leadY + 11,
          );

          setFont(pdf);
          pdf.setFontSize(7.5);
          pdf.setTextColor(...C.text);

          pdf.text(
            pdf.splitTextToSize(
              "For investor education and assistance in understanding the illustration, connect with Luxmi InvestCare.",
              158,
            ),
            25,
            leadY + 20,
            {
              lineHeightFactor: 1.35,
            },
          );

          setFont(pdf, true);
          pdf.setFontSize(8);
          pdf.setTextColor(...C.darkGreen);

          pdf.text(
            `WhatsApp: ${BRAND.whatsapp}`,
            25,
            leadY + 34,
          );

          pdf.text(
            BRAND.email,
            95,
            leadY + 34,
          );

          pdf.text(
            BRAND.website,
            25,
            leadY + 43,
          );

          pdf.text(
            BRAND.arn,
            95,
            leadY + 43,
          );

          addPageFooter(pdf);

          /*
           * PAGE 5
           * INVESTOR EDUCATION
           */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle || "SWP Projection Report",
            logo,
          );

          addSectionTitle(
            pdf,
            "5",
            "Investor Education Disclaimer",
            "Important information regarding this illustrative SWP calculator",
            69,
          );

          addSWPDisclaimer(pdf);

          addPageFooter(pdf);

          pdf.save(fileName);

          return;
        }
        /*
         * ============================================================
         * DEDICATED STEP-UP SIP PDF REPORT
         * ============================================================
         *
         * Step-Up SIP must not use the generic SIP/Lumpsum
         * investment-details / installments layout.
         */
        if (
          calculatorType === "step-up-sip" &&
          stepUpData
        ) {
          const stepRows =
            stepUpData.projections ?? [];

          const startingSIP =
            Math.max(
              0,
              stepUpData.startingMonthlySIP,
            );

          const annualStepUp =
            Math.max(
              0,
              stepUpData.annualStepUp,
            );

          const stepReturn =
            stepUpData.annualReturn;

          const stepYears =
            Math.max(
              0,
              stepUpData.years,
            );

          const totalInvested =
            Math.max(
              0,
              stepUpData.totalInvested,
            );

          const projectedValue =
            Math.max(
              0,
              stepUpData.estimatedValue,
            );

          const illustrativeGain =
            Math.max(
              0,
              stepUpData.wealthGain,
            );

          const finalMonthlySIP =
            Math.max(
              0,
              stepUpData.finalMonthlySIP,
            );

          /*
           * ----------------------------------------------------------
           * PAGE 1
           * STEP-UP SIP SUMMARY
           * ----------------------------------------------------------
           */

          addPageHeader(
            pdf,
            reportTitle ||
            "Step-Up SIP Projection Report",
            logo,
          );

          addSectionTitle(
            pdf,
            "1",
            "Step-Up SIP Summary",
            "Key assumptions and illustrative projected outcomes",
            69,
          );

          const stepCardW = 54.7;
          const stepCardH = 31;
          const stepGap = 5;

          /*
           * INPUT CARDS
           */

          addCard(
            pdf,
            18,
            84,
            stepCardW,
            stepCardH,
            "Starting Monthly SIP",
            formatCurrency(
              startingSIP,
            ),
          );

          addCard(
            pdf,
            18 +
            stepCardW +
            stepGap,
            84,
            stepCardW,
            stepCardH,
            "Annual Step-Up",
            `${annualStepUp}%`,
            C.gold,
          );

          addCard(
            pdf,
            18 +
            (stepCardW + stepGap) * 2,
            84,
            stepCardW,
            stepCardH,
            "Expected Return",
            `${stepReturn}%`,
            C.teal,
          );

          addCard(
            pdf,
            18,
            121,
            stepCardW,
            stepCardH,
            "Investment Period",
            `${stepYears} ${stepYears === 1
              ? "Year"
              : "Years"
            }`,
          );

          addCard(
            pdf,
            18 +
            stepCardW +
            stepGap,
            121,
            stepCardW,
            stepCardH,
            "Total Invested",
            formatCurrency(
              totalInvested,
            ),
            C.gold,
          );

          addCard(
            pdf,
            18 +
            (stepCardW + stepGap) * 2,
            121,
            stepCardW,
            stepCardH,
            "Projected Value",
            formatCurrency(
              projectedValue,
            ),
            C.teal,
          );

          /*
           * FINAL SIP PANEL
           */

          pdf.setFillColor(
            ...C.light,
          );

          pdf.setDrawColor(
            ...C.border,
          );

          pdf.roundedRect(
            18,
            161,
            174,
            38,
            4,
            4,
            "FD",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(9);

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            "Step-Up Contribution Impact",
            25,
            172,
          );

          setFont(pdf);

          pdf.setFontSize(7.8);

          pdf.setTextColor(
            ...C.text,
          );

          pdf.text(
            `Final monthly SIP in Year ${stepYears}:`,
            25,
            182,
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(10);

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            formatCurrency(
              finalMonthlySIP,
            ),
            25,
            191,
          );

          setFont(pdf);

          pdf.setFontSize(7.5);

          pdf.setTextColor(
            ...C.muted,
          );

          pdf.text(
            `Illustrative gain: ${formatCurrency(
              illustrativeGain,
            )}`,
            108,
            191,
          );

          addPageFooter(pdf);

          /*
      * ----------------------------------------------------------
      * PAGE 2
      * STEP-UP SIP INVESTMENT VS PROJECTED VALUE
      * ----------------------------------------------------------
      */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle ||
            "Step-Up SIP Projection Report",
            logo,
          );

          addSectionTitle(
            pdf,
            "2",
            "Step-Up SIP: Investment vs Projected Value",
            "Cumulative investment compared with the illustrative projected value",
            69,
          );

          const chartRows =
            stepRows
              .filter(
                (row) =>
                  Number.isFinite(row.year) &&
                  Number.isFinite(row.totalInvested) &&
                  Number.isFinite(row.estimatedValue),
              )
              .slice(0, 60);

          const chartX = 20;
          const chartY = 86;
          const chartW = 170;
          const chartH = 84;

          pdf.setFillColor(...C.white);
          pdf.setDrawColor(...C.border);

          pdf.roundedRect(
            chartX,
            chartY,
            chartW,
            chartH,
            4,
            4,
            "FD",
          );

          const maxChartValue =
            Math.max(
              totalInvested,
              projectedValue,
              ...chartRows.map((row) =>
                Math.max(
                  row.totalInvested,
                  row.estimatedValue,
                ),
              ),
              1,
            );

          const plotLeft = chartX + 20;
          const plotRight =
            chartX + chartW - 9;
          const plotTop = chartY + 12;
          const plotBottom =
            chartY + chartH - 18;

          const pointCount = Math.max(
            chartRows.length - 1,
            1,
          );

          /*
           * Grid + axis
           */
          pdf.setLineWidth(0.25);
          pdf.setDrawColor(...C.border);

          for (let i = 0; i <= 4; i++) {
            const gy =
              plotBottom -
              ((plotBottom - plotTop) * i) /
              4;

            pdf.line(
              plotLeft,
              gy,
              plotRight,
              gy,
            );

            const axisValue =
              (maxChartValue * i) / 4;

            setFont(pdf);

            pdf.setFontSize(6.5);
            pdf.setTextColor(...C.muted);

            pdf.text(
              formatStepUpChartAxis(
                axisValue,
              ),
              plotLeft - 3,
              gy + 2,
              {
                align: "right",
              },
            );
          }

          /*
           * Plot two series
           */
          if (chartRows.length > 0) {
            const point = (
              index: number,
              value: number,
            ) => {
              const px =
                plotLeft +
                (chartRows.length === 1
                  ? (plotRight - plotLeft) / 2
                  : (index / pointCount) *
                  (plotRight - plotLeft));

              const py =
                plotBottom -
                (value / maxChartValue) *
                (plotBottom - plotTop);

              return [px, py] as const;
            };

            /*
             * Total Invested
             */
            pdf.setDrawColor(
              ...C.greyLine,
            );
            pdf.setLineWidth(1.25);

            for (
              let i = 1;
              i < chartRows.length;
              i++
            ) {
              const a = point(
                i - 1,
                chartRows[i - 1].totalInvested,
              );

              const b = point(
                i,
                chartRows[i].totalInvested,
              );

              pdf.line(
                a[0],
                a[1],
                b[0],
                b[1],
              );
            }

            /*
             * Projected Value
             */
            pdf.setDrawColor(...C.green);
            pdf.setLineWidth(1.6);

            for (
              let i = 1;
              i < chartRows.length;
              i++
            ) {
              const a = point(
                i - 1,
                chartRows[i - 1].estimatedValue,
              );

              const b = point(
                i,
                chartRows[i].estimatedValue,
              );

              pdf.line(
                a[0],
                a[1],
                b[0],
                b[1],
              );
            }

            /*
             * Selected X-axis labels
             */
            const labelIndexes =
              new Set<number>([
                0,
                Math.min(
                  chartRows.length - 1,
                  4,
                ),
                Math.min(
                  chartRows.length - 1,
                  9,
                ),
                Math.min(
                  chartRows.length - 1,
                  14,
                ),
                chartRows.length - 1,
              ]);

            setFont(pdf);
            pdf.setFontSize(6.5);
            pdf.setTextColor(...C.muted);

            labelIndexes.forEach(
              (index) => {
                const p = point(
                  index,
                  0,
                );

                pdf.text(
                  `Y${chartRows[index].year}`,
                  p[0],
                  plotBottom + 8,
                  {
                    align: "center",
                  },
                );
              },
            );
          }

          /*
           * Legend inside chart card
           */
          const legendY =
            chartY + chartH - 6;

          pdf.setFillColor(
            ...C.greyLine,
          );

          pdf.circle(
            chartX + 11,
            legendY,
            1.7,
            "F",
          );

          setFont(pdf);
          pdf.setFontSize(7);
          pdf.setTextColor(...C.text);

          pdf.text(
            "Total Invested",
            chartX + 16,
            legendY + 2,
          );

          pdf.setFillColor(
            ...C.green,
          );

          pdf.circle(
            chartX + 68,
            legendY,
            1.7,
            "F",
          );

          pdf.text(
            "Projected Value",
            chartX + 73,
            legendY + 2,
          );

          /*
           * Year-end summary
           */
          const summaryY =
            chartY + chartH + 8;

          pdf.setFillColor(
            ...C.light,
          );

          pdf.setDrawColor(
            ...C.border,
          );

          pdf.roundedRect(
            18,
            summaryY,
            174,
            29,
            3,
            3,
            "FD",
          );

          setFont(pdf, true);
          pdf.setFontSize(8);
          pdf.setTextColor(...C.darkGreen);

          pdf.text(
            `Total Invested at Year ${stepYears}`,
            25,
            summaryY + 10,
          );

          pdf.text(
            `Projected Value at Year ${stepYears}`,
            112,
            summaryY + 10,
          );

          setFont(pdf, true);
          pdf.setFontSize(9.5);

          pdf.setTextColor(
            ...C.text,
          );

          pdf.text(
            formatCurrency(totalInvested),
            25,
            summaryY + 20,
          );

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            formatCurrency(projectedValue),
            112,
            summaryY + 20,
          );

          /*
           * ----------------------------------------------------------
           * PROJECTED VALUE: INVESTMENT VS ILLUSTRATIVE GAIN
           * ----------------------------------------------------------
           */

          addSectionTitle(
            pdf,
            "3",
            "Projected Value: Investment vs Illustrative Gain",
            "How the projected value is composed under the selected assumptions",
            176,
          );

          const compositionY = 194;

          pdf.setFillColor(...C.white);
          pdf.setDrawColor(...C.border);

          pdf.roundedRect(
            18,
            compositionY,
            174,
            58,
            4,
            4,
            "FD",
          );

          const investmentShare =
            projectedValue > 0
              ? Math.min(
                1,
                Math.max(
                  0,
                  totalInvested /
                  projectedValue,
                ),
              )
              : 0;

          const gainShare =
            projectedValue > 0
              ? Math.min(
                1,
                Math.max(
                  0,
                  illustrativeGain /
                  projectedValue,
                ),
              )
              : 0;

          /*
           * Main projected value
           */
          setFont(pdf, true);
          pdf.setFontSize(11);
          pdf.setTextColor(...C.darkGreen);

          pdf.text(
            "Projected Value",
            25,
            compositionY + 11,
          );

          setFont(pdf, true);
          pdf.setFontSize(13);

          pdf.text(
            formatCurrency(
              projectedValue,
            ),
            25,
            compositionY + 23,
          );

          /*
           * Stacked composition bar
           */
          const barX = 25;
          const barY =
            compositionY + 29;
          const barW = 158;
          const barH = 9;

          pdf.setFillColor(
            ...C.greyLine,
          );

          pdf.roundedRect(
            barX,
            barY,
            barW,
            barH,
            2,
            2,
            "F",
          );

          if (investmentShare > 0) {
            pdf.setFillColor(
              ...C.greyLine,
            );

            pdf.roundedRect(
              barX,
              barY,
              barW * investmentShare,
              barH,
              2,
              2,
              "F",
            );
          }

          if (gainShare > 0) {
            pdf.setFillColor(
              ...C.green,
            );

            const gainX =
              barX +
              barW * investmentShare;

            const gainW =
              barW * gainShare;

            pdf.roundedRect(
              gainX,
              barY,
              gainW,
              barH,
              2,
              2,
              "F",
            );
          }

          /*
           * Percentage labels
           */
          setFont(pdf, true);
          pdf.setFontSize(7.2);

          pdf.setTextColor(...C.text);

          pdf.text(
            `Investment ${(
              investmentShare * 100
            ).toFixed(1)}%`,
            barX,
            barY + 16,
          );

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            `Illustrative Gain ${(
              gainShare * 100
            ).toFixed(1)}%`,
            barX + barW,
            barY + 16,
            {
              align: "right",
            },
          );

          /*
           * Exact values
           */
          setFont(pdf);
          pdf.setFontSize(7.4);
          pdf.setTextColor(...C.text);

          pdf.text(
            `Total Invested: ${formatCurrency(
              totalInvested,
            )}`,
            25,
            compositionY + 51,
          );

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            `Illustrative Gain: ${formatCurrency(
              illustrativeGain,
            )}`,
            112,
            compositionY + 51,
          );

          addPageFooter(pdf);
          /*
           * ----------------------------------------------------------
           * PAGE 3
           * YEAR-WISE STEP-UP SIP PROJECTION
           * ----------------------------------------------------------
           */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle ||
            "Step-Up SIP Projection Report",
            logo,
          );

          addSectionTitle(
            pdf,
            "3",
            "Year-wise Step-Up SIP Projection",
            "Illustrative contribution and projected value by year",
            69,
          );

          const tableX = 18;
          const tableY = 84;
          const tableW = 174;

          const tableHeaderH =
            11;

          const tableRowH =
            8.5;

          const columns = [
            {
              label: "Year",
              width: 18,
            },
            {
              label: "Monthly SIP",
              width: 33,
            },
            {
              label: "Annual Investment",
              width: 40,
            },
            {
              label: "Total Invested",
              width: 40,
            },
            {
              label: "Projected Value",
              width: 43,
            },
          ];

          /*
           * Header
           */

          pdf.setFillColor(
            ...C.darkGreen,
          );

          pdf.roundedRect(
            tableX,
            tableY,
            tableW,
            tableHeaderH,
            2,
            2,
            "F",
          );

          let columnX =
            tableX;

          columns.forEach(
            (column) => {
              setFont(
                pdf,
                true,
              );

              pdf.setFontSize(
                6.5,
              );

              pdf.setTextColor(
                ...C.white,
              );

              pdf.text(
                column.label,
                columnX +
                column.width -
                2.5,
                tableY + 7,
                {
                  align: "right",
                },
              );

              columnX +=
                column.width;
            },
          );

          /*
           * Rows
           *
           * A4 page comfortably holds the 20-year Step-Up
           * table at this row height.
           */

          stepRows
            .slice(0, 20)
            .forEach(
              (row, index) => {
                const rowY =
                  tableY +
                  tableHeaderH +
                  index *
                  tableRowH;

                if (
                  index % 2 === 0
                ) {
                  pdf.setFillColor(
                    ...C.light,
                  );

                  pdf.rect(
                    tableX,
                    rowY,
                    tableW,
                    tableRowH,
                    "F",
                  );
                }

                const values = [
                  `Y${row.year}`,
                  formatCurrency(
                    row.monthlySIP,
                  ),
                  formatCurrency(
                    row.annualInvestment,
                  ),
                  formatCurrency(
                    row.totalInvested,
                  ),
                  formatCurrency(
                    row.estimatedValue,
                  ),
                ];

                let currentX =
                  tableX;

                values.forEach(
                  (
                    value,
                    index,
                  ) => {
                    const column =
                      columns[index];

                    setFont(
                      pdf,
                      index === 4,
                    );

                    pdf.setFontSize(
                      6.6,
                    );

                    const valueColor: readonly [
                      number,
                      number,
                      number,
                    ] =
                      index === 4
                        ? C.darkGreen
                        : C.text;

                    pdf.setTextColor(
                      ...valueColor,
                    );

                    pdf.text(
                      value,
                      currentX +
                      column.width -
                      2.5,
                      rowY + 5.6,
                      {
                        align:
                          "right",
                      },
                    );

                    currentX +=
                      column.width;
                  },
                );
              },
            );

          /*
           * Table note
           */

          setFont(pdf);

          pdf.setFontSize(
            7,
          );

          pdf.setTextColor(
            ...C.muted,
          );

          pdf.text(
            "Values are illustrative and rounded to the nearest rupee.",
            18,
            tableY +
            tableHeaderH +
            stepRows.slice(
              0,
              20,
            ).length *
            tableRowH +
            9,
          );

          addPageFooter(pdf);

          /*
           * ----------------------------------------------------------
           * PAGE 4
           * STEP-UP IMPACT + LEAD GENERATION
           * ----------------------------------------------------------
           */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle ||
            "Step-Up SIP Projection Report",
            logo,
          );

          addSectionTitle(
            pdf,
            "4",
            "Step-Up Impact Analysis",
            "Understanding how the annual step-up changes the contribution pattern",
            69,
          );

          const impactCards = [
            [
              "Starting Monthly SIP",
              formatCurrency(
                startingSIP,
              ),
            ],
            [
              "Annual Step-Up",
              `${annualStepUp}%`,
            ],
            [
              "Final Monthly SIP",
              formatCurrency(
                finalMonthlySIP,
              ),
            ],
            [
              "Total Invested",
              formatCurrency(
                totalInvested,
              ),
            ],
            [
              "Illustrative Gain",
              formatCurrency(
                illustrativeGain,
              ),
            ],
            [
              "Projected Value",
              formatCurrency(
                projectedValue,
              ),
            ],
          ];

          const impactCardW =
            54.7;

          const impactCardH =
            30;

          const impactGap = 5;

          let impactY = 84;

          impactCards.forEach(
            (
              [label, value],
              index,
            ) => {
              const column =
                index % 3;

              const row =
                Math.floor(
                  index / 3,
                );

              if (
                column === 0 &&
                row > 0
              ) {
                impactY +=
                  impactCardH +
                  7;
              }

              const impactX =
                18 +
                column *
                (impactCardW +
                  impactGap);

              pdf.setFillColor(
                ...C.light,
              );

              pdf.setDrawColor(
                ...C.border,
              );

              pdf.roundedRect(
                impactX,
                impactY,
                impactCardW,
                impactCardH,
                3,
                3,
                "FD",
              );

              setFont(pdf);

              pdf.setFontSize(
                7,
              );

              pdf.setTextColor(
                ...C.muted,
              );

              pdf.text(
                label,
                impactX + 6,
                impactY + 10,
              );

              setFont(
                pdf,
                true,
              );

              pdf.setFontSize(
                8.8,
              );

              pdf.setTextColor(
                ...C.darkGreen,
              );

              pdf.text(
                value,
                impactX + 6,
                impactY + 21,
              );
            },
          );

          /*
           * Explanation panel
           */

          const impactPanelY =
            impactY +
            impactCardH +
            14;

          pdf.setFillColor(
            236,
            249,
            243,
          );

          pdf.setDrawColor(
            205,
            231,
            218,
          );

          pdf.roundedRect(
            18,
            impactPanelY,
            174,
            42,
            4,
            4,
            "FD",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(
            9,
          );

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            "How the Step-Up works",
            25,
            impactPanelY + 11,
          );

          setFont(pdf);

          pdf.setFontSize(
            7.7,
          );

          pdf.setTextColor(
            ...C.text,
          );

          const impactText =
            `The monthly SIP begins at ${formatCurrency(
              startingSIP,
            )} and increases by ${annualStepUp}% each year. Under the selected assumptions, the monthly contribution reaches approximately ${formatCurrency(
              finalMonthlySIP,
            )} in the final investment year.`;

          pdf.text(
            pdf.splitTextToSize(
              impactText,
              158,
            ),
            25,
            impactPanelY + 21,
            {
              lineHeightFactor:
                1.35,
            },
          );

          /*
           * LEAD GENERATION
           */

          const leadY =
            impactPanelY +
            51;

          pdf.setFillColor(
            0,
            102,
            58,
          );

          pdf.roundedRect(
            18,
            leadY,
            174,
            55,
            4,
            4,
            "F",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(
            10,
          );

          pdf.setTextColor(
            ...C.white,
          );

          pdf.text(
            "Discuss Your Step-Up SIP Requirements",
            25,
            leadY + 12,
          );

          setFont(pdf);

          pdf.setFontSize(
            7.5,
          );

          pdf.setTextColor(
            230,
            250,
            240,
          );

          pdf.text(
            pdf.splitTextToSize(
              "For investor education and assistance in understanding this illustration, connect with Luxmi InvestCare.",
              158,
            ),
            25,
            leadY + 22,
            {
              lineHeightFactor:
                1.35,
            },
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(
            8,
          );

          pdf.setTextColor(
            255,
            205,
            70,
          );

          pdf.text(
            `WhatsApp: ${BRAND.whatsapp}`,
            25,
            leadY + 39,
          );

          pdf.text(
            BRAND.email,
            100,
            leadY + 39,
          );

          pdf.text(
            BRAND.website,
            25,
            leadY + 48,
          );

          pdf.text(
            BRAND.arn,
            100,
            leadY + 48,
          );

          addPageFooter(pdf);

          /*
           * ----------------------------------------------------------
           * PAGE 5
           * INVESTOR EDUCATION DISCLAIMER
           * ----------------------------------------------------------
           */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle ||
            "Step-Up SIP Projection Report",
            logo,
          );

          addSectionTitle(
            pdf,
            "5",
            "Investor Education Disclaimer",
            "Important information regarding this illustrative Step-Up SIP calculator",
            69,
          );

          addDisclaimer(
            pdf,
          );

          addPageFooter(pdf);

          pdf.save(fileName);

          return;
        }
        const rows =
          normalizeRows(
            yearlyGrowth,
          );

        /*
* ============================================================
* DEDICATED GOAL PLANNER PDF REPORT
* ============================================================
*/
        if (
          calculatorType === "goal-planner" &&
          goalData
        ) {
          const {
            goal,
            targetAmount,
            years,
            expectedReturn,
            inflation,
            futureValue,
            monthlySIP,
            lumpsumRequired,
          } = goalData;

          const goalLabels: Record<string, string> = {
            house: "House Purchase",
            car: "Vehicle Purchase",
            education: "Education",
            "child-education": "Child Education",
            retirement: "Retirement",
            wedding: "Wedding",
            travel: "Travel",
            custom: "Personal Goal",
          };

          const goalLabel =
            goalLabels[goal] ||
            goal
              .replace(/[-_]/g, " ")
              .replace(/\b\w/g, (char) =>
                char.toUpperCase(),
              );

          /*
           * PAGE 1
           * GOAL PLANNER SUMMARY
           */

          addPageHeader(
            pdf,
            reportTitle ||
            "Goal Planning Illustration",
            logo,
          );

          addSectionTitle(
            pdf,
            "1",
            "Goal Planning Summary",
            "Illustrative goal cost and investment requirements",
            69,
          );

          const cardW = 54.7;
          const cardH = 31;
          const gap = 5;

          addCard(
            pdf,
            18,
            84,
            cardW,
            cardH,
            "Selected Goal",
            goalLabel,
          );

          addCard(
            pdf,
            18 + cardW + gap,
            84,
            cardW,
            cardH,
            "Current Goal Value",
            formatCurrency(
              targetAmount,
            ),
          );

          addCard(
            pdf,
            18 +
            (cardW + gap) * 2,
            84,
            cardW,
            cardH,
            "Years to Goal",
            `${years} ${years === 1
              ? "Year"
              : "Years"
            }`,
          );

          addCard(
            pdf,
            18,
            121,
            cardW,
            cardH,
            "Expected Return",
            `${expectedReturn}%`,
            C.teal,
          );

          addCard(
            pdf,
            18 + cardW + gap,
            121,
            cardW,
            cardH,
            "Inflation Rate",
            `${inflation}%`,
            C.gold,
          );

          addCard(
            pdf,
            18 +
            (cardW + gap) * 2,
            121,
            cardW,
            cardH,
            "Future Goal Value",
            formatCurrency(
              futureValue,
            ),
            C.darkGreen,
          );

          /*
           * REQUIREMENT SUMMARY
           */

          pdf.setFillColor(
            ...C.light,
          );

          pdf.setDrawColor(
            ...C.border,
          );

          pdf.roundedRect(
            18,
            162,
            174,
            52,
            4,
            4,
            "FD",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(9);
          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            "Illustrative Investment Requirement",
            25,
            174,
          );

          setFont(pdf);

          pdf.setFontSize(7.7);
          pdf.setTextColor(
            ...C.text,
          );

          pdf.text(
            "Monthly SIP",
            25,
            188,
          );

          pdf.text(
            "One-Time Investment",
            110,
            188,
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(10);

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            formatCurrency(
              monthlySIP,
            ),
            25,
            199,
          );

          pdf.text(
            formatCurrency(
              lumpsumRequired,
            ),
            110,
            199,
          );

          addPageFooter(pdf);

          /*
           * PAGE 2
           * INFLATION IMPACT
           */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle ||
            "Goal Planning Illustration",
            logo,
          );

          addSectionTitle(
            pdf,
            "2",
            "Inflation Impact on the Goal",
            "Illustrative comparison of today's goal value with its estimated future cost",
            69,
          );

          const inflationBoxY = 88;

          const maxGoal =
            Math.max(
              targetAmount,
              futureValue,
              1,
            );

          const todayWidth =
            (targetAmount /
              maxGoal) *
            145;

          const futureWidth =
            (futureValue /
              maxGoal) *
            145;

          /*
           * TODAY
           */

          pdf.setFillColor(
            ...C.light,
          );

          pdf.setDrawColor(
            ...C.border,
          );

          pdf.roundedRect(
            24,
            inflationBoxY,
            162,
            38,
            4,
            4,
            "FD",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(8.5);
          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            "Goal Value Today",
            31,
            inflationBoxY + 11,
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(10);

          pdf.text(
            formatCurrency(
              targetAmount,
            ),
            31,
            inflationBoxY + 23,
          );

          pdf.setFillColor(
            ...C.greyLine,
          );

          pdf.roundedRect(
            31,
            inflationBoxY + 28,
            145,
            5,
            2,
            2,
            "F",
          );

          pdf.setFillColor(
            ...C.teal,
          );

          pdf.roundedRect(
            31,
            inflationBoxY + 28,
            todayWidth,
            5,
            2,
            2,
            "F",
          );

          /*
           * FUTURE
           */

          const futureY =
            inflationBoxY +
            49;

          pdf.setFillColor(
            ...C.light,
          );

          pdf.setDrawColor(
            ...C.border,
          );

          pdf.roundedRect(
            24,
            futureY,
            162,
            38,
            4,
            4,
            "FD",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(8.5);

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            `Estimated Goal Value in ${years} Years`,
            31,
            futureY + 11,
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(10);

          pdf.text(
            formatCurrency(
              futureValue,
            ),
            31,
            futureY + 23,
          );

          pdf.setFillColor(
            ...C.greyLine,
          );

          pdf.roundedRect(
            31,
            futureY + 28,
            145,
            5,
            2,
            2,
            "F",
          );

          pdf.setFillColor(
            ...C.gold,
          );

          pdf.roundedRect(
            31,
            futureY + 28,
            futureWidth,
            5,
            2,
            2,
            "F",
          );

          /*
           * EXPLANATION
           */

          const inflationIncrease =
            Math.max(
              0,
              futureValue -
              targetAmount,
            );

          const inflationMultiple =
            targetAmount > 0
              ? futureValue /
              targetAmount
              : 0;

          const inflationNoteY =
            futureY +
            52;

          pdf.setFillColor(
            255,
            249,
            235,
          );

          pdf.setDrawColor(
            236,
            215,
            157,
          );

          pdf.roundedRect(
            18,
            inflationNoteY,
            174,
            46,
            4,
            4,
            "FD",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(9);

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            "What this means",
            25,
            inflationNoteY + 11,
          );

          setFont(pdf);

          pdf.setFontSize(7.7);

          pdf.setTextColor(
            ...C.text,
          );

          const inflationInsight = [
            `At the selected ${inflation}% inflation assumption, the goal's estimated future cost is ${formatCurrency(
              futureValue,
            )}, compared with ${formatCurrency(
              targetAmount,
            )} today.`,
            `Illustrative increase in goal cost: ${formatCurrency(
              inflationIncrease,
            )}.`,
            `The estimated future goal value is approximately ${inflationMultiple.toFixed(
              1,
            )}× today's goal value.`,
          ].join(" ");

          pdf.text(
            pdf.splitTextToSize(
              inflationInsight,
              158,
            ),
            25,
            inflationNoteY + 22,
            {
              lineHeightFactor: 1.35,
            },
          );

          addPageFooter(pdf);

          /*
           * PAGE 3
           * INVESTMENT REQUIREMENT
           */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle ||
            "Goal Planning Illustration",
            logo,
          );

          addSectionTitle(
            pdf,
            "3",
            "Illustrative Investment Requirement",
            "Two illustrative ways to work toward the estimated future goal value",
            69,
          );

          /*
           * SIP CARD
           */

          pdf.setFillColor(
            236,
            249,
            243,
          );

          pdf.setDrawColor(
            205,
            231,
            218,
          );

          pdf.roundedRect(
            18,
            87,
            174,
            50,
            4,
            4,
            "FD",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(9.5);

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            "Illustrative Monthly SIP",
            25,
            99,
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(16);

          pdf.text(
            formatCurrency(
              monthlySIP,
            ),
            25,
            116,
          );

          setFont(pdf);

          pdf.setFontSize(7.5);

          pdf.setTextColor(
            ...C.text,
          );

          pdf.text(
            `Illustration for a ${years}-year period at an assumed ${expectedReturn}% return.`,
            25,
            128,
          );

          /*
           * LUMPSUM CARD
           */

          pdf.setFillColor(
            255,
            248,
            233,
          );

          pdf.setDrawColor(
            238,
            215,
            180,
          );

          pdf.roundedRect(
            18,
            146,
            174,
            50,
            4,
            4,
            "FD",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(9.5);

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            "Illustrative One-Time Investment",
            25,
            158,
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(16);

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            formatCurrency(
              lumpsumRequired,
            ),
            25,
            175,
          );

          setFont(pdf);

          pdf.setFontSize(7.5);

          pdf.setTextColor(
            ...C.text,
          );

          pdf.text(
            `Illustration using the same ${expectedReturn}% return assumption over ${years} years.`,
            25,
            187,
          );

          /*
           * Comparison note
           */

          pdf.setFillColor(
            ...C.light,
          );

          pdf.setDrawColor(
            ...C.border,
          );

          pdf.roundedRect(
            18,
            207,
            174,
            41,
            4,
            4,
            "FD",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(8.5);

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            "Important",
            25,
            219,
          );

          setFont(pdf);

          pdf.setFontSize(7.6);

          pdf.setTextColor(
            ...C.text,
          );

          pdf.text(
            pdf.splitTextToSize(
              "The SIP and one-time investment figures are alternative illustrations based on the assumptions entered. They are not guarantees of future outcomes.",
              158,
            ),
            25,
            230,
            {
              lineHeightFactor:
                1.35,
            },
          );

          addPageFooter(pdf);

          /*
           * PAGE 4
           * LEAD GENERATION + DISCLAIMER
           */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle ||
            "Goal Planning Illustration",
            logo,
          );

          addSectionTitle(
            pdf,
            "4",
            "Goal Planning Insight",
            "Key assumptions and investor education",
            69,
          );

          const insightY = 86;

          pdf.setFillColor(
            236,
            249,
            243,
          );

          pdf.setDrawColor(
            205,
            231,
            218,
          );

          pdf.roundedRect(
            18,
            insightY,
            174,
            62,
            4,
            4,
            "FD",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(9.5);

          pdf.setTextColor(
            ...C.darkGreen,
          );

          pdf.text(
            "Selected Goal",
            25,
            insightY + 12,
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(11);

          pdf.text(
            goalLabel,
            25,
            insightY + 25,
          );

          setFont(pdf);

          pdf.setFontSize(7.7);

          pdf.setTextColor(
            ...C.text,
          );

          pdf.text(
            `Current value: ${formatCurrency(
              targetAmount,
            )}`,
            25,
            insightY + 37,
          );

          pdf.text(
            `Estimated future value: ${formatCurrency(
              futureValue,
            )}`,
            25,
            insightY + 48,
          );

          /*
           * LEAD GENERATION
           */

          const leadY =
            insightY +
            72;

          pdf.setFillColor(
            ...C.darkGreen,
          );

          pdf.roundedRect(
            18,
            leadY,
            174,
            61,
            4,
            4,
            "F",
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(10);

          pdf.setTextColor(
            ...C.white,
          );

          pdf.text(
            "Discuss Your Goal Planning Illustration",
            25,
            leadY + 12,
          );

          setFont(pdf);

          pdf.setFontSize(7.5);

          pdf.setTextColor(
            230,
            250,
            240,
          );

          pdf.text(
            pdf.splitTextToSize(
              "For investor education and assistance in understanding this illustration, connect with Luxmi InvestCare.",
              158,
            ),
            25,
            leadY + 23,
            {
              lineHeightFactor:
                1.35,
            },
          );

          setFont(
            pdf,
            true,
          );

          pdf.setFontSize(8);

          pdf.setTextColor(
            255,
            205,
            70,
          );

          pdf.text(
            `WhatsApp: ${BRAND.whatsapp}`,
            25,
            leadY + 42,
          );

          pdf.text(
            BRAND.email,
            100,
            leadY + 42,
          );

          pdf.text(
            BRAND.website,
            25,
            leadY + 52,
          );

          pdf.text(
            BRAND.arn,
            100,
            leadY + 52,
          );

          addPageFooter(pdf);

          /*
           * PAGE 5
           * INVESTOR EDUCATION DISCLAIMER
           */

          pdf.addPage();

          addPageHeader(
            pdf,
            reportTitle ||
            "Goal Planning Illustration",
            logo,
          );

          addSectionTitle(
            pdf,
            "5",
            "Investor Education Disclaimer",
            "Important information regarding this illustrative goal calculator",
            69,
          );

          addDisclaimer(pdf);

          addPageFooter(pdf);

          pdf.save(fileName);

          return;
        }

        /*
         * ============================================================
         * DEDICATED CHILD EDUCATION PDF REPORT
         * ============================================================
         */
        if (
          calculatorType === "child-education" &&
          childEducationData
        ) {
          const {
            currentAge,
            educationStartAge,
            currentEducationCost,
            expectedReturn,
            educationInflation,
            yearsToGoal,
            futureEducationCost,
            monthlySIP,
            lumpsumRequired,
          } = childEducationData;

          const educationIncrease = Math.max(
            0,
            futureEducationCost - currentEducationCost,
          );

          const educationMultiple =
            currentEducationCost > 0
              ? futureEducationCost / currentEducationCost
              : 0;

          const educationRows = Array.from(
            { length: Math.max(1, yearsToGoal) },
            (_, index) => {
              const year = index + 1;
              const age = currentAge + year;
              const estimatedCost =
                currentEducationCost *
                Math.pow(1 + educationInflation / 100, year);

              return { year, age, estimatedCost };
            },
          );

          /* PAGE 1 */
          addPageHeader(
            pdf,
            reportTitle || "Child Education Planning Illustration",
            logo,
          );

          addSectionTitle(
            pdf,
            "1",
            "Education Planning Summary",
            "Key assumptions and illustrative education funding requirements",
            69,
          );

          const cardW = 54;
          const cardH = 30;
          const gap = 6;

          addCard(pdf, 18, 84, cardW, cardH, "Child's Current Age", `${currentAge} ${currentAge === 1 ? "Year" : "Years"}`);
          addCard(pdf, 18 + cardW + gap, 84, cardW, cardH, "Education Start Age", `${educationStartAge} Years`, C.teal);
          addCard(pdf, 18 + (cardW + gap) * 2, 84, cardW, cardH, "Years to Goal", `${yearsToGoal} ${yearsToGoal === 1 ? "Year" : "Years"}`, C.gold);
          addCard(pdf, 18, 120, cardW, cardH, "Current Education Cost", formatCurrency(currentEducationCost));
          addCard(pdf, 18 + cardW + gap, 120, cardW, cardH, "Expected Return", `${expectedReturn}%`, C.teal);
          addCard(pdf, 18 + (cardW + gap) * 2, 120, cardW, cardH, "Education Inflation", `${educationInflation}%`, C.gold);

          pdf.setFillColor(...C.light);
          pdf.setDrawColor(...C.border);
          pdf.roundedRect(18, 158, 174, 58, 4, 4, "FD");

          setFont(pdf, true);
          pdf.setFontSize(9.5);
          pdf.setTextColor(...C.darkGreen);
          pdf.text("Illustrative Education Funding Requirement", 25, 171);

          setFont(pdf);
          pdf.setFontSize(7.5);
          pdf.setTextColor(...C.text);
          pdf.text("Future Education Cost", 25, 184);
          pdf.text("Monthly SIP", 105, 184);
          pdf.text("One-Time Investment", 25, 203);

          setFont(pdf, true);
          pdf.setFontSize(10.5);
          pdf.setTextColor(...C.darkGreen);
          pdf.text(formatCurrency(futureEducationCost), 25, 195);
          pdf.text(formatCurrency(monthlySIP), 105, 195);
          pdf.text(formatCurrency(lumpsumRequired), 25, 214);

          addPageFooter(pdf);

          /* PAGE 2 */
          pdf.addPage();
          addPageHeader(
            pdf,
            reportTitle || "Child Education Planning Illustration",
            logo,
          );
          addSectionTitle(
            pdf,
            "2",
            "Education Cost Growth",
            "Illustrative effect of education inflation over the planning period",
            69,
          );

          const chartBoxX = 18;
          const chartBoxY = 79;
          const chartBoxW = 174;
          const chartBoxH = 110;
          const chartX = 34;
          const chartY = 91;
          const chartW = 145;
          const chartH = 68;
          const maxCost = Math.max(
            ...educationRows.map((row) => row.estimatedCost),
            currentEducationCost,
            1,
          );

          pdf.setFillColor(...C.light);
          pdf.setDrawColor(...C.border);
          pdf.roundedRect(chartBoxX, chartBoxY, chartBoxW, chartBoxH, 4, 4, "FD");

          for (let i = 0; i <= 4; i += 1) {
            const gy = chartY + chartH - (chartH * i) / 4;
            pdf.setDrawColor(...C.border);
            pdf.setLineWidth(0.25);
            pdf.line(chartX, gy, chartX + chartW, gy);
            setFont(pdf);
            pdf.setFontSize(6.5);
            pdf.setTextColor(...C.muted);
            pdf.text(formatLakh((maxCost * i) / 4), chartX - 3, gy + 2, { align: "right" });
          }

          const point = (index: number, value: number) => {
            const px =
              chartX +
              (educationRows.length === 1
                ? chartW / 2
                : (chartW * index) / (educationRows.length - 1));
            const py = chartY + chartH - (value / maxCost) * chartH;
            return [px, py] as const;
          };

          pdf.setDrawColor(...C.green);
          pdf.setLineWidth(1.25);
          for (let i = 1; i < educationRows.length; i += 1) {
            const a = point(i - 1, educationRows[i - 1].estimatedCost);
            const b = point(i, educationRows[i].estimatedCost);
            pdf.line(a[0], a[1], b[0], b[1]);
          }

          pdf.setFillColor(...C.green);
          educationRows.forEach((row, index) => {
            const p = point(index, row.estimatedCost);
            if (
              educationRows.length <= 20 ||
              index === 0 ||
              index === educationRows.length - 1
            ) {
              pdf.circle(p[0], p[1], 1.1, "F");
            }
          });

          const labelIndexes = Array.from(
            new Set([
              0,
              Math.floor((educationRows.length - 1) / 3),
              Math.floor((2 * (educationRows.length - 1)) / 3),
              educationRows.length - 1,
            ]),
          );

          setFont(pdf);
          pdf.setFontSize(6.5);
          pdf.setTextColor(...C.muted);
          labelIndexes.forEach((index) => {
            const p = point(index, 0);
            pdf.text(`Y${educationRows[index].year}`, p[0], chartY + chartH + 8, { align: "center" });
          });

          /*
    * Clear chart legend
    *
    * Green = projected education cost
    * Grey dashed = today's current education cost
    */
          const currentCostY =
            chartY +
            chartH -
            (currentEducationCost /
              maxCost) *
            chartH;

          // Draw actual current-cost reference line
          pdf.setDrawColor(
            ...C.greyLine,
          );

          pdf.setLineWidth(
            0.8,
          );

          for (
            let x = chartX;
            x < chartX + chartW;
            x += 4
          ) {
            pdf.line(
              x,
              currentCostY,
              Math.min(
                x + 2,
                chartX + chartW,
              ),
              currentCostY,
            );
          }

          const legendY = 178;

          // Projected Education Cost
          pdf.setFillColor(
            ...C.green,
          );

          pdf.circle(
            25,
            legendY - 1.2,
            1.6,
            "F",
          );

          setFont(pdf);

          pdf.setFontSize(7);

          pdf.setTextColor(
            ...C.text,
          );

          pdf.text(
            "Projected Education Cost",
            30,
            legendY + 1,
          );

          // Current Education Cost
          pdf.setDrawColor(
            ...C.greyLine,
          );

          pdf.setLineWidth(
            0.9,
          );

          pdf.line(
            112,
            legendY - 1.2,
            122,
            legendY - 1.2,
          );

          pdf.text(
            "Current Education Cost",
            127,
            legendY + 1,
          );

          setFont(pdf, true);
          pdf.setFontSize(7.2);
          pdf.setTextColor(...C.darkGreen);
          pdf.text(`Today: ${formatCurrency(currentEducationCost)}`, 25, 190);
          pdf.text(`At goal: ${formatCurrency(futureEducationCost)}`, 105, 190);

          pdf.setFillColor(255, 249, 235);
          pdf.setDrawColor(236, 215, 157);
          pdf.roundedRect(18, 198, 174, 37, 4, 4, "FD");

          setFont(pdf, true);
          pdf.setFontSize(8.5);
          pdf.setTextColor(...C.darkGreen);
          pdf.text("Inflation impact", 25, 210);

          setFont(pdf);
          pdf.setFontSize(7.4);
          pdf.setTextColor(...C.text);
          pdf.text(
            pdf.splitTextToSize(
              `At ${educationInflation}% assumed education inflation, the projected cost increases by ${formatCurrency(educationIncrease)} to approximately ${educationMultiple.toFixed(1)}× today's cost.`,
              158,
            ),
            25,
            221,
            { lineHeightFactor: 1.35 },
          );

          addPageFooter(pdf);

          /* PAGE 3 */
          pdf.addPage();
          addPageHeader(
            pdf,
            reportTitle || "Child Education Planning Illustration",
            logo,
          );
          addSectionTitle(
            pdf,
            "3",
            "Year-wise Education Cost Projection",
            "Illustrative annual education cost using the selected inflation assumption",
            69,
          );

          const tableX = 18;
          const tableY = 84;
          const tableW = 174;
          const headerH = 11;
          const rowH = 8.5;
          const columns = [
            { label: "Year", width: 30 },
            { label: "Child Age", width: 42 },
            { label: "Estimated Education Cost", width: 102 },
          ];

          pdf.setFillColor(...C.darkGreen);
          pdf.roundedRect(tableX, tableY, tableW, headerH, 2, 2, "F");

          let columnX = tableX;
          columns.forEach((column) => {
            setFont(pdf, true);
            pdf.setFontSize(7);
            pdf.setTextColor(...C.white);
            pdf.text(column.label, columnX + column.width - 3, tableY + 7, { align: "right" });
            columnX += column.width;
          });

          educationRows.slice(0, 20).forEach((row, index) => {
            const rowY = tableY + headerH + index * rowH;
            if (index % 2 === 0) {
              pdf.setFillColor(...C.light);
              pdf.rect(tableX, rowY, tableW, rowH, "F");
            }

            const values = [`Y${row.year}`, `${row.age} Years`, formatCurrency(row.estimatedCost)];
            let x = tableX;
            values.forEach((value, valueIndex) => {
              const column = columns[valueIndex];
              setFont(pdf, valueIndex === 2);
              pdf.setFontSize(7);
              const rowTextColor: readonly [
                number,
                number,
                number,
              ] =
                valueIndex === 2
                  ? C.darkGreen
                  : C.text;

              pdf.setTextColor(
                ...rowTextColor,
              );

              pdf.text(value, x + column.width - 3, rowY + 5.7, { align: "right" });
              x += column.width;
            });
          });

          if (educationRows.length > 20) {
            setFont(pdf);
            pdf.setFontSize(6.7);
            pdf.setTextColor(...C.muted);
            pdf.text("Table displays the first 20 years; the final goal value is shown on the summary pages.", 18, 258);
          }

          setFont(pdf);
          pdf.setFontSize(6.8);
          pdf.setTextColor(...C.muted);
          pdf.text("Values are illustrative and rounded to the nearest rupee.", 18, 266);

          addPageFooter(pdf);

          /* PAGE 4 */
          pdf.addPage();
          addPageHeader(
            pdf,
            reportTitle || "Child Education Planning Illustration",
            logo,
          );
          addSectionTitle(
            pdf,
            "4",
            "Funding Requirement & Planning Insight",
            "Illustrative funding alternatives and investor education",
            69,
          );

          addCard(pdf, 18, 84, 82, 36, "Illustrative Monthly SIP", formatCurrency(monthlySIP), C.green);
          addCard(pdf, 110, 84, 82, 36, "Illustrative One-Time Investment", formatCurrency(lumpsumRequired), C.gold);

          pdf.setFillColor(...C.light);
          pdf.setDrawColor(...C.border);
          pdf.roundedRect(18, 133, 174, 45, 4, 4, "FD");

          setFont(pdf, true);
          pdf.setFontSize(8.8);
          pdf.setTextColor(...C.darkGreen);
          pdf.text("Planning Snapshot", 25, 145);

          setFont(pdf);
          pdf.setFontSize(7.5);
          pdf.setTextColor(...C.text);
          pdf.text(`Education begins at age ${educationStartAge}.`, 25, 157);
          pdf.text(`${yearsToGoal} ${yearsToGoal === 1 ? "year" : "years"} are available for planning.`, 25, 166);
          pdf.text(`Future education cost: ${formatCurrency(futureEducationCost)}.`, 105, 157);
          pdf.text(`Inflation assumption: ${educationInflation}%.`, 105, 166);

          const leadY = 191;
          pdf.setFillColor(...C.darkGreen);
          pdf.roundedRect(18, leadY, 174, 61, 4, 4, "F");

          setFont(pdf, true);
          pdf.setFontSize(10);
          pdf.setTextColor(...C.white);
          pdf.text("Want to Understand This Illustration?", 25, leadY + 12);

          setFont(pdf);
          pdf.setFontSize(7.5);
          pdf.setTextColor(230, 250, 240);
          pdf.text(
            pdf.splitTextToSize(
              "For investor education and information about available investment products, connect with Luxmi InvestCare.",
              158,
            ),
            25,
            leadY + 23,
            { lineHeightFactor: 1.35 },
          );

          setFont(pdf, true);
          pdf.setFontSize(8);
          pdf.setTextColor(255, 205, 70);
          pdf.text(`WhatsApp: ${BRAND.whatsapp}`, 25, leadY + 43);
          pdf.text(BRAND.email, 105, leadY + 43);
          pdf.text(BRAND.website, 25, leadY + 53);
          pdf.text(BRAND.arn, 105, leadY + 53);

          addPageFooter(pdf);

          /* PAGE 5 */
          pdf.addPage();
          addPageHeader(
            pdf,
            reportTitle || "Child Education Planning Illustration",
            logo,
          );
          addSectionTitle(
            pdf,
            "5",
            "Investor Education Disclaimer",
            "Important information regarding this illustrative education planner",
            69,
          );

          const disclaimerItems = [
            "This calculator is provided for investor education and illustration purposes only.",
            "The projections shown are based on the assumptions entered by the user, including education cost, time period, inflation and assumed investment return.",
            "Actual education costs, investment returns and future funding requirements may differ from the illustration.",
            "Mutual Fund investments are subject to market risks. Read all scheme related documents carefully before investing.",
            "Past performance does not guarantee future returns.",
            "The projected values shown in this report are not guaranteed returns and should not be interpreted as a promise of future performance.",
            "This calculator is an educational illustration and should not be treated as a recommendation to invest in any particular scheme.",
          ];

          let disclaimerY = 78;
          disclaimerItems.forEach((item, index) => {
            const lines = pdf.splitTextToSize(item, 158);
            setFont(pdf, true);
            pdf.setFontSize(8);
            pdf.setTextColor(...C.darkGreen);
            pdf.text(`${index + 1}.`, 20, disclaimerY);
            setFont(pdf);
            pdf.setTextColor(...C.text);
            pdf.text(lines, 29, disclaimerY, { lineHeightFactor: 1.35 });
            disclaimerY += Math.max(10, lines.length * 4.3 + 4);
          });

          addPageFooter(pdf);

          pdf.save(fileName);
          return;
        }

        /*
         * PAGE 1
         * Investment Details
         */

        addPageHeader(
          pdf,
          reportTitle,
          logo,
        );

        addSectionTitle(
          pdf,
          "1",
          "Investment Details",
          "Key assumptions and projected outcomes",
          69,
        );

        const cardW = 54.7;

        const cardH = 31;

        const gap = 5;

        addCard(
          pdf,
          18,
          84,
          cardW,
          cardH,
          calculatorType ===
            "sip"
            ? "Monthly SIP"
            : "Investment Amount",
          formatCurrency(
            investment,
          ),
        );

        addCard(
          pdf,
          18 +
          cardW +
          gap,
          84,
          cardW,
          cardH,
          "Investment Period",
          `${years} ${years === 1
            ? "Year"
            : "Years"
          }`,
          C.teal,
        );

        addCard(
          pdf,
          18 +
          (cardW + gap) *
          2,
          84,
          cardW,
          cardH,
          "Expected Return",
          `${annualReturn}%`,
          C.gold,
        );

        addCard(
          pdf,
          18,
          121,
          cardW,
          cardH,
          "Total Investment",
          formatCurrency(
            investedAmount,
          ),
        );

        addCard(
          pdf,
          18 +
          cardW +
          gap,
          121,
          cardW,
          cardH,
          "Estimated Returns",
          formatCurrency(
            estimatedReturns,
          ),
          C.teal,
        );

        addCard(
          pdf,
          18 +
          (cardW + gap) *
          2,
          121,
          cardW,
          cardH,
          "Maturity Value",
          formatCurrency(
            maturityValue,
          ),
          C.gold,
        );

        pdf.setFillColor(
          236,
          249,
          243,
        );

        pdf.setDrawColor(
          205,
          231,
          218,
        );

        pdf.roundedRect(
          18,
          163,
          170,
          25,
          3,
          3,
          "FD",
        );

        setFont(pdf, true);

        pdf.setFontSize(8.5);

        pdf.setTextColor(
          ...C.darkGreen,
        );

        pdf.text(
          "Investor Education Note",
          25,
          173,
        );

        setFont(pdf);

        pdf.setFontSize(7.5);

        pdf.setTextColor(
          ...C.text,
        );

        pdf.text(
          "This projection is based on the assumptions entered into the calculator.",
          25,
          181,
        );

        pdf.text(
          "Actual returns may vary and are not guaranteed.",
          25,
          186,
        );

        addPageFooter(pdf);

        /*
         * PAGE 2
         * Investment Growth
         * Projected Corpus Composition
         */

        function addSWPComposition(
          pdf: jsPDF,
          totalWithdrawn: number,
          remainingCorpus: number,
          x: number,
          y: number,
          w: number,
          h: number,
        ) {
          const total =
            Math.max(
              totalWithdrawn +
              remainingCorpus,
              1,
            );

          const withdrawnPct =
            (Math.max(totalWithdrawn, 0) / total) *
            100;

          const remainingPct =
            (Math.max(remainingCorpus, 0) / total) *
            100;

          const centerX = x + 45;
          const centerY = y + h / 2;

          const outerR = 24;
          const innerR = 15;

          const drawArc = (
            start: number,
            end: number,
            color: readonly [
              number,
              number,
              number,
            ],
          ) => {
            pdf.setDrawColor(...color);
            pdf.setLineWidth(8);

            const steps = 40;

            let previousX =
              centerX +
              outerR *
              Math.cos(start);

            let previousY =
              centerY +
              outerR *
              Math.sin(start);

            for (let i = 1; i <= steps; i++) {
              const angle =
                start +
                ((end - start) * i) /
                steps;

              const nextX =
                centerX +
                outerR *
                Math.cos(angle);

              const nextY =
                centerY +
                outerR *
                Math.sin(angle);

              pdf.line(
                previousX,
                previousY,
                nextX,
                nextY,
              );

              previousX = nextX;
              previousY = nextY;
            }
          };

          const start =
            -Math.PI / 2;

          const withdrawnEnd =
            start +
            (withdrawnPct / 100) *
            Math.PI *
            2;

          drawArc(
            start,
            withdrawnEnd,
            C.gold,
          );

          drawArc(
            withdrawnEnd,
            start + Math.PI * 2,
            C.green,
          );

          // White center
          pdf.setFillColor(...C.white);

          pdf.circle(
            centerX,
            centerY,
            innerR,
            "F",
          );

          setFont(pdf, true);

          pdf.setFontSize(8);

          pdf.setTextColor(...C.darkGreen);

          pdf.text(
            "SWP",
            centerX,
            centerY + 2,
            {
              align: "center",
            },
          );

          // Labels
          const labelX = x + 90;

          setFont(pdf);

          pdf.setFontSize(7.8);

          pdf.setTextColor(...C.text);

          pdf.setFillColor(...C.gold);

          pdf.circle(
            labelX,
            y + 20,
            2,
            "F",
          );

          pdf.text(
            `Total Withdrawn: ${formatCurrency(totalWithdrawn)}`,
            labelX + 7,
            y + 22,
          );

          pdf.text(
            `${withdrawnPct.toFixed(1)}%`,
            x + w - 10,
            y + 22,
            {
              align: "right",
            },
          );

          pdf.setFillColor(...C.green);

          pdf.circle(
            labelX,
            y + 37,
            2,
            "F",
          );

          pdf.text(
            `Remaining Corpus: ${formatCurrency(remainingCorpus)}`,
            labelX + 7,
            y + 39,
          );

          pdf.text(
            `${remainingPct.toFixed(1)}%`,
            x + w - 10,
            y + 39,
            {
              align: "right",
            },
          );
        }

        pdf.addPage();

        addPageHeader(
          pdf,
          reportTitle,
          logo,
        );

        addSectionTitle(
          pdf,
          "2",
          "Investment Growth",
          "Illustrative year-wise projection of investment and estimated portfolio value",
          69,
        );

        pdf.setFillColor(
          ...C.white,
        );

        pdf.setDrawColor(
          ...C.border,
        );

        pdf.roundedRect(
          18,
          82,
          174,
          94,
          4,
          4,
          "FD",
        );

        addGrowthChart(
          pdf,
          rows,
          23,
          88,
          164,
          82,
        );

        addSectionTitle(
          pdf,
          "3",
          "Projected Corpus Composition",
          "Illustrative composition of the projected corpus",
          192,
        );

        pdf.setFillColor(
          ...C.light,
        );

        pdf.setDrawColor(
          ...C.border,
        );

        pdf.roundedRect(
          18,
          205,
          174,
          64,
          4,
          4,
          "FD",
        );

        addDonutChart(
          pdf,
          investedAmount,
          estimatedReturns,
          maturityValue,
          61,
          237,
        );

        setFont(pdf, true);

        pdf.setFontSize(8.5);

        pdf.setTextColor(
          ...C.dark,
        );

        pdf.text(
          "Projected Corpus",
          103,
          218,
        );

        const investmentPct =
          (investedAmount /
            Math.max(
              maturityValue,
              1,
            )) *
          100;

        const returnsPct =
          (estimatedReturns /
            Math.max(
              maturityValue,
              1,
            )) *
          100;

        pdf.setFillColor(
          ...C.green,
        );

        pdf.circle(
          104,
          231,
          2,
          "F",
        );

        setFont(pdf);

        pdf.setFontSize(7.8);

        pdf.setTextColor(
          ...C.text,
        );

        pdf.text(
          `Investment: ${formatCurrency(
            investedAmount,
          )} (${investmentPct.toFixed(
            1,
          )}%)`,
          110,
          233,
        );

        pdf.setFillColor(
          ...C.teal,
        );

        pdf.circle(
          104,
          245,
          2,
          "F",
        );

        pdf.text(
          `Estimated Returns: ${formatCurrency(
            estimatedReturns,
          )} (${returnsPct.toFixed(
            1,
          )}%)`,
          110,
          247,
        );

        setFont(pdf, true);

        pdf.setFontSize(10);

        pdf.setTextColor(
          ...C.darkGreen,
        );

        pdf.text(
          formatCurrency(
            maturityValue,
          ),
          110,
          260,
        );

        addPageFooter(pdf);

        /*
         * PAGE 3
         * Year-wise Growth Projection
         */

        pdf.addPage();

        addPageHeader(
          pdf,
          reportTitle,
          logo,
        );

        addSectionTitle(
          pdf,
          "4",
          "Year-wise Growth Projection",
          "Illustrative annual projection based on the selected assumptions",
          69,
        );

        addYearTable(
          pdf,
          rows,
        );

        setFont(pdf);

        pdf.setFontSize(7);

        pdf.setTextColor(
          ...C.muted,
        );

        pdf.text(
          "Values are illustrative and rounded to the nearest rupee.",
          18,
          214,
        );

        addPageFooter(pdf);

        /*
         * PAGE 4
         * Investment Breakdown
         */

        pdf.addPage();

        addPageHeader(
          pdf,
          reportTitle,
          logo,
        );

        addSectionTitle(
          pdf,
          "5",
          "Investment Breakdown",
          "A consolidated view of calculator assumptions and estimated outcomes",
          69,
        );

        const roi =
          investedAmount === 0
            ? 0
            : (estimatedReturns /
              investedAmount) *
            100;

        const installments =
          calculatorType ===
            "sip"
            ? years * 12
            : 1;

        const annualInvestment =
          calculatorType ===
            "sip"
            ? investment * 12
            : investment;

        const breakdown = [
          [
            calculatorType ===
              "sip"
              ? "Monthly SIP"
              : "Investment Amount",
            formatCurrency(
              investment,
            ),
          ],
          [
            "Investment Period",
            `${years} ${years === 1
              ? "Year"
              : "Years"
            }`,
          ],
          [
            "Expected Return",
            `${annualReturn}%`,
          ],
          [
            "Amount Invested",
            formatCurrency(
              investedAmount,
            ),
          ],
          [
            "Estimated Returns",
            formatCurrency(
              estimatedReturns,
            ),
          ],
          [
            "Maturity Value",
            formatCurrency(
              maturityValue,
            ),
          ],
          [
            "Installments",
            installments.toLocaleString(
              "en-IN",
            ),
          ],
          [
            "Average Annual Investment",
            formatCurrency(
              annualInvestment,
            ),
          ],
          [
            "Return on Investment",
            `${roi.toFixed(1)}%`,
          ],
        ];

        let by = 84;

        breakdown.forEach(
          ([label, value], index) => {
            const bx =
              index % 2 === 0
                ? 18
                : 105;

            if (
              index % 2 ===
              0 &&
              index > 0
            ) {
              by += 35;
            }

            pdf.setFillColor(
              ...C.light,
            );

            pdf.setDrawColor(
              ...C.border,
            );

            pdf.roundedRect(
              bx,
              by,
              82,
              28,
              3,
              3,
              "FD",
            );

            setFont(pdf);

            pdf.setFontSize(7.8);

            pdf.setTextColor(
              ...C.muted,
            );

            pdf.text(
              label,
              bx + 7,
              by + 10,
            );

            setFont(
              pdf,
              true,
            );

            pdf.setFontSize(10);

            pdf.setTextColor(
              ...C.darkGreen,
            );

            pdf.text(
              value,
              bx + 7,
              by + 20,
            );
          },
        );

        addPageFooter(pdf);

        /*
         * PAGE 5
         * Investor Education Disclaimer
         */

        pdf.addPage();

        addPageHeader(
          pdf,
          reportTitle,
          logo,
        );

        addSectionTitle(
          pdf,
          "6",
          "Investor Education Disclaimer",
          "Important information regarding this illustrative calculator",
          66,
        );
        function addSWPTrendChart(
          pdf: jsPDF,
          projections: SWPProjection[],
          x: number,
          y: number,
          w: number,
          h: number,
        ) {
          if (!projections.length) return;

          const chartX = x + 12;
          const chartY = y + 12;
          const chartW = w - 24;
          const chartH = h - 28;

          const values = projections.flatMap((p) => [
            p.openingCorpus,
            p.closingCorpus,
          ]);

          const maxValue = Math.max(...values, 1);
          const minValue = Math.min(...values, 0);

          const range = Math.max(maxValue - minValue, 1);

          // Grid lines
          pdf.setDrawColor(...C.border);
          pdf.setLineWidth(0.25);

          for (let i = 0; i <= 4; i++) {
            const gy = chartY + (chartH / 4) * i;

            pdf.line(
              chartX,
              gy,
              chartX + chartW,
              gy,
            );

            const value =
              maxValue -
              (range / 4) * i;

            setFont(pdf);

            pdf.setFontSize(6.5);

            pdf.setTextColor(...C.muted);

            pdf.text(
              formatLakh(value),
              chartX - 3,
              gy + 2,
              {
                align: "right",
              },
            );
          }

          if (projections.length === 1) {
            const px = chartX + chartW / 2;

            const py =
              chartY +
              chartH -
              ((projections[0].closingCorpus - minValue) / range) *
              chartH;

            pdf.setFillColor(...C.green);

            pdf.circle(
              px,
              py,
              2,
              "F",
            );

            return;
          }

          const getX = (index: number) =>
            chartX +
            (index / (projections.length - 1)) *
            chartW;

          const getY = (value: number) =>
            chartY +
            chartH -
            ((value - minValue) / range) *
            chartH;

          // Opening corpus line
          pdf.setDrawColor(...C.teal);
          pdf.setLineWidth(1.1);

          for (let i = 1; i < projections.length; i++) {
            pdf.line(
              getX(i - 1),
              getY(projections[i - 1].openingCorpus),
              getX(i),
              getY(projections[i].openingCorpus),
            );
          }

          // Closing corpus line
          pdf.setDrawColor(...C.green);
          pdf.setLineWidth(1.5);

          for (let i = 1; i < projections.length; i++) {
            pdf.line(
              getX(i - 1),
              getY(projections[i - 1].closingCorpus),
              getX(i),
              getY(projections[i].closingCorpus),
            );
          }

          // Closing corpus points
          pdf.setFillColor(...C.green);

          projections.forEach((projection, index) => {
            pdf.circle(
              getX(index),
              getY(projection.closingCorpus),
              1.5,
              "F",
            );
          });

          // X-axis labels
          setFont(pdf);

          pdf.setFontSize(6.5);

          pdf.setTextColor(...C.muted);

          projections.forEach(
            (projection, index) => {
              pdf.text(
                `Y${projection.year}`,
                getX(index),
                chartY + chartH + 9,
                {
                  align: "center",
                },
              );
            },
          );

          // Legend
          pdf.setFillColor(...C.teal);

          pdf.circle(
            chartX,
            y + h - 7,
            1.8,
            "F",
          );

          setFont(pdf);

          pdf.setFontSize(7);

          pdf.setTextColor(...C.text);

          pdf.text(
            "Opening Corpus",
            chartX + 5,
            y + h - 5,
          );

          pdf.setFillColor(...C.green);

          pdf.circle(
            chartX + 55,
            y + h - 7,
            1.8,
            "F",
          );

          pdf.text(
            "Closing Corpus",
            chartX + 60,
            y + h - 5,
          );
        }

        addDisclaimer(pdf);

        addPageFooter(pdf);

        pdf.save(
          fileName,
        );
      } catch (error) {
        console.error(
          "PDF generation failed:",
          error,
        );
      }
    };

  return (
    <button
      type="button"
      onClick={generatePDF}
      className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
    >
      <Download className="h-5 w-5" />
      Download PDF Report
    </button>
  );
}