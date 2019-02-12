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
