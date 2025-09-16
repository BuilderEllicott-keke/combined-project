const crypto = require('crypto');

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
    
    // Get the password from environment variables
    const correctPassword = process.env.AUTH_PASSWORD;
    
    if (!correctPassword) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    if (password === correctPassword) {
      // Generate a session token
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
          sessionToken: sessionToken
        })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid password' 
        })
      };
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        success: false, 
        error: 'Invalid request format' 
      })
    };
  }
};
