import api from "@/lib/api";
import { useAuth } from "@/stores";

export default function useLogout() {
  const { clearUser } = useAuth();

  const logout = async () => {
    try {
      const { data } = await api.post("/auth/logout");
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
