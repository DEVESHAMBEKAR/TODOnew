/**
 * =====================================================
 * JAVASCRIPT ADVANCED ALGORITHMS AND DATA STRUCTURES
 * =====================================================
 * 
 * Comprehensive JavaScript algorithms library
 * Language: JavaScript ES2024+
 * Purpose: Advanced algorithms and data structures in JavaScript
 * Size: 800+ lines of pure JavaScript algorithms
 */

// ============================================
// JAVASCRIPT DATA STRUCTURES
// ============================================

/**
 * JavaScript Binary Search Tree implementation
 */
class JavaScriptBinarySearchTree {
    constructor() {
        this.root = null;
        this.size = 0;
        console.log('🌳 JavaScript: Binary Search Tree initialized');
    }

    /**
     * JavaScript method: Insert node into BST
     */
    insert(value) {
        console.log(`➕ JavaScript BST: Inserting value ${value}`);
        
        const newNode = {
            value,
            left: null,
            right: null,
            insertedAt: new Date().toISOString(),
            language: 'JavaScript'
        };

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
        
        this.size++;
        return this;
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    /**
     * JavaScript method: Search for value in BST
     */
    search(value) {
        console.log(`🔍 JavaScript BST: Searching for value ${value}`);
        return this.searchNode(this.root, value);
    }

    searchNode(node, value) {
        if (node === null) return null;
        if (value === node.value) return node;
        if (value < node.value) return this.searchNode(node.left, value);
        return this.searchNode(node.right, value);
    }

    /**
     * JavaScript method: In-order traversal
     */
    inOrder() {
        const result = [];
        this.inOrderTraversal(this.root, result);
        console.log('📋 JavaScript BST: In-order traversal:', result);
        return result;
    }

    inOrderTraversal(node, result) {
        if (node !== null) {
            this.inOrderTraversal(node.left, result);
            result.push(node.value);
            this.inOrderTraversal(node.right, result);
        }
    }
}

/**
 * JavaScript Hash Table implementation
 */
class JavaScriptHashTable {
    constructor(size = 100) {
        this.size = size;
        this.table = new Array(size);
        this.keys = [];
        console.log(`🗂️ JavaScript: Hash Table initialized with size ${size}`);
    }

    /**
     * JavaScript hash function
     */
    hash(key) {
        let hash = 0;
        const keyString = key.toString();
        
        for (let i = 0; i < keyString.length; i++) {
            const char = keyString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        return Math.abs(hash) % this.size;
    }

    /**
     * JavaScript method: Set key-value pair
     */
    set(key, value) {
        const index = this.hash(key);
        
        if (!this.table[index]) {
            this.table[index] = [];
        }
        
        const existingPair = this.table[index].find(pair => pair[0] === key);
        
        if (existingPair) {
            existingPair[1] = value;
        } else {
            this.table[index].push([key, value]);
            this.keys.push(key);
        }
        
        console.log(`📝 JavaScript Hash Table: Set ${key} = ${value} at index ${index}`);
        return this;
    }

    /**
     * JavaScript method: Get value by key
     */
    get(key) {
        const index = this.hash(key);
        const bucket = this.table[index];
        
        if (bucket) {
            const pair = bucket.find(pair => pair[0] === key);
            return pair ? pair[1] : undefined;
        }
        
        return undefined;
    }

    /**
     * JavaScript method: Get all keys
     */
    getKeys() {
        return [...this.keys];
    }
}

/**
 * JavaScript Queue implementation
 */
class JavaScriptQueue {
    constructor() {
        this.items = [];
        this.front = 0;
        this.rear = 0;
        console.log('📋 JavaScript: Queue initialized');
    }

    enqueue(item) {
        this.items[this.rear] = {
            value: item,
            enqueuedAt: new Date().toISOString(),
            language: 'JavaScript'
        };
        this.rear++;
        console.log(`➕ JavaScript Queue: Enqueued ${item}`);
        return this.size();
    }

    dequeue() {
        if (this.isEmpty()) {
            console.log('⚠️ JavaScript Queue: Cannot dequeue from empty queue');
            return null;
        }
        
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        
        console.log(`➖ JavaScript Queue: Dequeued ${item.value}`);
        return item.value;
    }

    isEmpty() {
        return this.front === this.rear;
    }

    size() {
        return this.rear - this.front;
    }
}

/**
 * JavaScript Stack implementation
 */
class JavaScriptStack {
    constructor() {
        this.items = [];
        console.log('📚 JavaScript: Stack initialized');
    }

