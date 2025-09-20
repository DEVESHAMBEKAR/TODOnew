/**
 * =====================================================
 * JAVASCRIPT CONFIGURATION AND CONSTANTS
 * =====================================================
 * 
 * Application configuration and constants in JavaScript
 * Language: JavaScript ES6+
 * Purpose: Centralized JavaScript configuration management
 * Architecture: Modern JavaScript module system
 */

// ============================================
// JAVASCRIPT APPLICATION CONFIGURATION
// ============================================

/**
 * AppConfig - JavaScript configuration object
 * Manages all application settings in JavaScript
 */
const AppConfig = {
    // API Configuration (JavaScript)
    api: {
        baseUrl: process.env.VITE_API_URL || 'http://localhost:5000',
        timeout: 30000,
        retryAttempts: 3,
        retryDelay: 1000,
        headers: {
            'Content-Type': 'application/json',
            'X-Powered-By': 'JavaScript',
            'X-Framework': 'React-JavaScript'
        }
    },

    // Database Configuration (JavaScript)
    database: {
        name: 'todos_javascript_db',
        version: 1,
        stores: {
            todos: {
                keyPath: '_id',
                indexes: [
                    { name: 'status', keyPath: 'status' },
                    { name: 'createdAt', keyPath: 'createdAt' },
                    { name: 'task', keyPath: 'task' }
                ]
            }
        }
    },

    // Cache Configuration (JavaScript)
    cache: {
        defaultTTL: 5 * 60 * 1000, // 5 minutes in JavaScript milliseconds
        maxSize: 1000,
        strategies: {
            todos: 'memory',
            user: 'localStorage',
            settings: 'sessionStorage'
        }
    },

    // UI Configuration (JavaScript)
    ui: {
        theme: 'light',
        language: 'en',
        animations: true,
        notifications: true,
        autoSave: true,
        autoSaveDelay: 2000,
        maxTodoLength: 200,
        todoListPageSize: 50
    },

    // Performance Configuration (JavaScript)
    performance: {
        enableVirtualization: true,
        debounceDelay: 300,
        throttleDelay: 100,
        lazyLoadThreshold: 0.1,
        enableServiceWorker: true
    },

    // Development Configuration (JavaScript)
    development: {
        enableLogging: process.env.NODE_ENV !== 'production',
        logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
        enableDebugTools: process.env.NODE_ENV === 'development',
        mockApi: false
    },

    // Feature Flags (JavaScript)
    features: {
        enableOfflineMode: true,
        enableRealTimeSync: true,
        enableDarkMode: true,
        enableExport: true,
        enableImport: true,
        enableCategories: false,
        enableDueDates: false,
        enablePriorities: false
    },

    // Security Configuration (JavaScript)
    security: {
        enableCSRF: true,
        enableXSS: true,
        sanitizeInput: true,
        validateAll: true,
        encryptStorage: false
    }
};

// ============================================
// JAVASCRIPT APPLICATION CONSTANTS
// ============================================

/**
 * JavaScript constants for todo application
 */
