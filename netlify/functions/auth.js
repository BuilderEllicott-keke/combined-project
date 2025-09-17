const crypto = require('crypto');

// Function to get current date in MonthDD_YY format
function getCurrentDateCode() {
  const now = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[now.getMonth()];
  const day = String(now.getDate()).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  return `${month}${day}_${year}`;
}

// Function to get daily access code
function getDailyAccessCode() {
  const dateCode = getCurrentDateCode();
  return process.env[dateCode];
}

// Function to check if user is admin
function isAdminUser(password) {
  return password === 'Ellicott111010!';
}

// Function to log access attempt
function logAccessAttempt(userType, success, ip) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    userType,
    success,
    ip,
    dateCode: getCurrentDateCode()
  };
  
  // In a real implementation, you would save this to a database
  console.log('Access attempt:', logEntry);
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { password } = JSON.parse(event.body);
    const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
    
    // Check for admin access
    if (isAdminUser(password)) {
      logAccessAttempt('admin', true, clientIP);
      
      // Generate admin session token
      const sessionToken = crypto.randomBytes(32).toString('hex');
      
      return {
        statusCode: 200,
        headers: {
          'Set-Cookie': `session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: true, 
          message: 'Admin authentication successful',
          sessionToken: sessionToken,
          userType: 'admin',
          dateCode: getCurrentDateCode()
        })
      };
    }
    
    // Check daily access code
    const dailyCode = getDailyAccessCode();
    const currentDateCode = getCurrentDateCode();
    
    if (!dailyCode) {
      logAccessAttempt('user', false, clientIP);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          success: false, 
          error: `No access code available for ${currentDateCode}. Please contact administrator.` 
        })
      };
    }

    if (password === dailyCode) {
      logAccessAttempt('user', true, clientIP);
      
      // Generate user session token
      const sessionToken = crypto.randomBytes(32).toString('hex');
      
      return {
        statusCode: 200,
        headers: {
          'Set-Cookie': `session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: true, 
          message: 'Authentication successful',
          sessionToken: sessionToken,
          userType: 'user',
          dateCode: currentDateCode
        })
      };
    } else {
      logAccessAttempt('user', false, clientIP);
      return {
        statusCode: 401,
        body: JSON.stringify({ 
          success: false, 
          error: `Invalid access code for ${currentDateCode}. Please check your daily code.` 
        })
      };
    }
  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        success: false, 
        error: 'Invalid request format' 
      })
    };
  }
};
