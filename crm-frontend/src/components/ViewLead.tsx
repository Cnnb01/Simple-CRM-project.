import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import type { Lead, Notes } from "../types";

const ViewLead = () => {
    const { id } = useParams<{ id: string }>();
    const [lead, setLead] = useState<Lead | null>(null);
    

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

    if (!lead) return (
        <div className="crm-page-container">
            <div className="animate-pulse text-stone-400 font-medium">Loading Lead Profile...</div>
        </div>
    );

    return (
        <div className="crm-page-container !justify-start !items-start bg-[#fcfaf7]">
            {/* Navigation Header */}
            <div className="max-w-4xl w-full mx-auto mt-10">
                <Link to="/dashboard" className="text-stone-500 hover:text-stone-800 text-sm mb-6 inline-block transition-colors">
                    ← Back to Dashboard
                </Link>

                <div className="crm-card !max-w-none flex flex-col md:flex-row justify-between items-start gap-6">
                    {/* Primary Info */}
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

                    {/* Action Buttons (Edit/Delete placeholder) */}
                    <div className="flex gap-3">
                        <button className="px-4 py-2 border border-stone-200 text-stone-600 rounded-md text-sm font-semibold hover:bg-stone-50 transition-all">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Detailed Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {/* Contact Details Column */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="crm-card !max-w-none">
                            <h3 className="crm-label mb-4 border-b border-stone-100 pb-2">Contact Information</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <span className="text-xs text-stone-400 uppercase font-bold tracking-widest">Email Address</span>
                                    <p className="text-stone-800 font-medium mt-1">{lead.email}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-stone-400 uppercase font-bold tracking-widest">Current Status</span>
                                    <p className="mt-1">
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                        lead.status === 'CLOSED' ? 'bg-green-100 text-green-700' : 'bg-stone-200 text-stone-700'
                    }`}>
                                            {lead.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Notes display */}
                        <h3 className="crm-label mb-2">Notes & Interactions</h3>
                        <div className="space-y-4">
                            {lead.notes && lead.notes.length > 0 ? (
                                lead.notes.map((note) => (
                                    <div key={note.id} className="p-4 bg-stone-50 rounded-lg border border-stone-100">
                                        <p className="text-stone-800 text-sm">{note.content}</p>
                                        <div className="mt-2 flex justify-between items-center">
                                            <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">
                                                {note.created_by}
                                            </span>
                                            <span className="text-[10px] text-stone-400">
                                                {new Date(note.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ):
                                <div className="crm-card !max-w-none opacity-50 border-dashed">
                                    <p className="text-stone-400 italic text-sm">No notes recorded yet...</p>
                                </div>}
                        </div>    
                    </div>

                    {/* Metadata Sidebar */}
                    <div className="space-y-6">
                        <div className="crm-card !max-w-none bg-stone-50/50">
                            <h3 className="crm-label mb-4">Meta Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Account Owner</span>
                                    <p className="text-stone-700 text-sm font-medium">{lead.created_by_name || "Assigned Agent"}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Created Date</span>
                                    <p className="text-stone-700 text-sm">
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </p>
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