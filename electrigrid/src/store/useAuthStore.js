import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: null,
  role: null, // 'user' | 'admin'

  login: (email, role) => set({
    user: {
      email,
      name: role === 'admin' ? 'Admin — City Operations' : email.split('@')[0],
      avatar: null,
    },
    role,
  }),

  logout: () => set({ user: null, role: null }),
}))

export default useAuthStore
