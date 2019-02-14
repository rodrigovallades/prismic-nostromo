/**
 * Return true for any screensize above a given breakpoint.
 *
 * @param {string|number} breakpoint
 *
 * @returns {boolean}
 */
export function minScreenSize(breakpoint: string | number = 'im'): boolean {
  const width = window.innerWidth;
  const breakpoints = {
    xxxl: 1920,
    xxl: 1440,
    xl: 1280,
    lg: 1024,
    im: 880,
    md: 768,
    is: 600,
    sm: 480,
    ix: 400,
    xs: 320,
  };

  if (typeof breakpoint === 'number') {
    return width >= breakpoint;
  }

  return width >= breakpoints[breakpoint];
}

/**
 * Return true for any screensize below a given breakpoint.
 *
 * @param {string|number} breakpoint
 *
 * @returns {boolean}
 */
export function maxScreenSize(breakpoint: string | number = 'im'): boolean {
  return !minScreenSize(breakpoint);
}

/**
 * Define the optimized width for different viewport sizes
 *
 * @param {number} viewport
 * @returns {number}
 */
export function getImageBreakpoint(viewport: number = window.innerWidth): number {
  let imgWidth = 320;

  if (viewport >= 321 && viewport <= 450) {
    imgWidth = 450;
  }
  else if (viewport >= 451 && viewport <= 800) {
    imgWidth = 800;
  }
  else if (viewport >= 801 && viewport <= 1280) {
    imgWidth = 1280;
  }
  else if (viewport >= 1281 && viewport <= 1680) {
    imgWidth = 1680;
  }
  else if (viewport >= 1681 && viewport <= 1920) {
    imgWidth = 1920;
  }
  else if (viewport > 1920) {
    imgWidth = 2560;
  }

  return imgWidth;
}
