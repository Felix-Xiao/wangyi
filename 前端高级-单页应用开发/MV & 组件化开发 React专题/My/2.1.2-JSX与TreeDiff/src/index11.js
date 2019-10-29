import React, { Component, PureComponent } from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
  render() {
    return (
      <div>
        App111
      </div>
    )
  }
}

class Item extends PureComponent {
  render() {
    return (
      <div>
        {this.props.data}
      </div>
    )
  }

  componentWillMount() {
    console.log(this.props.data, 'will mount')
  }
  componentDidMount() {
    console.log(this.props.data, 'mount')
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.data, 'update')
  }
  componentWillUnmount() {
    console.log(this.props.data, 'unmount')
  }
}

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: ['a', 'b', 'c', 'd']
    }
  }
  render() {
    return (
      <div>
        {this.state.list.map(item => <Item key = {item} data = {item}/>)}
      </div>
    )
  }
  componentDidMount(){
    window.list = this;
  }
}
class App1 extends Component{
  constructor(props){
    super(props)
    this.state = {
      list:[
        'react',
        'vue',
        'angular'
      ]
    }
  }
  render(){
    return(
      <div>
        <List list = {this.state.list}/>
      </div>
    )
  }
}
class Content extends Component {
  render() {
    return (
      <div>
        Content
      </div>
    )
  }
}


var data = ['a','b','c','d']
var data = ['b','c','d']
/*当使用Component时*/
/*
no key
d unmount
index.js:34 b update
index.js:34 c update
index.js:34 d update
 */


/*
has key
a unmount
index.js:34 b update
index.js:34 c update
index.js:34 d update
 */

 /*当使用PureComponent时*/
/*
no key
d unmount
index.js:34 b update
index.js:34 c update
index.js:34 d update
 */


/*
has key
a unmount
 */
ReactDom.render(<List />, document.getElementById('root'));