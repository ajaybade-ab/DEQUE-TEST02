import { users } from './data.js';

export default { title: 'A11y/Forms' };

const u = users[0];

// Violations: label, select-name, autocomplete-valid, input-button-name, button-name
export const Broken = {
  render: () => `
    <form>
      <p><input type="text" placeholder="Full name" value="${u.name}"></p>
      <p>Email address<br><input type="email" value="${u.email}"></p>
      <p><label for="phone">Phone</label><br>
        <input id="phone" type="tel" autocomplete="telephone-number" value="${u.phone}"></p>
      <p>From:<br><select><option>New York (JFK)</option><option>Lisbon (LIS)</option></select></p>
      <p><label for="passport">Passport number <span class="error-red">*</span></label><br>
        <input id="passport" type="text"></p>
      <p><input type="checkbox"> I agree to the terms</p>
      <input type="submit" value="">
      <button type="button" style="background:#2b6cb0;border:0;padding:6px"><img src="/assets/icon-search.svg"></button>
    </form>`,
};

export const Fixed = {
  render: () => `
    <form>
      <p><label for="f-name">Full name</label><br>
        <input id="f-name" type="text" autocomplete="name" required value="${u.name}"></p>
      <p><label for="f-email">Email address</label><br>
        <input id="f-email" type="email" autocomplete="email" value="${u.email}"></p>
      <p><label for="f-phone">Phone</label><br>
        <input id="f-phone" type="tel" autocomplete="tel" value="${u.phone}"></p>
      <p><label for="f-from">From</label><br>
        <select id="f-from"><option>New York (JFK)</option><option>Lisbon (LIS)</option></select></p>
      <p><label for="f-passport">Passport number (required)</label><br>
        <input id="f-passport" type="text" required></p>
      <p><input id="f-terms" type="checkbox"><label for="f-terms">I agree to the terms</label></p>
      <input type="submit" value="Book flight">
      <button type="button" aria-label="Search" style="background:#2b6cb0;border:0;padding:6px"><img src="/assets/icon-search.svg" alt=""></button>
    </form>`,
};
