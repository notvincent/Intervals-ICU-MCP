import { defaultConfig } from '../config';

export interface DeleteEventRequest {
  id: number;
}

export class DeleteEventsAPI {
  /**
   * Deletes events in bulk
   * @param events Array of event objects with id property to delete
   * @returns Promise with the API response
   */
  static async deleteBulkEvents(events: DeleteEventRequest[]): Promise<any> {
    const url = `${defaultConfig.baseUrl}/api/v1/athlete/${defaultConfig.athleteId}/events/bulk-delete`;
    
    const headers = {
      'Content-Type': 'application/json',
      'authorization': `Basic ${btoa("API_KEY:" + defaultConfig.apiKey)}`
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(events)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting bulk events:', error);
      throw error;
    }
  }
}