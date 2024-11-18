import { useCallback } from 'react';
import { useNotifications } from '../context/NotificationsContext';

export const useNotificationsManager = () => {
  const { state, dispatch } = useNotifications();

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now().toString(),
      isRead: false,
      ...notification,
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
  }, [dispatch]);

  const markAsRead = useCallback((id) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
  }, [dispatch]);

  const markAllAsRead = useCallback(() => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  }, [dispatch]);

  const removeNotification = useCallback((id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, [dispatch]);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, [dispatch]);

  return {
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  };
}; 