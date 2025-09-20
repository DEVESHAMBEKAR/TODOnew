/**
 * =====================================================
 * JAVASCRIPT COMPONENT LIBRARY FOR TODO APPLICATION
 * =====================================================
 * 
 * Modern JavaScript ES6+ components for React/Vanilla JS
 * Language: JavaScript/JSX
 * Framework: React + JavaScript
 * Purpose: Reusable UI components written in JavaScript
 */

// ============================================
// JAVASCRIPT REACT COMPONENT: TodoItem
// ============================================

/**
 * TodoItem React Component (JavaScript/JSX)
 * Renders a single todo item with JavaScript event handlers
 */
const TodoItem = ({
    todo,
    isEditing,
    editText,
    onEdit,
    onSave,
    onCancel,
    onDelete,
    onToggleStatus,
    onEditTextChange
}) => {
    // JavaScript event handlers
    const handleEditClick = () => {
        console.log('🖊️ JavaScript: Starting edit mode for todo:', todo._id);
        onEdit(todo._id, todo.task);
    };

    const handleSaveClick = () => {
        console.log('💾 JavaScript: Saving todo changes:', todo._id);
        onSave(todo._id);
    };

    const handleCancelClick = () => {
        console.log('❌ JavaScript: Cancelling todo edit:', todo._id);
        onCancel();
    };

    const handleDeleteClick = () => {
        console.log('🗑️ JavaScript: Deleting todo:', todo._id);
        if (window.confirm(`Delete "${todo.task}"?`)) {
            onDelete(todo._id);
        }
    };

    const handleStatusToggle = () => {
        console.log('🔄 JavaScript: Toggling todo status:', todo._id);
        onToggleStatus(todo._id, todo.status);
    };

    const handleTextChange = (event) => {
        onEditTextChange(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSaveClick();
        } else if (event.key === 'Escape') {
            handleCancelClick();
        }
    };

    // JavaScript JSX rendering
    return (
        <li className="todo-item" data-todo-id={todo._id} data-language="javascript">
            {isEditing ? (
                <div className="todo-edit-mode">
                    <input
                        type="text"
                        value={editText}
                        onChange={handleTextChange}
                        onKeyDown={handleKeyPress}
                        className="todo-edit-input"
                        autoFocus
                        placeholder="Edit todo (JavaScript)"
                    />
                    <div className="todo-edit-actions">
                        <button 
                            onClick={handleSaveClick}
                            className="btn btn-save"
                            title="Save changes (JavaScript)"
                        >
                            💾 Save
                        </button>
                        <button 
                            onClick={handleCancelClick}
                            className="btn btn-cancel"
                            title="Cancel editing (JavaScript)"
                        >
                            ❌ Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="todo-display-mode">
                    <div className="todo-content">
                        <span 
                            className={`todo-text ${todo.status === 'done' ? 'completed' : ''}`}
                            title={`Task created with JavaScript: ${todo.task}`}
                        >
                            {todo.task}
                        </span>
                        <span className="todo-status-badge" data-status={todo.status}>
                            {todo.status === 'done' ? '✅ Done' : '⏳ Pending'}
                        </span>
                    </div>
                    <div className="todo-actions">
                        <button 
                            onClick={handleEditClick}
                            className="btn btn-edit"
                            title="Edit todo (JavaScript)"
                        >
                            ✏️ Edit
                        </button>
                        <button 
                            onClick={handleStatusToggle}
                            className={`btn btn-toggle ${todo.status === 'done' ? 'btn-mark-pending' : 'btn-mark-done'}`}
                            title={`Mark as ${todo.status === 'done' ? 'Pending' : 'Done'} (JavaScript)`}
                        >
                            {todo.status === 'done' ? '↩️ Pending' : '✅ Done'}
                        </button>
                        <button 
                            onClick={handleDeleteClick}
                            className="btn btn-delete"
                            title="Delete todo (JavaScript)"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
};

// ============================================
// JAVASCRIPT REACT COMPONENT: TodoList
// ============================================

/**
 * TodoList React Component (JavaScript/JSX)
 * Renders a list of todos with JavaScript filtering and sorting
 */
const TodoList = ({ 
    todos = [], 
    filter = 'all', 
    sortBy = 'date',
    editingId = null,
    editText = '',
    onEdit,
    onSave,
    onCancel,
    onDelete,
    onToggleStatus,
    onEditTextChange
}) => {
    // JavaScript filtering logic
    const filteredTodos = todos.filter(todo => {
        switch (filter) {
            case 'pending':
                return todo.status === 'pending';
            case 'done':
                return todo.status === 'done';
            case 'all':
            default:
                return true;
        }
    });

    // JavaScript sorting logic
    const sortedTodos = [...filteredTodos].sort((a, b) => {
        switch (sortBy) {
            case 'alphabetical':
                return a.task.toLowerCase().localeCompare(b.task.toLowerCase());
            case 'status':
                if (a.status === 'pending' && b.status === 'done') return -1;
                if (a.status === 'done' && b.status === 'pending') return 1;
                return 0;
            case 'date':
            default:
                return new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id);
        }
    });

    // JavaScript statistics
    const statistics = {
        total: todos.length,
        pending: todos.filter(t => t.status === 'pending').length,
        completed: todos.filter(t => t.status === 'done').length,
        filtered: sortedTodos.length
    };

    console.log('📋 JavaScript: Rendering TodoList with', statistics);

    // JavaScript JSX rendering
    return (
        <div className="todo-list-container" data-language="javascript">
            <div className="todo-list-header">
                <h3>📝 Todo List (JavaScript/React)</h3>
                <div className="todo-statistics">
                    <span className="stat-item">
                        📊 Total: {statistics.total}
                    </span>
                    <span className="stat-item">
                        ⏳ Pending: {statistics.pending}
                    </span>
                    <span className="stat-item">
                        ✅ Completed: {statistics.completed}
                    </span>
                    <span className="stat-item">
                        🔍 Shown: {statistics.filtered}
                    </span>
                </div>
            </div>

            {sortedTodos.length === 0 ? (
                <div className="empty-state">
                    <p>📭 No todos found with current filter.</p>
                    <p>💡 Try changing the filter or add a new todo!</p>
                    <p>🔧 Powered by JavaScript & React</p>
                </div>
            ) : (
                <ol className="todo-list" data-filter={filter} data-sort={sortBy}>
                    {sortedTodos.map(todo => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                            isEditing={editingId === todo._id}
                            editText={editText}
                            onEdit={onEdit}
                            onSave={onSave}
                            onCancel={onCancel}
                            onDelete={onDelete}
                            onToggleStatus={onToggleStatus}
                            onEditTextChange={onEditTextChange}
                        />
                    ))}
                </ol>
            )}
        </div>
    );
};

// ============================================
// JAVASCRIPT REACT COMPONENT: TodoFilter
// ============================================

/**
 * TodoFilter React Component (JavaScript/JSX)
 * Provides filtering and sorting controls with JavaScript
 */
const TodoFilter = ({ 
    currentFilter, 
    currentSort, 
    onFilterChange, 
    onSortChange,
    todoStats
}) => {
    // JavaScript filter options
    const filterOptions = [
        { value: 'all', label: '📋 All', count: todoStats.total },
        { value: 'pending', label: '⏳ Pending', count: todoStats.pending },
        { value: 'done', label: '✅ Done', count: todoStats.completed }
    ];

    // JavaScript sort options
    const sortOptions = [
        { value: 'date', label: '📅 Date' },
        { value: 'alphabetical', label: '🔤 A-Z' },
        { value: 'status', label: '🎯 Status' }
    ];

    // JavaScript event handlers
    const handleFilterClick = (filterValue) => {
        console.log('🔍 JavaScript: Changing filter to:', filterValue);
        onFilterChange(filterValue);
    };

    const handleSortChange = (event) => {
        console.log('📊 JavaScript: Changing sort to:', event.target.value);
        onSortChange(event.target.value);
    };

    // JavaScript JSX rendering
    return (
        <div className="todo-filter-container" data-language="javascript">
            <div className="filter-section">
                <h4>🔍 Filter Todos (JavaScript)</h4>
                <div className="filter-buttons">
                    {filterOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => handleFilterClick(option.value)}
                            className={`filter-btn ${currentFilter === option.value ? 'active' : ''}`}
                            title={`Show ${option.label} todos (JavaScript)`}
                        >
                            {option.label} ({option.count})
                        </button>
                    ))}
                </div>
            </div>

            <div className="sort-section">
                <h4>📊 Sort Todos (JavaScript)</h4>
                <select 
                    value={currentSort}
                    onChange={handleSortChange}
                    className="sort-select"
                    title="Sort todos (JavaScript)"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

