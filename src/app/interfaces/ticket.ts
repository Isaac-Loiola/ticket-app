export interface Ticket {
    id: number;
    code: string;
    type: string;
    status: string;
    sector: string;
    createdAt: string;
    finishedAt?: string;
}
