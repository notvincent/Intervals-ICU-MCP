import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createWorkoutsTool } from "./tools/createWorkouts.js";
import { listEventsTool } from "./tools/listEvents.js";
import { deleteEventsTool } from "./tools/deleteEvents.js";
import { updateEventTool } from "./tools/updateEvent.js";
import { getWellnessTool } from "./tools/getWellness.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

server.registerResource(
  "training-plan-guide",
  "resource://training-plan-guide",
  {
    title: "How to Write a Training Plan",
    description: "A comprehensive guide to creating an effective cycling training plan",
    mimeType: "text/markdown"
  },
  async (uri) => {
    try {
      const filePath = join(__dirname, "resources", "howToWriteATrainingPlan.md");
      const content = readFileSync(filePath, "utf-8");
      return {
        contents: [{
          uri: uri.href,
          text: content
        }]
      };
    } catch (error) {
      throw new Error(`Failed to read training plan guide: ${error}`);
    }
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);