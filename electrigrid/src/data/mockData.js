// ─── Mock Energy Consumption Data ─────────────────────────────────────────────

export const dailyConsumption = [
  { time: '12am', kwh: 0.8, cost: 0.12 },
  { time: '2am',  kwh: 0.5, cost: 0.07 },
  { time: '4am',  kwh: 0.4, cost: 0.06 },
  { time: '6am',  kwh: 1.2, cost: 0.18 },
  { time: '8am',  kwh: 2.8, cost: 0.42 },
  { time: '10am', kwh: 3.1, cost: 0.46 },
  { time: '12pm', kwh: 2.6, cost: 0.39 },
  { time: '2pm',  kwh: 3.4, cost: 0.51 },
  { time: '4pm',  kwh: 4.1, cost: 0.61 },
  { time: '6pm',  kwh: 4.8, cost: 0.72 },
  { time: '8pm',  kwh: 3.9, cost: 0.58 },
  { time: '10pm', kwh: 2.1, cost: 0.31 },
]

export const weeklyConsumption = [
  { day: 'Mon', kwh: 22.4, cost: 3.36 },
  { day: 'Tue', kwh: 19.8, cost: 2.97 },
  { day: 'Wed', kwh: 24.1, cost: 3.61 },
  { day: 'Thu', kwh: 21.6, cost: 3.24 },
  { day: 'Fri', kwh: 26.3, cost: 3.94 },
  { day: 'Sat', kwh: 18.9, cost: 2.83 },
  { day: 'Sun', kwh: 17.2, cost: 2.58 },
]

export const devices = [
  { id: 1, name: 'HVAC System',     icon: '❄️',  watts: 3500, status: 'on',  category: 'Climate',  risk: 'high' },
  { id: 2, name: 'EV Charger',      icon: '⚡',  watts: 7200, status: 'off', category: 'Transport',risk: 'high' },
  { id: 3, name: 'Water Heater',    icon: '🔥',  watts: 4500, status: 'on',  category: 'Heating',  risk: 'medium' },
  { id: 4, name: 'Living Room Lights',icon: '💡',watts: 120,  status: 'on',  category: 'Lighting', risk: 'low' },
  { id: 5, name: 'Refrigerator',    icon: '🧊',  watts: 150,  status: 'on',  category: 'Appliance',risk: 'low' },
  { id: 6, name: 'Washing Machine', icon: '🫧',  watts: 2100, status: 'off', category: 'Appliance',risk: 'medium' },
  { id: 7, name: 'Oven / Range',    icon: '🍳',  watts: 2400, status: 'off', category: 'Kitchen',  risk: 'medium' },
  { id: 8, name: 'Office Computers',icon: '💻',  watts: 600,  status: 'on',  category: 'Electronics',risk:'low' },
]

export const aiTips = [
  {
    id: 1,
    message: "I noticed your HVAC is running high during peak hours (4–8 PM). Shifting your cooling schedule by 2 hours could save you approximately 12% this week.",
    saving: '12%',
    device: 'HVAC System',
    priority: 'high',
  },
  {
    id: 2,
    message: "Your EV Charger is set to run during peak rate hours. Scheduling it to charge between midnight and 6 AM could reduce your electricity bill by $18 this month.",
    saving: '$18/mo',
    device: 'EV Charger',
    priority: 'high',
  },
  {
    id: 3,
    message: "Great work! Your water heater usage is 8% below the neighborhood average. Consider installing a smart timer to maintain this efficiency during the winter peak season.",
    saving: '8%',
    device: 'Water Heater',
    priority: 'low',
  },
]

export const neighborhoodData = [
  { id: 'N1', name: 'Northgate', lat: 40.75, lng: -74.00, load: 92, risk: 'critical', households: 1240 },
  { id: 'N2', name: 'Riverside', lat: 40.73, lng: -73.98, load: 78, risk: 'high',     households: 980 },
  { id: 'N3', name: 'Elmwood',   lat: 40.71, lng: -74.02, load: 65, risk: 'moderate', households: 1560 },
  { id: 'N4', name: 'Harborview',lat: 40.69, lng: -73.97, load: 43, risk: 'low',      households: 720 },
  { id: 'N5', name: 'Westfield', lat: 40.74, lng: -74.05, load: 88, risk: 'high',     households: 1100 },
  { id: 'N6', name: 'Clearmont', lat: 40.70, lng: -74.03, load: 31, risk: 'low',      households: 640 },
  { id: 'N7', name: 'Eastpark',  lat: 40.72, lng: -73.95, load: 57, risk: 'moderate', households: 890 },
  { id: 'N8', name: 'Central',   lat: 40.73, lng: -73.99, load: 95, risk: 'critical', households: 2100 },
]

export const blackoutProbabilityTimeline = [
  { time: '6am',  probability: 12 },
  { time: '8am',  probability: 28 },
  { time: '10am', probability: 35 },
  { time: '12pm', probability: 42 },
  { time: '2pm',  probability: 51 },
  { time: '4pm',  probability: 67 },
  { time: '6pm',  probability: 82 },
  { time: '8pm',  probability: 74 },
  { time: '10pm', probability: 58 },
  { time: '12am', probability: 33 },
]

export const gridStats = {
  totalLoad: '4,821 MW',
  capacity: '5,500 MW',
  utilizationPct: 87.7,
  activeUsers: 142380,
  alerts: 3,
}
