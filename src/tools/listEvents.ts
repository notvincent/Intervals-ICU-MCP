import { z } from "zod";
import { ListEventsAPI, ListEventsParams } from "../IntervalsAPI/listEvents.js";

export const listEventsTool = {
  name: "ListEvents",
  definition: {
    title: "List Events",
    description: `List events (planned workouts, notes etc.) from the athlete's calendar.
    
FILTERING OPTIONS:
- oldest: Local date time (ISO-8601) for oldest event to return (e.g. "2025-01-01T00:00:00")
- newest: Local date time (ISO-8601) for newest event to return, MUST be a day in the future (inclusive)
- category: Array of categories to filter for. Valid categories: WORKOUT, RACE_A, RACE_B, RACE_C, NOTE, HOLIDAY, SICK, INJURED, SET_EFTP, FITNESS_DAYS, SEASON_START, TARGET, SET_FITNESS
- limit: Maximum number of events to return
- calendar_id: Specific calendar ID to filter events from
- ext: Convert workouts to this format (zwo, mrc, erg or fit)
- powerRange: Percentage for power target ranges
- hrRange: Percentage for HR target ranges  
- paceRange: Percentage for pace target ranges
- locale: Locale (en, es, de etc.)
- resolve: Resolve targets to absolute values (true/false)
- format: Response format (empty string for JSON, '.csv' for CSV)

EXAMPLES:
- List all workouts from this week: {"category": ["WORKOUT"], "oldest": "2025-09-15", "newest": "2025-09-21"}
- List notes and holidays: {"category": ["NOTE", "HOLIDAY"]}
- List last 10 events: {"limit": 10}
- Export workouts as Zwift files: {"category": ["WORKOUT"], "ext": "zwo"}`,
    inputSchema: {
      oldest: z.string().optional().describe("Local date (ISO-8601) for oldest event to return"),
      newest: z.string().optional().describe("Local date (ISO-8601) for newest event to return (inclusive)"),
      category: z.array(z.string()).optional().describe("Array of categories to filter for. Valid values: WORKOUT, RACE_A, RACE_B, RACE_C, NOTE, HOLIDAY, SICK, INJURED, SET_EFTP, FITNESS_DAYS, SEASON_START, TARGET, SET_FITNESS"),
      limit: z.number().optional().describe("Max number of events to return"),
      calendar_id: z.number().optional().describe("Specific calendar ID to filter events from"),
      ext: z.enum(["zwo", "mrc", "erg", "fit"]).optional().describe("Convert workouts to this format"),
      powerRange: z.number().optional().describe("Percentage for power target ranges"),
      hrRange: z.number().optional().describe("Percentage for HR target ranges"),
      paceRange: z.number().optional().describe("Percentage for pace target ranges"),
      locale: z.string().optional().describe("Locale (en, es, de etc.)"),
      resolve: z.boolean().optional().describe("Resolve targets to absolute values"),
      format: z.string().optional().describe("Response format (empty string for JSON, '.csv' for CSV)")
    }
  },
  handler: async (params: {
    oldest?: string;
    newest?: string;
    category?: string[];
    limit?: number;
    calendar_id?: number;
    ext?: "zwo" | "mrc" | "erg" | "fit";
    powerRange?: number;
    hrRange?: number;
    paceRange?: number;
    locale?: string;
    resolve?: boolean;
    format?: string;
  }) => {
    const { format = '', ...listParams } = params;
    
    // Filter out undefined values to create clean ListEventsParams object
    const apiParams: ListEventsParams = Object.fromEntries(
      Object.entries(listParams).filter(([_, value]) => value !== undefined)
    ) as ListEventsParams;

    try {
      const events = await ListEventsAPI.listEvents(format, apiParams);
      
      return {
        content: [{ 
          type: "text" as const, 
          text: `Found ${Array.isArray(events) ? events.length : 'unknown number of'} events: ${JSON.stringify(events, null, 2)}` 
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text" as const,
          text: `Error listing events: ${error instanceof Error ? error.message : 'Unknown error'}`
        }]
      };
    }
  }
};