import "babel-polyfill"
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import App from './components/App.jsx';
import Game from './components/Game.jsx';

require('./style.css')

class HelloWorld extends Component{

  render() {
    const players = ['X', 'O'].forEach((id) => {

      return {
        id: {
          rows: [],
          cols: [],
          lDiag: [],
          rDiag: []
        }
      }
    });
    return (
      <App />
    )
  }
}

const content = document.getElementById('app')

ReactDom.render(<HelloWorld/>, content)
