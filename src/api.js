const LIST = [
  {
    id: 1,
    title: 'Titulo'
  },
  {
    id: 2,
    title: 'Titulo Dos'
  },
  {
    id: 3,
    title: 'Titulo Tres'
  }
];

const wait = ms => new Promise(r => setTimeout(r, ms));

const API = {
  get: async () => {
    await wait(500);
    return LIST;
  },
  add: async () => {
    await wait(500);
    return new Date().toISOString();
  },
  delete: async id => {
    await wait(500);
    return id;
  }
};

export default API;
