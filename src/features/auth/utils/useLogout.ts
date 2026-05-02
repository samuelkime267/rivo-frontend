import { AUTH_LOGOUT } from "@/data/routes";
import api from "@/lib/api";
import { useAuth } from "@/stores";

export default function useLogout() {
  const { clearUser } = useAuth();

  const logout = async () => {
    try {
      const { data } = await api.post(AUTH_LOGOUT);
      const { success } = data;
      if (!success) {
        throw new Error("Logout failed");
      }
      clearUser();
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return { logout };
}
