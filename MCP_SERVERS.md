# MCP Servers Configuration

This project now includes a comprehensive set of Model Context Protocol (MCP) servers that provide AI assistants with access to various tools and services. These servers are configured across multiple AI platforms and IDEs.

## Available MCP Servers

### Core Development Tools

#### **Svelte** (`@sveltejs/mcp`)
- **Purpose**: Comprehensive Svelte 5 and SvelteKit documentation access
- **Features**: Documentation sections, code analysis, playground links
- **Configuration**: No additional setup required

#### **Filesystem** (`@modelcontextprotocol/server-filesystem`)
- **Purpose**: File system operations within the project directory
- **Features**: Read, write, create, delete files and directories
- **Configuration**: Pre-configured for current project path

#### **Git** (`@modelcontextprotocol/server-git`)
- **Purpose**: Git repository operations and version control
- **Features**: Commit, branch, merge, status, log operations
- **Configuration**: Pre-configured for current project repository

#### **Fetch** (`@modelcontextprotocol/server-fetch`)
- **Purpose**: HTTP requests and web content retrieval
- **Features**: GET, POST, PUT, DELETE requests with headers
- **Configuration**: No additional setup required

### Database Integration

#### **SQLite** (`@modelcontextprotocol/server-sqlite`)
- **Purpose**: SQLite database operations
- **Features**: Query, create, update, delete database operations
- **Configuration**: No additional setup required

#### **PostgreSQL** (`@modelcontextprotocol/server-postgres`)
- **Purpose**: PostgreSQL database integration
- **Features**: Full SQL operations, schema inspection
- **Configuration**: Requires `POSTGRES_CONNECTION_STRING` environment variable

### Development Services

#### **GitHub** (`@modelcontextprotocol/server-github`)
- **Purpose**: GitHub API integration
- **Features**: Repository management, issues, PRs, releases
- **Configuration**: Requires `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable

#### **Supabase** (`@modelcontextprotocol/server-supabase`)
- **Purpose**: Supabase database and storage integration
- **Features**: CRUD queries, storage operations, RPC calls
- **Configuration**: Requires `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

#### **Stripe** (`@modelcontextprotocol/server-stripe`)
- **Purpose**: Payments and checkout for bookings
- **Features**: Payment intents, customers, invoices
- **Configuration**: Requires `STRIPE_SECRET_KEY`

#### **SendGrid** (`@modelcontextprotocol/server-sendgrid`)
- **Purpose**: Transactional email sending
- **Features**: Single sends, templates, categories
- **Configuration**: Requires `SENDGRID_API_KEY`

#### **Google Calendar** (`@modelcontextprotocol/server-google-calendar`)
- **Purpose**: Calendar sync for studio bookings
- **Features**: Events read/write, calendar listing
- **Configuration**: Requires `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`

#### **Algolia** (`@modelcontextprotocol/server-algolia`)
- **Purpose**: Site search indexing and querying
- **Features**: Index management, search, analytics
- **Configuration**: Requires `ALGOLIA_APP_ID` and `ALGOLIA_API_KEY`

#### **NPM Search** (`@modelcontextprotocol/server-npm-search`)
- **Purpose**: Search and retrieve NPM package information
- **Features**: Package search, version info, dependencies
- **Configuration**: No additional setup required

#### **Docker** (`@modelcontextprotocol/server-docker`)
- **Purpose**: Docker container management
- **Features**: Container operations, image management, logs
- **Configuration**: Requires Docker daemon running

#### **Cloudinary** (`@modelcontextprotocol/server-cloudinary`)
- **Purpose**: Media optimization and delivery
- **Features**: Uploads, transformations, optimized URLs
- **Configuration**: Requires `CLOUDINARY_URL`

### Utility Tools

#### **Memory** (`@modelcontextprotocol/server-memory`)
- **Purpose**: Persistent memory storage for AI conversations
- **Features**: Store and retrieve context across sessions
- **Configuration**: No additional setup required

#### **Time** (`@modelcontextprotocol/server-time`)
- **Purpose**: Time and date utilities
- **Features**: Current time, timezone conversion, date calculations
- **Configuration**: No additional setup required

#### **Calculator** (`@modelcontextprotocol/server-calculator`)
- **Purpose**: Mathematical calculations
- **Features**: Basic and advanced mathematical operations
- **Configuration**: No additional setup required

## Configuration Files

The MCP servers are configured in multiple files to support different AI platforms:

- **`opencode.json`**: OpenCode AI configuration
- **`.mcp.json`**: General MCP configuration
- **`.vscode/mcp.json`**: VS Code configuration
- **`.cursor/mcp.json`**: Cursor IDE configuration
- **`.gemini/settings.json`**: Google Gemini configuration

## Environment Variables Setup

To use servers that require authentication, add these to your `.env` file:

```bash
# Database
POSTGRES_CONNECTION_STRING=postgresql://user:password@localhost:5432/database

# GitHub Integration
GITHUB_PERSONAL_ACCESS_TOKEN=your-github-token-here

# Payments and bookings
STRIPE_SECRET_KEY=your-stripe-secret-key

# Email
SENDGRID_API_KEY=your-sendgrid-api-key

# Calendar
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REFRESH_TOKEN=your-google-refresh-token

# Storage/media
CLOUDINARY_URL=cloudinary://api-key:api-secret@cloud-name

# Search
ALGOLIA_APP_ID=your-algolia-app-id
ALGOLIA_API_KEY=your-algolia-api-key

# Database (Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Optional: Additional services (commented out in current config)
# SLACK_BOT_TOKEN=your-slack-bot-token-here
# WEATHER_API_KEY=your-weather-api-key-here
# JIRA_URL=your-jira-instance-url
# JIRA_USERNAME=your-jira-username
# JIRA_API_TOKEN=your-jira-api-token
```

## Usage

These MCP servers are automatically available to AI assistants when using compatible platforms. The servers provide:

1. **Enhanced Development Workflow**: File operations, Git integration, database access
2. **External Service Integration**: GitHub, NPM, Docker management
3. **Utility Functions**: Calculations, time operations, persistent memory
4. **Documentation Access**: Svelte/SvelteKit comprehensive documentation

## Adding More Servers

To add additional MCP servers:

1. Add the server configuration to all relevant config files
2. Install any required dependencies
3. Set up necessary environment variables
4. Update this documentation

## Troubleshooting

- Ensure all required environment variables are set
- Check that external services (Docker, databases) are running
- Verify API tokens have appropriate permissions
- Review server logs for connection issues