    push(item) {
        const stackItem = {
            value: item,
            pushedAt: new Date().toISOString(),
            language: 'JavaScript'
        };
        
        this.items.push(stackItem);
        console.log(`⬆️ JavaScript Stack: Pushed ${item}`);
        return this.size();
    }

    pop() {
        if (this.isEmpty()) {
            console.log('⚠️ JavaScript Stack: Cannot pop from empty stack');
            return null;
        }
        
        const item = this.items.pop();
        console.log(`⬇️ JavaScript Stack: Popped ${item.value}`);
        return item.value;
    }

    peek() {
        if (this.isEmpty()) return null;
        return this.items[this.items.length - 1].value;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }
}

// ============================================
// JAVASCRIPT SORTING ALGORITHMS
// ============================================

/**
 * JavaScript Sorting Algorithms Collection
 */
class JavaScriptSortingAlgorithms {
    constructor() {
        console.log('🔢 JavaScript: Sorting Algorithms initialized');
    }

    /**
     * JavaScript Quick Sort implementation
     */
    quickSort(arr) {
        console.log('⚡ JavaScript: Executing Quick Sort algorithm');
        
        if (arr.length <= 1) return arr;
        
        const pivot = arr[Math.floor(arr.length / 2)];
        const less = [];
        const equal = [];
        const greater = [];
        
        for (const element of arr) {
            if (element < pivot) {
                less.push(element);
            } else if (element > pivot) {
                greater.push(element);
            } else {
                equal.push(element);
            }
        }
        
        const result = [
            ...this.quickSort(less),
            ...equal,
            ...this.quickSort(greater)
        ];
        
        console.log(`✅ JavaScript Quick Sort: Sorted ${arr.length} elements`);
        return result;
    }

    /**
     * JavaScript Merge Sort implementation
     */
    mergeSort(arr) {
        console.log('🔀 JavaScript: Executing Merge Sort algorithm');
        
        if (arr.length <= 1) return arr;
        
        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0, middle);
        const right = arr.slice(middle);
        
        return this.merge(this.mergeSort(left), this.mergeSort(right));
    }

    merge(left, right) {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        
        return result
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }

    /**
     * JavaScript Bubble Sort implementation
     */
    bubbleSort(arr) {
        console.log('💭 JavaScript: Executing Bubble Sort algorithm');
        
        const sorted = [...arr];
        const n = sorted.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (sorted[j] > sorted[j + 1]) {
                    // JavaScript array destructuring swap
                    [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
                }
            }
        }
        
        console.log(`✅ JavaScript Bubble Sort: Sorted ${arr.length} elements`);
        return sorted;
    }

    /**
     * JavaScript Insertion Sort implementation
     */
    insertionSort(arr) {
        console.log('📝 JavaScript: Executing Insertion Sort algorithm');
        
        const sorted = [...arr];
        
        for (let i = 1; i < sorted.length; i++) {
            const key = sorted[i];
            let j = i - 1;
            
            while (j >= 0 && sorted[j] > key) {
                sorted[j + 1] = sorted[j];
                j--;
            }
            
            sorted[j + 1] = key;
        }
        
        console.log(`✅ JavaScript Insertion Sort: Sorted ${arr.length} elements`);
        return sorted;
    }

    /**
     * JavaScript Heap Sort implementation
     */
    heapSort(arr) {
        console.log('🏔️ JavaScript: Executing Heap Sort algorithm');
        
        const sorted = [...arr];
        const n = sorted.length;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this.heapify(sorted, n, i);
        }
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            [sorted[0], sorted[i]] = [sorted[i], sorted[0]];
            this.heapify(sorted, i, 0);
        }
        
        console.log(`✅ JavaScript Heap Sort: Sorted ${arr.length} elements`);
        return sorted;
    }

    heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this.heapify(arr, n, largest);
        }
    }
}

// ============================================
// JAVASCRIPT SEARCH ALGORITHMS
// ============================================

/**
 * JavaScript Search Algorithms Collection
 */
class JavaScriptSearchAlgorithms {
    constructor() {
        console.log('🔍 JavaScript: Search Algorithms initialized');
    }

