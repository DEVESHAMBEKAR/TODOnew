/**
 * =====================================================
 * JAVASCRIPT SERVICES AND BUSINESS LOGIC
 * =====================================================
 * 
 * Enterprise-grade JavaScript services for todo application
 * Language: JavaScript ES6+
 * Architecture: Service-oriented JavaScript modules
 * Purpose: Business logic and data management in JavaScript
 */

// ============================================
// JAVASCRIPT TODO SERVICE CLASS
// ============================================

/**
 * TodoService - Comprehensive JavaScript service for todo management
 * Implements enterprise patterns in JavaScript/Node.js
 */
class TodoService {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.cache = new Map();
        this.eventListeners = new Map();
        this.requestQueue = [];
        this.isOnline = navigator.onlineStatus !== false;
        
        console.log('🏭 JavaScript: TodoService initialized');
        console.log('🔧 Technology: JavaScript ES6+ Classes');
        
        this.setupJavaScriptEventHandlers();
    }

    /**
     * JavaScript method: Setup event handlers for service
     */
    setupJavaScriptEventHandlers() {
        // JavaScript online/offline detection
        if (typeof window !== 'undefined') {
            window.addEventListener('online', () => {
                this.isOnline = true;
                console.log('🌐 JavaScript: Connection restored, processing queue...');
                this.processRequestQueue();
            });

            window.addEventListener('offline', () => {
                this.isOnline = false;
                console.log('📡 JavaScript: Connection lost, enabling offline mode');
            });
        }

        // JavaScript error handling
        window.addEventListener('unhandledrejection', (event) => {
            console.error('❌ JavaScript: Unhandled promise rejection:', event.reason);
            this.handleServiceError(event.reason);
        });
    }

    /**
     * JavaScript async method: Get all todos with caching
     * @returns {Promise<Array>} JavaScript promise resolving to todos array
     */
    async getAllTodos() {
        console.log('📋 JavaScript: Fetching all todos...');
        
        try {
            const cacheKey = 'all_todos';
            
            // Check JavaScript cache first
            if (this.cache.has(cacheKey) && this.isCacheValid(cacheKey)) {
                console.log('💾 JavaScript: Returning cached todos');
                return this.cache.get(cacheKey).data;
            }

            // Fetch from API using JavaScript
            const todos = await this.apiClient.getAllTodos();
            
            // Cache the results in JavaScript Map
            this.cache.set(cacheKey, {
                data: todos,
                timestamp: Date.now(),
                ttl: 5 * 60 * 1000 // 5 minutes JavaScript cache TTL
            });

            console.log(`✅ JavaScript: Retrieved ${todos.length} todos`);
            this.emitEvent('todosLoaded', { todos, source: 'api' });
            
            return todos;
        } catch (error) {
            console.error('❌ JavaScript: Error fetching todos:', error.message);
            
            // Return cached data if available (JavaScript fallback)
            const cachedData = this.getCachedData('all_todos');
            if (cachedData) {
                console.log('🔄 JavaScript: Returning stale cached data');
                return cachedData;
            }
            
            this.handleServiceError(error);
            throw error;
        }
    }

    /**
     * JavaScript async method: Create new todo with validation
     * @param {Object} todoData - JavaScript object with todo data
     * @returns {Promise<Object>} JavaScript promise resolving to created todo
     */
    async createTodo(todoData) {
        console.log('➕ JavaScript: Creating new todo:', todoData);
        
        try {
            // JavaScript validation
            const validationResult = this.validateTodoData(todoData);
            if (!validationResult.isValid) {
                throw new Error(`JavaScript validation failed: ${validationResult.errors.join(', ')}`);
            }

            // Optimistic update in JavaScript
            const optimisticTodo = {
                _id: this.generateTemporaryId(),
                ...todoData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: todoData.status || 'pending',
                isOptimistic: true
            };

            this.updateCacheWithOptimisticUpdate('create', optimisticTodo);
            this.emitEvent('todoCreated', { todo: optimisticTodo, isOptimistic: true });

            // Make API call using JavaScript
            const createdTodo = await this.apiClient.createTodo(todoData);
            
            // Replace optimistic update with real data
            this.updateCacheWithRealData('create', optimisticTodo._id, createdTodo);
            this.emitEvent('todoCreated', { todo: createdTodo, isOptimistic: false });

            console.log('✅ JavaScript: Todo created successfully');
            return createdTodo;
        } catch (error) {
            console.error('❌ JavaScript: Error creating todo:', error.message);
            
            // Rollback optimistic update
            this.rollbackOptimisticUpdate('create', todoData);
            this.emitEvent('todoCreationFailed', { error, todoData });
            
            this.handleServiceError(error);
            throw error;
        }
    }

    /**
     * JavaScript async method: Update existing todo
     * @param {string} todoId - JavaScript string ID of todo
     * @param {Object} updates - JavaScript object with updates
     * @returns {Promise<Object>} JavaScript promise resolving to updated todo
     */
    async updateTodo(todoId, updates) {
        console.log(`✏️ JavaScript: Updating todo ${todoId}:`, updates);
        
        try {
            // Get current todo for rollback (JavaScript)
            const currentTodo = await this.getTodoById(todoId);
            if (!currentTodo) {
                throw new Error(`JavaScript: Todo with ID ${todoId} not found`);
            }

            // JavaScript validation
            const validationResult = this.validateTodoData({ ...currentTodo, ...updates });
            if (!validationResult.isValid) {
                throw new Error(`JavaScript validation failed: ${validationResult.errors.join(', ')}`);
            }

            // Optimistic update in JavaScript
            const optimisticTodo = {
                ...currentTodo,
                ...updates,
                updatedAt: new Date().toISOString(),
                isOptimistic: true
            };

            this.updateCacheWithOptimisticUpdate('update', optimisticTodo);
            this.emitEvent('todoUpdated', { todo: optimisticTodo, isOptimistic: true });

            // Make API call using JavaScript
            const updatedTodo = await this.apiClient.updateTodo(todoId, updates);
            
            // Replace optimistic update with real data
            this.updateCacheWithRealData('update', todoId, updatedTodo);
            this.emitEvent('todoUpdated', { todo: updatedTodo, isOptimistic: false });

            console.log('✅ JavaScript: Todo updated successfully');
            return updatedTodo;
        } catch (error) {
            console.error('❌ JavaScript: Error updating todo:', error.message);
            
            // Rollback optimistic update
            this.rollbackOptimisticUpdate('update', { todoId, updates });
            this.emitEvent('todoUpdateFailed', { error, todoId, updates });
            
            this.handleServiceError(error);
            throw error;
        }
    }

    /**
     * JavaScript async method: Delete todo with confirmation
     * @param {string} todoId - JavaScript string ID of todo to delete
     * @returns {Promise<boolean>} JavaScript promise resolving to success status
     */
    async deleteTodo(todoId) {
        console.log(`🗑️ JavaScript: Deleting todo ${todoId}`);
        
        try {
            // Get current todo for rollback (JavaScript)
            const currentTodo = await this.getTodoById(todoId);
            if (!currentTodo) {
                console.warn(`⚠️ JavaScript: Todo ${todoId} not found for deletion`);
                return true; // Already deleted
            }

            // Optimistic removal from JavaScript cache
            this.updateCacheWithOptimisticUpdate('delete', { _id: todoId });
            this.emitEvent('todoDeleted', { todoId, isOptimistic: true });

            // Make API call using JavaScript
            const success = await this.apiClient.deleteTodo(todoId);
            
            if (success) {
                // Confirm deletion in cache
                this.confirmOptimisticUpdate('delete', todoId);
                this.emitEvent('todoDeleted', { todoId, isOptimistic: false });
                console.log('✅ JavaScript: Todo deleted successfully');
            } else {
                throw new Error('JavaScript: Delete operation failed');
            }

            return success;
        } catch (error) {
            console.error('❌ JavaScript: Error deleting todo:', error.message);
            
            // Rollback optimistic deletion
            this.rollbackOptimisticUpdate('delete', { todoId });
            this.emitEvent('todoDeletionFailed', { error, todoId });
            
            this.handleServiceError(error);
            throw error;
        }
    }

    /**
     * JavaScript method: Get todo by ID with caching
     * @param {string} todoId - JavaScript string ID of todo
     * @returns {Promise<Object|null>} JavaScript promise resolving to todo or null
     */
    async getTodoById(todoId) {
        console.log(`🔍 JavaScript: Getting todo by ID: ${todoId}`);
        
        try {
            // Check cache first (JavaScript Map)
            const allTodos = await this.getAllTodos();
            const todo = allTodos.find(t => t._id === todoId);
            
            if (todo) {
                console.log('✅ JavaScript: Todo found in cache');
                return todo;
            }

            // If not in cache, fetch individually
            console.log('📡 JavaScript: Fetching individual todo from API');
            const fetchedTodo = await this.apiClient.getTodoById(todoId);
            
            // Update cache with new todo
            if (fetchedTodo) {
                this.addTodoToCache(fetchedTodo);
            }
            
            return fetchedTodo;
        } catch (error) {
            console.error(`❌ JavaScript: Error getting todo ${todoId}:`, error.message);
            this.handleServiceError(error);
            return null;
        }
    }

    /**
     * JavaScript method: Validate todo data structure
     * @param {Object} todoData - JavaScript object to validate
     * @returns {Object} JavaScript validation result object
     */
    validateTodoData(todoData) {
        const errors = [];
        
        // JavaScript type checking
        if (typeof todoData !== 'object' || todoData === null) {
            errors.push('Todo data must be a JavaScript object');
        }

        // Required field validation in JavaScript
        if (!todoData.task || typeof todoData.task !== 'string') {
            errors.push('Task is required and must be a JavaScript string');
        } else if (todoData.task.trim().length === 0) {
            errors.push('Task cannot be empty (JavaScript validation)');
        } else if (todoData.task.length > 200) {
            errors.push('Task cannot exceed 200 characters (JavaScript validation)');
        }

        // Status validation in JavaScript
        if (todoData.status && !['pending', 'done'].includes(todoData.status)) {
            errors.push('Status must be "pending" or "done" (JavaScript validation)');
        }

        // Date validation in JavaScript
        if (todoData.createdAt && isNaN(Date.parse(todoData.createdAt))) {
            errors.push('CreatedAt must be a valid JavaScript date');
        }

        if (todoData.updatedAt && isNaN(Date.parse(todoData.updatedAt))) {
            errors.push('UpdatedAt must be a valid JavaScript date');
        }

        const result = {
            isValid: errors.length === 0,
            errors,
            timestamp: new Date().toISOString(),
            validatedBy: 'JavaScript TodoService'
        };

        if (!result.isValid) {
            console.warn('⚠️ JavaScript: Validation failed:', errors);
        }

        return result;
    }

    /**
     * JavaScript method: Generate temporary ID for optimistic updates
     * @returns {string} JavaScript generated temporary ID
     */
    generateTemporaryId() {
        const timestamp = Date.now().toString(36);
        const randomPart = Math.random().toString(36).substr(2, 9);
        const tempId = `temp_${timestamp}_${randomPart}`;
        
        console.log('🔢 JavaScript: Generated temporary ID:', tempId);
        return tempId;
    }

    /**
     * JavaScript method: Check if cache is valid
     * @param {string} cacheKey - JavaScript cache key
     * @returns {boolean} JavaScript boolean indicating cache validity
     */
    isCacheValid(cacheKey) {
        const cached = this.cache.get(cacheKey);
        if (!cached) return false;
        
        const isValid = Date.now() - cached.timestamp < cached.ttl;
        
        if (!isValid) {
            console.log(`⏰ JavaScript: Cache expired for key: ${cacheKey}`);
            this.cache.delete(cacheKey);
        }
        
        return isValid;
    }

    /**
     * JavaScript method: Get cached data
     * @param {string} cacheKey - JavaScript cache key
     * @returns {any} JavaScript cached data or null
     */
    getCachedData(cacheKey) {
        const cached = this.cache.get(cacheKey);
        return cached ? cached.data : null;
    }

    /**
     * JavaScript method: Handle service errors
     * @param {Error} error - JavaScript Error object
     */
    handleServiceError(error) {
        console.error('🚨 JavaScript TodoService Error:', error);
        
        // JavaScript error categorization
        const errorType = this.categorizeError(error);
        
        // Emit JavaScript event for error handling
        this.emitEvent('serviceError', {
            error,
            errorType,
            timestamp: new Date().toISOString(),
            service: 'TodoService',
            language: 'JavaScript'
        });

        // JavaScript error reporting (if configured)
        if (this.errorReporter) {
            this.errorReporter.report(error, {
                service: 'TodoService',
                language: 'JavaScript',
                context: 'Service operation'
            });
        }
    }

    /**
     * JavaScript method: Categorize errors for better handling
     * @param {Error} error - JavaScript Error object
     * @returns {string} JavaScript error category
     */
    categorizeError(error) {
        if (error.name === 'NetworkError' || error.message.includes('fetch')) {
            return 'network';
        } else if (error.message.includes('validation')) {
            return 'validation';
        } else if (error.message.includes('not found')) {
            return 'notFound';
        } else if (error.message.includes('unauthorized')) {
            return 'authentication';
        } else {
            return 'unknown';
        }
    }

    /**
     * JavaScript method: Emit events to listeners
     * @param {string} eventName - JavaScript event name
     * @param {Object} eventData - JavaScript event data
     */
    emitEvent(eventName, eventData) {
        const listeners = this.eventListeners.get(eventName) || [];
        
        console.log(`📡 JavaScript: Emitting event "${eventName}" to ${listeners.length} listeners`);
        
        listeners.forEach(listener => {
            try {
                listener(eventData);
            } catch (error) {
                console.error(`❌ JavaScript: Error in event listener for "${eventName}":`, error);
            }
        });
    }

    /**
     * JavaScript method: Add event listener
     * @param {string} eventName - JavaScript event name
     * @param {Function} listener - JavaScript listener function
     */
    addEventListener(eventName, listener) {
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, []);
        }
        
        this.eventListeners.get(eventName).push(listener);
        console.log(`👂 JavaScript: Added listener for "${eventName}"`);
    }

    /**
     * JavaScript method: Remove event listener
     * @param {string} eventName - JavaScript event name
     * @param {Function} listener - JavaScript listener function
     */
    removeEventListener(eventName, listener) {
        const listeners = this.eventListeners.get(eventName) || [];
        const index = listeners.indexOf(listener);
        
        if (index !== -1) {
            listeners.splice(index, 1);
            console.log(`🚫 JavaScript: Removed listener for "${eventName}"`);
        }
    }

    /**
     * JavaScript method: Clear all cache
     */
    clearCache() {
        console.log('🧹 JavaScript: Clearing all cache...');
        this.cache.clear();
        this.emitEvent('cacheCleared', { timestamp: new Date().toISOString() });
    }

    /**
     * JavaScript method: Get service statistics
     * @returns {Object} JavaScript service statistics object
     */
    getServiceStatistics() {
        const stats = {
            cacheSize: this.cache.size,
            eventListeners: Array.from(this.eventListeners.entries()).map(([event, listeners]) => ({
                event,
                listenerCount: listeners.length
            })),
            isOnline: this.isOnline,
            queueSize: this.requestQueue.length,
            timestamp: new Date().toISOString(),
            service: 'JavaScript TodoService'
        };

        console.log('📊 JavaScript: Service statistics:', stats);
        return stats;
    }
}

