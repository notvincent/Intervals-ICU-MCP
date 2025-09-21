import { EventsAPI, Event } from '../IntervalsAPI/events';
import { createWorkoutEvent } from '../IntervalsAPI/utils/createWorkoutEvent';
import { IntervalsConfig } from '../config';
import { jest } from '@jest/globals';

// Mock fetch globally
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

describe('BulkAPI', () => {

  test('createBulkEvents sends correct request and handles response', async () => {
    const events = [createWorkoutEvent({
      name: "Test Workout",
      start_date_local: "2023-10-01",
      description: "Test Description",
      type: "Ride"
    })]

    const response = await EventsAPI.createBulkEvents(events);

    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/v1/athlete/5114942/events/bulk'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': expect.stringContaining('Basic ')
      },
      body: JSON.stringify(events)
    });

    expect(response).toEqual({ success: true });
  });
});