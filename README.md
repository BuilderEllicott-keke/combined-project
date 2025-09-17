# Intersellar - GE Custom

A combined game library featuring the Interstellar design with password protection and all games from both the game-site and Interstellar projects.

## Features

- **Password Protection**: Secure access using Netlify environment variables
- **Combined Game Library**: All games from both original projects
- **Modern Design**: Based on Interstellar's sleek interface
- **Custom Branding**: Renamed to "Intersellar - GE Custom"
- **Responsive**: Works on all devices
- **Settings Management**: Customizable themes, cloaking, and preferences

## Setup Instructions

### 1. Environment Variables

The system uses an intelligent daily access code system that automatically generates secure codes. Set up your environment variables in Netlify:

#### Required Variables (Only 2 needed!):
- **Admin Code**: `Ellicott111010!` (for admin access)
- **Secret Salt**: A secure random string for code generation

#### Example Environment Variables:
```env
# Admin access (special privileges)
ADMIN_CODE=Ellicott111010!

# Secret salt for code generation (change this!)
SECRET_SALT=your-secret-salt-here-change-this
```

#### How It Works:
- **Automatic Code Generation**: The system generates unique daily codes based on the current date + secret salt
- **Deterministic**: Same date always generates the same code (consistent)
- **Secure**: Codes are unpredictable without knowing the secret salt
- **No Manual Management**: No need to manually manage 365 environment variables

#### Complete Setup:
1. Copy the 2 variables from `env-simplified.txt`
2. Change `SECRET_SALT` to something secure and unique
3. Deploy to Netlify
4. The system automatically generates daily codes as needed

### 2. Netlify Deployment

1. Connect your repository to Netlify
2. Set the environment variables in Netlify's dashboard:
   - Go to Site settings > Environment variables
   - Add the variables from step 1
3. Deploy the site

### 3. Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

## Project Structure

```
combined-project/
├── assets/
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   ├── json/          # Game configuration
│   └── media/         # Icons and images
├── netlify/
│   └── functions/     # Netlify serverless functions
├── index.html         # Main page
├── games.html         # Games page
├── apps.html          # Apps page
├── settings.html      # Settings page
├── login.html         # Login page
└── netlify.toml       # Netlify configuration
```

## Game Library

The combined project includes games from:
- Original game-site library
- Interstellar game library
- All games are accessible through the unified interface

## Security Features

- **Daily Access Code System**: Unique codes for each day of the year
- **Admin Privileges**: Special access for system administration
- **Session Management**: Secure token-based authentication
- **Access Logging**: Track all login attempts and user activity
- **Stealth Mode**: Appears as blank tab to external monitoring
- **Browser Fingerprinting**: Security binding for additional protection
- **Secure Cookie Handling**: HttpOnly, Secure, SameSite cookies

## Customization

- Modify `assets/json/combined-games.json` to add/remove games
- Update `assets/js/001.js` for UI customizations
- Change branding in the HTML files

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please contact the development team.
