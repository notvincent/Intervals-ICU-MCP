import { IntervalsConfig, defaultConfig } from '../config.js';

export class WellnessAPI {
  /**
   * Gets wellness data for a specific date
   * @param date The date in YYYY-MM-DD format (e.g. "2025-09-22")
   * @returns Promise with the API response containing wellness data
   */
  static async getWellness(date: string): Promise<any> {
    const url = `${defaultConfig.baseUrl}/api/v1/athlete/${defaultConfig.athleteId}/wellness/${date}`;
    
    const headers = {
      'Content-Type': 'application/json',
      'authorization': `Basic ${btoa("API_KEY:" + defaultConfig.apiKey)}`
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting wellness data:', error);
      throw error;
    }
  }
}