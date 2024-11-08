import { renderHook, act } from '@testing-library/react';
import { useSettings } from './useSettings';
import { emitter } from '@fdc-frontend/event-bus';

describe('useSettings', () => {
  test('should emit REMOTE_CONTENT_SETTINGS', () => {
    const emitSpy = jest.spyOn(emitter, 'emit');
    renderHook(() => useSettings());
    expect(emitSpy).toHaveBeenCalledWith('REMOTE_CONTENT_SETTINGS', {
      displayBook: true,
    });
  });
});
