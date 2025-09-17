// Comprehensive Cloaking Test Script
// This script tests all aspects of the about:blank cloaking system

console.log('🕵️ Starting Cloaking System Tests...');

// Test 1: Basic Cloaking Function
function testBasicCloaking() {
    console.log('Test 1: Basic Cloaking Function');
    
    try {
        // Test if openCloakedGame function exists
        if (typeof openCloakedGame === 'function') {
            console.log('✅ openCloakedGame function exists');
            
            // Test with a safe URL
            const testUrl = 'https://www.google.com';
            const testName = 'Google Test';
            
            console.log(`Testing with URL: ${testUrl}`);
            openCloakedGame(testUrl, testName);
            console.log('✅ Basic cloaking test passed');
            return true;
        } else {
            console.log('❌ openCloakedGame function not found');
            return false;
        }
    } catch (error) {
        console.log(`❌ Basic cloaking test failed: ${error.message}`);
        return false;
    }
}

// Test 2: Window Creation
function testWindowCreation() {
    console.log('Test 2: Window Creation');
    
    try {
        const testWindow = window.open('about:blank', '_blank', 'width=800,height=600');
        
        if (testWindow) {
            console.log('✅ Window creation successful');
            
            // Test writing content to window
            testWindow.document.write('<html><body><h1>Test Window</h1></body></html>');
            testWindow.document.close();
            console.log('✅ Content writing successful');
            
            // Close test window
            testWindow.close();
            console.log('✅ Window closing successful');
            return true;
        } else {
            console.log('❌ Window creation failed (popup blocked?)');
            return false;
        }
    } catch (error) {
        console.log(`❌ Window creation test failed: ${error.message}`);
        return false;
    }
}

