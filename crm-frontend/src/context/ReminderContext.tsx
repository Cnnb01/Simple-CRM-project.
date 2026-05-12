// context(definition of what data is being shared)
// provider(the special component that 'wraps' the entire app, anything inside this wrapper can access the data)
import React,{useState,useEffect,useContext, createContext} from "react";
import api from '../api/axios';
import type { Reminder } from "../types";

//defining what the context looks like
interface ReminderContextType{
    alerts: Reminder[];
    dismissAlert: (id: number) => void
}
// create context object
const ReminderContext = createContext<ReminderContextType | undefined>(undefined);
// creating the provider
export const ReminderProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
    const [alerts, setAlerts] = useState<Reminder[]>([])
    const fetchUnreadRems = async ()=>{
        try {
            const res = await api.get('/leads/unread-reminders')
            if(res.data.length > 0){
                setAlerts(res.data)
            }
        } catch (error) {
            console.error("Failed to polling data", error);
        }
    }
    useEffect(()=>{
        fetchUnreadRems()
        const interval = setInterval(fetchUnreadRems, 30000) // fetch every 30seconds
        return ()=> clearInterval(interval)
    },[])

    const dismissAlert = async(id:number)=>{
        try {
            await api.patch(`leads/reminders/${id}`, {is_acknowledged: true})
            setAlerts(prev=>prev.filter(alert=> alert.id !== id))
        } catch (error) {
            console.error("Failed to dismiss alert:", error)
        }
    }
    return(
        <ReminderContext.Provider value={{alerts, dismissAlert}}>
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