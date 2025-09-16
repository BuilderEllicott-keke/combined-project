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

Create a `.env` file in the root directory with the following variables:

```env
AUTH_USERNAME=your_username
AUTH_PASSWORD=your_password
SECRET_KEY=your_secret_key
```

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

- Password-based authentication
- Session management
- Browser fingerprinting for security binding
- Secure cookie handling

## Customization

- Modify `assets/json/combined-games.json` to add/remove games
- Update `assets/js/001.js` for UI customizations
- Change branding in the HTML files

## License

MIT License - See LICENSE file for details

## Support

For issues or questions, please contact the development team.
