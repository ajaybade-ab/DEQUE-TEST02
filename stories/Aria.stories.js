export default { title: 'A11y/ARIA' };

// Violations: aria-roles, aria-valid-attr, aria-valid-attr-value, aria-required-attr,
// aria-required-children, aria-required-parent, aria-hidden-focus, aria-allowed-attr,
// aria-command-name, aria-toggle-field-name, aria-progressbar-name, aria-dialog-name
export const Broken = {
  render: () => `
    <div role="buton">Book now</div>
    <button aria-lable="Close">X</button>
    <button aria-expanded="yes">Show details</button>
    <div role="checkbox" tabindex="0">Add travel insurance</div>
    <div role="list"><div>Lisbon</div><div>Porto</div></div>
    <div role="tab">Itinerary</div>
    <div aria-hidden="true"><a href="#">Hidden but focusable link</a></div>
    <a href="#" aria-checked="true">Saved trips</a>
    <div role="button" tabindex="0"></div>
    <div role="switch" aria-checked="false" tabindex="0"></div>
    <div role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
         style="width:200px;height:10px;background:#eee"><div style="width:40%;height:100%;background:#2b6cb0"></div></div>
    <div role="dialog" style="border:1px solid #ccc;padding:12px;margin-top:8px">Your session will expire in 2 minutes.</div>`,
};

export const Fixed = {
  render: () => `
    <button>Book now</button>
    <button aria-label="Close">X</button>
    <button aria-expanded="false">Show details</button>
    <div role="checkbox" aria-checked="false" tabindex="0">Add travel insurance</div>
    <ul><li>Lisbon</li><li>Porto</li></ul>
    <div role="tablist" aria-label="Trip"><button role="tab" aria-selected="true">Itinerary</button></div>
    <div role="switch" aria-checked="false" aria-label="Email alerts" tabindex="0">Email alerts</div>
    <div role="progressbar" aria-label="Booking progress" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"
         style="width:200px;height:10px;background:#eee"><div style="width:40%;height:100%;background:#2b6cb0"></div></div>
    <div role="dialog" aria-label="Session timeout" style="border:1px solid #ccc;padding:12px;margin-top:8px">Your session will expire in 2 minutes.</div>`,
};
