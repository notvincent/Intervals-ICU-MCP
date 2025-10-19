import { defaultConfig } from '../config.js';

export interface Event {
  category: "WORKOUT" | "RACE_A" | "RACE_B" | "RACE_C" | "NOTE" | "HOLIDAY" | "SICK" | "INJURED" | "SET_EFTP" | "FITNESS_DAYS" | "SEASON_START" | "TARGET" | "SET_FITNESS";
  name: string;
  start_date_local: string;
  end_date_local: string | null;
  description: string;
  type: "Ride" | "Run" | "Swim" | "Walk" | "Weight Training" ;
  color: string;
}

export class EventsAPI {
  /**
   * Creates workout events in bulk
   * @param events Array of workout events to create (can be partial for creation)
   * @param userConfig Optional configuration to override default config
   * @returns Promise with the API response
   */
  static async createBulkEvents(events: Partial<Event>[]): Promise<any> {
    const url = `${defaultConfig.baseUrl}/api/v1/athlete/${defaultConfig.athleteId}/events/bulk`;
    
    const headers = {
      'Content-Type': 'application/json',
      'authorization': `Basic ${btoa("API_KEY:" + defaultConfig.apiKey)}`
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(events)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}\nResponse: ${await response.text()}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating bulk events:', error);
      throw error;
    }
  }

  /**
   * Updates a single event
   * @param event Single workout event to update (can be partial for creation)
   * @param eventId Optional event ID for the endpoint (if required by API)
   * @returns Promise with the API response
   */
  static async updateEvent(event: Partial<Event>, eventId: string): Promise<any> {
    const url = `${defaultConfig.baseUrl}/api/v1/athlete/${defaultConfig.athleteId}/events/${eventId}`
    
    const headers = {
      'Content-Type': 'application/json',
      'authorization': `Basic ${btoa("API_KEY:" + defaultConfig.apiKey)}`
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }
}
