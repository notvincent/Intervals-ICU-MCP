import { z } from "zod";
import { ActivitiesAPI, ListActivitiesParams } from "../IntervalsAPI/activities.js";

export const listActivitiesTool = {
  name: "ListActivities",
  definition: {
    title: "List Activities",
    description: `List activities from the athlete's account.
    
FILTERING OPTIONS:
- oldestDateTime: Local date time (ISO-8601) for oldest activity to return (e.g. "2025-01-01T00:00:00")
- newestDateTime: Local date time (ISO-8601) for newest activity to return (inclusive)

EXAMPLES:
- List all activities from this week: {"oldestDateTime": "2025-09-22T00:00:00", "newestDateTime": "2025-09-28T23:59:59"}
- List activities from last month: {"oldestDateTime": "2025-08-01T00:00:00", "newestDateTime": "2025-08-31T23:59:59"}`,
    inputSchema: {
      oldestDateTime: z.string().optional().describe("Local date (ISO-8601) for oldest activity to return"),
      newestDateTime: z.string().optional().describe("Local date (ISO-8601) for newest activity to return (inclusive)")
    }
  },
  handler: async (params: {
    oldestDateTime?: string;
    newestDateTime?: string;
  }) => {
    // Map the parameter names to match the API expectations
    const mappedParams = {
      oldest: params.oldestDateTime,
      newest: params.newestDateTime
    };
    
    // Filter out undefined values to create clean ListActivitiesParams object
    const apiParams: ListActivitiesParams = Object.fromEntries(
      Object.entries(mappedParams).filter(([_, value]) => value !== undefined)
    ) as ListActivitiesParams;

    try {
      const activities = await ActivitiesAPI.listActivities(apiParams);
      
      return {
        content: [{ 
          type: "text" as const, 
          text: `Found ${Array.isArray(activities) ? activities.length : 'unknown number of'} activities: ${JSON.stringify(activities, null, 2)}` 
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text" as const,
          text: `Error listing activities: ${error instanceof Error ? error.message : 'Unknown error'}`
        }]
      };
    }
  }
};