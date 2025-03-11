class SliderView {
  _parentElement = document.querySelector('.slider');

  _slides = document.querySelectorAll('.slide');
  _btnLeft = document.querySelector('.slider__btn--left');
  _btnRight = document.querySelector('.slider__btn--right');
  _dotContainer = document.querySelector('.dots');

  _curSlide = 0;
  _maxSlide = this._slides.length;

  renderMarkUp(arrTestimonial) {
    const markup = arrTestimonial
      .map(function (testimonial, index) {
        const textComp = `<div class="slide">
            <div class="testimonial">
              <h5 class="testimonial__header">${testimonial.header}</h5>
              <blockquote class="testimonial__text">
                ${testimonial.testimonial}
              </blockquote>
              <address class="testimonial__author">
                <img src="./src/img/user-${
                  index + 1
                }.jpg" alt="" class="testimonial__photo" />
                <h6 class="testimonial__name">${testimonial.author}</h6>
                <p class="testimonial__location">${testimonial.location}</p>
              </address>
              </div>
            </div>`;
        return textComp;
      })
      .join(' ');

    const markupBtn = `
      <button class="slider__btn slider__btn--left">&larr;</button>
      <button class="slider__btn slider__btn--right">&rarr;</button>
      <div class="dots"></div>
      `;

    this._parentElement.innerHTML = null;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    this._parentElement.insertAdjacentHTML('beforeend', markupBtn);
  }

  assignVarSlider() {
    this._slides = document.querySelectorAll('.slide');

    this._btnLeft = document.querySelector('.slider__btn--left');
    this._btnRight = document.querySelector('.slider__btn--right');
    this._dotContainer = document.querySelector('.dots');

    this._maxSlide = this._slides.length;
  }

  // define variables

  createDots() {
    this._slides.forEach(function (_, i) {
      document
        .querySelector('.dots')
        .insertAdjacentHTML(
          'beforeend',
          `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
  }

  activateDots(slide = 0) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"`)
      .classList.add('dots__dot--active');
  }

  gotoSlide(slide = 0) {
    this._slides.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }

  // Next Slide
  _nextSlide() {
    self = this;

    if (self._curSlide === self._maxSlide - 1) {
      self._curSlide = 0;
    } else {
      self._curSlide++;
    }
    console.log(self._curSlide);
    self.gotoSlide(self._curSlide);
    self.activateDots(self._curSlide);
  }

  _prevSlide() {
    console.log(this._maxSlide);
    console.log(this._curSlide);
    self = this;
    if (self._curSlide === 0) {
      self._curSlide = self._maxSlide - 1;
    } else {
      self._curSlide--;
    }

    self.gotoSlide(self._curSlide);
    self.activateDots(self._curSlide);
  }

  activateSliderHandlerBtn() {
    self = this;
    this._btnLeft.addEventListener('click', this._prevSlide.bind(this));
    this._btnRight.addEventListener('click', this._nextSlide.bind(this));

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') self._prevSlide();
      if (e.key === 'ArrowRight') self._nextSlide();
    });

    this._dotContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        self.gotoSlide(slide);
        self.activateDots(slide);
      }
    });
  }
}

export default new SliderView();