// ============================================
// JAVASCRIPT REACT COMPONENT: TodoForm
// ============================================

/**
 * TodoForm React Component (JavaScript/JSX)
 * Form for creating new todos with JavaScript validation
 */
const TodoForm = ({ onSubmit, isLoading = false }) => {
    // JavaScript state using React hooks
    const [task, setTask] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);

    // JavaScript validation effect
    React.useEffect(() => {
        const valid = task.trim().length > 0 && task.trim().length <= 200;
        setIsValid(valid);
    }, [task]);

    // JavaScript event handlers
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!isValid) {
            console.warn('⚠️ JavaScript: Invalid todo submission attempted');
            return;
        }

        console.log('➕ JavaScript: Submitting new todo:', task);
        onSubmit({ task: task.trim(), status: 'pending' });
        setTask(''); // Clear form after submit
    };

    const handleInputChange = (event) => {
        setTask(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (isValid) {
                handleSubmit(event);
            }
        }
    };

    // JavaScript JSX rendering
    return (
        <div className="todo-form-container" data-language="javascript">
            <h3>➕ Add New Todo (JavaScript/React)</h3>
            <form onSubmit={handleSubmit} className="todo-form">
                <div className="input-group">
                    <input
                        type="text"
                        value={task}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your todo task (JavaScript)..."
                        className={`todo-input ${isValid ? 'valid' : task.length > 0 ? 'invalid' : ''}`}
                        disabled={isLoading}
                        maxLength={200}
                        autoComplete="off"
                    />
                    <button 
                        type="submit"
                        disabled={!isValid || isLoading}
                        className="submit-btn"
                        title="Add todo (JavaScript)"
                    >
                        {isLoading ? '⏳ Adding...' : '➕ Add Todo'}
                    </button>
                </div>
                <div className="form-feedback">
                    <span className="char-count">
                        {task.length}/200 characters
                    </span>
                    {task.length > 0 && !isValid && (
                        <span className="error-message">
                            ⚠️ Todo must be 1-200 characters long
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
};

// ============================================
// JAVASCRIPT UTILITY FUNCTIONS
// ============================================

/**
 * Renders todos with JavaScript DOM manipulation
 * @param {Array} todos - JavaScript array of todo objects
 * @param {HTMLElement} container - JavaScript DOM element
 */
function renderTodosWithJavaScript(todos, container) {
    console.log('🎨 JavaScript: Rendering todos to DOM...');
    
    if (!container) {
        console.error('❌ JavaScript: Container element not found');
        return;
    }

    container.innerHTML = ''; // Clear existing content

    if (todos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>📭 No todos found (JavaScript)</p>
            </div>
        `;
        return;
    }

    const todoList = document.createElement('ol');
    todoList.className = 'todo-list-js';
    todoList.setAttribute('data-language', 'javascript');

    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item-js';
        listItem.setAttribute('data-todo-id', todo._id);
        
        listItem.innerHTML = `
            <div class="todo-content">
                <span class="todo-text ${todo.status === 'done' ? 'completed' : ''}">${todo.task}</span>
                <span class="todo-status">${todo.status}</span>
            </div>
            <div class="todo-actions">
                <button onclick="editTodoWithJavaScript('${todo._id}')" class="btn-edit">✏️ Edit</button>
                <button onclick="toggleTodoWithJavaScript('${todo._id}', '${todo.status}')" class="btn-toggle">
                    ${todo.status === 'done' ? '↩️ Pending' : '✅ Done'}
                </button>
                <button onclick="deleteTodoWithJavaScript('${todo._id}')" class="btn-delete">🗑️ Delete</button>
            </div>
        `;

        todoList.appendChild(listItem);
    });

    container.appendChild(todoList);
    console.log(`✅ JavaScript: Rendered ${todos.length} todos to DOM`);
}

/**
 * JavaScript event listener setup
 */
function setupJavaScriptEventListeners() {
    console.log('🔧 JavaScript: Setting up event listeners...');
    
    // JavaScript DOM content loaded
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 JavaScript: DOM Content Loaded');
        
        // JavaScript click handlers
        document.body.addEventListener('click', (event) => {
            if (event.target.matches('.js-todo-btn')) {
                console.log('🖱️ JavaScript: Todo button clicked');
                event.preventDefault();
                // Handle todo button clicks with JavaScript
            }
        });

        // JavaScript keyboard handlers
        document.body.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                // Cancel any active editing with JavaScript
                console.log('⌨️ JavaScript: Escape key pressed');
            }
        });
    });

    console.log('✅ JavaScript: Event listeners setup complete');
}

// ============================================
// JAVASCRIPT MODULE EXPORTS
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    // Node.js JavaScript environment
    module.exports = {
        TodoItem,
        TodoList,
        TodoFilter,
        TodoForm,
        renderTodosWithJavaScript,
        setupJavaScriptEventListeners
    };
} else {
    // Browser JavaScript environment
    window.TodoComponents = {
        TodoItem,
        TodoList,
        TodoFilter,
        TodoForm,
        renderTodosWithJavaScript,
        setupJavaScriptEventListeners
    };

    // Setup JavaScript event listeners automatically
    setupJavaScriptEventListeners();
}

console.log('🧩 JavaScript: Todo Components loaded successfully');
console.log('⚛️ Framework: React with JavaScript/JSX');
console.log('🎨 UI: JavaScript-powered components');