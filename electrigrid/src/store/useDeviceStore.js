import { create } from 'zustand'
import { devices as initialDevices } from '../data/mockData'

const useDeviceStore = create((set, get) => ({
  devices: initialDevices,

  toggleDevice: (id) => set((state) => ({
    devices: state.devices.map((d) =>
      d.id === id ? { ...d, status: d.status === 'on' ? 'off' : 'on' } : d
    ),
  })),

  getTotalWatts: () => {
    return get().devices
      .filter((d) => d.status === 'on')
      .reduce((sum, d) => sum + d.watts, 0)
  },

  getActiveCount: () => {
    return get().devices.filter((d) => d.status === 'on').length
  },
}))

export default useDeviceStore
