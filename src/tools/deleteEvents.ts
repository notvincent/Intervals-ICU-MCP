import { z } from "zod";
import { DeleteEventsAPI, DeleteEventRequest } from "../IntervalsAPI/deleteEvents.js";

export const deleteEventsTool = {
  name: "DeleteEvents",
  definition: {
    title: "Delete Events",
    description: `Delete multiple events by their IDs
    
This tool allows you to delete events from your Intervals.icu calendar by providing their event IDs.
You can find event IDs by using the ListEvents tool first.

IMPORTANT: This action is permanent and cannot be undone. Make sure you have the correct event IDs before deleting.

Examples:
- Delete a single event: {"eventIds": [73928390]}
- Delete multiple events: {"eventIds": [73928390, 73928391, 73928392]}`,
    inputSchema: {
      eventIds: z.array(z.number()).describe("Array of event IDs to delete")
    }
  },
  handler: async ({ eventIds }: { eventIds: number[] }) => {
    try {
      // Convert event IDs to the required format
      const deleteRequests: DeleteEventRequest[] = eventIds.map(id => ({ id }));
      
      // Call the API to delete events
      const result = await DeleteEventsAPI.deleteBulkEvents(deleteRequests);
      
      return {
        content: [{ 
          type: "text" as const, 
          text: `Successfully deleted ${eventIds.length} event(s). Event IDs: ${eventIds.join(', ')}. Result: ${JSON.stringify(result, null, 2)}` 
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text" as const,
          text: `Error deleting events: ${error instanceof Error ? error.message : 'Unknown error'}. Event IDs attempted: ${eventIds.join(', ')}`
        }]
      };
    }
  }
};