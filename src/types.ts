export type Navigation = {
    navigate: (scene: string) => void;
};

export type User = {
    email_address: string,
    password?: string,
    first_name: string,
    last_name: string,
    address: string,
    phone_number: string,
    role?: string
}