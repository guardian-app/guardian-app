export const emailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/;

    if (!email || email.length <= 0) return 'Email cannot be empty.';
    if (!re.test(email)) return 'Ooops! We need a valid email address.';

    return '';
};

export const passwordValidator = (password: string) => {
    if (!password || password.length <= 0) return 'Password cannot be empty.';

    return '';
};

export const confirmPasswordValidator = (password: string, confirmPassword: string) => {
    if (!confirmPassword || confirmPassword.length <= 0 || password !== confirmPassword) return 'Passwords do not match.';

    return '';
};

export const nameValidator = (name: string, section: string) => {
    if (!name || name.length <= 0) return `${section} name cannot be empty.`;

    return '';
};

export const addressValidator = (address: string) => {
    if (!address || address.length <= 0 || !address.match(/^[A-z0-9]+\s[A-z0-9]+/g)) return 'Address seems to be invalid.';

    return '';
};

export const resetCodeValidator = (code: string) => {
    if (!code || code.length <= 0) return 'Reset code seems to be invalid.';

    return '';
};

export const phoneValidator = (phone: string) => {
    const re = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/;

    if (!phone || phone.length <= 0) return 'Phone number cannot be empty.';
    if (!re.test(phone)) return 'We need a valid phone number.';

    return '';
};