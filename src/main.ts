import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createWorkoutsTool } from "./tools/createWorkouts.js";
import { listEventsTool } from "./tools/listEvents.js";
import { deleteEventsTool } from "./tools/deleteEvents.js";
import { updateEventTool } from "./tools/updateEvent.js";
import { getWellnessTool } from "./tools/getWellness.js";
import { writeMeATrainingPlanPrompt } from "./prompts/WriteMeATrainingPlan.js";

// Create an MCP server
const server = new McpServer({
  name: "intervals-icu-server",
  version: "1.0.0"
});

server.registerTool(createWorkoutsTool.name, createWorkoutsTool.definition, createWorkoutsTool.handler);
server.registerTool(listEventsTool.name, listEventsTool.definition, listEventsTool.handler);
server.registerTool(deleteEventsTool.name, deleteEventsTool.definition, deleteEventsTool.handler);
server.registerTool(updateEventTool.name, updateEventTool.definition, updateEventTool.handler);
server.registerTool(getWellnessTool.name, getWellnessTool.definition, getWellnessTool.handler);

// Register prompt primitive
server.registerPrompt(
  writeMeATrainingPlanPrompt.name,
  writeMeATrainingPlanPrompt.definition,
  writeMeATrainingPlanPrompt.handler
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);