import { useEffect, useState } from "react";
import { Mail, Plus, Trash2, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { addStaffEmail, listStaffEmails, removeStaffEmail } from "../lib/data";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function Staff() {
  const { isAdmin } = useAuth();
  const [rows, setRows] = useState([]); const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  async function load() { try { setRows(await listStaffEmails()); } catch (e) { setError(e.message || "Could not load staff."); } }
  useEffect(() => { load(); }, []);
  async function add(e) { e.preventDefault(); setError(""); setBusy(true); try { await addStaffEmail(email, name); setEmail(""); setName(""); await load(); } catch (e) { setError(e.message || "Could not add staff."); } finally { setBusy(false); } }
  async function remove(row) { if (!window.confirm(`Remove ${row.email} from staff access?`)) return; try { await removeStaffEmail(row.email); await load(); } catch (e) { setError(e.message || "Could not remove staff."); } }
  if (!isAdmin) return <p className="text-sm text-slate-500">Only the admin can manage staff access.</p>;
  return <section className="space-y-6"><header><p className="mb-2 text-xs font-bold uppercase tracking-[.16em] text-indigo-600">Campus workspace</p><h1 className="text-3xl font-extrabold text-slate-900">Staff</h1><p className="mt-1 text-sm text-slate-500">Add staff by email. Staff can manage campus records but cannot manage staff access.</p></header>
    {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
    <Card><CardHeader><CardTitle>Add staff member</CardTitle></CardHeader><CardContent><form onSubmit={add} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"><input className="form-control" placeholder="Staff name" value={name} onChange={e=>setName(e.target.value)} required/><input className="form-control" type="email" placeholder="Staff email" value={email} onChange={e=>setEmail(e.target.value)} required/><Button type="submit" disabled={busy}><Plus size={16}/> Add staff</Button></form></CardContent></Card>
    <Card><CardHeader><CardTitle>Staff list <span className="ml-2 text-xs font-normal text-slate-400">{rows.length} staff</span></CardTitle></CardHeader><CardContent className="divide-y divide-slate-100 p-0">{rows.length ? rows.map(row=><div key={row.email} className="flex items-center justify-between gap-3 px-5 py-4"><div className="flex min-w-0 items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><UserRound size={18}/></span><div className="min-w-0"><p className="font-semibold text-slate-800">{row.name || "Staff member"}</p><p className="flex items-center gap-1 truncate text-sm text-slate-500"><Mail size={13}/>{row.email}</p></div></div><Button variant="ghost" size="icon" aria-label="Remove staff" onClick={()=>remove(row)}><Trash2 size={16} className="text-rose-600"/></Button></div>) : <p className="p-5 text-sm text-slate-500">No staff members added yet.</p>}</CardContent></Card>
  </section>;
}
