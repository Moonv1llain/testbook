// ============================================================
// MOON CUTS — SERVICES
// Edit this file to change services, prices, and durations
// ============================================================

const SERVICES = [
  { id: 'fade',    name: 'FADE',      price: '$35', priceNum: 35, dur: '45min' },
  { id: 'cut',     name: 'FULL CUT',  price: '$45', priceNum: 45, dur: '60min' },
  { id: 'lineup',  name: 'LINE UP',   price: '$25', priceNum: 25, dur: '30min' },
  { id: 'beard',   name: 'BEARD',     price: '$20', priceNum: 20, dur: '20min' },
  { id: 'shave',   name: 'HOT SHAVE', price: '$40', priceNum: 40, dur: '45min' },
  { id: 'kids',    name: 'KIDS CUT',  price: '$30', priceNum: 30, dur: '45min' },
];

// Time slots — every 30 min, 9am–5:30pm
const TIMES = [
  '9:00 AM',  '9:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '1:00 PM',  '1:30 PM',
  '2:00 PM',  '2:30 PM',
  '3:00 PM',  '3:30 PM',
  '4:00 PM',  '4:30 PM',
  '5:00 PM',  '5:30 PM',
];