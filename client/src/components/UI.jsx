import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Star } from "lucide-react";

const spring = { type: "spring", stiffness: 240, damping: 22 };

export function PageTitle({ eyebrow, title, subtitle, action }) {
  return (
    <motion.section initial={{ opacity: 0, y: 18, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={spring} className="mb-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          {eyebrow && <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.24em] text-clinic-700 dark:text-cyan-300">{eyebrow}</p>}
          <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-clinic-950 dark:text-white sm:text-5xl">{title}</h2>
          {subtitle && <p className="mt-3 max-w-3xl text-base font-semibold text-slate-600 dark:text-slate-300">{subtitle}</p>}
        </div>
        {action}
      </div>
    </motion.section>
  );
}

export function StatCard({ icon: Icon, label, value, note }) {
  return (
    <motion.div whileHover={{ y: -7, scale: 1.015 }} whileTap={{ scale: 0.985 }} transition={spring} className="glass premium-card rounded-[1.7rem] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="pulse-ring grid h-12 w-12 place-items-center rounded-2xl bg-clinic-950 text-white dark:bg-cyan-300 dark:text-clinic-950">
          <Icon size={21} />
        </div>
        <Star className="text-amber-400" size={18} />
      </div>
      <p className="text-3xl font-black">{value}</p>
      <p className="font-extrabold text-slate-600 dark:text-slate-300">{label}</p>
      {note && <p className="mt-2 text-sm font-semibold text-slate-500">{note}</p>}
    </motion.div>
  );
}

export function TopicCard({ topic, completed, bookmarked }) {
  return (
    <motion.div whileHover={{ y: -8, rotateX: 1.5, rotateY: -1.5 }} whileTap={{ scale: 0.985 }} transition={spring} className="glass premium-card rounded-[1.6rem] p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-clinic-700 dark:text-cyan-300">{topic.subjectName}</p>
          <h3 className="mt-1 font-display text-xl font-extrabold">{topic.title}</h3>
        </div>
        {completed && <CheckCircle2 className="shrink-0 text-emerald-500" />}
      </div>
      <p className="line-clamp-2 text-sm font-semibold text-slate-600 dark:text-slate-300">{topic.summary}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 shadow-sm dark:bg-white/10 dark:text-slate-300">
          <Clock size={14} />
          {topic.duration} min
        </span>
        <Link to={`/topic/${topic.id}`} className="group flex items-center gap-1 font-extrabold text-clinic-700 dark:text-cyan-300">
          Study <ArrowRight size={16} />
        </Link>
      </div>
      {bookmarked && <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-amber-500">Bookmarked</p>}
    </motion.div>
  );
}

export function Pill({ children }) {
  return <span className="rounded-full bg-clinic-100 px-3 py-1 text-xs font-black text-clinic-700 dark:bg-white/10 dark:text-cyan-200">{children}</span>;
}

export function SectionCard({ title, children, className = "" }) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={spring} className={`glass premium-card rounded-[1.7rem] p-5 ${className}`}>
      <h3 className="mb-4 font-display text-xl font-extrabold">{title}</h3>
      {children}
    </motion.section>
  );
}
