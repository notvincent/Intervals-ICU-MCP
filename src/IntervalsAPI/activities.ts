import { IntervalsConfig, defaultConfig } from '../config';

export interface ListActivitiesParams {
  oldest?: string; // Local date (ISO-8601) for oldest activity to return
  newest?: string; // Local date (ISO-8601) for newest activity to return (inclusive)
}

export class ActivitiesAPI {
  /**
   * Lists activities from the athlete's account
   * @param params Optional query parameters for filtering activities
   * @returns Promise with the API response
   */
  static async listActivities(params: ListActivitiesParams = {}): Promise<any> {
    const url = new URL(`${defaultConfig.baseUrl}/api/v1/athlete/${defaultConfig.athleteId}/activities`);
    
    // Add query parameters
    if (params.oldest) {
      url.searchParams.append('oldest', params.oldest);
    }
    if (params.newest) {
      url.searchParams.append('newest', params.newest);
    }

    const headers = {
      'Content-Type': 'application/json',
      'authorization': `Basic ${btoa("API_KEY:" + defaultConfig.apiKey)}`
    };

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error listing activities:', error);
      throw error;
    }
  }
}