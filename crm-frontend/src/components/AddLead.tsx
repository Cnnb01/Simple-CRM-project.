import React, {useState} from "react";
import api from "../api/axios";
import type { Lead, LeadStatus, LeadType  } from "../types";
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
            alert("New lead added successfully!")
            navigate("/dashboard")
        } catch (error) {
            console.error("Failed to add lead:", error);
        }
    }
    return(
        <div className="crm-page-container">
            <div className="crm-card">
                <h2 className="text-2xl font-bold text-stone-800 mb-6">Add New Lead</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="crm-label">Lead Name</label>
                        <input
                            type="text"
                            name="lead_name" 
                            value={formData.lead_name}
                            onChange={handleChange}
                            className="crm-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="crm-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="crm-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="crm-label">Company</label>
                        <input
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            className="crm-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="crm-label">Status</label>
                        <select 
                            name="status" 
                            value={formData.status} 
                            onChange={handleChange} // This works for <select> too!
                            className="crm-input"
                        >
                            <option value="NEW">New</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="CLOSED">Closed</option>
                        </select>
                    </div>
                    <div>
                        <label className="crm-label">Type</label>
                        <select 
                            name="lead_type" 
                            value={formData.lead_type} 
                            onChange={handleChange} // This works for <select> too!
                            className="crm-input"
                        >
                            <option value="HOT">Hot</option>
                            <option value="WARM">Warm</option>
                            <option value="COLD">Cold</option>
                        </select>
                    </div>
                    <button type="submit" className="crm-btn-main mt-4">Save Lead</button>
                </form>
            </div>
        </div>
    )
}

export default AddLead;