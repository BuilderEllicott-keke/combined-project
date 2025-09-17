exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get session token from cookies
    const cookies = event.headers.cookie || '';
    const sessionMatch = cookies.match(/session=([^;]+)/);
    
    if (!sessionMatch) {
      return {
        statusCode: 401,
        body: JSON.stringify({ 
          authenticated: false, 
          error: 'No session found' 
        })
      };
    }

    const sessionToken = sessionMatch[1];
    
    // In a real application, you would verify the session token against a database
    // For this example, we'll just check if it exists and has the right format
    if (sessionToken && sessionToken.length === 64) {
      // Get current date code for context
      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[now.getMonth()];
      const day = String(now.getDate()).padStart(2, '0');
      const year = String(now.getFullYear()).slice(-2);
      const currentDateCode = `${month}${day}_${year}`;
      
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          authenticated: true,
          message: 'Session valid',
          dateCode: currentDateCode,
          timestamp: now.toISOString()
        })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ 
          authenticated: false, 
          error: 'Invalid session' 
        })
      };
    }
  } catch (error) {
    console.error('Session verification error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        authenticated: false, 
        error: 'Server error' 
      })
    };
  }
};
