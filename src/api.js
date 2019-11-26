const initList = () =>
  (localStorage.getItem('list') && JSON.parse(localStorage.getItem('list'))) || [];

const LIST = initList();

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
