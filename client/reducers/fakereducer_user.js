export default function () {
  return {
    user: { id: 12345, name: 'Jason' },
    campaign: [{
      id: 123123,
      name: 'Campaign #1',
      total: 1000,
      delivered: 600,
      opened: 100,
      clicked: 100,
      responded: 50,
      soft: 25,
      hard: 125,
    }, {
      id: 456456,
      name: 'Campaign #2',
      total: 1000,
      delivered: 200,
      opened: 100,
      clicked: 150,
      responded: 50,
      soft: 50,
      hard: 450,
    }, {
      id: 3454356,
      name: 'Campaign #3',
      total: 1000,
      delivered: 300,
      opened: 200,
      clicked: 50,
      responded: 75,
      soft: 175,
      hard: 200,
    }],
    emailList: [{ name: 'VIP', email: ['something@gmail.com', 'hello@codesmith.com'] }],
  };
}
