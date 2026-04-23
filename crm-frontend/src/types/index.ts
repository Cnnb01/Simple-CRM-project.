export type Role = 'MANAGER' | 'AGENT'
export type LeadStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED'
export type LeadType = 'HOT' | 'WARM' | 'COLD'

export interface User {
    id:number
    username: string;
    role: Role;
}

export interface Lead {
    id: number;
    lead_name: string;
    email: string;
    company_name: string;
    status: string;
    lead_type: string;
    created_by_name: string
    created_at: string;
}

export interface Notes {
    id: number;
    content: string;
    lead_id: number;
    created_by: string;
    created_at: string;
}

export interface Contact {
    id: number;
    phone_number: string;
    lead_id: number;
    created_by: string;
    created_at: string;
}

export interface Reminder {
    id: number;
    message: string;
    lead_id: number;
    created_by: string;
    reminder_time: string;
    is_sent: boolean;
}