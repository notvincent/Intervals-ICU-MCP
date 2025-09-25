import { z } from "zod";
import { createWorkoutEvent } from "../IntervalsAPI/utils/createWorkoutEvent.js";
import { EventsAPI } from "../IntervalsAPI/events.js";

export const createWorkoutsTool = {
  name: "CreateWorkouts",
  definition: {
    title: "Create Workouts",
    description: `Create multiple new workouts up to a maximum of one week's worth of workouts (7 days) at a time.
Each workout's start_date_time_local must be in the format YYYY-MM-DDTHH:MM:SS and time can default to 00:00:00

description is used to specify the workout and follows this format:

WORKOUT STEP FORMAT:
Each step must start with a '-' followed by: DURATION INTENSITY [CADENCE] [free text]

DURATION SYNTAX:
- Seconds: 30s, 45s, 90s
- Minutes: 5m, 10m, 20m
- Minutes + seconds: 1m30, 2m45, 5m15

INTENSITY SYNTAX:
- Watts: 200w, 250w, 300w
- FTP percentage: 65%, 85%, 95%
- Power range: 200-250w, 80-90%
- Ramp: "Ramp 100-200w", "Ramp 60-80%"
- Recovery: 0w, 0-50%

CADENCE (optional):
- Fixed: 90rpm, 100rpm
- Range: 90-100rpm, 85-95rpm

WORKOUT REPEATS:
Use [Number]x followed by steps to repeat, each on a new line. End with a blank line.

EXAMPLE WORKOUT:

Warmup
- 10m Ramp 50-70% easy spinning

3x
- 1m 150%
- 1m 0-50% recovery

2x
- 20m 80%
- 5m 0-50% recovery

Cooldown
- 10m Ramp 200w-100w easy spinning

This creates: 3 one-minute efforts with recovery, then 2 twenty-minute efforts with recovery.`,
    inputSchema: { 
      workouts: z.array(z.object({
        name: z.string(), 
        start_date_time_local: z.string(),
        description: z.string().optional(),
        type: z.enum(["Ride", "Run", "Swim", "Walk", "Weight Training"])
      }))
    }
  },
  handler: async ({ workouts }: { workouts: Array<{
    name: string;
    start_date_time_local: string;
    description?: string;
    type: "Ride" | "Run" | "Swim" | "Walk" | "Weight Training";
  }> }) => {
    const workoutEvents = workouts.map(workout => createWorkoutEvent({
      name: workout.name,
      start_date_local: workout.start_date_time_local, // In reality intervals.icu should have called this start_date_time_local
      description: workout.description || "",
      type: workout.type
    }));

    await EventsAPI.createBulkEvents(workoutEvents);
    
    return {
      content: [{ 
        type: "text" as const, 
        text: `Created ${workoutEvents.length} workout events: ${JSON.stringify(workoutEvents, null, 2)}` 
      }]
    };
  }
};