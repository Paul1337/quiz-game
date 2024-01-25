class AuthLocalStore {
    private readonly AUTH_TOKEN_KEY = 'AUTH_TOKEN';

    public getAuthToken() {
        return localStorage.getItem(this.AUTH_TOKEN_KEY);
    }

    public setAuthToken(value: string) {
        localStorage.setItem(this.AUTH_TOKEN_KEY, value);
    }
}

export const authLocalStore = new AuthLocalStore();
