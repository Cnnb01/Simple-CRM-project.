import React, {useState, useEffect} from "react";
import type {Lead} from "../types"
import api from "../api/axios"
import {useParams, useNavigate} from "react-router-dom"

const EditLead = () => {
    const [userData, setUserData] = useState<Lead | null>(null)
    const navigate = useNavigate()
    const {id} = useParams<{id:string}>() 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target
        setUserData((prev)=>{
            if(!prev) return null
            return{
                ...prev,
                [name]: value
            }     
        })}

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        console.log("submitted", userData)
        await api.patch(`leads/${id}/`, userData)
        navigate(-1)
        }

    const fetchData = async () => {
        try {
            const resp = await api.get(`leads/${id}/`)
            setUserData(resp.data)
            console.log("returned lead is",resp.data)
        } catch (error) {
            console.error("Error fetching lead data:", error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[id])
    if(!userData) return(
        <div className="animate-pulse text-stone-400 font-medium">Loading Lead Profile...</div>
    )
    return(
    
        <div className="crm-page-container">
            <div className="max-w-2xl w-full">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-serif text-stone-800 tracking-tight mb-2">
                        Updating records for 
                    </h1>
                    <p className="text-stone-500 italic">
                        <span className="font-semibold text-stone-700">{userData.lead_name}</span>
                    </p>
                </div>
                
                    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-sm border border-stone-100 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="md:col-span-2">
                            <label className="crm-label">Full Name</label>
                            <input
                                type="text"
                                name="lead_name"
                                className="crm-input"
                                value={userData.lead_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="crm-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="crm-input"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="crm-label">Company Name</label>
                            <input
                                type="text"
                                name="company_name"
                                className="crm-input"
                                value={userData.company_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="crm-label">Lead Status</label>
                            <select
                                name="status"
                                className="crm-input appearance-none bg-no-repeat bg-right pr-10"
                                value={userData.status}
                                onChange={handleChange}
                            >
                                <option value="NEW">New</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="CLOSED">Closed</option>
                            </select>
                        </div>

                        <div>
                            <label className="crm-label">Lead Type</label>
                            <select
                                name="lead_type"
                                className="crm-input appearance-none"
                                value={userData.lead_type}
                                onChange={handleChange}
                            >
                                <option value="HOT">Hot</option>
                                <option value="WARM">Warm</option>
                                <option value="COLD">Cold</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                        <button 
                            type="button" 
                            onClick={() => navigate(-1)} 
                            className="text-stone-400 hover:text-stone-800 text-sm font-medium transition-colors"
                        >Cancel Changes</button>

                        <button type="submit" className="crm-btn-main !w-auto px-10 py-3 shadow-lg shadow-stone-200">Save Changes</button>
                    </div>
                    </form>
                </div>
            </div>
    )
}
export default EditLead;