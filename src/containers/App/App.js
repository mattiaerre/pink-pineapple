import React from 'react';
import PropTypes from 'prop-types';
import client from '../../graphql-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model,
      registry: {},
      components: [{ activity: 0 }]
    };
  }

  componentDidMount() {
    client.query(`
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
          <h3>{component.name}</h3>
          <p>{component.description}</p>
        </td>
        <td>{component.latestVersion}</td>
        <td>{component.updated}</td>
      </tr>
    ));
    /* eslint-enable */

    return (
      <div>
        <h1>{model.title}</h1>
        <ul>
          <li>Base url: {registry.baseUrl}</li>
          <li>Version: {registry.version}</li>
          <li>Components: {components.length}</li>
          <li>Components releases: {components.reduce((acc, val) => (acc + val.activity), 0)}</li>
          <li>Registry type: {registry.type}</li>
        </ul>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

App.propTypes = {
  model: PropTypes.object.isRequired
};

export default App;
