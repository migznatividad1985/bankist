class viewScreen {
  _modal = document.querySelector('.modal');
  _overlay = document.querySelector('.overlay');
  _btnCloseModal = document.querySelector('.btn--close-modal');
  _btnOpenModal = document.querySelectorAll('.btn--show-modal');
  _btnScrollTo = document.querySelector('.btn--scroll-to');
  _section1 = document.querySelector('#section--1');

  // all section reveal
  _allSections = document.querySelectorAll('.section');

  // Tabs
  _tabs = document.querySelectorAll('.operations__tab');
  _tabsContainer = document.querySelector('.operations__tab-container');
  _tabsContent = document.querySelectorAll('.operations__content');

  // Menu and learn more
  _nav = document.querySelector('.nav');

  // sticky navigation
  _header = document.querySelector('.header');
  // lazy image
  _loadImg = document.querySelectorAll('img[data-src]');

  constructor() {
    this._ObserveStickyNav();
    this._ObeserverLazyImg();
    this._sectionRevealHandler();
  }

  // Handler Init
  addHandlerNavigation() {
    const self = this;
    document
      .querySelector('.nav__links')
      .addEventListener('click', function (e) {
        e.preventDefault();
        // const selfAgain = self;
        if (
          e.target.classList.contains('nav__link') &&
          !e.target.classList.contains('nav__link--btn')
        ) {
          const id = e.target.getAttribute('href');
          document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        }
        if (
          e.target.classList.contains('nav__link') &&
          e.target.classList.contains('nav__link--btn')
        )
          self._openModal();
      });

    this._btnScrollTo.addEventListener('click', this.goToSection1.bind(this));

    // lets set the 'this' as the value of 0.5 or 1 using the bind
    this._nav.addEventListener('mouseover', this._handleHover.bind(0.5));
    this._nav.addEventListener('mouseout', this._handleHover.bind(1));
  }

  adHandlerOperaionTab(handler) {
    this._tabsContainer.addEventListener('click', function (e) {
      e.preventDefault();
      const code = e.target.closest('.operations__tab');
      handler(+code.dataset.tab);
    });
  }

  adHandlerShowModal() {
    this._btnCloseModal.addEventListener('click', this._closeModal.bind(this));
    const self = this;
    this._btnOpenModal.forEach(node =>
      node.addEventListener('click', function (e) {
        e.preventDefault();
        self._openModal();
      })
    );
  }

  // NAvigation Function
  _handleHover(e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');

      siblings.forEach(el => {
        if (el !== link) el.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  }

  // sticky navigation

  _ObserveStickyNav() {
    const navHeight = this._nav.getBoundingClientRect().height;
    const self = this;
    const StickyNav = function (entries, headerObserver) {
      const [entry] = entries;

      if (!entry.isIntersecting) self._nav.classList.add('sticky');
      else self._nav.classList.remove('sticky');
    };

    const headerObserver = new IntersectionObserver(StickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`,
    });
    headerObserver.observe(this._header);
  }

  // Section reveal

  _sectionRevealHandler() {
    const revealSection = function (entries, sectionObserver) {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      entry.target.classList.remove('section--hidden');
      sectionObserver.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    this._allSections.forEach(function (section) {
      sectionObserver.observe(section);
      section.classList.add('section--hidden');
    });
  }

  // load image
  _ObeserverLazyImg() {
    self = this;

    const imageLoad = function (entries, imgObserver) {
      const [entry] = entries;
      if (!entry.isIntersecting) return;

      entry.target.src = entry.target.dataset.src;

      entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
      });

      imgObserver.unobserve(entry.target);
    };

    const imgObserver = new IntersectionObserver(imageLoad, {
      root: null,
      threshold: 0,
      rootMargin: `200px`,
    });

    this._loadImg.forEach(function (img) {
      imgObserver.observe(img);
    });
  }

  // Modal Function
  _closeModal() {
    this._modal.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  _openModal() {
    this._modal.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  // Operation Tab
  _generateMarkupOption(state) {
    this._tabs.forEach(t => t.classList.remove('operations__tab--active'));
    this._tabs.forEach(function (node) {
      if (node.dataset.tab === String(state.code))
        node.classList.add('operations__tab--active');
    });

    const svgIcon = function (stateCode) {
      if (stateCode === 1) return 'icon-upload';
      if (stateCode === 2) return 'icon-home';
      if (stateCode === 3) return 'icon-user-x';
    };
    const markup = `
    <div
          class="operations__content operations__content--${
            state.code
          } operations__content--active"
          >
          <div class="operations__icon operations__icon--${state.code}">
            <svg>
              <use xlink:href="./src/img/icons.svg#${svgIcon(
                state.code
              )}"></use>
            </svg>
          </div>
          <h5 class="operations__header">
            ${state.title}
          </h5>
          <p>
            ${state.header}
          </p>
        </div>
    `;

    document.querySelector('.operations_target').innerHTML = null;
    document
      .querySelector('.operations_target')
      .insertAdjacentHTML('afterbegin', markup);
  }

  // Scroll function
  goToSection1() {
    const s1coords = this._section1.getBoundingClientRect();

    console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

    console.log(s1coords.left, s1coords.top);

    window.scrollTo({
      left: s1coords.left + window.pageXOffset,
      top: s1coords.top + window.pageYOffset,
      behavior: 'smooth',
    });
  }
}

export default new viewScreen();
