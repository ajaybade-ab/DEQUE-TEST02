import { users, bookings, statusColor } from './data.js';

export default { title: 'A11y/Tables' };

// Violations: td-headers-attr, empty-table-header, scope-attr-valid; status conveyed by color only
export const Broken = {
  render: () => `
    <table>
      <tr style="font-weight:bold;background:#f0f0f0">
        <td>Booking ID</td><td>Passenger</td><td>Route</td><td>Date</td><td>Status</td><td>Fare</td>
      </tr>
      ${bookings.map((b) => `<tr><td>${b.id}</td><td>${b.passenger}</td><td>${b.from} → ${b.to}</td><td>${b.date}</td>
        <td><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${statusColor[b.status]}"></span></td>
        <td>$${b.fare}</td></tr>`).join('')}
    </table>
    <table>
      <tr><th id="m-name">Name</th><th id="m-tier">Tier</th><th id="m-points">Points</th></tr>
      ${users.slice(0, 8).map((u) => `<tr><td headers="name">${u.name}</td><td headers="tier">${u.tier}</td><td headers="pts">${u.points}</td></tr>`).join('')}
    </table>
    <table>
      <tr><th></th><th scope="column">Economy</th><th scope="column">Business</th></tr>
      <tr><td>Base fare</td><td>$420</td><td>$1,980</td></tr>
    </table>`,
};

export const Fixed = {
  render: () => `
    <table>
      <caption>Upcoming bookings</caption>
      <thead><tr><th scope="col">Booking ID</th><th scope="col">Passenger</th><th scope="col">Route</th>
        <th scope="col">Date</th><th scope="col">Status</th><th scope="col">Fare</th></tr></thead>
      <tbody>
      ${bookings.map((b) => `<tr><td>${b.id}</td><td>${b.passenger}</td><td>${b.from} to ${b.to}</td><td>${b.date}</td>
        <td>${b.status}</td><td>$${b.fare}</td></tr>`).join('')}
      </tbody>
    </table>`,
};
