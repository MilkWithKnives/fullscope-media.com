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

#### **NPM Search** (`@modelcontextprotocol/server-npm-search`)
- **Purpose**: Search and retrieve NPM package information
- **Features**: Package search, version info, dependencies
- **Configuration**: No additional setup required

#### **Docker** (`@modelcontextprotocol/server-docker`)
- **Purpose**: Docker container management
- **Features**: Container operations, image management, logs
- **Configuration**: Requires Docker daemon running

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

# Optional: Additional services (commented out in current config)
# SLACK_BOT_TOKEN=your-slack-bot-token-here
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
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
