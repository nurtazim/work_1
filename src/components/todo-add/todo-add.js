import React from 'react';

import './todoAdd.css';


class TodoAdd extends React.Component {
    state = {
        label: ''
    }

    onValueChange = (text) => {
        this.setState({
            label: text.toLowerCase()
        })
    }

    onAddNewTodo = (event) => {

        event.preventDefault();
        if (this.state.label === "") {
            alert("заполните форму")
        }

        else {
            this.props.addNewTodo(this.state.label)
            this.state.label = "";
        }

    }


    render() {
        return (
            <div>
                <form className={"form-control form"} onSubmit={this.onAddNewTodo}>
                    <input
                        className="form-control add-input"
                        onChange={(event) => this.onValueChange(event.target.value)}
                        value={this.state.label}
                        type='text'
                        placeholder='Feel the todo'
                    />
                    <input type='submit' value='Add' className="form-control add-button"/>
                </form>
            </div>
        )
    }
}

export default TodoAdd;
