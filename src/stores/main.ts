import { defineStore } from "pinia";
import { supabase } from "../supabase";

interface DataStoreState {
  customers: any[];
  userName: string | null;
  userEmail: string | undefined;
}
export const useMainStore = defineStore("main", {
  state: (): DataStoreState => ({
    customers: [],
    userName: "Dickson Kibe",
    userEmail: "kibe@presta.com",
  }),
  actions: {
    setUser(payload: { name: string; email: string }) {
      if (payload.name) {
        this.userName = payload.name;
      }
      if (payload.email) {
        this.userEmail = payload.email;
      }
    },
    async fetchData() {
      try {
        const { data, error } = await supabase.from("customers").select("*");
        const { data: user } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        console.log(`clients 2`, data);
        this.customers = data || [];
        this.userEmail = user?.session?.user?.email;
      } catch (error: any) {
        alert(error.message);
      }
    },
  },
});
