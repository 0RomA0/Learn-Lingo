import { createSelector } from '@reduxjs/toolkit';

export const selectFavoritesItems = createSelector(
  [(state) => state.favorites.byUser, (_, userId) => userId],
  (byUser, userId) => byUser[userId]?.items || [],
);
