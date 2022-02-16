import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import TodoAdd from '../todo-add';
import './app.css';
import TodoApi from "../../services/todo-api";

import Login from "../login";

class App extends React.Component {
    state = {
        todos: [""],
        filter: 'all',
        searchString: '',
    }
    todoApi = new TodoApi()


    onToggleImportant = (id) => {
        this.setState((oldState) => {
            const idx = oldState.todos.findIndex((item) => item.id === id)

            const prev = oldState.todos.slice(0, idx)
            const current = oldState.todos[idx]
            const next = oldState.todos.slice(idx + 1)


            return {
                todos: [
                    ...prev,
                    {...current, important: !current.important},
                    ...next
                ]
            }
        })
    }
    onToggleDone = (id) => {
        this.setState((oldState) => {
            const idx = oldState.todos.findIndex((item) => item.id === id)
            const prev = oldState.todos.slice(0, idx,)
            const current = oldState.todos[idx]
            const next = oldState.todos.slice(idx + 1)
            return {
                todos: [
                    ...prev,
                    {...current, done: !current.done},
                    ...next
                ]
            }
        })
    }

    onToggleFilter = (status) => {
        this.setState({
            filter: status
        })
    }

    onStatusFilter = (todos, status) => {
        if (status === 'active') {
            return todos.filter((item) => item.done === false)
        } else if (status === 'done') {
            return todos.filter((item) => item.done === true)
        } else {
            return todos
        }
    }

    onSearchFilter = (todos, searchString) => {

        return todos.filter((todo) => todo.label.includes(searchString))
    }

    onSearchChange = (searchString) => {
        this.setState({
            searchString: searchString
        })
    }




    onLoadTodos = () => {
        this.todoApi.getTodos().then(todos => {
            this.setState({
                    todos: todos
            })
        })
    }
    onDelete = (id) => {
        this.todoApi.deleteTodo(id).then(data=>{
            this.onLoadTodos()
        })
    }
     addNewTodo = (labelText) => {
        this.todoApi.createTodo(labelText).then(data=>{
            this.onLoadTodos()
        })
    }
    componentDidMount = () => {
        this.onLoadTodos()
    }


    render() {

        const credentials = localStorage.getItem("credentials")


        if (credentials) {
            const filteredTodos = this.onStatusFilter(this.state.todos, this.state.filter);
            const filterBySearchTodos = this.onSearchFilter(filteredTodos, this.state.searchString);

            const doneTodos = this.state.todos.filter((obj) => {
                return (obj.done === true)
            })
            const todo = this.state.todos.filter((obj) => {
                return (obj.done === false)
            })
            return (
                <div className="todo-app">
                    <AppHeader toDo={todo.length} done={doneTodos.length}/>
                    <div className="top-panel d-flex">
                        <SearchPanel onSearchChange={this.onSearchChange}/>

                        <ItemStatusFilter onToggleFilter={this.onToggleFilter} filter={this.state.filter}/>

                    </div>

                    <TodoList
                        onDelete={this.onDelete}
                        onToggleImportant={this.onToggleImportant}
                        onToggleDone={this.onToggleDone}
                        todos={filterBySearchTodos}
                    />
                    <TodoAdd addNewTodo={this.addNewTodo}/>
                </div>
            );
        } else {
            return <Login/>
        }
    }
}

export default App;
