import React from 'react';
import PropTypes from 'prop-types';
import client from '../../graphql-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model,
      registry: {},
      components: [
        {
          allVersions: [],
          author: {},
          repository: {},
          parameters: []
        }
      ]
    };
  }

  componentDidMount() {
    client.query(`
    {
      registry {
        href
        ocVersion
        type
      }
      components {
        name
        description
        version
        allVersions
        author {
          name
          email
        }
        repository {
          type
          url
        }
        parameters {
          key
          type
          mandatory
          example
          description
        }
      }
    }
    `)
      .then((data) => {
        this.setState((state) => {
          const newState = Object.assign({}, state, data);
          return newState;
        });
      });
  }

  render() {
    const { model, registry, components } = this.state;
    /* eslint-disable react/no-array-index-key */
    const rows = components.map((component, index) => (
      <tr key={index}>
        <td>
          <h2>{component.name}</h2>
          <p>{component.description}</p>
          <span>
            <a href={component.repository.url} rel="noopener noreferrer" target="_blank">{component.repository.url}</a>
          </span>
          <h3>Parameters</h3>
          <ul>
            {component.parameters.map(parameter => (
              <li key={parameter.key}>
                {parameter.key} ({parameter.type}|{parameter.mandatory ? 'mandatory' : 'optional'})
              </li>
            ))}
          </ul>
        </td>
        <td>{component.version}</td>
        <td>
          <a href={`mailto:${component.author.email}`}>{component.author.name}</a>
        </td>
      </tr>
    ));
    /* eslint-enable */

    return (
      <div>
        <h1>{model.title}</h1>
        <ul>
          <li>Base url: {registry.href}</li>
          <li>Version: {registry.ocVersion}</li>
          <li>Components: {components.length}</li>
          <li>Components releases: {
            components.reduce(
              (acc, val) => (acc + val.allVersions.length), 0)
          }</li>
          <li>Registry type: {registry.type}</li>
        </ul>
        <div className="table-container">
          <table>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  model: PropTypes.object.isRequired
};

export default App;
