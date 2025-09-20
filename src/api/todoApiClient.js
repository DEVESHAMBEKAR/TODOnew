/**
 * =====================================================
 * JAVASCRIPT API CLIENT FOR TODO APPLICATION
 * =====================================================
 * 
 * Comprehensive JavaScript API client for Todo operations
 * Language: JavaScript/ES6+
 * Framework: Vanilla JavaScript with async/await
 * Purpose: Handle all API communications for the Todo app
 */

class TodoApiClient {
    constructor(baseUrl = 'http://localhost:5000', options = {}) {
        this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
        this.options = {
            timeout: 10000,
            retries: 3,
            retryDelay: 1000,
            ...options
        };
        
        // JavaScript class initialization
        this.requestCounter = 0;
        this.cache = new Map();
        this.interceptors = {
            request: [],
            response: []
        };
        
        console.log('🔧 TodoApiClient initialized with JavaScript');
        console.log('🌐 Base URL:', this.baseUrl);
    }

    /**
     * Adds request interceptor (JavaScript function)
     * @param {Function} interceptor - JavaScript function to intercept requests
     */
    addRequestInterceptor(interceptor) {
        if (typeof interceptor === 'function') {
            this.interceptors.request.push(interceptor);
        }
    }

    /**
     * Adds response interceptor (JavaScript function)
     * @param {Function} interceptor - JavaScript function to intercept responses
     */
    addResponseInterceptor(interceptor) {
        if (typeof interceptor === 'function') {
            this.interceptors.response.push(interceptor);
        }
    }

