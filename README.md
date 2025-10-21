# Intervals.icu MCP Server

A Model Context Protocol (MCP) server that provides tools for managing workouts and events on [Intervals.icu](https://intervals.icu). This server allows AI assistants to create, list, update, and delete training events through the Intervals.icu API.

## Features

- **CreateWorkouts**: Create multiple planned workouts with structured training descriptions
- **ListEvents**: Retrieve events (workouts, notes, etc.) from your calendar with filtering options
- **UpdateEvent**: Modify existing workout events by ID
- **DeleteEvents**: Remove multiple events by their IDs

## Prerequisites

- An Intervals.icu account

### Setup for non techincal people (using pre-built binaries)

1. Download the appropriate binary for your platform from the [latest release](https://github.com/notvincent/Intervals-ICU-MCP/releases/tag/v0.0.01-alpha):
   - **Windows**: Download `main.bundle-win.exe`
   - **macOS**: Download `main.bundle-macos` 
   - **Linux**: Download `main.bundle-linux`

2. It will be easiest for you to use claude.ai as your chatbot which you can install [here](https://claude.ai/download). The free tier will be good enough for you to get it to do a couple actions per day with it. I am in no way associated with claude.ai, but I do think they have a good product.

3. Get your API key and athlete ID from intervals.icu, it can be found in the settings page, NEVER share your API key with anybody, it is essentially equivalent to your account password.
![alt text](ReadMEImages/image.png)

4. Follow [claude's instructions](https://modelcontextprotocol.io/docs/develop/connect-local-servers) on how to setup an MCP server. The one KEY difference is, for the third step you will use this configuration:

```json
// For windows machines
{
    "Interval-ICU": {
        "command": "PATH_TO_DOWNLOADED_PROGRAM\\main.bundle-win.exe", // Put the full path to the downloaded exe file
		"env": {
			"ATHLETE_ID": "", // Put your athlete ID from step 3 here
			"API_KEY": "" // Put your API key from step 3 here
		}
    }
}
```

```json
// For mac/linux machines
{
    "Interval-ICU": {
        "command": "PATH_TO_DOWNLOADED_PROGRAM/main.bundle-macos", // Put the full path to the downloaded binary
		"env": {
			"ATHLETE_ID": "", // Put your athlete ID from step 3 here
			"API_KEY": "" // Put your API key from step 3 here
		}
    }
}
```

5. Once you've done this you can restart claude and it should be able to interact with intervals.icu. Try asking it a question like "Give me a 2h threshold workout in interval.icu for tomorrow"

7. If you want to try the training plan builder you can do so like this:
![alt text](ReadMEImages/20250929-0413-51.6514406.gif)