// ============================================
// JAVASCRIPT DATA ACCESS LAYER
// ============================================

/**
 * TodoRepository - JavaScript data access layer
 * Implements repository pattern in JavaScript
 */
class TodoRepository {
    constructor(storage = 'localStorage') {
        this.storage = storage;
        this.storageKey = 'todos_javascript_app';
        
        console.log('💾 JavaScript: TodoRepository initialized with', storage);
    }

    /**
     * JavaScript method: Save todos to storage
     * @param {Array} todos - JavaScript array of todos
     */
    async saveTodos(todos) {
        try {
            const serialized = JSON.stringify({
                todos,
                timestamp: new Date().toISOString(),
                version: '1.0.0',
                language: 'JavaScript'
            });

            if (this.storage === 'localStorage' && typeof localStorage !== 'undefined') {
                localStorage.setItem(this.storageKey, serialized);
                console.log(`💾 JavaScript: Saved ${todos.length} todos to localStorage`);
            } else if (this.storage === 'indexedDB') {
                await this.saveToIndexedDB(serialized);
                console.log(`💾 JavaScript: Saved ${todos.length} todos to IndexedDB`);
            }
        } catch (error) {
            console.error('❌ JavaScript: Error saving todos:', error);
            throw error;
        }
    }

    /**
     * JavaScript method: Load todos from storage
     * @returns {Array} JavaScript array of todos
     */
    async loadTodos() {
        try {
            let serialized = null;

            if (this.storage === 'localStorage' && typeof localStorage !== 'undefined') {
                serialized = localStorage.getItem(this.storageKey);
            } else if (this.storage === 'indexedDB') {
                serialized = await this.loadFromIndexedDB();
            }

            if (!serialized) {
                console.log('📭 JavaScript: No todos found in storage');
                return [];
            }

            const data = JSON.parse(serialized);
            console.log(`📋 JavaScript: Loaded ${data.todos.length} todos from ${this.storage}`);
            
            return data.todos || [];
        } catch (error) {
            console.error('❌ JavaScript: Error loading todos:', error);
            return [];
        }
    }

    /**
     * JavaScript method: Clear all todos from storage
     */
    async clearTodos() {
        try {
            if (this.storage === 'localStorage' && typeof localStorage !== 'undefined') {
                localStorage.removeItem(this.storageKey);
            } else if (this.storage === 'indexedDB') {
                await this.clearIndexedDB();
            }
            
            console.log('🧹 JavaScript: Cleared all todos from storage');
        } catch (error) {
            console.error('❌ JavaScript: Error clearing todos:', error);
            throw error;
        }
    }
}

// ============================================
// JAVASCRIPT MODULE EXPORTS
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    // Node.js JavaScript environment
    module.exports = {
        TodoService,
        TodoRepository
    };
} else {
    // Browser JavaScript environment
    window.TodoServices = {
        TodoService,
        TodoRepository
    };
}

console.log('🔧 JavaScript: Todo Services loaded successfully');
console.log('🏗️ Architecture: Service-oriented JavaScript');
console.log('💼 Business Logic: JavaScript ES6+ Classes');