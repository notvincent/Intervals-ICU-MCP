export interface IntervalsConfig {
  athleteId: string;
  apiKey: string;
  baseUrl?: string;
}

export const defaultConfig: IntervalsConfig = {
  athleteId: '',
  apiKey: '',
  baseUrl: 'https://intervals.icu'
};
