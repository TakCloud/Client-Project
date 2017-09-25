export default function () {
  return {
    name: 'Jason Campaign',
    status: 'active',
    lead_groups: '1',
    steps: [
      {
        step_number: '1',
        time_interval: 'Date',
        template: {
          name: 'Best Template',
          subject: 'New offer',
          body: 'We have an offer for you!',
          save: true,
        },
      }, {
        step_number: '2',
        time_interval: 'Date',
        template: {
          name: 'Second Template',
          subject: 'Follow-up Offer',
          body: 'This is another offer',
          save: true,
        },
      },
    ],
    start_date: 'Date(Timestamp)',
  };
}
