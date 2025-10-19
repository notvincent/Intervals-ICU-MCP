import { IntervalsConfig, defaultConfig } from '../config.js';

export type EventCategory = 
  | 'WORKOUT'
  | 'RACE_A'
  | 'RACE_B'
  | 'RACE_C'
  | 'NOTE'
  | 'HOLIDAY'
  | 'SICK'
  | 'INJURED'
  | 'SET_EFTP'
  | 'FITNESS_DAYS'
  | 'SEASON_START'
  | 'TARGET'
  | 'SET_FITNESS';

export interface ListEventsParams {
  oldest?: string; // Local date (ISO-8601) for oldest event to return
  newest?: string; // Local date (ISO-8601) for newest event to return (inclusive)
  category?: EventCategory[]; // Array of categories to filter for
  limit?: number; // Max number of events to return
  calendar_id?: number;
  ext?: string; // Convert workouts to this format (zwo, mrc, erg or fit)
  powerRange?: number; // Percentage for power target ranges
  hrRange?: number; // Percentage for HR target ranges
  paceRange?: number; // Percentage for pace target ranges
  locale?: string; // Locale (en, es, de etc.)
  resolve?: boolean; // Resolve targets to absolute values
}

export class ListEventsAPI {
  /**
   * Lists events (planned workouts, notes etc.) on the athlete's calendar
   * @param format Format for the response (empty string for JSON, '.csv' for CSV)
   * @param params Optional query parameters for filtering events
   * @returns Promise with the API response
   */
  static async listEvents(format: string = '', params: ListEventsParams = {}): Promise<any> {
    const url = new URL(`${defaultConfig.baseUrl}/api/v1/athlete/${defaultConfig.athleteId}/events${format}`);
    
    // Add query parameters
    if (params.oldest) {
      url.searchParams.append('oldest', params.oldest);
    }
    if (params.newest) {
      url.searchParams.append('newest', params.newest);
    }
    if (params.category && params.category.length > 0) {
      url.searchParams.append('category', params.category.join(','));
    }
    if (params.limit !== undefined) {
      url.searchParams.append('limit', params.limit.toString());
    }
    if (params.calendar_id !== undefined) {
      url.searchParams.append('calendar_id', params.calendar_id.toString());
    }
    if (params.ext) {
      url.searchParams.append('ext', params.ext);
    }
    if (params.powerRange !== undefined) {
      url.searchParams.append('powerRange', params.powerRange.toString());
    }
    if (params.hrRange !== undefined) {
      url.searchParams.append('hrRange', params.hrRange.toString());
    }
    if (params.paceRange !== undefined) {
      url.searchParams.append('paceRange', params.paceRange.toString());
    }
    if (params.locale) {
      url.searchParams.append('locale', params.locale);
    }
    if (params.resolve !== undefined) {
      url.searchParams.append('resolve', params.resolve.toString());
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
      console.error('Error listing events:', error);
      throw error;
    }
  }
}
