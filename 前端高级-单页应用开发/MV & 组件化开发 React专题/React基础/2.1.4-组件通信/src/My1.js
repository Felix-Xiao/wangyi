import React, { Component } from 'react';
import './App.css';

class Action extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    render() {
        return (
            <div>
                <input value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                <button onClick={() => {
                    this.props.onAdd(this.state.value)
                    this.setState({
                        value: ''
                    })
                }}>提交</button>
            </div>
        )
    }
}

class List extends Component {
    render() {
        return (
            <div>
                {this.props.data.map(item => <p key={item.id}> {item.name} </p>)}
            </div>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'a', id: 0 },
                { name: 'b', id: 1 },
                { name: 'c', id: 2 }
            ],
            value: ''
        }
    }
    render() {
        return (
            <div>
                <List data={this.state.data} />
                <Action onAdd={(name) => {
                    let data = this.state.data;
                    data.push({
                        name,
                        id: name
                    })
                    this.setState({ data: data })
                }} />
            </div>
        );
    }
}

export default App;