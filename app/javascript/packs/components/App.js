import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider, withApollo, Query } from 'react-apollo';
import ApolloClient from "apollo-boost";
import { HashRouter, Route, Switch } from 'react-router-dom'
import store from '../store.js';
import Layout from './Layout';

import { GET_SESSION, GET_THEME } from '../queries';

const client = new ApolloClient({
  uri: '/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      }
    });
  },
  clientState: {
    defaults: {
      theme: 'dark'
    },
    resolvers: {
      Mutation: {
        setTheme: (_, { theme }, { cache }) => {
          cache.writeData({ data: { theme }});
          return null;
        },
      }
    }
  }
});

const makeTheme = (type) => {
  const background = type === 'dark' ? { paper: '#222', default: '#333' } : {};

  return (
    createMuiTheme({
      palette: {
        background,
        type: type
      },
    })
  );
}

class App extends React.Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ loaded: true });
    }

    this.props.client.query({ query: GET_SESSION });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Layout />
      </React.Fragment>
    )
  }
}

const ConnectedApp = withApollo(App);

export default class AppBootstrap extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={GET_THEME}>
          {({ data, loading, error }) => (
            <Provider store={store}>
              <MuiThemeProvider theme={makeTheme(data.theme)}>
                <ConnectedApp />
              </MuiThemeProvider>
            </Provider>
          )}
        </Query>
      </ApolloProvider>
    );
  }
}
