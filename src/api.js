



const LIST = [
    {
      id: 1,
      title: 'Titulo',
    },
    {
      id: 2,
      title: 'Titulo Dos',
    },
    {
      id: 3,
      title: 'Titulo Tres',
    }
  ];


 const API = {
    get: async () => {
      setTimeout(() =>  LIST, 1000);
    },
    add: async (item) => {
      setTimeout(() => item, 1000);
    },
    delete: async (id) => {
      setTimeout(() => id, 1000);
    },
};


export default API;