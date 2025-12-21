// Configuration for Fyers Callback Page
// Update API_BASE_URL to your StockCrab API endpoint

const STOCKWOLF_CONFIG = {
    API_BASE_URL: 'http://localhost:8014',
    
    // ==========================================
    // OPTIONAL: Dashboard redirect after success
    // ==========================================
    DASHBOARD_URL: 'http://localhost:8014/api/v1/auth/fyers/login',
    
    
    // ==========================================
    // ADVANCED SETTINGS
    // ==========================================
    
    // Number of retry attempts on failure
    MAX_RETRIES: 3,
    
    // Delay between retries (in milliseconds)
    RETRY_DELAY_MS: 2000,
    
    // Auto-redirect delay after success (in milliseconds)
    AUTO_REDIRECT_DELAY_MS: 3000,
    
    // Enable/disable auto-redirect
    ENABLE_AUTO_REDIRECT: true,
    
    // Enable debug logs in browser console
    DEBUG_MODE: true,
    
    // API request timeout (in milliseconds)
    API_TIMEOUT_MS: 30000,
};