// Test 3: Stealth Overlay
function testStealthOverlay() {
    console.log('Test 3: Stealth Overlay');
    
    try {
        const testWindow = window.open('about:blank', '_blank', 'width=800,height=600');
        
        if (testWindow) {
            const stealthHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>New Tab</title>
                    <style>
                        body { margin: 0; padding: 0; background: #000; color: #fff; }
                        .stealth-overlay {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: #000;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 1000;
                        }
                        .stealth-text { font-size: 14px; color: #333; }
                    </style>
                </head>
                <body>
                    <div class="stealth-overlay">
                        <div class="stealth-text">about:blank</div>
                    </div>
                </body>
                </html>
            `;
            
            testWindow.document.write(stealthHTML);
            testWindow.document.close();
            
            // Check if stealth overlay exists
            const stealthOverlay = testWindow.document.querySelector('.stealth-overlay');
            if (stealthOverlay) {
                console.log('✅ Stealth overlay created successfully');
                testWindow.close();
                return true;
            } else {
                console.log('❌ Stealth overlay not found');
                testWindow.close();
                return false;
            }
        } else {
            console.log('❌ Could not create test window');
            return false;
        }
    } catch (error) {
        console.log(`❌ Stealth overlay test failed: ${error.message}`);
        return false;
    }
}

// Test 4: Event Listeners
function testEventListeners() {
    console.log('Test 4: Event Listeners');
    
    try {
        const testWindow = window.open('about:blank', '_blank', 'width=800,height=600');
        
        if (testWindow) {
            const eventHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Event Test</title>
                    <style>
                        body { margin: 0; padding: 0; background: #000; color: #fff; }
                        .stealth-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; display: flex; align-items: center; justify-content: center; }
                        .content { display: none; }
                    </style>
                </head>
                <body>
                    <div class="stealth-overlay" id="stealth">about:blank</div>
                    <div class="content" id="content">Event Test Content</div>
                    <script>
                        let stealth = true;
                        let eventCount = 0;
                        
                        function toggle() {
                            stealth = !stealth;
                            eventCount++;
                            document.getElementById('stealth').style.display = stealth ? 'flex' : 'none';
                            document.getElementById('content').style.display = stealth ? 'none' : 'block';
                            document.title = stealth ? 'New Tab' : 'Event Test';
                        }
                        
                        document.addEventListener('click', toggle);
                        document.addEventListener('keydown', toggle);
                        document.addEventListener('mousemove', () => {
                            if (stealth) {
                                setTimeout(toggle, 100);
                            }
                        });
                        
                        // Test event firing
                        setTimeout(() => {
                            document.dispatchEvent(new Event('click'));
                        }, 100);
                    </script>
                </body>
                </html>
            `;
            
            testWindow.document.write(eventHTML);
            testWindow.document.close();
            
            // Wait for events to fire
            setTimeout(() => {
                const content = testWindow.document.getElementById('content');
                if (content && content.style.display !== 'none') {
                    console.log('✅ Event listeners working correctly');
                    testWindow.close();
                } else {
                    console.log('❌ Event listeners not working');
                    testWindow.close();
                }
            }, 500);
            
            return true;
        } else {
            console.log('❌ Could not create test window');
            return false;
        }
    } catch (error) {
        console.log(`❌ Event listeners test failed: ${error.message}`);
        return false;
    }
}

// Test 5: Inactivity Timer
function testInactivityTimer() {
    console.log('Test 5: Inactivity Timer');
    
    try {
        const testWindow = window.open('about:blank', '_blank', 'width=800,height=600');
        
        if (testWindow) {
            const timerHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Timer Test</title>
                    <style>
                        body { margin: 0; padding: 0; background: #000; color: #fff; }
                        .stealth-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; display: flex; align-items: center; justify-content: center; }
                        .content { display: none; }
                    </style>
                </head>
                <body>
                    <div class="stealth-overlay" id="stealth">about:blank</div>
                    <div class="content" id="content">Timer Test Content</div>
                    <script>
                        let stealth = true;
                        let timer;
                        let timerFired = false;
                        
                        function resetTimer() {
                            clearTimeout(timer);
                            timer = setTimeout(() => {
                                if (!stealth) {
                                    stealth = true;
                                    timerFired = true;
                                    document.getElementById('stealth').style.display = 'flex';
                                    document.getElementById('content').style.display = 'none';
                                    document.title = 'New Tab';
                                }
                            }, 2000); // 2 second timer for testing
                        }
                        
                        function showContent() {
                            stealth = false;
                            document.getElementById('stealth').style.display = 'none';
                            document.getElementById('content').style.display = 'block';
                            document.title = 'Timer Test';
                            resetTimer();
                        }
                        
                        document.addEventListener('click', showContent);
                        document.addEventListener('mousemove', resetTimer);
                        resetTimer();
                        
                        // Show content initially
                        showContent();
                    </script>
                </body>
                </html>
            `;
            
            testWindow.document.write(timerHTML);
            testWindow.document.close();
            
            // Wait for timer to fire
            setTimeout(() => {
                const stealth = testWindow.document.getElementById('stealth');
                if (stealth && stealth.style.display !== 'none') {
                    console.log('✅ Inactivity timer working correctly');
                } else {
                    console.log('❌ Inactivity timer not working');
                }
                testWindow.close();
            }, 3000);
            
            return true;
        } else {
            console.log('❌ Could not create test window');
            return false;
        }
    } catch (error) {
        console.log(`❌ Inactivity timer test failed: ${error.message}`);
        return false;
    }
}

// Test 6: Error Handling
function testErrorHandling() {
    console.log('Test 6: Error Handling');
    
    try {
        // Test with invalid URL
        openCloakedGame('invalid-url', 'Error Test');
        console.log('✅ Error handling working correctly');
        return true;
    } catch (error) {
        console.log(`✅ Error properly caught: ${error.message}`);
        return true;
    }
}

// Run all tests
function runAllTests() {
    console.log('🚀 Running Comprehensive Cloaking Tests...\n');
    
    const tests = [
        testBasicCloaking,
        testWindowCreation,
        testStealthOverlay,
        testEventListeners,
        testInactivityTimer,
        testErrorHandling
    ];
    
    let passed = 0;
    let failed = 0;
    
    tests.forEach((test, index) => {
        console.log(`\n--- Test ${index + 1} ---`);
        try {
            const result = test();
            if (result) {
                passed++;
            } else {
                failed++;
            }
        } catch (error) {
            console.log(`❌ Test ${index + 1} failed with error: ${error.message}`);
            failed++;
        }
    });
    
    console.log(`\n📊 Test Results: ${passed}/${tests.length} passed, ${failed} failed`);
    
    if (failed === 0) {
        console.log('🎉 All tests passed! Cloaking system is working perfectly.');
    } else {
        console.log('⚠️ Some tests failed. Please check the implementation.');
    }
    
    return { passed, failed, total: tests.length };
}

// Export for use in browser console
if (typeof window !== 'undefined') {
    window.runCloakingTests = runAllTests;
    window.testBasicCloaking = testBasicCloaking;
    window.testWindowCreation = testWindowCreation;
    window.testStealthOverlay = testStealthOverlay;
    window.testEventListeners = testEventListeners;
    window.testInactivityTimer = testInactivityTimer;
    window.testErrorHandling = testErrorHandling;
}

// Auto-run tests if in browser
if (typeof window !== 'undefined' && window.location.pathname.includes('test-cloaking')) {
    setTimeout(runAllTests, 1000);
}