const Constants = {
    // Todo Status Constants (JavaScript)
    TODO_STATUS: {
        PENDING: 'pending',
        DONE: 'done',
        ARCHIVED: 'archived'
    },

    // API Endpoints (JavaScript)
    API_ENDPOINTS: {
        TODOS: '/api/todos',
        TODO_BY_ID: (id) => `/api/todos/${id}`,
        HEALTH: '/api/health',
        STATS: '/api/stats'
    },

    // HTTP Methods (JavaScript)
    HTTP_METHODS: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        PATCH: 'PATCH'
    },

    // Event Names (JavaScript)
    EVENTS: {
        TODO_CREATED: 'todo:created',
        TODO_UPDATED: 'todo:updated',
        TODO_DELETED: 'todo:deleted',
        TODOS_LOADED: 'todos:loaded',
        CONNECTION_LOST: 'connection:lost',
        CONNECTION_RESTORED: 'connection:restored',
        ERROR_OCCURRED: 'error:occurred',
        CACHE_CLEARED: 'cache:cleared'
    },

    // Storage Keys (JavaScript)
    STORAGE_KEYS: {
        TODOS: 'todos_javascript_app',
        SETTINGS: 'settings_javascript_app',
        CACHE: 'cache_javascript_app',
        USER_PREFERENCES: 'preferences_javascript_app'
    },

    // Error Types (JavaScript)
    ERROR_TYPES: {
        NETWORK_ERROR: 'NetworkError',
        VALIDATION_ERROR: 'ValidationError',
        NOT_FOUND_ERROR: 'NotFoundError',
        AUTHENTICATION_ERROR: 'AuthenticationError',
        PERMISSION_ERROR: 'PermissionError',
        UNKNOWN_ERROR: 'UnknownError'
    },

    // UI Messages (JavaScript)
    MESSAGES: {
        LOADING: 'Loading todos with JavaScript...',
        NO_TODOS: 'No todos found. Create your first todo!',
        TODO_CREATED: 'Todo created successfully with JavaScript',
        TODO_UPDATED: 'Todo updated successfully with JavaScript',
        TODO_DELETED: 'Todo deleted successfully with JavaScript',
        CONNECTION_ERROR: 'Connection error. Please check your internet.',
        VALIDATION_ERROR: 'Please check your input and try again.',
        UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.'
    },

    // Validation Rules (JavaScript)
    VALIDATION: {
        TODO_TASK: {
            MIN_LENGTH: 1,
            MAX_LENGTH: 200,
            REQUIRED: true,
            PATTERN: /^[^<>]*$/ // No HTML tags
        },
        TODO_STATUS: {
            ALLOWED_VALUES: ['pending', 'done', 'archived'],
            REQUIRED: false,
            DEFAULT: 'pending'
        }
    },

    // Animation Durations (JavaScript)
    ANIMATIONS: {
        FAST: 150,
        NORMAL: 300,
        SLOW: 500,
        VERY_SLOW: 1000
    },

    // Breakpoints (JavaScript)
    BREAKPOINTS: {
        MOBILE: 480,
        TABLET: 768,
        DESKTOP: 1024,
        LARGE_DESKTOP: 1440
    },

    // Colors (JavaScript)
    COLORS: {
        PRIMARY: '#007bff',
        SECONDARY: '#6c757d',
        SUCCESS: '#28a745',
        WARNING: '#ffc107',
        DANGER: '#dc3545',
        INFO: '#17a2b8',
        LIGHT: '#f8f9fa',
        DARK: '#343a40'
    }
};

// ============================================
// JAVASCRIPT ENVIRONMENT CONFIGURATION
// ============================================

/**
 * JavaScript environment detection and configuration
 */
const Environment = {
    // Detect JavaScript runtime environment
    isNode: typeof process !== 'undefined' && process.versions && process.versions.node,
    isBrowser: typeof window !== 'undefined' && typeof document !== 'undefined',
    isWorker: typeof WorkerGlobalScope !== 'undefined' && typeof importScripts === 'function',
    isReactNative: typeof navigator !== 'undefined' && navigator.product === 'ReactNative',

    // JavaScript engine detection
    isV8: typeof process !== 'undefined' && process.versions && process.versions.v8,
    isChrome: typeof window !== 'undefined' && !!window.chrome,
    isFirefox: typeof window !== 'undefined' && typeof InstallTrigger !== 'undefined',
    isSafari: typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent),

    // Feature detection (JavaScript)
    hasLocalStorage: (() => {
        try {
            return typeof localStorage !== 'undefined' && localStorage !== null;
        } catch (e) {
            return false;
        }
    })(),

    hasSessionStorage: (() => {
        try {
            return typeof sessionStorage !== 'undefined' && sessionStorage !== null;
        } catch (e) {
            return false;
        }
    })(),

    hasIndexedDB: (() => {
        try {
            return typeof indexedDB !== 'undefined' && indexedDB !== null;
        } catch (e) {
            return false;
        }
    })(),

    hasServiceWorker: (() => {
        try {
            return typeof navigator !== 'undefined' && 'serviceWorker' in navigator;
        } catch (e) {
            return false;
        }
    })(),

    hasWebWorkers: (() => {
        try {
            return typeof Worker !== 'undefined';
        } catch (e) {
            return false;
        }
    })(),

    // JavaScript version detection
    getJavaScriptVersion() {
        const features = {
            es5: typeof Object.create === 'function',
            es6: (() => {
                try {
                    return eval('class Test {}; true');
                } catch (e) {
                    return false;
                }
            })(),
            es2017: typeof Object.values === 'function',
            es2018: typeof Object.fromEntries === 'function',
            es2020: typeof globalThis !== 'undefined'
        };

        if (features.es2020) return 'ES2020+';
        if (features.es2018) return 'ES2018';
        if (features.es2017) return 'ES2017';
        if (features.es6) return 'ES6/ES2015';
        if (features.es5) return 'ES5';
        return 'Legacy JavaScript';
    }
};

