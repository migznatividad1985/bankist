import view from './viewScreen.js';
import * as model from './model.js';
import sliderView from './sliderView.js';

const controlOperationTab = function (targetNumber) {
  model.findOperationDetails(targetNumber);
  view._generateMarkupOption(model.state.operations);
};

const controlSlider = function () {
  model.getResultTestimonial();
  sliderView.renderMarkUp(model.state.testimonial.results);
  sliderView.assignVarSlider();
  sliderView.gotoSlide();
  sliderView.createDots();
  sliderView.activateDots();
  sliderView.activateSliderHandlerBtn();
};

const init = function () {
  view.addHandlerNavigation();
  view.adHandlerShowModal();
  view.adHandlerOperaionTab(controlOperationTab);
  view._ObserveStickyNav();
  controlOperationTab();
  controlSlider();
};

init();
