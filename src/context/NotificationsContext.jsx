import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  notifications: [],
  unreadCount: 0,
};

const notificationsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    case 'MARK_AS_READ':
      return {
        notifications: state.notifications.map(notif =>
          notif.id === action.payload ? { ...notif, isRead: true } : notif
        ),
        unreadCount: state.unreadCount - 1,
      };
    case 'MARK_ALL_AS_READ':
      return {
        notifications: state.notifications.map(notif => ({ ...notif, isRead: true })),
        unreadCount: 0,
      };
    case 'REMOVE_NOTIFICATION':
      return {
        notifications: state.notifications.filter(notif => notif.id !== action.payload),
        unreadCount: state.unreadCount,
      };
    case 'CLEAR_ALL':
      return initialState;
    default:
      return state;
  }
};

const NotificationsContext = createContext(null);

export const NotificationsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationsReducer, initialState);

  return (
    <NotificationsContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}; 