// ============================================
// JAVASCRIPT LOGGER CONFIGURATION
// ============================================

/**
 * JavaScript logger configuration and factory
 */
const LoggerConfig = {
    levels: {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        FATAL: 4
    },

    colors: {
        DEBUG: '#6c757d',
        INFO: '#17a2b8',
        WARN: '#ffc107',
        ERROR: '#dc3545',
        FATAL: '#6f42c1'
    },

    formatters: {
        simple: (level, message, data) => `[${level}] ${message}`,
        detailed: (level, message, data) => {
            const timestamp = new Date().toISOString();
            const dataStr = data ? ` | Data: ${JSON.stringify(data)}` : '';
            return `[${timestamp}] [${level}] [JavaScript] ${message}${dataStr}`;
        },
        json: (level, message, data) => JSON.stringify({
            timestamp: new Date().toISOString(),
            level,
            message,
            data,
            language: 'JavaScript',
            environment: Environment.isBrowser ? 'Browser' : 'Node.js'
        })
    }
};

// ============================================
// JAVASCRIPT UTILITY FUNCTIONS
// ============================================

/**
 * JavaScript utility functions for configuration
 */
const ConfigUtils = {
    /**
     * Deep merge JavaScript objects
     * @param {Object} target - Target JavaScript object
     * @param {Object} source - Source JavaScript object
     * @returns {Object} Merged JavaScript object
     */
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    result[key] = this.deepMerge(result[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    },

    /**
     * Get configuration value by path (JavaScript)
     * @param {Object} config - JavaScript configuration object
     * @param {string} path - Dot-separated path
     * @param {any} defaultValue - Default value if not found
     * @returns {any} Configuration value
     */
    getConfigValue(config, path, defaultValue = null) {
        const keys = path.split('.');
        let current = config;
        
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            } else {
                return defaultValue;
            }
        }
        
        return current;
    },

    /**
     * Validate JavaScript configuration
     * @param {Object} config - Configuration to validate
     * @returns {Object} Validation result
     */
    validateConfig(config) {
        const errors = [];
        
        // Required fields validation
        const requiredPaths = [
            'api.baseUrl',
            'database.name',
            'cache.defaultTTL'
        ];
        
        requiredPaths.forEach(path => {
            if (this.getConfigValue(config, path) === null) {
                errors.push(`Missing required configuration: ${path}`);
            }
        });
        
        // Type validation
        if (typeof config.api?.timeout !== 'number') {
            errors.push('api.timeout must be a number');
        }
        
        if (typeof config.cache?.defaultTTL !== 'number') {
            errors.push('cache.defaultTTL must be a number');
        }
        
        return {
            isValid: errors.length === 0,
            errors,
            validatedBy: 'JavaScript ConfigUtils'
        };
    }
};

// ============================================
// JAVASCRIPT MODULE EXPORTS
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    // Node.js JavaScript environment
    module.exports = {
        AppConfig,
        Constants,
        Environment,
        LoggerConfig,
        ConfigUtils
    };
} else {
    // Browser JavaScript environment
    window.AppConfiguration = {
        AppConfig,
        Constants,
        Environment,
        LoggerConfig,
        ConfigUtils
    };
}

// ============================================
// JAVASCRIPT INITIALIZATION
// ============================================

// Log JavaScript configuration loading
if (typeof console !== 'undefined') {
    console.log('⚙️ JavaScript: Configuration loaded successfully');
    console.log('🔧 Language: JavaScript ES6+');
    console.log('🌍 Environment:', Environment.isBrowser ? 'Browser' : 'Node.js');
    console.log('📊 JavaScript Version:', Environment.getJavaScriptVersion());
    console.log('🎯 Framework: React + JavaScript');
    
    // Validate configuration
    const validation = ConfigUtils.validateConfig(AppConfig);
    if (validation.isValid) {
        console.log('✅ JavaScript: Configuration validation passed');
    } else {
        console.warn('⚠️ JavaScript: Configuration validation failed:', validation.errors);
    }
}

// Export as default for ES6 modules
if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports.default = AppConfig;
} else if (typeof define === 'function' && define.amd) {
    define([], () => AppConfig);
} else if (typeof window !== 'undefined') {
    window.TodoAppConfig = AppConfig;
}

console.log('🎉 JavaScript: Configuration module initialization complete');