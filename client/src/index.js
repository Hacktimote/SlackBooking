/**
 * Created by franciosdelpech on 3/14/16.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  StatusBarIOS,
  View
} from 'react-native';


import RootRouter from './components/RootRouter';

class SlackBooking extends Component {
  render() {
    return (
      <RootRouter />
    );
  }
}

AppRegistry.registerComponent('SlackBooking', () => SlackBooking);


// prerender the app
const { html, style } = AppRegistry.prerenderApplication('SlackBooking', { initialProps })

// construct full page markup
const HtmlShell = (html, style) => (
  <html>
  <head>
    <meta charSet="utf-8" />
    <meta content="initial-scale=1,width=device-width" name="viewport" />
    {style}
  </head>
  <body>
  <div id="react-root" dangerouslySetInnerHTML={{ __html: html }} />
  <script src="http://localhost:8080/webpack-dev-server.js"></script>

  </body>
  </html>
);

React.renderToStaticMarkup(<HtmlShell html={html} style={style} />);


