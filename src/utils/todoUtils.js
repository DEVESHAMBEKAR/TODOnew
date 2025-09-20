/**
 * =====================================================
 * TODO APPLICATION - JAVASCRIPT FULL STACK PROJECT
 * =====================================================
 * 
 * This is a comprehensive JavaScript/Node.js application
 * Built with modern JavaScript technologies:
 * - Backend: Node.js + Express.js + MongoDB
 * - Frontend: React + Vite + JavaScript/JSX
 * - Database: MongoDB Atlas
 * - Language: 100% JavaScript/TypeScript
 * 
 * @author dhanashri-salunkhe25
 * @version 1.0.0
 * @language JavaScript
 * @framework Node.js, React, Express
 */

// ============================================
// APPLICATION CONFIGURATION
// ============================================

const APPLICATION_CONFIG = {
    name: 'Todo Application',
    version: '1.0.0',
    language: 'JavaScript',
    technologies: {
        backend: {
            runtime: 'Node.js',
            framework: 'Express.js',
            database: 'MongoDB',
            odm: 'Mongoose',
            validation: 'express-validator'
        },
        frontend: {
            library: 'React',
            bundler: 'Vite',
            language: 'JavaScript/JSX',
            styling: 'CSS3',
            state: 'React Hooks'
        },
        deployment: {
            backend: 'Heroku/Railway',
            frontend: 'Vercel/Netlify',
            database: 'MongoDB Atlas',
            version_control: 'Git/GitHub'
        }
    },
    features: [
        'Create todos',
        'Read todos',
        'Update todos', 
        'Delete todos',
        'Filter todos (All/Pending/Done)',
        'Edit todo text',
        'Toggle completion status',
        'Responsive design',
        'Real-time updates',
        'Data persistence'
    ]
};

// ============================================
// JAVASCRIPT UTILITY FUNCTIONS
// ============================================

/**
 * Validates todo data structure
 * @param {Object} todo - Todo object to validate
 * @returns {boolean} - True if valid todo structure
 */
function validateTodoStructure(todo) {
    if (!todo || typeof todo !== 'object') {
        return false;
    }
    
    const requiredFields = ['_id', 'task', 'status'];
    const validStatuses = ['pending', 'done'];
    
    for (const field of requiredFields) {
        if (!(field in todo)) {
            console.error(`Missing required field: ${field}`);
            return false;
        }
    }
    
    if (!validStatuses.includes(todo.status)) {
        console.error(`Invalid status: ${todo.status}. Must be one of: ${validStatuses.join(', ')}`);
        return false;
    }
    
    if (typeof todo.task !== 'string' || todo.task.trim().length === 0) {
        console.error('Task must be a non-empty string');
        return false;
    }
    
    return true;
}

/**
 * Formats todo for display
 * @param {Object} todo - Todo object
 * @returns {string} - Formatted todo string
 */
function formatTodoForDisplay(todo) {
    if (!validateTodoStructure(todo)) {
        return 'Invalid todo';
    }
    
    const statusIcon = todo.status === 'done' ? '✅' : '⏳';
    const timestamp = new Date().toLocaleString();
    
    return `${statusIcon} ${todo.task} [${todo.status.toUpperCase()}] - ${timestamp}`;
}

/**
 * Filters todos by status
 * @param {Array} todos - Array of todo objects
 * @param {string} filter - Filter criteria ('all', 'pending', 'done')
 * @returns {Array} - Filtered todos array
 */
function filterTodos(todos, filter = 'all') {
    if (!Array.isArray(todos)) {
        console.error('Todos must be an array');
        return [];
    }
    
    if (filter === 'all') {
        return todos;
    }
    
    return todos.filter(todo => {
        if (!validateTodoStructure(todo)) {
            return false;
        }
        return todo.status === filter;
    });
}

/**
 * Sorts todos by creation date or priority
 * @param {Array} todos - Array of todo objects
 * @param {string} sortBy - Sort criteria ('date', 'status', 'alphabetical')
 * @returns {Array} - Sorted todos array
 */
function sortTodos(todos, sortBy = 'date') {
    if (!Array.isArray(todos)) {
        return [];
    }
    
    const sortedTodos = [...todos];
    
    switch (sortBy) {
        case 'status':
            return sortedTodos.sort((a, b) => {
                if (a.status === 'pending' && b.status === 'done') return -1;
                if (a.status === 'done' && b.status === 'pending') return 1;
                return 0;
            });
            
        case 'alphabetical':
            return sortedTodos.sort((a, b) => 
                a.task.toLowerCase().localeCompare(b.task.toLowerCase())
            );
            
        case 'date':
        default:
            return sortedTodos.sort((a, b) => {
                const dateA = new Date(a.createdAt || a._id);
                const dateB = new Date(b.createdAt || b._id);
                return dateB - dateA; // Newest first
            });
    }
}

/**
 * Generates statistics for todos
 * @param {Array} todos - Array of todo objects
 * @returns {Object} - Statistics object
 */
