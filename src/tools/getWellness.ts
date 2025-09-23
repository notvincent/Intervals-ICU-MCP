import { z } from "zod";
import { WellnessAPI } from "../IntervalsAPI/wellness.js";

export const getWellnessTool = {
  name: "GetWellness",
  definition: {
    title: "Get Wellness Data",
    description: `Get wellness data for a specific date from the athlete's profile.
    
This endpoint returns wellness metrics such as:
- Sleep quality and duration
- Resting heart rate
- HRV (Heart Rate Variability)
- Subjective wellness scores
- Weight and other health metrics
- Training readiness indicators

The date should be in YYYY-MM-DD format (e.g., "2025-09-22").`,
    inputSchema: { 
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    }
  },
  handler: async ({ date }: { date: string }) => {
    try {
      const wellnessData = await WellnessAPI.getWellness(date);
      
      return {
        content: [{ 
          type: "text" as const, 
          text: `Wellness data for ${date}: ${JSON.stringify(wellnessData, null, 2)}` 
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text" as const, 
          text: `Error retrieving wellness data for ${date}: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }]
      };
    }
  }
};