import React from "react";
import TodoApi from "../../services/todo-api";

class Login extends React.Component {
    state = {
        username: "",
        password: "",
    }

    todoApi = new TodoApi()


    onSubmit = (event) => {
        event.preventDefault()
        this.todoApi.login(
            this.state.username,
            this.state.password,
    )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="nb-3">
                        <label className="form-label">Username</label>
                        <input
                            value={this.state.username}
                            onChange={event => this.setState({username: event.target.value})}
                            type="text"
                            className="form-control"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            />
                    </div>
                    <div className="nb-3">
                        <label className="form-label">Password</label>
                        <input
                            value={this.state.password}
                            onChange={event => this.setState({password: event.target.value})}
                            className="form-control"
                            type="password"
                            id="exampleInputPassword"
                        />
                    </div>
                    <button type="submit" className="add-button"> Submit</button>
                </form>
            </div>
        )
    }
}

export default Login