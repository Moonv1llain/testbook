// ============================================================
// MOON CUTS — SMS TEMPLATES
// Edit the message text. Keep {name}, {service}, {date}, {time}
// as placeholders — they get replaced automatically.
// ============================================================

const SMS_TEMPLATES = {

  // Sent automatically when someone books
  confirmation: (b) =>
    `✦ MOON — you're locked in!\n\n${b.service} · ${b.dateLabel} at ${b.time}\n\nReply CANCEL to cancel (2hr notice pls). See you 🌕`,

  // Sent automatically when barber cancels from dashboard
  cancellation: (b) =>
    `✕ MOON — your ${b.service} on ${b.dateLabel} at ${b.time} has been cancelled.\n\nText us to rebook 🌑`,

  // Reminder (can send manually from dashboard)
  reminder: (b) =>
    `⏰ MOON — heads up ${b.name}!\n\nYour ${b.service} is TOMORROW at ${b.time}.\n\nReply CANCEL if you need to reschedule.`,

  // Running late
  runningLate: (b) =>
    `⌚ MOON — running a few mins behind. Be with you shortly ${b.name}!`,

  // No-show
  noShow: (b) =>
    `👀 MOON — we missed you today ${b.name}. Hit us up to rebook whenever you're ready.`,

  // Custom promo (fill in manually from dashboard)
  promo: () =>
    `★ MOON — special this week. Book your spot: [your link]`,

};