function generateTodoStatistics(todos) {
    if (!Array.isArray(todos)) {
        return { total: 0, pending: 0, completed: 0, completionRate: 0 };
    }
    
    const validTodos = todos.filter(validateTodoStructure);
    const total = validTodos.length;
    const completed = validTodos.filter(todo => todo.status === 'done').length;
    const pending = validTodos.filter(todo => todo.status === 'pending').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
        total,
        pending,
        completed,
        completionRate,
        summary: `${completed}/${total} tasks completed (${completionRate}%)`
    };
}

/**
 * Creates a new todo object with default values
 * @param {string} task - Task description
 * @returns {Object} - New todo object
 */
function createTodoObject(task) {
    if (typeof task !== 'string' || task.trim().length === 0) {
        throw new Error('Task must be a non-empty string');
    }
    
    return {
        _id: `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        task: task.trim(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}

/**
 * Updates an existing todo object
 * @param {Object} todo - Existing todo object
 * @param {Object} updates - Updates to apply
 * @returns {Object} - Updated todo object
 */
function updateTodoObject(todo, updates) {
    if (!validateTodoStructure(todo)) {
        throw new Error('Invalid todo object');
    }
    
    const updatedTodo = { ...todo };
    
    if (updates.task !== undefined) {
        if (typeof updates.task !== 'string' || updates.task.trim().length === 0) {
            throw new Error('Task must be a non-empty string');
        }
        updatedTodo.task = updates.task.trim();
    }
    
    if (updates.status !== undefined) {
        const validStatuses = ['pending', 'done'];
        if (!validStatuses.includes(updates.status)) {
            throw new Error(`Status must be one of: ${validStatuses.join(', ')}`);
        }
        updatedTodo.status = updates.status;
    }
    
    updatedTodo.updatedAt = new Date().toISOString();
    
    return updatedTodo;
}

// ============================================
// API HELPER FUNCTIONS
// ============================================

/**
 * Makes HTTP requests to the todo API
 * @param {string} url - API endpoint URL
 * @param {Object} options - Request options
 * @returns {Promise} - Promise resolving to response data
 */
async function makeApiRequest(url, options = {}) {
    const defaultOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const requestOptions = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(url, requestOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

/**
 * Fetches all todos from the API
 * @param {string} baseUrl - Base API URL
 * @returns {Promise<Array>} - Promise resolving to todos array
 */
async function fetchAllTodos(baseUrl) {
    return await makeApiRequest(`${baseUrl}/todos`);
}

/**
 * Creates a new todo via API
 * @param {string} baseUrl - Base API URL
 * @param {Object} todoData - Todo data to create
 * @returns {Promise<Object>} - Promise resolving to created todo
 */
async function createTodoViaApi(baseUrl, todoData) {
    return await makeApiRequest(`${baseUrl}/todos`, {
        method: 'POST',
        body: JSON.stringify(todoData),
    });
}

/**
 * Updates a todo via API
 * @param {string} baseUrl - Base API URL
 * @param {string} todoId - Todo ID to update
 * @param {Object} updates - Updates to apply
 * @returns {Promise<Object>} - Promise resolving to updated todo
 */
async function updateTodoViaApi(baseUrl, todoId, updates) {
    return await makeApiRequest(`${baseUrl}/todos/${todoId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
}

/**
 * Deletes a todo via API
 * @param {string} baseUrl - Base API URL
 * @param {string} todoId - Todo ID to delete
 * @returns {Promise} - Promise resolving when delete is complete
 */
async function deleteTodoViaApi(baseUrl, todoId) {
    return await makeApiRequest(`${baseUrl}/todos/${todoId}`, {
        method: 'DELETE',
    });
}

// ============================================
// EXPORT CONFIGURATION
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        APPLICATION_CONFIG,
        validateTodoStructure,
        formatTodoForDisplay,
        filterTodos,
        sortTodos,
        generateTodoStatistics,
        createTodoObject,
        updateTodoObject,
        makeApiRequest,
        fetchAllTodos,
        createTodoViaApi,
        updateTodoViaApi,
        deleteTodoViaApi
    };
} else {
    // Browser environment
    window.TodoUtils = {
        APPLICATION_CONFIG,
        validateTodoStructure,
        formatTodoForDisplay,
        filterTodos,
        sortTodos,
        generateTodoStatistics,
        createTodoObject,
        updateTodoObject,
        makeApiRequest,
        fetchAllTodos,
        createTodoViaApi,
        updateTodoViaApi,
        deleteTodoViaApi
    };
}

// ============================================
// INITIALIZATION
// ============================================

console.log('📦 Todo Application JavaScript Utilities Loaded');
console.log('🚀 Language: JavaScript');
console.log('⚡ Framework: Node.js + React');
console.log('💾 Database: MongoDB');
console.log('🔧 Technologies:', APPLICATION_CONFIG.technologies);