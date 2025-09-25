import { z } from "zod";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const writeMeATrainingPlanPrompt = {
  name: "WriteMeATrainingPlan",
  definition: {
    description: "Create a personalized training plan based on athlete goals and current fitness",
    argsSchema: {
      athlete_goals: z.string(),
      current_fitness_level: z.string(),
      available_training_time: z.string(),
      training_experience: z.string().optional(),
      equipment_available: z.string().optional()
    }
  },
  handler: async (args: {
    athlete_goals: string;
    current_fitness_level: string;
    available_training_time: string;
    training_experience?: string;
    equipment_available?: string;
  }) => {
    const { athlete_goals, current_fitness_level, available_training_time, training_experience, equipment_available } = args;
    
    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Create a comprehensive cycling training plan with the following requirements:

**Athlete Goals:** ${athlete_goals}
**Current Fitness Level:** ${current_fitness_level}
**Available Training Time:** ${available_training_time}
${training_experience ? `**Training Experience:** ${training_experience}` : ''}
${equipment_available ? `**Equipment Available:** ${equipment_available}` : ''}

Please follow these guidelines when creating the training plan:

## Training Plan Creation Guidelines

### Step 1: Goal Assessment
- Ensure the goal is SMART (Specific, Measurable, Achievable, Relevant, Time-bound)
- Identify the primary focus: race preparation, endurance building, FTP improvement, or general fitness

### Step 2: Current Fitness Analysis
- Consider the athlete's recent training volume and intensity
- Factor in baseline fitness metrics (FTP, VO2max, recent performance)
- Account for any limitations or areas needing improvement

### Step 3: Plan Structure

Create a structured plan with these phases:

**Strength phase 4-8 weeks** (If the athlete is indicating they are in an off-season or the timeline till their goals is more than 20 weeks away):
- Gym sessions focused on building overall strength with an emphasis on heavy compound lifts like squats and deadlifts in lower rep ranges (3-6 reps)
- Heavy lifting sessions should take place 2-3 times per week with at least 1-2 non gym days between sessions
- Early in the strength phase, it's best to have dedicated strength days. As the phase progresses though we can start to add double days of easy cycling and hard strength sessions. Then later in the strength phase you can have double days with some intensity on the bike.

**Base Phase** (Foundation building):
- Focus on aerobic base development
- Include 1 ddday of strength training if gym access is available, focusing on heavy compound lifts in the 3-6 rep range. The goal is to just maintain strength during this phase.
- Include longer, lower-intensity rides
- There can also be 1-3 days of longer efforts below FTP to build endurance, such as tempo rides or sweet spot training

**Build Phase** (Intensity and volume):
- Implement 4-8 week training blocks
- Blocks should alternate between polarized and pyramidal training approaches
- Include 3-4 intensity sessions per week above Zone 2
- Fill remaining training time with Zone 2 or recovery rides
- Be sure to be mindful of the total hours that the athlete can ride each week and try to make the plan fit as close to those hours as possible
- As the athlete gets closer to their goal event, make the workouts more specific to the demands of that event

**Peak/Taper Phase** (Pre-event preparation):
- 1-2 weeks before goal event or test
- Reduce volume while maintaining intensity
- Focus on race-specific efforts

### Step 4: Weekly Structure
- Plan 3-4 harder sessions per week, a hard sessions is any session above zone 2, or a heavy strength session in the gym.
- Include adequate recovery between hard sessions.
- Fill additional available time with Zone 2 aerobic base work.
- It's a good idea to have one full rest day or very light day per week.
- Be mindfull of the athlete's available training time and ensure the plan effectively utilizes that time.

### Step 5: Progress Monitoring
- Plan re-testing every 4-8 weeks during the build phase.
- Include metrics for tracking improvement
- Build in plan adjustment points based on progress and life stress

### Plan Format Requirements:
1. **Overview**: Brief summary of the plan duration and primary focus
2. **Phase Breakdown**: Detailed description of each training phase with duration
3. **Weekly Schedule Template**: Example weekly structure for each phase
4. **Key Workouts**: Specific workout descriptions for intensity sessions
5. **Testing Protocol**: Schedule and method for fitness assessments
6. **Progression Strategy**: How the plan will adapt and progress over time
7. **Recovery Guidelines**: Rest and recovery recommendations

Please create a detailed, actionable training plan that addresses all these elements while being tailored to the specific athlete requirements provided, and ask ask the user if they would like to add the plan into their intervals.icu.`
          }
        }
      ]
    };
  }
};