    /**
     * Creates a unique request ID using JavaScript
     * @returns {string} - Unique JavaScript-generated request ID
     */
    generateRequestId() {
        this.requestCounter += 1;
        return `js_req_${Date.now()}_${this.requestCounter}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Executes HTTP request with JavaScript fetch API
     * @param {string} endpoint - API endpoint
     * @param {Object} options - JavaScript request options
     * @returns {Promise} - JavaScript Promise with response data
     */
    async executeRequest(endpoint, options = {}) {
        const requestId = this.generateRequestId();
        const url = `${this.baseUrl}${endpoint}`;
        
        console.log(`🚀 [${requestId}] JavaScript HTTP Request: ${options.method || 'GET'} ${url}`);
        
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Client': 'JavaScript-TodoApiClient',
                'X-Request-ID': requestId
            },
            timeout: this.options.timeout
        };

        let requestOptions = { ...defaultOptions, ...options };

        // Apply JavaScript request interceptors
        for (const interceptor of this.interceptors.request) {
            try {
                requestOptions = await interceptor(requestOptions, url);
            } catch (error) {
                console.error('Request interceptor error:', error);
            }
        }

        let lastError;
        for (let attempt = 1; attempt <= this.options.retries; attempt++) {
            try {
                console.log(`📡 [${requestId}] JavaScript Fetch Attempt ${attempt}/${this.options.retries}`);
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), requestOptions.timeout);
                
                const response = await fetch(url, {
                    ...requestOptions,
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                console.log(`✅ [${requestId}] JavaScript Response: ${response.status} ${response.statusText}`);
                
                if (!response.ok) {
                    throw new Error(`JavaScript HTTP Error: ${response.status} - ${response.statusText}`);
                }

                let responseData;
                const contentType = response.headers.get('content-type');
                
                if (contentType && contentType.includes('application/json')) {
                    responseData = await response.json();
                } else {
                    responseData = await response.text();
                }

                // Apply JavaScript response interceptors
                for (const interceptor of this.interceptors.response) {
                    try {
                        responseData = await interceptor(responseData, response);
                    } catch (error) {
                        console.error('Response interceptor error:', error);
                    }
                }

                console.log(`🎉 [${requestId}] JavaScript Request Successful`);
                return responseData;

            } catch (error) {
                lastError = error;
                console.error(`❌ [${requestId}] JavaScript Request Failed (Attempt ${attempt}):`, error.message);
                
                if (attempt < this.options.retries) {
                    console.log(`⏳ [${requestId}] JavaScript Retry in ${this.options.retryDelay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, this.options.retryDelay));
                }
            }
        }

        throw new Error(`JavaScript API Request Failed after ${this.options.retries} attempts: ${lastError.message}`);
    }

    /**
     * Fetches all todos using JavaScript
     * @returns {Promise<Array>} - JavaScript Promise with todos array
     */
    async getAllTodos() {
        console.log('📋 JavaScript: Fetching all todos...');
        const cacheKey = 'all_todos';
        
        if (this.cache.has(cacheKey)) {
            console.log('💾 JavaScript: Returning cached todos');
            return this.cache.get(cacheKey);
        }
        
        const todos = await this.executeRequest('/todos');
        this.cache.set(cacheKey, todos);
        
        console.log(`✅ JavaScript: Retrieved ${todos.length} todos`);
        return todos;
    }

    /**
     * Creates a new todo using JavaScript
     * @param {Object} todoData - JavaScript object with todo data
     * @returns {Promise<Object>} - JavaScript Promise with created todo
     */
    async createTodo(todoData) {
        console.log('➕ JavaScript: Creating new todo...', todoData);
        
        // JavaScript validation
        if (!todoData || typeof todoData !== 'object') {
            throw new Error('JavaScript Error: Todo data must be a valid object');
        }
        
        if (!todoData.task || typeof todoData.task !== 'string' || todoData.task.trim().length === 0) {
            throw new Error('JavaScript Error: Todo task must be a non-empty string');
        }

        const todoPayload = {
            task: todoData.task.trim(),
            status: todoData.status || 'pending'
        };

        const createdTodo = await this.executeRequest('/todos', {
            method: 'POST',
            body: JSON.stringify(todoPayload)
        });

        // Clear cache after creating
        this.cache.delete('all_todos');
        
        console.log('✅ JavaScript: Todo created successfully', createdTodo);
        return createdTodo;
    }

    /**
     * Updates an existing todo using JavaScript
     * @param {string} todoId - JavaScript string with todo ID
     * @param {Object} updates - JavaScript object with updates
     * @returns {Promise<Object>} - JavaScript Promise with updated todo
     */
    async updateTodo(todoId, updates) {
        console.log(`✏️ JavaScript: Updating todo ${todoId}...`, updates);
        
        // JavaScript validation
        if (!todoId || typeof todoId !== 'string') {
            throw new Error('JavaScript Error: Todo ID must be a valid string');
        }
        
        if (!updates || typeof updates !== 'object') {
            throw new Error('JavaScript Error: Updates must be a valid object');
        }

        const updatedTodo = await this.executeRequest(`/todos/${todoId}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });

        // Clear cache after updating
        this.cache.delete('all_todos');
        
        console.log('✅ JavaScript: Todo updated successfully', updatedTodo);
        return updatedTodo;
    }

    /**
     * Deletes a todo using JavaScript
     * @param {string} todoId - JavaScript string with todo ID
     * @returns {Promise} - JavaScript Promise resolving when deleted
     */
    async deleteTodo(todoId) {
        console.log(`🗑️ JavaScript: Deleting todo ${todoId}...`);
        
        // JavaScript validation
        if (!todoId || typeof todoId !== 'string') {
            throw new Error('JavaScript Error: Todo ID must be a valid string');
        }

        await this.executeRequest(`/todos/${todoId}`, {
            method: 'DELETE'
        });

        // Clear cache after deleting
        this.cache.delete('all_todos');
        
        console.log('✅ JavaScript: Todo deleted successfully');
    }

    /**
     * Toggles todo status using JavaScript
     * @param {string} todoId - JavaScript string with todo ID
     * @param {string} currentStatus - JavaScript string with current status
     * @returns {Promise<Object>} - JavaScript Promise with updated todo
     */
    async toggleTodoStatus(todoId, currentStatus) {
        console.log(`🔄 JavaScript: Toggling todo ${todoId} status from ${currentStatus}...`);
        
        const newStatus = currentStatus === 'done' ? 'pending' : 'done';
        return await this.updateTodo(todoId, { status: newStatus });
    }

    /**
     * Filters todos by status using JavaScript
     * @param {string} status - JavaScript string with status filter
     * @returns {Promise<Array>} - JavaScript Promise with filtered todos
     */
    async getTodosByStatus(status) {
        console.log(`🔍 JavaScript: Filtering todos by status: ${status}`);
        
        const allTodos = await this.getAllTodos();
        
        if (status === 'all') {
            return allTodos;
        }
        
        const filteredTodos = allTodos.filter(todo => todo.status === status);
        console.log(`✅ JavaScript: Found ${filteredTodos.length} todos with status: ${status}`);
        
        return filteredTodos;
    }

    /**
     * Gets todo statistics using JavaScript
     * @returns {Promise<Object>} - JavaScript Promise with statistics
     */
    async getTodoStatistics() {
        console.log('📊 JavaScript: Calculating todo statistics...');
        
        const allTodos = await this.getAllTodos();
        const total = allTodos.length;
        const completed = allTodos.filter(todo => todo.status === 'done').length;
        const pending = allTodos.filter(todo => todo.status === 'pending').length;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        const statistics = {
            total,
            completed,
            pending,
            completionRate,
            summary: `${completed}/${total} completed (${completionRate}%)`,
            generatedBy: 'JavaScript TodoApiClient',
            timestamp: new Date().toISOString()
        };
        
        console.log('✅ JavaScript: Statistics calculated', statistics);
        return statistics;
    }

    /**
     * Clears the JavaScript cache
     */
    clearCache() {
        console.log('🧹 JavaScript: Clearing API cache...');
        this.cache.clear();
        console.log('✅ JavaScript: Cache cleared');
    }

    /**
     * Gets JavaScript client information
     * @returns {Object} - JavaScript object with client info
     */
    getClientInfo() {
        return {
            language: 'JavaScript',
            client: 'TodoApiClient',
            version: '1.0.0',
            baseUrl: this.baseUrl,
            cacheSize: this.cache.size,
            requestCount: this.requestCounter,
            interceptors: {
                request: this.interceptors.request.length,
                response: this.interceptors.response.length
            },
            features: [
                'JavaScript ES6+ Support',
                'Async/Await Pattern',
                'Fetch API Integration',
                'Request/Response Interceptors',
                'Automatic Retries',
                'Caching Support',
                'Error Handling',
                'Timeout Management'
            ]
        };
    }
}

// ============================================
// JAVASCRIPT UTILITY FUNCTIONS
// ============================================

/**
 * Creates a singleton instance using JavaScript
 * @param {string} baseUrl - JavaScript string with base URL
 * @param {Object} options - JavaScript object with options
 * @returns {TodoApiClient} - JavaScript TodoApiClient instance
 */
function createTodoApiClient(baseUrl, options) {
    console.log('🏭 JavaScript: Creating TodoApiClient singleton...');
    return new TodoApiClient(baseUrl, options);
}

/**
 * Validates API response using JavaScript
 * @param {any} response - JavaScript response data
 * @returns {boolean} - JavaScript boolean indicating validity
 */
function validateApiResponse(response) {
    if (response === null || response === undefined) {
        return false;
    }
    
    if (Array.isArray(response)) {
        return response.every(item => 
            item && typeof item === 'object' && 
            item._id && item.task && item.status
        );
    }
    
    if (typeof response === 'object') {
        return response._id && response.task && response.status;
    }
    
    return false;
}

// ============================================
// JAVASCRIPT MODULE EXPORTS
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    // Node.js JavaScript environment
    module.exports = {
        TodoApiClient,
        createTodoApiClient,
        validateApiResponse
    };
} else {
    // Browser JavaScript environment
    window.TodoApiClient = TodoApiClient;
    window.createTodoApiClient = createTodoApiClient;
    window.validateApiResponse = validateApiResponse;
}

console.log('🚀 JavaScript TodoApiClient module loaded successfully');
console.log('💻 Language: JavaScript ES6+');
console.log('🌐 Environment: Browser + Node.js compatible');