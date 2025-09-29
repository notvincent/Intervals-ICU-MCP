export interface IntervalsConfig {
  athleteId: string;
  apiKey: string;
  baseUrl?: string;
}

export const defaultConfig: IntervalsConfig = {
  athleteId: process.env.ATHLETE_ID || '',
  apiKey: process.env.API_KEY || '',
  baseUrl: 'https://intervals.icu'
};
