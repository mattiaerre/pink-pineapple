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
  }

  type Query {
    registry: Registry
    components: [Component]
    component(name: String): Component
  }
`);

const fetchComponentInfo = (baseUrl, name) => {
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
    components: () => {
      return fetch(configuration.baseUrl)
        .then(response => response.json())
        .then((data) => {
          return data.components
            .map((component) => {
              const name = component.replace(configuration.baseUrl, '');
              const url = urlJoin(configuration.baseUrl, configuration.prefix);
              return fetchComponentInfo(url, name);
            });
        });
    },
    component: ({ name }) => {
      return fetchComponentInfo(configuration.baseUrl, name);
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

// GET http://127.0.0.1:3000
// GET http://127.0.0.1:3000/oc-apod/~info

/*
{
  registry {
    baseUrl
    version
    type
  }
  components {
    name
    description
    latestVersion
    updated
    activity
    state
  }
}
*/
