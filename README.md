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

The system uses a daily access code system for enhanced security. Set up your environment variables in Netlify:

#### Required Variables:
- **Admin Code**: `Ellicott111010!` (for admin access)
- **Daily Access Codes**: One for each day of the year in format `MonthDD_Year=AccessCode`

#### Example Environment Variables:
```env
# Admin access (special privileges)
ADMIN_CODE=Ellicott111010!

# Daily access codes (MonthDD_Year format)
Sep17_25=pdF9FR7b32:np9ffBUMvh
Sep18_25=xXVYGdsfae:nQfDsFsXP5
Sep19_25=CTxwLhr9FZ:B8gLPmxjvp
# ... continue for all 365 days
```

#### Complete Setup:
1. Copy the template from `env-template.txt`
2. Generate unique access codes for each day
3. Add all 365 codes to Netlify environment variables
4. The system automatically uses the correct code based on current date

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
