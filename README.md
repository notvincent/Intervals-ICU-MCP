# Intervals.icu MCP Server

A Model Context Protocol (MCP) server that provides tools for managing workouts and events on [Intervals.icu](https://intervals.icu). This server allows AI assistants to create, list, update, and delete training events through the Intervals.icu API.

## Features

- **CreateWorkouts**: Create multiple planned workouts with structured training descriptions
- **ListEvents**: Retrieve events (workouts, notes, etc.) from your calendar with filtering options
- **UpdateEvent**: Modify existing workout events by ID
- **DeleteEvents**: Remove multiple events by their IDs

## Prerequisites

- Node.js
- An Intervals.icu account
- Intervals.icu API key


## Setup


1. Update `config.ts` with your API key and account number 

2. Add the following to your mcp configuration depending on what you are trying to run from

#### VSCode GH copilot
```json
{
	"servers": {
		"interval-icu-server": {
			"type": "stdio",
			"command": "npm",
			"args": [
				"start"
			]
		}
	},
	"inputs": []
}
```

#### Claude
```json
{
    "Interval-ICU": {
        "command": "npx",
        "args":["tsx", "PATH_TO_PROJECT\\IntervalsMcp\\src\\main.ts"]
    }
}
```