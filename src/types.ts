export type Navigation = {
    navigate: (scene: string, params?: {}) => void;
    goBack: () => void;
};

export type User = {
    user_id?: number,
    parent_id?: number
    email_address: string,
    password?: string,
    first_name?: string,
    last_name?: string,
    address?: string,
    phone_number?: string,
    role?: string
};