    /**
     * JavaScript Binary Search implementation
     */
    binarySearch(arr, target) {
        console.log(`🎯 JavaScript: Binary search for ${target} in array of ${arr.length} elements`);
        
        let left = 0;
        let right = arr.length - 1;
        let iterations = 0;
        
        while (left <= right) {
            iterations++;
            const mid = Math.floor((left + right) / 2);
            
            if (arr[mid] === target) {
                console.log(`✅ JavaScript Binary Search: Found ${target} at index ${mid} in ${iterations} iterations`);
                return mid;
            }
            
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        console.log(`❌ JavaScript Binary Search: ${target} not found after ${iterations} iterations`);
        return -1;
    }

    /**
     * JavaScript Linear Search implementation
     */
    linearSearch(arr, target) {
        console.log(`🔍 JavaScript: Linear search for ${target} in array of ${arr.length} elements`);
        
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === target) {
                console.log(`✅ JavaScript Linear Search: Found ${target} at index ${i}`);
                return i;
            }
        }
        
        console.log(`❌ JavaScript Linear Search: ${target} not found`);
        return -1;
    }

    /**
     * JavaScript Jump Search implementation
     */
    jumpSearch(arr, target) {
        console.log(`🦘 JavaScript: Jump search for ${target} in array of ${arr.length} elements`);
        
        const n = arr.length;
        const step = Math.floor(Math.sqrt(n));
        let prev = 0;
        
        // Find the block where element is present
        while (arr[Math.min(step, n) - 1] < target) {
            prev = step;
            step += Math.floor(Math.sqrt(n));
            
            if (prev >= n) {
                console.log(`❌ JavaScript Jump Search: ${target} not found`);
                return -1;
            }
        }
        
        // Linear search in the identified block
        while (arr[prev] < target) {
            prev++;
            
            if (prev === Math.min(step, n)) {
                console.log(`❌ JavaScript Jump Search: ${target} not found`);
                return -1;
            }
        }
        
        if (arr[prev] === target) {
            console.log(`✅ JavaScript Jump Search: Found ${target} at index ${prev}`);
            return prev;
        }
        
        console.log(`❌ JavaScript Jump Search: ${target} not found`);
        return -1;
    }
}

// ============================================
// JAVASCRIPT GRAPH ALGORITHMS
// ============================================

/**
 * JavaScript Graph implementation
 */
class JavaScriptGraph {
    constructor() {
        this.adjacencyList = new Map();
        console.log('🕸️ JavaScript: Graph initialized');
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
            console.log(`➕ JavaScript Graph: Added vertex ${vertex}`);
        }
    }

    addEdge(vertex1, vertex2) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        
        this.adjacencyList.get(vertex1).push(vertex2);
        this.adjacencyList.get(vertex2).push(vertex1);
        
        console.log(`🔗 JavaScript Graph: Added edge between ${vertex1} and ${vertex2}`);
    }

    /**
     * JavaScript Breadth-First Search implementation
     */
    bfs(startVertex) {
        console.log(`🌊 JavaScript: BFS traversal starting from ${startVertex}`);
        
        const visited = new Set();
        const queue = new JavaScriptQueue();
        const result = [];
        
        queue.enqueue(startVertex);
        visited.add(startVertex);
        
        while (!queue.isEmpty()) {
            const currentVertex = queue.dequeue();
            result.push(currentVertex);
            
            const neighbors = this.adjacencyList.get(currentVertex) || [];
            
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.enqueue(neighbor);
                }
            }
        }
        
        console.log(`✅ JavaScript BFS: Traversed vertices: ${result.join(' -> ')}`);
        return result;
    }

    /**
     * JavaScript Depth-First Search implementation
     */
    dfs(startVertex) {
        console.log(`🏔️ JavaScript: DFS traversal starting from ${startVertex}`);
        
        const visited = new Set();
        const result = [];
        
        this.dfsHelper(startVertex, visited, result);
        
        console.log(`✅ JavaScript DFS: Traversed vertices: ${result.join(' -> ')}`);
        return result;
    }

    dfsHelper(vertex, visited, result) {
        visited.add(vertex);
        result.push(vertex);
        
        const neighbors = this.adjacencyList.get(vertex) || [];
        
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                this.dfsHelper(neighbor, visited, result);
            }
        }
    }

    /**
     * JavaScript Dijkstra's shortest path algorithm
     */
    dijkstra(startVertex) {
        console.log(`🎯 JavaScript: Dijkstra's algorithm starting from ${startVertex}`);
        
        const distances = new Map();
        const previous = new Map();
        const unvisited = new Set();
        
        // Initialize distances
        for (const vertex of this.adjacencyList.keys()) {
            distances.set(vertex, vertex === startVertex ? 0 : Infinity);
            unvisited.add(vertex);
        }
        
        while (unvisited.size > 0) {
            // Find unvisited vertex with minimum distance
            let currentVertex = null;
            let minDistance = Infinity;
            
            for (const vertex of unvisited) {
                if (distances.get(vertex) < minDistance) {
                    minDistance = distances.get(vertex);
                    currentVertex = vertex;
                }
            }
            
            if (currentVertex === null) break;
            
            unvisited.delete(currentVertex);
            
            const neighbors = this.adjacencyList.get(currentVertex) || [];
            
            for (const neighbor of neighbors) {
                if (unvisited.has(neighbor)) {
                    const newDistance = distances.get(currentVertex) + 1; // Assuming weight 1
                    
                    if (newDistance < distances.get(neighbor)) {
                        distances.set(neighbor, newDistance);
                        previous.set(neighbor, currentVertex);
                    }
                }
            }
        }
        
        console.log(`✅ JavaScript Dijkstra: Calculated shortest paths from ${startVertex}`);
        return { distances, previous };
    }
}

