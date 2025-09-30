import { Event } from '../events';

/**
 * Parameters required to create a partial WorkoutEvent
 * Uses the Event interface but specifies which fields are mandatory for creation
 */
export interface CreateWorkoutEventParams extends Pick<Event, 'name' | 'start_date_local' | 'description' | 'type' | 'color'> {
}

/**
 * Formats a date string to ensure it includes time component
 * @param dateString - Date in format YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS
 * @returns Date string in format YYYY-MM-DDTHH:MM:SS
 */
function formatDateWithTime(dateString: string): string {
  // Check if the date already includes time component
  if (dateString.includes('T') && dateString.match(/T\d{2}:\d{2}:\d{2}$/)) {
    return dateString;
  }
  
  // If it's just a date (YYYY-MM-DD), add default time (00:00:00)
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return `${dateString}T00:00:00`;
  }
  
  // If it's already a date with partial time, ensure it has seconds
  if (dateString.includes('T')) {
    const [datePart, timePart] = dateString.split('T');
    const timeComponents = timePart.split(':');
    
    // Pad time components to ensure HH:MM:SS format
    while (timeComponents.length < 3) {
      timeComponents.push('00');
    }
    
    return `${datePart}T${timeComponents.join(':')}`;
  }
  
  // Fallback: assume it's a date and add default time
  return `${dateString}T00:00:00`;
}

/**
 * Creates a partial WorkoutEvent with the specified parameters
 * @param params - The parameters required to create the workout event
 * @returns A partial WorkoutEvent object ready for creation
 */
export function createWorkoutEvent(params: CreateWorkoutEventParams): Partial<Event> {
  const {
    name,
    start_date_local,
    description,
    type,
    color
  } = params;

  return {
    category: "WORKOUT",
    name,
    start_date_local: formatDateWithTime(start_date_local),
    end_date_local: null,
    description,
    type,
    color: color
  };
}
