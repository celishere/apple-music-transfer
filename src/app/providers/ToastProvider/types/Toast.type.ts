export type Toast = {
    id?: string;
    type?: 'success' | 'base' | 'error';
    message: string;
    subtitle?: string;
    icon?: string;
    delay?: number;
    isDeleted?: boolean;
};