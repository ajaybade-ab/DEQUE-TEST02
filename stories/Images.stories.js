export default { title: 'A11y/Images' };

// Violations: image-alt, svg-img-alt, role-img-alt, input-image-alt, area-alt, object-alt, link-name
export const Broken = {
  render: () => `
    <img src="/assets/photo.svg" width="160">
    <img src="/assets/photo.svg" width="160" alt="photo.svg">
    <p><img src="/assets/banner-text.svg" alt="banner"></p>
    <svg role="img" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" fill="#ffb703"/></svg>
    <div role="img" style="width:120px;height:80px;background:url(/assets/photo.svg) center/cover"></div>
    <form><input type="image" src="/assets/icon-search.svg" style="background:#2b6cb0;padding:6px"></form>
    <img src="/assets/photo.svg" width="300" height="180" usemap="#regions" alt="Regions map">
    <map name="regions">
      <area shape="rect" coords="0,0,150,180" href="#west">
      <area shape="rect" coords="150,0,300,180" href="#east">
    </map>
    <object data="/assets/photo.svg" type="image/svg+xml" width="100"></object>
    <p><a href="#deals"><img src="/assets/photo.svg" width="80"></a></p>`,
};

export const Fixed = {
  render: () => `
    <img src="/assets/photo.svg" width="160" alt="Two blue mountain peaks under a yellow sun">
    <p><img src="/assets/banner-text.svg" alt="50% off all flights today"></p>
    <svg role="img" aria-label="Sun icon" width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" fill="#ffb703"/></svg>
    <form><input type="image" alt="Search" src="/assets/icon-search.svg" style="background:#2b6cb0;padding:6px"></form>
    <p><a href="#deals"><img src="/assets/photo.svg" width="80" alt="View mountain deals"></a></p>
    <img src="/assets/photo.svg" width="40" alt="">`,
};
