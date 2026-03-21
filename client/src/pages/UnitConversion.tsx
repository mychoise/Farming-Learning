import { useState,useEffect } from "react";
import {
  BadgeCheck,
  ChevronDown,
  Mountain,
  ArrowLeftRight,
  Share2,
  SquareDashedMousePointer,
} from "lucide-react";
import { useUnitConversion } from "../hooks/hooks";
import { useQueryClient } from "@tanstack/react-query";

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

type InfoCardProps = {
  title: string;
  detail: string;
};

type InsightCardProps = {
  icon: typeof Mountain;
  title: string;
  detail: string;
};

const units = [
  "Bigha",
  "Katha",
  "Acre",
  "Ropani",
  "Aana",
  "Hectare",
  "Sq.ft",
  "Sq.m",
];


const references: InfoCardProps[] = [
  {
    title: "TERAI REFERENCE",
    detail: "1 Bigha = 20 Kattha",
  },
  {
    title: "HILLY REFERENCE",
    detail: "1 Ropani = 16 Aana",
  },
];

const insights: InsightCardProps[] = [
  {
    icon: Mountain,
    title: "Topography",
    detail: "Regional conversion practices applied.",
  },
  {
    icon: BadgeCheck,
    title: "Authority",
    detail: "Precision taxonomy aligned to standard usage.",
  },
  {
    icon: Share2,
    title: "Export",
    detail: "Directly send result to mobile or desktop.",
  },
];

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <label className="space-y-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-soft">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none rounded-2xl  bg-white pl-4 pr-10 text-sm font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition focus:border-brand focus:ring-2 focus:ring-[#206223]"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
      </div>
    </label>
  );
}

function ReferenceCard({ title, detail }: InfoCardProps) {
  return (
    <div className="rounded-[22px] border border-white/80 bg-white/72 px-4 py-4 shadow-card backdrop-blur-sm">
      <p className="text-[11px] font-[medium] uppercase tracking-[0.18em] text-ink-soft/80">
        {title}
      </p>
      <p className="mt-2 text-[14px]  text-foreground">{detail}</p>
    </div>
  );
}

function InsightCard({ icon: Icon, title, detail }: InsightCardProps) {
  return (
    <div className="rounded-[22px] font-[font5] bg-[#F4F4EF] p-4 shadow-[0_18px_30px_-28px_rgba(35,51,38,0.28)] backdrop-blur-sm">
      <Icon className="h-6 w-6 text-brand text-[#206223]" strokeWidth={2.2} />
      <h3 className="mt-4 text-[16px] font-[font3]">{title}</h3>
      <p className="mt-1 max-w-[18ch] text-xs leading-5 text-ink-soft">{detail}</p>
    </div>
  );
}

function formatAmount(value: string) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed.toFixed(2) : "0.00";
}

export default function UnitConversion() {
  const [amount, setAmount] = useState("");
  const [currentUnit, setCurrentUnit] = useState("Bigha");
  const [targetUnit, setTargetUnit] = useState("Aana");
  const [previewValue, setPreviewValue] = useState("0.00");

  const {mutate} = useUnitConversion()
const queryClient = useQueryClient();

const data = queryClient.getQueryData(["unitConversionResult"]) as number | undefined;

useEffect(() => {
  if (data) {
    console.log("Final data from server:", data);
  }
}, [data])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPreviewValue(formatAmount(amount));
    const finalData = {
      currentUnit,
      firstValue: Number(amount),
      targetUnit
    };
    mutate(finalData)
  };

  return (
    <main className="min-h-screen pt-20 font-[font3] bg-[#FAFAF5] px-4">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl pb-8 lg:pb-10">
          <h1 className="font-display text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl">
            Unit Conversion Matrix
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-ink-soft sm:text-base">
            Standardize land measurements across regional Nepali systems and
            international metrics with professional-grade precision.
          </p>
        </header>

        <div className="grid items-start gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">
          <section className="rounded-[32px] border border-white/75  bg-[#F4F4EF] bg-panel-muted/80 p-4 shadow-panel backdrop-blur-xl sm:p-5">
            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] bg-[#F4F4EF] p-5 shadow-card sm:p-6"
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
                <SquareDashedMousePointer className="h-3.5 w-3.5" />
                Area Magnitude
              </div>

              <label className="mt-5 block">
                <input
                  inputMode="decimal"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="0.00"
                  className="h-20 w-full  rounded-[22px] bg-white px-5 text-4xl font-extrabold tracking-[-0.04em] text-foreground outline-none transition placeholder:text-[#d9d5cb] focus:border-[#206223] focus:ring-2 focus:ring-[#206223]"
                />
              </label>

              <div className="mt-6 font-[font5] grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Current Unit"
                  value={currentUnit}
                  onChange={setCurrentUnit}
                  options={units}
                />
                <SelectField
                  label="Target Unit"
                  value={targetUnit}
                  onChange={setTargetUnit}
                  options={units}
                />
              </div>

              <button
                type="submit"
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#206223] text-sm font-bold text-white shadow-lift transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#206223]/20"
              >
                <ArrowLeftRight className="h-4 w-4" />
                Convert Units
              </button>
            </form>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {references.map((item) => (
                <ReferenceCard key={item.title} {...item} />
              ))}
            </div>
          </section>

          <section className="relative  overflow-hidden rounded-[36px] w-full  bg-white/95 p-6 shadow sm:p-8 lg:min-h-135">
            <div className="pointer-events-none absolute right-6 top-7 grid grid-cols-3 gap-3 opacity-40 sm:right-10 sm:top-9">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-10 rounded-md border-[5px] border-[#edf0e7]"
                />
              ))}
            </div>

            <span className="inline-flex font-[font5] ml-50 bg-[#ACF4A4]  rounded-full bg-brand-soft px-4 py-2 text-[15px]  uppercase tracking-[0.18em] text-brand-strong shadow-[0_8px_20px_-16px_rgba(74,120,56,0.7)]">
              Calculation Result
            </span>

            <div className="relative w-full ml-10 flex items-center flex-col mt-12 max-w-xl">
              <div className=" text-[100px] font-[font3] font-bold leading-none tracking-[-0.02em] text-[#151515]">
                {data ?? previewValue}
              </div>
              <div className="mt-5 flex items-center gap-4 text-sm font-bold uppercase tracking-[0.18em] text-[#3e403d]">
                <span className="h-px flex-1 bg-line-soft" />
                {targetUnit}
                <span className="h-px flex-1 bg-line-soft" />
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-panel-muted">
              <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-brand/10 via-brand/40 to-brand" />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {insights.map((item) => (
                <InsightCard key={item.title} {...item} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
