import { useEffect, useState } from "react";
import { Bell, CalendarDays, GraduationCap, ArrowUpRight, CloudSun, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { listRecords } from "../lib/data";
import { studentFilter } from "../lib/studentFields";
import { useAuth } from "../context/AuthContext";
import { firebaseEnabled } from "../lib/firebase";
import { listCourses } from "../lib/courses";

export default function Dashboard() {
  const { user, isAdmin, canManage } = useAuth();
  const [welcomeName, setWelcomeName] = useState("");
  const [stats, setStats] = useState({ students: [], notices: [], events: [], courses: [] });
  const [weather, setWeather] = useState({ status: "loading" });
  useEffect(() => {
    const safe = (type, filter) => listRecords(type, filter).catch(() => []);
    Promise.all([safe("students", studentFilter(canManage, user)), safe("notices"), safe("events"), listCourses(user, canManage).catch(() => [])])
      .then(([students,notices,events,courses]) => {
        setStats({students,notices,events,courses});
        const studentName = !canManage ? students[0]?.name : "";
        setWelcomeName(studentName || user?.name || "there");
      });
  }, [canManage, isAdmin, user]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.open-meteo.com/v1/forecast?latitude=22.3569&longitude=91.7832&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia%2FDhaka", { signal: controller.signal })
      .then(r => { if(!r.ok) throw new Error("Weather service unavailable"); return r.json(); })
      .then(data => setWeather({ status: "ready", temp: data.current.temperature_2m, humidity: data.current.relative_humidity_2m, code: data.current.weather_code }))
      .catch(() => setWeather({ status: "error" }));
    return () => controller.abort();
  }, []);
  const cards = [
    {label:canManage?"Students":"My record",value:stats.students.length,icon:Users,color:"bg-blue-50 text-blue-700",to:"/students"},
    {label:canManage?"All courses":"My courses",value:stats.courses.length,icon:GraduationCap,color:"bg-indigo-50 text-indigo-700",to:"/courses"},
    {label:"Notices",value:stats.notices.length,icon:Bell,color:"bg-amber-50 text-amber-700",to:"/notices"},
    {label:"Events",value:stats.events.length,icon:CalendarDays,color:"bg-violet-50 text-violet-700",to:"/events"},
  ];
  return <section className="space-y-7">
    <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><section><p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-indigo-600">Your campus overview</p><h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Good to see you 👋</h1><p className="mt-1 text-sm text-slate-500">Welcome back, {welcomeName}! Here's what's happening around campus.</p></section><span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">● CampusConnect workspace</span></section>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(({label,value,icon:Icon,color,to})=><Link to={to} key={label}><Card className="transition hover:-translate-y-0.5 hover:shadow-md"><CardContent className="flex items-center justify-between p-5"><section><p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-3xl font-extrabold">{value}</p></section><section className={`grid h-12 w-12 place-items-center rounded-2xl ${color}`}><Icon size={22}/></section></CardContent></Card></Link>)}</section>
    <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <Card><CardHeader><section className="flex items-center justify-between"><CardTitle>Latest notices</CardTitle><Link className="text-xs font-bold text-indigo-600" to="/notices">View all <ArrowUpRight className="inline" size={14}/></Link></section></CardHeader><CardContent className="space-y-3">{stats.notices.slice(0,3).map(n=><section key={n.id} className="rounded-xl bg-slate-50 p-4"><section className="flex items-center justify-between gap-2"><b className="text-sm">{n.title}</b><span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-700">{n.category}</span></section><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{n.body}</p><p className="mt-2 text-[11px] text-slate-400">{n.date}</p></section>)}{!stats.notices.length&&<p className="text-sm text-slate-500">No notices yet.</p>}</CardContent></Card>
      <section className="space-y-5">
        <Card><CardHeader><CardTitle>Chattogram weather</CardTitle></CardHeader><CardContent><section className="flex items-center gap-4"><section className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-50 text-sky-600"><CloudSun size={28}/></section><section>{weather.status==="ready"?<><p className="text-3xl font-extrabold">{weather.temp}°C</p><p className="text-xs text-slate-500">Humidity {weather.humidity}% · Live API</p></>:weather.status==="loading"?<p className="text-sm text-slate-500">Loading weather…</p>:<p className="text-sm text-slate-500">Weather service unavailable. Other features still work.</p>}</section></section></CardContent></Card>
        <Card><CardHeader><CardTitle>Upcoming events</CardTitle></CardHeader><CardContent className="space-y-3">{stats.events.slice(0,3).map(e=><section key={e.id} className="flex gap-3"><section className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-700"><CalendarDays size={18}/></section><section className="min-w-0"><b className="block truncate text-sm">{e.title}</b><p className="text-xs text-slate-500">{e.date} · {e.location}</p></section></section>)}{!stats.events.length&&<p className="text-sm text-slate-500">No events yet.</p>}</CardContent></Card>
      </section>
    </section>
    <section className="rounded-2xl bg-indigo-600 p-5 text-white sm:p-6"><section className="flex items-center gap-3"><GraduationCap size={26}/><section><h2 className="font-bold">One campus. One connected space.</h2><p className="mt-1 text-sm text-indigo-100">Manage notices, discover events and stay up to date.</p></section></section></section>
    <p className="text-xs text-slate-400">Storage: {firebaseEnabled ? "Firebase Cloud Firestore" : "Local demo storage (localStorage)"}</p>
  </section>;
}
