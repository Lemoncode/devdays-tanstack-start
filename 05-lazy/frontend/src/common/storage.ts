interface Storage {
  isAuthenticated: boolean;
  user: string | null;
}

export const storage = {
  get isAuthenticated(): boolean {
    return localStorage.getItem("isAuthenticated") === "true";
  },
  get user(): string | null {
    return localStorage.getItem("user");
  },
  set: (value: Storage) => {
    localStorage.setItem("isAuthenticated", String(value.isAuthenticated));
    localStorage.setItem("user", value.user || "");
  },
};
