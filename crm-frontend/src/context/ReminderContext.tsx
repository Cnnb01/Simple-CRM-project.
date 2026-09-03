// context(definition of what data is being shared)
// provider(the special component that 'wraps' the entire app, anything inside this wrapper can access the data)
import React,{useState,useEffect,useContext, createContext} from "react";
import api from '../api/axios';
import type { Reminder } from "../types";

//defining what the context looks like
interface ReminderContextType{
    alerts: Reminder[];
    dismissAlert: (id: number) => void
    lastUpdated: number; //add this
}
// create context object
const ReminderContext = createContext<ReminderContextType | undefined>(undefined);
// creating the provider
export const ReminderProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
    const [lastUpdated, setLastUpdated] = useState(0)
    const [alerts, setAlerts] = useState<Reminder[]>([])
    const dismissedIds = React.useRef<Set<number>>(new Set())
    const fetchUnreadRems = async ()=>{
        try {
            const res = await api.get('leads/unread-reminders/')
            const data = Array.isArray(res.data) ? res.data : []
            setAlerts(data.filter((r: Reminder) => !dismissedIds.current.has(r.id)))
            setLastUpdated(Date.now())
        } catch (error) {
            console.error("Failed to polling data", error);
        }
    }
    useEffect(()=>{
        fetchUnreadRems()
        const interval = setInterval(fetchUnreadRems, 10000) // fetch every 10seconds
        return ()=> clearInterval(interval)
    },[])

    const dismissAlert = async(id:number)=>{
        try {
            dismissedIds.current.add(id)
            setAlerts(prev=>prev.filter(alert=> alert.id !== id))
            await api.patch(`leads/reminders/${id}/`, {is_acknowledged: true})
        } catch (error) {
            console.error("Failed to dismiss alert:", error)
        }
    }
    return(
        <ReminderContext.Provider value={{alerts, dismissAlert, lastUpdated}}>
            {children}
        </ReminderContext.Provider>
    )
}
// custom hook
export const useReminders = () => {
    const context = useContext(ReminderContext)
    if(!context) throw new Error("useReminders must be used within a ReminderProvider")
        return context
}