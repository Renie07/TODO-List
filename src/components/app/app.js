import React, {Component} from 'react';

import AppHeader from '../appHeader';
import SearchPanel from '../searchPanel';
import TodoList from '../todoList';
import ItemStatusFilter from '../itemStatusFilter';
import ItemAddForm from '../itemAddForm';

import './app.css';

class App extends Component {
    constructor() {
        super();

        this.maxId = 100;

        this.state = {
            todoData: [
                {label: 'Learn React', important: false, id: 1, done: false},
                {label: 'Create React App', important: true, id: 2, done: false},
                {label: 'Drink Coffee', important: false, id: 3, done: false}
            ],
            term: '',
            filter: 'all'
        }

        this.deleteItem = (id) => {
            this.setState(({todoData}) => {
                const index = todoData.findIndex((el) => el.id === id);
                const newTodoData = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
                return {
                    todoData: newTodoData
                }
            })
        }

        this.toggleDoneItem = (id) => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'done')
                }
            })
        }

        this.toggleImportant = (id) => {
            this.setState(({todoData}) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'important')
                }
            })
        };

        this.toggleProperty = (arr, id, propName) => {
            const index = arr.findIndex((el) => el.id === id);
            const changedItem = arr[index];
            const newItem = {...changedItem, [propName]: !changedItem[propName]};

            return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
        };

        this.addItem = (labelName) => {
            const newItem = {
                label: labelName,
                important: false,
                id: this.maxId++,
                done: false
            };

            this.setState(({todoData}) => {
                const newTodoData = [...todoData, newItem];
                return {
                    todoData: newTodoData
                }
            })
        }

        this.search = (items, term) => {
            if(term.length === 0) {
                return items;
            }

            return items.filter((item) => {
                return item.label.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1

            });

        };

        this.filter = (items, filter) => {
            switch (filter) {
                case 'all':
                    return items;
                case 'done':
                    return items.filter((item) => {
                        return item.done;
                    });
                case 'active':
                    return items.filter((item) => {
                        return !item.done;
                });
                default:
                    return items;
            }
        };

        this.searchItem = (term) => {
            this.setState({term})
        }

        this.onFilterChange = (filter) => {
            this.setState({filter})
        }


    }
    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(
            this.search(todoData, term), filter);
        const doneCount = visibleItems.filter((el) => el.done).length;
        const todoCount = visibleItems.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader todo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearch={this.searchItem} />
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
                </div>

                <TodoList todos={visibleItems} onDeleted={this.deleteItem} onToggleImportant={this.toggleImportant} onToggleDone={this.toggleDoneItem} />
                <ItemAddForm addItem={this.addItem}/>
            </div>
        );
    }
}

export default App;