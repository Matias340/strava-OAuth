import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

const useStore = create(persist((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setAuthState: (authState) => set({ authState: authState }),
  authState: {isAuthenticated: false},
  activities: [],
  setActivities: (activities) => set({ activities }),
  monthlyStats: [],
  setMonthlyStats: (stats) => set({ monthlyStats: stats }),
}),

{
  name: 'strava-storage', 
  storage: createJSONStorage(() => sessionStorage), 
},

));

export const ZustandStoreProvider = ({ children }) => {
  return <>{children}</>;
};

export {useStore};
