import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createWorkoutsTool } from "./tools/createWorkouts.js";
import { listEventsTool } from "./tools/listEvents.js";
import { listActivitiesTool } from "./tools/listActivities.js";
import { deleteEventsTool } from "./tools/deleteEvents.js";
import { updateEventTool } from "./tools/updateEvent.js";
import { getWellnessTool } from "./tools/getWellness.js";
// Skip the training plan prompt for now to avoid import.meta issues
// import { writeMeATrainingPlanPrompt } from "./prompts/WriteMeATrainingPlan.js";

// Create an MCP server
const server = new McpServer({
  name: "intervals-icu-server",
  version: "1.0.0"
});

server.registerTool(createWorkoutsTool.name, createWorkoutsTool.definition, createWorkoutsTool.handler);
server.registerTool(listEventsTool.name, listEventsTool.definition, listEventsTool.handler);
server.registerTool(listActivitiesTool.name, listActivitiesTool.definition, listActivitiesTool.handler);
server.registerTool(deleteEventsTool.name, deleteEventsTool.definition, deleteEventsTool.handler);
server.registerTool(updateEventTool.name, updateEventTool.definition, updateEventTool.handler);
server.registerTool(getWellnessTool.name, getWellnessTool.definition, getWellnessTool.handler);

// Register prompt primitive (commented out for now)
// server.registerPrompt(
//   writeMeATrainingPlanPrompt.name,
//   writeMeATrainingPlanPrompt.definition,
//   writeMeATrainingPlanPrompt.handler
// );

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});