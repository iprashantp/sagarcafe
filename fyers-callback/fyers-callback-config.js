// ============================================================================
// Fyers Authentication Callback - Configuration
// ============================================================================
// This page is hosted on sagarcafe.in but communicates with YOUR computer
// The JavaScript runs in YOUR BROWSER, so localhost = YOUR COMPUTER
// ============================================================================

const STOCKWOLF_CONFIG = {
    
    // ========================================================================
    // StockCrab API URL (YOUR computer where StockCrab is running)
    // ========================================================================
    
    // ✅ DEFAULT: If you're logging in from the SAME computer running StockCrab
    API_BASE_URL: 'http://localhost:8014',
    
    // 📱 If logging in from PHONE or OTHER DEVICE on same WiFi:
    // 1. Find your computer's IP: Open CMD → type: ipconfig
    // 2. Look for "IPv4 Address" (usually 192.168.x.x)
    // 3. Uncomment and update below:
    // API_BASE_URL: 'http://192.168.1.100:8014',
    
    // 🌐 If StockCrab is PUBLIC (ngrok, Cloudflare Tunnel, etc):
    // API_BASE_URL: 'https://abc123.ngrok.io',
    
    
    // ========================================================================
    // Dashboard URL (where to go after successful authentication)
    // ========================================================================
    DASHBOARD_URL: 'http://localhost:8014/api/v1/auth/fyers/login',
    
    // Set to null to stay on success page:
    // DASHBOARD_URL: null,
    
    
    // ========================================================================
    // ADVANCED SETTINGS (usually don't need to change)
    // ========================================================================
    
    // Retry attempts if connection fails
    MAX_RETRIES: 3,
    
    // Wait time between retries (milliseconds)
    RETRY_DELAY_MS: 2000,
    
    // Auto-redirect delay after success (milliseconds)
    AUTO_REDIRECT_DELAY_MS: 3000,
    
    // Enable auto-redirect to dashboard after success
    ENABLE_AUTO_REDIRECT: true,
    
    // Show detailed logs in browser console (press F12)
    DEBUG_MODE: true,
    
    // API request timeout (milliseconds)
    API_TIMEOUT_MS: 30000,
};

// ============================================================================
// SETUP CHECKLIST:
// ============================================================================
// 1. ✅ Upload fyers-callback.html to sagarcafe.in
// 2. ✅ Upload this file (fyers-callback-config.js) to sagarcafe.in
// 3. ✅ Update Fyers App redirect URI: https://sagarcafe.in/fyers-callback.html
// 4. ✅ Make sure StockCrab is RUNNING: python run.py
// 5. ✅ Test: http://localhost:8014/api/v1/health should return JSON
// ============================================================================
