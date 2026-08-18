"use client";

import { Download } from "lucide-react";
import jsPDF from "jspdf";

import type { SIPProjection } from "@/lib/sip";
import type { LumpsumProjection } from "@/lib/lumpsum";

interface DownloadReportProps {
  calculatorType: "sip" | "lumpsum";

  investment: number;
  annualReturn: number;
  years: number;

  investedAmount: number;
  estimatedReturns: number;
  maturityValue: number;

  yearlyGrowth?: SIPProjection[] | LumpsumProjection[];

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

function normalizeRows(
  rows: SIPProjection[] | LumpsumProjection[] | undefined,
): ProjectionRow[] {
  if (!rows?.length) {
    return [];
  }

  return rows.map((row) => {
    const item = row as unknown as Record<string, unknown>;

    const invested = Number(
      item.invested ?? item.investment ?? 0,
    );

    const value = Number(
      item.value ?? item.maturityValue ?? 0,
    );

    const estimatedReturns = Number(
      item.estimatedReturns ??
      item.returns ??
      value - invested,
    );

    return {
      year: Number(item.year ?? 0),
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

export default function DownloadReport({
  calculatorType,
  investment,
  annualReturn,
  years,
  investedAmount,
  estimatedReturns,
  maturityValue,
  yearlyGrowth,
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

        const rows =
          normalizeRows(
            yearlyGrowth,
          );

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