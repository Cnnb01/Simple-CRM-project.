import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import type { Lead, Notes, Reminder } from "../types";

const ViewLead = () => {
    const { id } = useParams<{ id: string }>();
    const [lead, setLead] = useState<Lead | null>(null);
    const [noteContent, setnoteContent] = useState("")
    const [phone, setPhone] = useState("")
    const [remMsg, setRemMsg] = useState("")
    const [remDate, setRemDate] = useState("")
    const [remTime, setRemTime] = useState("")
    

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const resp = await api.get(`leads/${id}/`);
                console.log("DATA FROM BACKEND",resp.data);
                setLead(resp.data);
            } catch (error) {
                console.error("Failed to fetch", error);
            }
        };
        fetchLead();
    }, [id]);

    const handleAddReminder = async(e: React.FormEvent)=>{
        e.preventDefault()
        try {
            const req = await api.post(`leads/reminders/`, {
            message: remMsg,
            date: remDate,
            reminder_time: remTime,
            lead: id
        })
        console.log("reminder data sent to the backeend is: ",req.data)
        if(lead){
            setLead({
                ...lead,
                reminders:[...lead.reminders || [], req.data]
            })
        }
        setRemMsg("")
        setRemDate("")
        setRemTime("")
        } catch (error) {
            console.error("Failed to save reminder:", error)  
 
        }
    }
    if (!lead) return (
        <div className="crm-page-container">
            <div className="animate-pulse text-stone-400 font-medium">Loading Lead Profile...</div>
        </div>
    );
    const handleAddNote = async(e: React.FormEvent)=>{
        e.preventDefault()
        try {
            const req = await api.post(`leads/notes/`, {content:noteContent,lead:id})
            console.log("posted the note",req)
            if(lead){
                setLead({
                    ...lead,
                    notes:[...lead.notes, req.data]
                })
            }
            setnoteContent("")
        } catch (error) {
            console.error("Failed to save note:", error)
        }
        
    }

    const handleAddContact = async(e: React.FormEvent)=>{
        e.preventDefault()
        try {
            const req = await api.post(`leads/contacts/`,{phone_number:phone, lead:id})
            console.log("posted the phone number", req)
            if(lead){
                setLead({
                    ...lead,
                    contacts:[...lead.contacts, req.data]
                })
            }
            setPhone("")
        } catch (error) {
            console.error("Failed to save phone number:", error)  
        }
    }



    return (
        <div className="crm-page-container !justify-start !items-start bg-[#fcfaf7]">
            <div className="max-w-4xl w-full mx-auto mt-10">
                <Link to="/dashboard" className="text-stone-500 hover:text-stone-800 text-sm mb-6 inline-block transition-colors">← Back to Dashboard</Link>

                <div className="crm-card !max-w-none flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
                                {lead.lead_name}
                            </h1>
                            <span className={`crm-tag ${lead.lead_type === 'HOT' ? 'crm-tag-hot' : 'crm-tag-warm'}`}>
                                {lead.lead_type}
                            </span>
                        </div>
                        <p className="text-lg text-stone-500 font-medium">{lead.company_name}</p>
                    </div>

                    <div className="flex gap-3">
                        <button className="px-4 py-2 border border-stone-200 text-stone-600 rounded-md text-sm font-semibold hover:bg-stone-50 transition-all">
                            Edit Profile
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm">
                            <h3 className="crm-label mb-6 border-b border-stone-100 pb-2">Contact Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Email Address</span>
                                    <p className="text-stone-800 font-medium mt-1">{lead.email}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Status</span>
                                    <div className="mt-1">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                            lead.status === 'CLOSED' ? 'bg-green-100 text-green-700' : 'bg-stone-200 text-stone-700'
                                        }`}>
                                            {lead.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* displaying notes */}
                        <div className="space-y-4">
                            <h3 className="crm-label flex items-center gap-2">
                                Notes & Interactions 
                                <span className="bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full text-[10px]">{lead.notes?.length || 0}</span>
                            </h3>
                            
                            <div className="space-y-4">
                                {lead.notes && lead.notes.length > 0 ? (
                                    lead.notes.map((note) => (
                                        <div key={note.id} className="p-5 bg-white border border-stone-100 rounded-lg shadow-sm">
                                            <p className="text-stone-700 text-sm leading-relaxed">{note.content}</p>
                                            <div className="mt-4 flex justify-between items-center border-t border-stone-50 pt-3">
                                                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-tight">
                                                    By {note.created_by}
                                                </span>
                                                <span className="text-[10px] text-stone-300">
                                                    {new Date(note.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 border-2 border-dashed border-stone-100 rounded-lg text-center">
                                        <p className="text-stone-400 italic text-sm">No recorded interactions.</p>
                                    </div>
                                )}
                            </div>

                            {/* add note form */}
                            <div className="bg-stone-50/50 border border-stone-200 rounded-lg p-6 mt-4">
                                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4">Log New Interaction</h4>
                                <form onSubmit={handleAddNote} className="space-y-3">
                                    <textarea 
                                        className="w-full p-4 bg-white border border-stone-200 rounded-md focus:ring-1 focus:ring-stone-400 focus:border-stone-400 outline-none transition-all text-sm text-stone-800 placeholder-stone-400 shadow-sm"
                                        rows={3}
                                        placeholder="What happened during this contact?"
                                        value={noteContent}
                                        onChange={(e) => setnoteContent(e.target.value)}
                                    />
                                    <div className="flex justify-end">
                                        <button type="submit" className="crm-btn-main !w-auto px-8 py-2 text-xs">Save Note</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* display phone_numbers */}
                        <div className="bg-white border border-stone-200 rounded-lg p-6 shadow-sm">
                            <h3 className="crm-label mb-4 border-b border-stone-100 pb-2">Phone Numbers</h3>
                            <div className="space-y-3 mb-6">
                                {lead.contacts && lead.contacts.length > 0 ? (
                                    lead.contacts.map((contact) => (
                                        <div key={contact.id} className="flex items-center gap-3 text-stone-700 bg-stone-50 p-2 rounded border border-stone-100">
                                            <span className="text-xs font-mono">{contact.phone_number}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-stone-400 text-xs italic">No numbers saved.</p>
                                )}
                            </div>

                            {/* add phone_number form */}
                            <form onSubmit={handleAddContact} className="pt-4 border-t border-stone-100">
                                <label className="text-[10px] font-bold text-stone-400 uppercase block mb-2">Add New Number</label>
                                <div className="flex flex-col gap-2">
                                    <input 
                                        type="tel" 
                                        placeholder="+254..." 
                                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-sm focus:outline-none focus:border-stone-400"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <button className="w-full py-2 bg-stone-200 text-stone-700 rounded text-[10px] font-bold uppercase hover:bg-stone-300 transition-colors">
                                        Add Contact
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        {/* reminders display */}

                        {/* adding reminders form */}
                        <form onSubmit={handleAddReminder} className="space-y-3">
                            <textarea 
                                className="w-full p-4 bg-white border border-stone-200 rounded-md focus:ring-1 focus:ring-stone-400 focus:border-stone-400 outline-none transition-all text-sm text-stone-800 placeholder-stone-400 shadow-sm"
                                rows={3}
                                value={remMsg}
                                onChange={(e)=>setRemMsg(e.target.value)}
                                placeholder="type reminder here">
                            </textarea>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                <input 
                                    className="w-full p-2 bg-white border border-stone-200 rounded-md text-sm outline-none focus:border-stone-400 shadow-sm"
                                    type="date"
                                    value={remDate}
                                    onChange={(e)=>setRemDate(e.target.value)}
                                    required/>
                                </div>
                                <div className="flex-1">
                                <input 
                                    className="w-full p-2 bg-white border border-stone-200 rounded-md text-sm outline-none focus:border-stone-400 shadow-sm"
                                    type="time"
                                    value={remTime}
                                    onChange={(e)=>setRemTime(e.target.value)}
                                    required/>
                                </div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <button type="submit" className="crm-btn-main !w-auto px-8 py-2 text-xs">Save Reminder</button>
                            </div>
                        </form>

                        {/* account's extra data */}
                        <div className="bg-stone-800 text-stone-100 rounded-lg p-6 shadow-md">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-stone-400">Account metadata</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] text-stone-500 uppercase font-bold">Assigned To</span>
                                    <p className="text-sm font-medium">{lead.created_by_name || "Unassigned"}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] text-stone-500 uppercase font-bold">Acquisition Date</span>
                                    <p className="text-sm">{new Date(lead.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewLead;