import { RES_PER_PAGE } from './config.js';

export const state = {
  operations: {},
  testimonial: {
    resultsPerPage: RES_PER_PAGE,
    page: 1,
    results: [],
  },
};

// OPERATION TAB

const operationsList = [
  {
    code: 1,
    title: 'Tranfser money to anyone, instantly! No fees, no BS.',
    header:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut.',
  },
  {
    code: 2,
    title: 'Buy a home or make your dreams come true, with instant loans.',
    header:
      '2 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut. ddadasdadad',
  },
  {
    code: 3,
    title: 'No longer need your account? No problem! Close it instantly.',
    header:
      '3 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex     ea commodo consequat.',
  },
];

export const findOperationDetails = function (targetNumber = 1) {
  const data = operationsList.find(list => list.code === targetNumber);
  state.operations = {
    code: data.code,
    title: data.title,
    header: data.header,
  };
};

// Slider Data
const sliderData = [
  {
    header: `Best financial decision ever!`,
    testimonial:
      '1 Lorem ipsum dolor sit, amet consectetur adipisicing elitAccusantium quas quisquam non? Quas voluptate nulla minima deleniti optio ullam nesciunt, numquam corporis et asperiores laboriosam sunt, praesentium suscipit blanditiis. Necessitatibus id alias reiciendis, perferendis facere pariatur dolore veniam autem esse non voluptatem saepe provident nihil molestiae.',
    author: `Aarav Lynn`,
    location: 'San Francisco, USA',
  },
  {
    header: `The last step to becoming a complete minimalist`,
    testimonial:
      '2 Lorem ipsum dolor sit, amet consectetur adipisicing elitAccusantium quas quisquam non? Quas voluptate nulla minima deleniti optio ullam nesciunt, numquam corporis et asperiores laboriosam sunt, praesentium suscipit blanditiis. Necessitatibus id alias reiciendis, perferendis facere pariatur dolore veniam autem esse non voluptatem saepe provident nihil molestiae.',
    author: `Miyah Miles`,
    location: 'London, UK',
  },
  {
    header: `Finally free from old-school banks`,
    testimonial:
      '3 Lorem ipsum dolor sit, amet consectetur adipisicing elitAccusantium quas quisquam non? Quas voluptate nulla minima deleniti optio ullam nesciunt, numquam corporis et asperiores laboriosam sunt, praesentium suscipit blanditiis. Necessitatibus id alias reiciendis, perferendis facere pariatur dolore veniam autem esse non voluptatem saepe provident nihil molestiae.',
    author: `Francisco Gomes`,
    location: 'Lisbon, Portugal',
  },
];

export const getResultTestimonial = function (page = state.testimonial.page) {
  state.testimonial.page = page;

  const start = (page - 1) * state.testimonial.resultsPerPage; // 0
  const end = page * state.testimonial.resultsPerPage; // 9

  state.testimonial.results = sliderData.slice(start, end);
};
