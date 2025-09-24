// Mobile CSS loader script
// This script detects mobile devices and conditionally loads mobile-specific CSS

(function() {
    'use strict';
    
    // Mobile detection function
    function isMobileDevice() {
        // Check user agent for mobile devices
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
        const isMobileUserAgent = mobileRegex.test(navigator.userAgent);
        
        // Check screen width (max-width: 768px)
        const isMobileWidth = window.innerWidth <= 768;
        
        // Check touch capability
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Return true if any mobile criteria is met
        return isMobileUserAgent || (isMobileWidth && isTouchDevice);
    }
    
    // Function to load mobile CSS based on current page
    function loadMobileCSSForCurrentPage() {
        if (!isMobileDevice()) {
            return; // Exit if not a mobile device
        }
        
        // Get current page path
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop().toLowerCase();
        
        // Map pages to their mobile CSS files
        const mobileCSS = {
            'index.html': 'mobile-index.css',
            '': 'mobile-index.css', // For root path
            'about.html': 'mobile-about.css',
            'price.html': 'mobile-price.css',
            'book.html': 'mobile-book.css',
            'news.html': 'mobile-news.css',
            'ourworks.html': 'mobile-ourworks.css'
        };
        
        // Determine which mobile CSS to load
        let mobileFileName = mobileCSS[currentPage];
        
        // Fallback to index if page not found
        if (!mobileFileName) {
            // Check if we're in a subdirectory
            if (currentPath.includes('/News/')) {
                mobileFileName = '../mobile-news.css';
            } else if (currentPath.includes('/ourworks/')) {
                mobileFileName = '../mobile-ourworks.css';
            } else {
                mobileFileName = 'mobile-index.css'; // Default fallback
            }
        }
        
        // Create and inject mobile CSS link
        const mobileLink = document.createElement('link');
        mobileLink.rel = 'stylesheet';
        mobileLink.type = 'text/css';
        mobileLink.href = mobileFileName;
        mobileLink.media = 'screen and (max-width: 768px)';
        mobileLink.id = 'mobile-css';
        
        // Add to head
        document.head.appendChild(mobileLink);
        
        // Add mobile class to body for additional styling hooks
        document.body.classList.add('mobile-device');
        
        console.log('Mobile CSS loaded:', mobileFileName);
    }
    
    // Function to handle orientation changes
    function handleOrientationChange() {
        // Force re-evaluation of mobile styles on orientation change
        setTimeout(function() {
            // Trigger a resize event to ensure proper responsive behavior
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }
    
    // Function to add mobile-specific meta tags if not present
    function ensureMobileMetaTags() {
        // Check if viewport meta tag exists
        let viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
            viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            viewportMeta.content = 'width=device-width, initial-scale=1.0, user-scalable=yes';
            document.head.appendChild(viewportMeta);
        }
        
        // Add mobile-web-app-capable for iOS
        if (!document.querySelector('meta[name="mobile-web-app-capable"]')) {
            const mobileCapableMeta = document.createElement('meta');
            mobileCapableMeta.name = 'mobile-web-app-capable';
            mobileCapableMeta.content = 'yes';
            document.head.appendChild(mobileCapableMeta);
        }
        
        // Add touch icon for iOS
        if (!document.querySelector('link[rel="apple-touch-icon"]')) {
            const touchIcon = document.createElement('link');
            touchIcon.rel = 'apple-touch-icon';
            touchIcon.href = 'images/favicon.ico';
            document.head.appendChild(touchIcon);
        }
    }
    
    // Function to optimize mobile performance
    function optimizeMobilePerformance() {
        if (!isMobileDevice()) return;
        
        // Disable hover effects on mobile by adding CSS
        const style = document.createElement('style');
        style.textContent = `
            @media (hover: none) and (pointer: coarse) {
                * {
                    -webkit-touch-callout: none;
                }
                *:hover {
                    -webkit-tap-highlight-color: transparent;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add passive event listeners for better scroll performance
        if ('addEventListener' in document) {
            document.addEventListener('touchstart', function() {}, {passive: true});
            document.addEventListener('touchmove', function() {}, {passive: true});
        }
    }
    
    // Main initialization function
    function initMobileSupport() {
        // Load mobile CSS
        loadMobileCSSForCurrentPage();
        
        // Ensure mobile meta tags
        ensureMobileMetaTags();
        
        // Optimize for mobile
        optimizeMobilePerformance();
        
        // Handle orientation changes
        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleOrientationChange);
        
        // Debug info
        if (isMobileDevice()) {
            console.log('Mobile device detected');
            console.log('User Agent:', navigator.userAgent);
            console.log('Screen dimensions:', window.innerWidth + 'x' + window.innerHeight);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileSupport);
    } else {
        initMobileSupport();
    }
    
    // Export functions for manual control if needed
    window.MobileCSS = {
        isMobile: isMobileDevice,
        loadCSS: loadMobileCSSForCurrentPage,
        init: initMobileSupport
    };
    
})();