import { useState, useEffect } from "react";
import api from "../api/axios";
import type { Lead } from "../types";

const Dashboard: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(()=>{
        const fetchLeads = async () => {
            try {
                const resp = await api.get("leads/")
                console.log("Data from Django:", resp.data);
                setLeads(Array.isArray(resp.data) ? resp.data : resp.data.results);
            } catch (err) {
                console.error("Failed to fetch leads", err)
            } finally{
                setLoading(false)
            }            
        }
        fetchLeads()
    },[])
    if (loading) return <div className="crm-page-container italic text-stone-500">Loading the dashboard...</div>;

    return(
        <div className="min-h-screen bg-[#fcfaf7] p-8">
            <header className="max-w-6xl mx-auto mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-serif text-stone-800">Lead Registry</h1>
                    <p className="text-stone-500 mt-2 italic">Curated relationships and opportunities.</p>
                </div>
                <button className="crm-btn-main !w-auto px-6">Add New Lead</button>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leads.map((lead) => (
                    <div key={lead.id} className="bg-white p-6 rounded-lg border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                                lead.lead_type === 'HOT' ? 'bg-orange-50 text-orange-700' : 'bg-stone-50 text-stone-600'
                            }`}>
                                {lead.lead_type}
                            </span>
                            <p className="text-xs text-stone-400 font-mono">#{lead.id}</p>
                        </div>
                        
                        <h3 className="text-xl font-medium text-stone-800">{lead.lead_name}</h3>
                        <p className="text-sm text-stone-500 mb-4">{lead.company_name}</p>
                        
                        <div className="border-t border-stone-50 pt-4 mt-4 flex justify-between items-center">
                            <p className="text-xs text-stone-400">Agent: {lead.created_by_name}</p>
                            <button className="text-stone-800 text-sm font-semibold hover:underline">View Details</button>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    )

}

export default Dashboard;