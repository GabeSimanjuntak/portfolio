"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ExternalLink, Flame, Folder, Star, Trophy, Users } from "lucide-react";

interface SkillsProps {
  locale: "id" | "en";
  dict: {
    title: string;
    accent: string;
    githubActivityTitle: string;
    githubActivityDescription: string;
    githubContributions: string;
    githubProfile: string;
    githubLoading: string;
    githubLoadError: string;
    githubContributionsLabel: string;
    githubLess: string;
    githubMore: string;
    githubSummaryTitle: string;
    githubTotalStars: string;
    githubPublicRepos: string;
    githubFollowers: string;
    githubTopLanguages: string;
    githubLanguageBasis: string;
    githubLanguagesIncomplete: string;
    githubTotalContributions: string;
    githubCurrentStreak: string;
    githubLongestStreak: string;
    githubDays: string;
    githubActiveSince: string;
    githubStatsLoading: string;
    githubStatsError: string;
    githubStatsUnavailable: string;
  };
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

interface GitHubProfile {
  public_repos: number;
  followers: number;
}

interface ContributionStreaks {
  total: number;
  current: number;
  longest: number;
  longestStart: string | null;
  longestEnd: string | null;
  firstContribution: string | null;
}

interface GitHubStatsResponse {
  profile: GitHubProfile;
  totalStars: number;
  languages: Record<string, number>;
  languagesComplete: boolean;
}

const contributionShades = [
  "rgba(16,185,129,.10)",
  "rgba(16,185,129,.28)",
  "rgba(16,185,129,.48)",
  "rgba(16,185,129,.72)",
  "#10b981",
];

const topRowSkills = [
  { name: "Laravel", href: "https://laravel.com/docs", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "ReactJS", href: "https://react.dev/learn", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com/docs", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "PostgreSQL", href: "https://www.postgresql.org/docs/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Next.js", href: "https://nextjs.org/docs", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Flutter", href: "https://docs.flutter.dev/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
  { name: "Dart", href: "https://dart.dev/guides", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
  { name: "PyTorch", href: "https://pytorch.org/docs/stable/index.html", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
  { name: "Pandas", href: "https://pandas.pydata.org/docs/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
  { name: "TensorFlow", href: "https://www.tensorflow.org/guide", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  { name: "Scikit-learn", href: "https://scikit-learn.org/stable/user_guide.html", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "Matplotlib", href: "https://matplotlib.org/stable/users/index.html", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
  { name: "Seaborn", href: "https://seaborn.pydata.org/tutorial.html", img: "/images/skills/seaborn.png" },
  { name: "SciPy", href: "https://docs.scipy.org/doc/scipy/", img: "/images/skills/scipy.png" },
];

const bottomRowSkills = [
  { name: "PHP", href: "https://www.php.net/docs.php", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "MySQL", href: "https://dev.mysql.com/doc/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "TypeScript", href: "https://www.typescriptlang.org/docs/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Figma", href: "https://help.figma.com/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Git", href: "https://git-scm.com/doc", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Bootstrap", href: "https://getbootstrap.com/docs/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
  { name: "REST API", href: "https://developer.mozilla.org/en-US/docs/Glossary/REST", img: "/images/skills/rest-api.svg" },
  { name: "Roboflow", href: "https://docs.roboflow.com/", img: "/images/skills/roboflow.png" },
  { name: "Django", href: "https://docs.djangoproject.com/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
  { name: "Flask", href: "https://flask.palletsprojects.com/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
  { name: "Selenium", href: "https://www.selenium.dev/documentation/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg" },
  { name: "Docker", href: "https://docs.docker.com/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "FastAPI", href: "https://fastapi.tiangolo.com/", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Optuna", href: "https://optuna.readthedocs.io/", img: "/images/skills/optuna.png" },
];

export default function Skills({ dict, locale }: SkillsProps) {
  const multipliedTop = [...topRowSkills, ...topRowSkills, ...topRowSkills, ...topRowSkills];
  const multipliedBottom = [...bottomRowSkills, ...bottomRowSkills, ...bottomRowSkills, ...bottomRowSkills];
  const [contributionData, setContributionData] = useState<ContributionsResponse | null>(null);
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));
  const [activeContribution, setActiveContribution] = useState<ContributionDay | null>(null);
  const [contributionsLoading, setContributionsLoading] = useState(true);
  const [contributionsError, setContributionsError] = useState(false);
  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null);
  const [githubLanguages, setGithubLanguages] = useState<Record<string, number>>({});
  const [githubTotalStars, setGithubTotalStars] = useState(0);
  const [githubLanguagesComplete, setGithubLanguagesComplete] = useState(false);
  const [githubStatsLoading, setGithubStatsLoading] = useState(true);
  const [githubStatsError, setGithubStatsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://github-contributions-api.jogruber.de/v4/GabeSimanjuntak?y=all", {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub contributions could not be loaded");
        return response.json() as Promise<ContributionsResponse>;
      })
      .then((data) => {
        if (!data.total || !Array.isArray(data.contributions)) throw new Error("Invalid contributions response");
        setContributionData(data);
        const latestYear = Object.keys(data.total).sort((a, b) => Number(b) - Number(a))[0];
        if (latestYear) setSelectedYear((current) => current in data.total ? current : latestYear);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setContributionsError(true);
      })
      .finally(() => setContributionsLoading(false));

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github/stats", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub profile statistics could not be loaded");
        return response.json() as Promise<GitHubStatsResponse>;
      })
      .then((data) => {
        setGithubProfile(data.profile);
        setGithubLanguages(data.languages);
        setGithubTotalStars(data.totalStars);
        setGithubLanguagesComplete(data.languagesComplete);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setGithubStatsError(true);
      })
      .finally(() => setGithubStatsLoading(false));

    return () => controller.abort();
  }, []);

  const availableYears = useMemo(
    () => Object.keys(contributionData?.total ?? {}).sort((a, b) => Number(b) - Number(a)).slice(0, 4),
    [contributionData]
  );

  const calendarWeeks = useMemo(() => {
    if (!contributionData || !selectedYear) return [];
    const year = Number(selectedYear);
    const firstOfYear = new Date(Date.UTC(year, 0, 1));
    const gridStart = new Date(Date.UTC(year, 0, 1 - firstOfYear.getUTCDay()));
    const lastOfYear = new Date(Date.UTC(year, 11, 31));
    const gridEnd = new Date(Date.UTC(year, 11, 31 + (6 - lastOfYear.getUTCDay())));
    const byDate = new Map(contributionData.contributions.map((day) => [day.date, day]));
    const weeks: Array<Array<ContributionDay | null>> = [];

    for (let cursor = new Date(gridStart); cursor <= gridEnd; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
      if (cursor.getUTCDay() === 0) weeks.push([]);
      const date = cursor.toISOString().slice(0, 10);
      weeks[weeks.length - 1].push(date.startsWith(`${selectedYear}-`) ? byDate.get(date) ?? { date, count: 0, level: 0 } : null);
    }

    return weeks;
  }, [contributionData, selectedYear]);

  const monthLabels = useMemo(() => {
    if (!selectedYear || calendarWeeks.length === 0) return [];
    const year = Number(selectedYear);
    const start = new Date(Date.UTC(year, 0, 1));
    start.setUTCDate(start.getUTCDate() - start.getUTCDay());
    return Array.from({ length: 12 }, (_, month) => {
      const first = new Date(Date.UTC(year, month, 1));
      return {
        month,
        week: Math.floor((first.getTime() - start.getTime()) / (7 * 86400000)),
      };
    });
  }, [calendarWeeks.length, selectedYear]);

  const selectedYearTotal = contributionData?.total?.[selectedYear] ?? 0;
  const dateLocale = locale === "id" ? "id-ID" : "en-US";

  const contributionStreaks = useMemo<ContributionStreaks>(() => {
    if (!contributionData) return { total: 0, current: 0, longest: 0, longestStart: null, longestEnd: null, firstContribution: null };

    const days = [...contributionData.contributions].sort((a, b) => a.date.localeCompare(b.date));
    const counts = new Map(days.map((day) => [day.date, day.count]));
    const activeDays = days.filter((day) => day.count > 0);
    let longest = 0;
    let longestStart: string | null = null;
    let longestEnd: string | null = null;
    let run = 0;
    let runStart: string | null = null;

    for (const day of days) {
      if (day.count > 0) {
        run += 1;
        runStart ??= day.date;
        if (run > longest) {
          longest = run;
          longestStart = runStart;
          longestEnd = day.date;
        }
      } else {
        run = 0;
        runStart = null;
      }
    }

    const today = new Date().toISOString().slice(0, 10);
    let currentStart = today;
    if ((counts.get(currentStart) ?? 0) === 0) {
      const yesterday = new Date(`${today}T00:00:00Z`);
      yesterday.setUTCDate(yesterday.getUTCDate() - 1);
      currentStart = yesterday.toISOString().slice(0, 10);
    }

    let current = 0;
    const currentCursor = new Date(`${currentStart}T00:00:00Z`);
    while ((counts.get(currentCursor.toISOString().slice(0, 10)) ?? 0) > 0) {
      current += 1;
      currentCursor.setUTCDate(currentCursor.getUTCDate() - 1);
    }

    return {
      total: Object.values(contributionData.total).reduce((sum, value) => sum + value, 0),
      current,
      longest,
      longestStart,
      longestEnd,
      firstContribution: activeDays[0]?.date ?? null,
    };
  }, [contributionData]);

  const languageStats = useMemo(() => {
    const total = Object.values(githubLanguages).reduce((sum, bytes) => sum + bytes, 0);
    return Object.entries(githubLanguages)
      .map(([name, bytes]) => ({ name, bytes, percentage: total ? (bytes / total) * 100 : 0 }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 5);
  }, [githubLanguages]);

  const formatShortDate = (value: string | null) => value
    ? new Date(`${value}T00:00:00Z`).toLocaleDateString(dateLocale, { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    : "—";

  return (
    <section id="skills" className="py-10 overflow-hidden relative">
      
      {/* PERBAIKAN 1: Judul besar dan tebal, persis seperti section Projects */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 relative z-20"
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-brand-text">
          {dict.title} <span className="text-brand-pink">{dict.accent}</span>.
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6 md:gap-8 relative">
        
        {/* Gradient Blur di Kiri dan Kanan */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none" />

        {/* Baris 1: Jalan ke Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex w-max animate-scroll pause-on-hover py-4"
        >
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
            {multipliedTop.map((skill, index) => (
              <SkillCard key={`top-1-${index}`} skill={skill} />
            ))}
          </div>
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
            {multipliedTop.map((skill, index) => (
              <SkillCard key={`top-2-${index}`} skill={skill} />
            ))}
          </div>
        </motion.div>

        {/* Baris 2: Jalan ke Kanan (Reverse) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex w-max animate-scroll-reverse pause-on-hover py-4"
        >
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
            {multipliedBottom.map((skill, index) => (
              <SkillCard key={`bottom-1-${index}`} skill={skill} />
            ))}
          </div>
          <div className="flex gap-4 md:gap-6 pr-4 md:pr-6">
            {multipliedBottom.map((skill, index) => (
              <SkillCard key={`bottom-2-${index}`} skill={skill} />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 mt-16 md:mt-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="flex items-center gap-2 text-2xl md:text-3xl font-black tracking-tight text-brand-text">
              <GitHubLogo className="h-7 w-7 text-brand-text" />
              {dict.githubActivityTitle}
            </h3>
            <p className="mt-2 text-sm md:text-base text-brand-text/60">{dict.githubActivityDescription}</p>
          </div>
          <a
            href="https://github.com/GabeSimanjuntak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-text/10 bg-white/60 px-4 py-2 text-sm font-bold text-brand-text transition hover:border-brand-purple/40 hover:text-brand-purple"
          >
            {dict.githubProfile}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="rounded-3xl border border-brand-text/10 bg-white/60 p-4 md:p-6 shadow-sm backdrop-blur-md">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="font-bold text-brand-text">{dict.githubContributions}</h4>
              <p className="mt-1 text-sm text-brand-text/60">
                <span className="font-bold text-brand-text">{selectedYearTotal.toLocaleString(dateLocale)}</span>{" "}
                {dict.githubContributionsLabel} {selectedYear}
              </p>
            </div>
            <div className="flex flex-wrap gap-2" aria-label={dict.githubActivityTitle}>
              {availableYears.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => {
                    setSelectedYear(year);
                    setActiveContribution(null);
                  }}
                  aria-pressed={selectedYear === year}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    selectedYear === year
                      ? "bg-brand-mint text-slate-950 shadow-sm"
                      : "bg-brand-text/5 text-brand-text/70 hover:bg-brand-mint/10 hover:text-brand-mint"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {contributionsLoading ? (
            <div className="flex min-h-36 items-center justify-center rounded-2xl border border-brand-text/5 bg-white/50 text-sm text-brand-text/60">
              {dict.githubLoading}
            </div>
          ) : contributionsError || !contributionData ? (
            <div className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl border border-brand-text/5 bg-white/50 px-4 text-center text-sm text-brand-text/60">
              <span>{dict.githubLoadError}</span>
              <a href="https://github.com/GabeSimanjuntak" target="_blank" rel="noopener noreferrer" className="font-bold text-brand-purple hover:underline">
                {dict.githubProfile}
              </a>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-2xl border border-brand-text/5 bg-white/50 p-4">
                <div className="w-max min-w-full">
                  <div
                    className="mb-2 grid h-4 items-center text-[10px] text-brand-text/55"
                    style={{ gridTemplateColumns: `24px repeat(${calendarWeeks.length}, 11px)`, columnGap: "3px" }}
                  >
                    <span />
                    {monthLabels.map(({ month, week }) => (
                      <span
                        key={month}
                        className="whitespace-nowrap"
                        style={{ gridColumn: `${week + 2} / span 4` }}
                      >
                        {new Date(Date.UTC(Number(selectedYear), month, 1)).toLocaleString(dateLocale, { month: "short", timeZone: "UTC" })}
                      </span>
                    ))}
                  </div>
                  <div className="grid items-start" style={{ gridTemplateColumns: `24px repeat(${calendarWeeks.length}, 11px)`, columnGap: "3px" }}>
                    <div className="grid grid-rows-7 gap-[3px] text-[9px] leading-[11px] text-brand-text/45">
                      {(locale === "id" ? ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]).map((day, index) => (
                        <span key={day} className={index % 2 === 0 ? "" : "invisible"}>{day}</span>
                      ))}
                    </div>
                    {calendarWeeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                        {week.map((day, dayIndex) => {
                          const date = day ? new Date(`${day.date}T00:00:00Z`) : null;
                          const label = day && date
                            ? `${day.count.toLocaleString(dateLocale)} ${dict.githubContributionsLabel} · ${date.toLocaleDateString(dateLocale, { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}`
                            : "";
                          return (
                            <button
                              key={day?.date ?? `empty-${weekIndex}-${dayIndex}`}
                              type="button"
                              disabled={!day}
                              aria-label={label || undefined}
                              title={label || undefined}
                              onMouseEnter={() => setActiveContribution(day)}
                              onFocus={() => setActiveContribution(day)}
                              onMouseLeave={() => setActiveContribution(null)}
                              onBlur={() => setActiveContribution(null)}
                              className={`h-[11px] w-[11px] rounded-[2px] transition-transform hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-purple ${day ? "cursor-pointer" : "cursor-default"}`}
                              style={{ backgroundColor: day ? contributionShades[Math.min(day.level, 4)] : "transparent" }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex min-h-5 flex-wrap items-center justify-between gap-3 text-xs text-brand-text/60">
                <span aria-live="polite">
                  {activeContribution
                    ? `${activeContribution.count.toLocaleString(dateLocale)} ${dict.githubContributionsLabel} · ${new Date(`${activeContribution.date}T00:00:00Z`).toLocaleDateString(dateLocale, { month: "short", day: "numeric", timeZone: "UTC" })}`
                    : `${selectedYearTotal.toLocaleString(dateLocale)} ${dict.githubContributionsLabel} ${selectedYear}`}
                </span>
                <div className="flex items-center gap-1.5" aria-label={`${dict.githubLess} — ${dict.githubMore}`}>
                  <span>{dict.githubLess}</span>
                  {contributionShades.map((color) => (
                    <span key={color} className="h-[11px] w-[11px] rounded-[2px]" style={{ backgroundColor: color }} />
                  ))}
                  <span>{dict.githubMore}</span>
                </div>
              </div>
            </>
          )}

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex min-h-[250px] items-center rounded-2xl border border-brand-text/10 bg-white/50 p-4 md:p-5">
              <div className="w-full rounded-xl border border-brand-text/10 bg-white/60 p-4">
                <h5 className="mb-4 text-lg font-bold text-brand-blue">{dict.githubSummaryTitle}</h5>
                {githubStatsError ? (
                  <p className="text-sm text-brand-text/60">{dict.githubStatsError}</p>
                ) : (
                  <>
                    <div className="grid grid-cols-[minmax(0,1fr)_76px] items-center gap-4">
                      <div className="space-y-3">
                        <GitHubMetric icon={Star} label={dict.githubTotalStars} value={githubStatsLoading ? "—" : githubTotalStars.toLocaleString(dateLocale)} />
                        <GitHubMetric icon={Activity} label={dict.githubTotalContributions} value={contributionData ? contributionStreaks.total.toLocaleString(dateLocale) : "—"} />
                        <GitHubMetric icon={Folder} label={dict.githubPublicRepos} value={githubStatsLoading ? "—" : (githubProfile?.public_repos ?? 0).toLocaleString(dateLocale)} />
                        <GitHubMetric icon={Users} label={dict.githubFollowers} value={githubStatsLoading ? "—" : (githubProfile?.followers ?? 0).toLocaleString(dateLocale)} />
                      </div>
                      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-[5px] border-brand-blue/20 text-brand-blue">
                        <GitHubLogo className="h-8 w-8" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-brand-text/10 bg-white/50 p-4 md:p-5">
              <div className="w-full max-w-md rounded-xl border border-brand-text/10 bg-white/60 p-5">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <h5 className="text-lg font-bold text-brand-blue">{dict.githubTopLanguages}</h5>
                  {!githubStatsLoading && !githubStatsError && (
                    <span className="text-[10px] text-brand-text/45">{dict.githubLanguageBasis}</span>
                  )}
                </div>
                {githubStatsLoading ? (
                  <p className="py-8 text-center text-sm text-brand-text/55">{dict.githubStatsLoading}</p>
                ) : githubStatsError ? (
                  <p className="py-8 text-center text-sm text-brand-text/55">{dict.githubStatsError}</p>
                ) : !githubLanguagesComplete ? (
                  <p className="py-8 text-center text-sm text-brand-text/55">{dict.githubLanguagesIncomplete}</p>
                ) : languageStats.length === 0 ? (
                  <p className="py-8 text-center text-sm text-brand-text/55">{dict.githubStatsUnavailable}</p>
                ) : (
                  <div className="mt-5 space-y-3">
                    {languageStats.map((language, index) => {
                      const barColors = ["#f97316", "#3b82f6", "#14b8a6", "#a855f7", "#eab308"];
                      return (
                        <div key={language.name}>
                          <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                            <span className="font-medium text-brand-text">{language.name}</span>
                            <span className="text-brand-text/60">{language.percentage.toFixed(1)}%</span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-brand-text/10">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${language.percentage}%`, backgroundColor: barColors[index] }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-5 rounded-2xl border border-brand-text/10 bg-white/50 px-5 py-6 sm:grid-cols-3 sm:items-center md:px-8 md:py-8">
            <div className="text-center sm:text-right">
              <div className="text-3xl font-black text-brand-blue">{contributionData ? contributionStreaks.total.toLocaleString(dateLocale) : "—"}</div>
              <div className="mt-1 text-sm text-brand-blue">{dict.githubTotalContributions}</div>
              <div className="mt-2 text-xs text-brand-text/55">
                {dict.githubActiveSince} {formatShortDate(contributionStreaks.firstContribution)}
              </div>
            </div>

            <div className="flex flex-col items-center border-y border-brand-text/10 py-5 sm:border-x sm:border-y-0 sm:px-6 sm:py-0">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[5px] border-brand-blue text-3xl font-black text-brand-blue">
                <Flame className="absolute -top-3 h-7 w-7 fill-brand-bg text-brand-blue" aria-hidden="true" />
                {contributionData ? contributionStreaks.current : "—"}
              </div>
              <div className="mt-2 text-sm font-bold text-brand-blue">{dict.githubCurrentStreak}</div>
              <div className="mt-1 text-xs text-brand-text/55">{dict.githubDays}</div>
            </div>

            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 text-3xl font-black text-brand-blue sm:justify-start">
                {contributionData ? contributionStreaks.longest : "—"}
                <Trophy className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="mt-1 text-sm text-brand-blue">{dict.githubLongestStreak}</div>
              <div className="mt-2 text-xs text-brand-text/55">
                {formatShortDate(contributionStreaks.longestStart)} — {formatShortDate(contributionStreaks.longestEnd)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll 55s linear infinite;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 55s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  );
}

function GitHubLogo({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.61 1.21 3.25.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.3-2.62 5.25-5.11 5.53.4.35.76 1.03.76 2.08v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

function GitHubMetric({ icon: Icon, label, value }: { icon: typeof Star; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <Icon className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
      <span className="font-bold text-brand-text">{label}</span>
      <span className="text-brand-text/75">{value}</span>
    </div>
  );
}

// Komponen Card dengan Hover Interaktif Baru
function SkillCard({ skill }: { skill: { name: string; img: string } }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.06 }}
      className="group flex items-center gap-3 md:gap-4 px-6 md:px-8 py-4 md:py-5 bg-white/60 backdrop-blur-md border border-brand-text/10 rounded-[24px] shadow-sm hover:shadow-xl hover:border-brand-purple/30 hover:bg-white transition-[box-shadow,border-color,background-color] duration-300"
    >
      
      {/* PERBAIKAN 2: Grayscale dihapus, warna asli selalu tampil */}
      {skill.img && (
        <img
          src={skill.img}
          alt=""
          onError={(event) => { event.currentTarget.style.display = "none"; }}
          className="h-6 w-6 shrink-0 object-contain drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-md md:h-8 md:w-8"
        />
      )}
      
      {/* PERBAIKAN 3: Teks berubah warna saat di-hover */}
      <span className="font-bold text-brand-text group-hover:text-brand-purple text-base md:text-lg whitespace-nowrap transition-colors duration-300">
        {skill.name}
      </span>
      
    </motion.div>
  );
}

