import {useState} from "react";
import api from "../api/axios";
import type { Lead  } from "../types";
import { useNavigate } from 'react-router-dom';

const AddLead = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Lead>({
        id: 0,
        lead_name: "",
        email: "",
        company_name: "",
        status: "NEW",
        lead_type: "COLD",
        created_by_name: "",
        created_at: "",
        notes: [],
        contacts: [],
        reminders: []
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
      }))  
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const resp = await api.post("leads/", formData)
            navigate("/dashboard")
        } catch (error) {
            console.error("Failed to add lead:", error);
        }
    }
    return (
    <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center p-6">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-0 bg-white rounded-2xl shadow-xl shadow-stone-200/50 overflow-hidden border border-stone-100">
            
            {/* Left Side: Context/Instructional (The "Vibe" side) */}
            <div className="md:col-span-4 bg-stone-600 p-10 flex flex-col justify-between text-stone-50">
                <div><h2 className="text-3xl font-serif tracking-tight mb-4">New Entry</h2></div>
            </div>

            <div className="md:col-span-8 p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="md:col-span-2">
                            <label className="crm-label">Lead Identity</label>
                            <input
                                type="text"
                                name="lead_name" 
                                value={formData.lead_name}
                                onChange={handleChange}
                                className="crm-input !bg-stone-50/50 border-transparent focus:border-stone-200"
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="crm-label">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="crm-input !bg-stone-50/50 border-transparent focus:border-stone-200"
                                placeholder="email@address.com"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="crm-label">Organization</label>
                            <input
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                className="crm-input !bg-stone-50/50 border-transparent focus:border-stone-200"
                                placeholder="Company Ltd"
                                required
                            />
                        </div>

                        <div>
                            <label className="crm-label">Phase</label>
                            <select 
                                name="status" 
                                value={formData.status} 
                                onChange={handleChange}
                                className="crm-input !bg-stone-50/50 border-transparent"
                            >
                                <option value="NEW">New</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="CLOSED">Closed</option>
                            </select>
                        </div>

                        <div>
                            <label className="crm-label">Temperature</label>
                            <select 
                                name="lead_type" 
                                value={formData.lead_type} 
                                onChange={handleChange}
                                className="crm-input !bg-stone-50/50 border-transparent"
                            >
                                <option value="HOT">Hot</option>
                                <option value="WARM">Warm</option>
                                <option value="COLD">Cold</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-6 pt-6 mt-6 border-t border-stone-50">
                        <button 
                            type="button" 
                            onClick={() => navigate(-1)}
                            className="text-stone-400 hover:text-stone-600 text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                            Back
                        </button>
                        <button type="submit" className="crm-btn-main !w-auto px-12 py-3 shadow-lg shadow-stone-200">
                            Register Lead
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}

export default AddLead;