// ============================================
// JAVASCRIPT ALGORITHM UTILITIES
// ============================================

/**
 * JavaScript Algorithm Performance Tester
 */
class JavaScriptAlgorithmTester {
    constructor() {
        console.log('⏱️ JavaScript: Algorithm Performance Tester initialized');
    }

    /**
     * Test sorting algorithm performance
     */
    testSortingPerformance(algorithm, data) {
        console.log(`🏁 JavaScript: Testing ${algorithm.name} with ${data.length} elements`);
        
        const startTime = performance.now();
        const result = algorithm(data);
        const endTime = performance.now();
        
        const duration = endTime - startTime;
        
        console.log(`⏱️ JavaScript: ${algorithm.name} completed in ${duration.toFixed(2)}ms`);
        
        return {
            algorithmName: algorithm.name,
            dataSize: data.length,
            duration: duration,
            isSorted: this.isSorted(result),
            language: 'JavaScript'
        };
    }

    /**
     * Verify if array is sorted
     */
    isSorted(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Generate random test data
     */
    generateTestData(size, min = 0, max = 1000) {
        console.log(`🎲 JavaScript: Generating ${size} random numbers between ${min} and ${max}`);
        
        const data = [];
        for (let i = 0; i < size; i++) {
            data.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        
        return data;
    }

    /**
     * Run comprehensive algorithm tests
     */
    runComprehensiveTests() {
        console.log('🧪 JavaScript: Running comprehensive algorithm tests...');
        
        const algorithms = new JavaScriptSortingAlgorithms();
        const testSizes = [100, 1000, 5000];
        const results = [];
        
        for (const size of testSizes) {
            const testData = this.generateTestData(size);
            
            // Test different sorting algorithms
            const sortingTests = [
                { name: 'quickSort', func: algorithms.quickSort.bind(algorithms) },
                { name: 'mergeSort', func: algorithms.mergeSort.bind(algorithms) },
                { name: 'bubbleSort', func: algorithms.bubbleSort.bind(algorithms) },
                { name: 'insertionSort', func: algorithms.insertionSort.bind(algorithms) },
                { name: 'heapSort', func: algorithms.heapSort.bind(algorithms) }
            ];
            
            for (const test of sortingTests) {
                const result = this.testSortingPerformance(test.func, [...testData]);
                results.push(result);
            }
        }
        
        console.log('📊 JavaScript: Comprehensive test results:', results);
        return results;
    }
}

// ============================================
// JAVASCRIPT MODULE EXPORTS
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        JavaScriptBinarySearchTree,
        JavaScriptHashTable,
        JavaScriptQueue,
        JavaScriptStack,
        JavaScriptSortingAlgorithms,
        JavaScriptSearchAlgorithms,
        JavaScriptGraph,
        JavaScriptAlgorithmTester
    };
} else {
    window.JavaScriptAlgorithms = {
        JavaScriptBinarySearchTree,
        JavaScriptHashTable,
        JavaScriptQueue,
        JavaScriptStack,
        JavaScriptSortingAlgorithms,
        JavaScriptSearchAlgorithms,
        JavaScriptGraph,
        JavaScriptAlgorithmTester
    };
}

console.log('🧮 JavaScript: Advanced Algorithms and Data Structures loaded');
console.log('📏 Size: 800+ lines of pure JavaScript algorithms');
console.log('🎯 Purpose: Demonstrate advanced JavaScript programming');
console.log('🏗️ Implementation: Native JavaScript ES2024+ features');