export default { title: 'A11y/Structure' };

// Violations: empty-heading, heading-order, list, listitem, definition-list, duplicate-id,
// frame-title, valid-lang, marquee, nested-interactive, scrollable-region-focusable, tabindex
export const Broken = {
  render: () => `
    <h2>Travel guide</h2>
    <h5>Packing tips</h5>
    <h3></h3>
    <ul><div>Passport</div><li>Boarding pass</li></ul>
    <div><li>Orphan list item</li></div>
    <dl><dt>Layover</dt><p>A stop between flights.</p></dl>
    <p id="dup">First</p><p id="dup">Second</p>
    <iframe srcdoc="<p>Embedded</p>" width="200" height="60"></iframe>
    <p lang="xx-fake">Bon voyage!</p>
    <marquee>Flash sale ends at midnight!</marquee>
    <button><a href="#">Link inside button</a></button>
    <p><a href="#" tabindex="3">Third</a> <a href="#" tabindex="1">First</a></p>
    <div style="height:60px;overflow:auto;border:1px solid #ccc;width:260px">
      <p>Terms line 1.</p><p>Line 2.</p><p>Line 3.</p><p>Line 4.</p>
    </div>`,
};

export const Fixed = {
  render: () => `
    <h2>Travel guide</h2>
    <h3>Packing tips</h3>
    <ul><li>Passport</li><li>Boarding pass</li></ul>
    <dl><dt>Layover</dt><dd>A stop between flights.</dd></dl>
    <iframe title="Embedded note" srcdoc="<p>Embedded</p>" width="200" height="60"></iframe>
    <p lang="fr">Bon voyage !</p>
    <p><a href="#">First</a> <a href="#">Second</a></p>
    <div tabindex="0" role="region" aria-label="Terms and conditions"
         style="height:60px;overflow:auto;border:1px solid #ccc;width:260px">
      <p>Terms line 1.</p><p>Line 2.</p><p>Line 3.</p><p>Line 4.</p>
    </div>`,
};
