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

class App2 extends Component{
  state = {
      num: 1
  }
  render() {
      return (
          <div>
              sss
          </div>
      );
  }
  componentDidUpdate(prevProps, prevState) {
      console.log(this.state.num)
  }
  componentDidMount() {
    debugger
      setTimeout(() => {
          console.log('timeout')
      })
      new Promise((resovle) => {
          console.log('before')
          resovle('then')
          console.log('after')
      }).then(res => {
          console.log(res)
      })
      let {num} = this.state
      this.setState({
          num: ++num
      }, () => {
          console.log('after setState')
      })
      console.log('---')
  }
}
export default App

ReactDom.render(<App2 />, document.getElementById('root'));