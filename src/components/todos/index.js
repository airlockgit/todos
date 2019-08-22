import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as createActions from '../../actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames/bind';
import styled from './todo.module.scss';

class Todos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            sortType: {
                name: false,
                reverse: false,
            },
        }

        this.cx = classNames.bind(styled)
        this.listTitlesInput = [];
    }

    _handleChange = (e) => {
        let title = e.currentTarget.value;

        this.setState({ title });
    }

    _handleAddTodo = () => {
        if (this.state.title === '') return;

        let newTodo = {
            title: this.state.title,
        };

        this.props.addTodo(newTodo);
        this.setState({ title: '' });
    }

    _handleChecked = (id) => {
        let todo = this.props.todos.find(todo => todo.id === id);
        let checked = todo.checked ? false : true;

        this.props.updateTodo({ id, checked });
    }

    _handleDeleteTodo = (id) => {
        this.props.deleteTodo(id);
    }

    _handleListSort = (type) => {
        switch (type) {
            case 'name':
                let name = this.state.sortType.name ? false : true;

                this.setState({ sortType: { name } })
                break;
            default:
                break;
        }
    }

    _handleEditTitle = (id) => {
        let { target } = this.listTitlesInput.find(todo => todo.id === id);

        target.setAttribute('contentEditable', true);
        target.focus();
    }

    _changeEditTitle = (id, e) => {//and save
        let target = e.currentTarget;
        let title = target.textContent;

        this.props.updateTodo({ id, title });
    }

    sortTodos = (arr) => {
        if (this.state.sortType.name) {//обратный порядок и по заголовку
            arr.sort((a, b) => {
                return a.title === b.title ? 0 : +(a.title < b.title) || -1;
            });
        }

        return arr;
    }

    render() {
        const todos = [...this.props.todos];
        let newTodos = this.sortTodos(todos);

        return (
            <div className={styled.container}>
                <div className={styled.grid}>
                    <div className={styled.gridItem}>
                        <TextField
                            label={this.props.placeholder}
                            value={this.state.title}
                            onChange={this._handleChange}
                            className={styled.input}
                        />
                    </div>
                    <div className={styled.gridItemButton}>
                        <Button variant="outlined" color="primary" className={styled.buttonAdd}
                            onClick={this._handleAddTodo}
                        >
                            Добавить
                        </Button>
                    </div>
                </div>
                <ul className={styled.list}>
                    {
                        todos.length > 1 ?
                            <li
                                className={this.cx({
                                    listItemSort: true,
                                    listItemSort_active: this.state.sortType.name,
                                })}
                                onClick={this._handleListSort.bind(this, 'name')}
                            >Сортировать по имени в обратном порядке</li> : null

                    }
                    {
                        newTodos.map((todo, i) => (
                            <li className={styled.listItem} key={i}>
                                <Checkbox
                                    className={styled.checkbox}
                                    checked={todo.checked}
                                    onChange={this._handleChecked.bind(this, todo.id)}
                                    value="checked"
                                    color="primary"
                                />
                                <div
                                    className={styled.listItemTitle}
                                    onClick={this._changeItemTitle}
                                    onInput={this._changeEditTitle.bind(this, todo.id)}
                                    onBlur={(e) => e.currentTarget.setAttribute('contentEditable', false)}
                                    ref={target => this.listTitlesInput.push({ id: todo.id, target })}
                                >{todo.title}</div>
                                <div
                                    className={styled.listItemEdit}
                                    onClick={this._handleEditTitle.bind(this, todo.id)}
                                ></div>
                                <div
                                    className={styled.listItemClose}
                                    onClick={this._handleDeleteTodo.bind(this, todo.id)}
                                >X</div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = store => ({
    todos: store.todos,
    id: store.id,
});

const mapDispatchToProps = dispatch => ({
    addTodo(todo) {
        dispatch(createActions.addTodo(todo));
    },
    updateTodo(todo) {
        dispatch(createActions.updateTodo(todo));
    },
    deleteTodo(id) {
        dispatch(createActions.deleteTodo(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);