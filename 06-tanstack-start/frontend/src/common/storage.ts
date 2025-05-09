interface Storage {
  isAuthenticated: boolean;
  user: string | null;
}

export const storage = {
  get isAuthenticated(): boolean {
    if (typeof window === "undefined") {
      return false;
    }
    return localStorage.getItem("isAuthenticated") === "true";
  },
  get user(): string | null {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem("user");
  },
  set: (value: Storage) => {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem("isAuthenticated", String(value.isAuthenticated));
    localStorage.setItem("user", value.user || "");
  },
};
