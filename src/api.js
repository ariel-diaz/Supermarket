



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
    get: () => new Promise( ( resolve, reject ) => {
      setTimeout(() => resolve(LIST), 1000);
    }),
    add: (item) => new Promise((resolve, reject) => {
      setTimeout(() => resolve(item), 1000);
    }),
    delete: (id) => new Promise((resolve, reject) => {
      setTimeout(() => resolve(id), 1000);
    }),
};


export default API;