const getParams = require('./get-params');

const scenarios = [
  {
    description: 'oc-apod',
    parameters: {
      apiKey:
      {
        type: 'string',
        mandatory: true,
        example: 'DEMO_KEY',
        description: 'The NASA Open APIs key'
      }
    }
  },
  {
    description: 'oc-columbus-header',
    parameters: {
      title:
      {
        type: 'string',
        mandatory: true,
        example: 'Instagram',
        description: 'The main title'
      },
      logoUrl:
      {
        type: 'string',
        mandatory: true,
        example: 'http://www.uidownload.com/files/722/15/621/facebook-instagram-instagram-2016-instagram-logo-new-new-instagram-icon.png',
        description: 'The logo\'s absolute url'
      }
    }
  },
  {
    description: 'oc-social-media-buttons',
    parameters: undefined
  },
  {
    description: 'oc-timeago',
    parameters: {
      start:
      {
        type: 'string',
        mandatory: true,
        example: '2016-02-22',
        description: 'The start date as string in a YYYY-MM-DD format'
      },
      end:
      {
        type: 'string',
        mandatory: false,
        example: '2017-02-22',
        description: 'The end date as string in a YYYY-MM-DD format'
      }
    }
  }
];

scenarios.forEach((scenario) => {
  test(scenario.description, () => {
    const component = {
      oc: {
        parameters: scenario.parameters
      }
    };

    const params = getParams(component);
    expect(params).toMatchSnapshot();
  });
});
