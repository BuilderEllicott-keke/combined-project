// Configuration example for Intersellar - GE Custom
// Copy this file to config.js and fill in your values

module.exports = {
  // Authentication credentials
  auth: {
    username: 'admin',
    password: 'password'
  },
  
  // Secret key for additional security
  secretKey: '92q83h823h892e9fn982q3j23f29i3f8929hf2q2diuigh827',
  
  // Site configuration
  site: {
    title: 'Intersellar - GE Custom',
    description: 'Combined game library with password protection'
  },
  
  // Security settings
  security: {
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    maxLoginAttempts: 5
  }
};
