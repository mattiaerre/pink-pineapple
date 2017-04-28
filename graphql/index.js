/* eslint-disable arrow-body-style */

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const fetch = require('node-fetch');
const urlJoin = require('url-join');

const schema = buildSchema(`
  type Registry {
    baseUrl: String
    version: String
    type: String
  }

  type Component {
    name: String
    description: String
    latestVersion: String
    updated: String
    activity: Int
    state: String
    html: String
  }

  type Query {
    registry: Registry
    components: [Component]
    component(name: String): Component
  }
`);

const fetchComponentInfo = async (baseUrl, name) => {
  const url = `${baseUrl}${name}/~info`;
  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      return {
        name: data.name,
        description: data.description,
        latestVersion: data.version,
        updated: new Date(data.oc.date).toString(),
        activity: data.allVersions.length,
        state: data.oc.state || ''
      };
    });
};

const fetchComponent = async (baseUrl, name) => {
  const url = `${baseUrl}${name}`;
  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      return data;
    });
};

const makeComponent = async (baseUrl, name) => {
  const info = await fetchComponentInfo(baseUrl, name);
  const component = await fetchComponent(baseUrl, name);
  const copy = Object.assign({}, info);
  if (component.error) {
    copy.html = `<span>${component.error}</span>`;
  } else {
    copy.html = component.html;
  }
  return copy;
};

const root = (configuration) => {
  return {
    registry: () => {
      return fetch(configuration.baseUrl)
        .then(response => response.json())
        .then((data) => {
          return {
            baseUrl: data.href,
            version: data.ocVersion,
            type: data.type
          };
        });
    },
    components: async () => {
      return fetch(configuration.baseUrl)
        .then(response => response.json())
        .then((data) => {
          return data.components
            .map((component) => {
              const name = component.replace(configuration.baseUrl, '');
              const url = urlJoin(configuration.baseUrl, configuration.prefix);
              return makeComponent(url, name);
            });
        });
    },
    component: async ({ name }) => {
      return makeComponent(configuration.baseUrl, name);
    }
  };
};

module.exports = (registry, configuration) => {
  registry.app.use(configuration.graphqlUrl, graphqlHTTP({
    schema,
    rootValue: root(configuration),
    graphiql: configuration.discovery,
  }));
};
