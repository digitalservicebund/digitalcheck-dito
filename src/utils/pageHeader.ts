// Matches --breakpoint-section-sidebar. From there on, the header doesn't float,
// as it would cover the sticky section sidebar.
const SECTION_SIDEBAR_MIN_WIDTH = 900;
const SCROLL_THRESHOLD = 4;

/**
 * Alpine.js component for PageHeader.astro.
 * Register with: Alpine.data("pageHeader", pageHeaderData)
 */
export function pageHeaderData() {
  return {
    mobileMenuOpen: false,
    headerFloating: false,
    headerVisible: false,
    lastScrollY: 0,

    init() {
      this.lastScrollY = window.scrollY;
    },

    closeMenus() {
      this.mobileMenuOpen = false;
      this.headerFloating = false;
      this.headerVisible = false;
    },

    setScrollDownProps(currentScrollY: number) {
      this.headerFloating = false;
      this.headerVisible = false;
      this.lastScrollY = currentScrollY;
    },

    /**
     * Below the section sidebar breakpoint, the header scrolls away with the
     * page normally and only becomes a floating bar once the user scrolls
     * back up (see the `.header-floating` styles in PageHeader.astro).
     */
    handleScroll(el: HTMLElement) {
      const currentScrollY = window.scrollY;

      if (
        this.mobileMenuOpen ||
        window.innerWidth >= SECTION_SIDEBAR_MIN_WIDTH
      ) {
        this.lastScrollY = currentScrollY;
        return;
      }

      if (
        currentScrollY <= el.offsetHeight ||
        currentScrollY > this.lastScrollY + SCROLL_THRESHOLD
      ) {
        this.setScrollDownProps(currentScrollY);
      } else if (currentScrollY < this.lastScrollY - SCROLL_THRESHOLD) {
        this.headerFloating = true;
        // Apply the hidden floating state first so the slide-in transitions.
        requestAnimationFrame(() => {
          this.headerVisible = true;
        });
        this.lastScrollY = currentScrollY;
      }
    },
  };
}
