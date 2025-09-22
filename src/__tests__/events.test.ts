import { EventsAPI, Event } from '../IntervalsAPI/events';
import { createWorkoutEvent } from '../IntervalsAPI/utils/createWorkoutEvent';
import { IntervalsConfig } from '../config';
import { jest } from '@jest/globals';

// Mock fetch globally
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

describe('EventsApi', () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockFetch.mockReset();
  });

  test('createBulkEvents sends correct request and handles response', async () => {
    // Mock successful response
    const mockResponseData = [
      {
        id: 123456,
        name: "Test Workout",
        start_date_time_local: "2023-10-01T00:00:00",
        type: "Ride",
        description: "Test Description"
      }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => mockResponseData,
      text: async () => JSON.stringify(mockResponseData),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    } as Response);

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

    expect(response).toEqual(mockResponseData);
  });

  test('createBulkEvents handles error response', async () => {
    // Mock error response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: async () => ({ error: 'Bad Request' }),
      text: async () => JSON.stringify({ error: 'Bad Request' }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    } as Response);

    const events = [createWorkoutEvent({
      name: "Test Workout",
      start_date_local: "2023-10-01",
      description: "Test Description",
      type: "Ride"
    })]

    await expect(EventsAPI.createBulkEvents(events)).rejects.toThrow();

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('createBulkEvents handles network error', async () => {
    // Mock network error
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const events = [createWorkoutEvent({
      name: "Test Workout",
      start_date_local: "2023-10-01",
      description: "Test Description",
      type: "Ride"
    })]

    await expect(EventsAPI.createBulkEvents(events)).rejects.toThrow('Network error');

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});