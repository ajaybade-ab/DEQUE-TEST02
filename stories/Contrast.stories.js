export default { title: 'A11y/Contrast' };

// Violations: color-contrast, link-in-text-block
export const Broken = {
  render: () => `
    <p class="low-contrast">Free cancellation within 24 hours of booking.</p>
    <p><span class="light-on-yellow">Limited offer</span></p>
    <p class="tiny-grey">Prices include taxes and fees. Baggage charges may apply.</p>
    <p style="color:#7fa7d9;background:#a9c8ee">Light blue on light blue status message.</p>
    <button style="color:#ccc;background:#eee;border:1px solid #ddd;padding:8px">Continue</button>
    <p style="color:#333">Read our <a href="#" style="color:#555;text-decoration:none">baggage policy</a> before you travel.</p>`,
};

export const Fixed = {
  render: () => `
    <p style="color:#595959">Free cancellation within 24 hours of booking.</p>
    <p><span style="color:#1a1a1a;background:#f5d547;padding:4px 8px">Limited offer</span></p>
    <p style="color:#555;font-size:14px">Prices include taxes and fees. Baggage charges may apply.</p>
    <button style="color:#fff;background:#2b6cb0;border:0;padding:8px">Continue</button>
    <p>Read our <a href="#">baggage policy</a> before you travel.</p>`,
};
