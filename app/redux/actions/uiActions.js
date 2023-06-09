import * as types from '../constants/uiConstants';

export const toggleAction = { type: types.TOGGLE_SIDEBAR };
export const openMenuAction = { type: types.OPEN_MENU };
export const closeMenuAction = { type: types.CLOSE_MENU };
export const toggleRightSidebar = { type: types.TOGGLE_RIGHT_SIDEBAR };
export const openRightSidebar = { type: types.OPEN_RIGHT_SIDEBAR };
export const closeRightSidebar = { type: types.CLOSE_RIGHT_SIDEBAR };
export const toggleCreateRightSidebar = { type: types.TOGGLE_CREATE_NEW_ITEM_DRAWER };

export const openAction = initialLocation => ({
  type: types.OPEN_SUBMENU,
  initialLocation
});

export const changeThemeAction = theme => ({
  type: types.CHANGE_THEME,
  theme
});

export const changeModeAction = mode => ({
  type: types.CHANGE_MODE,
  mode
});

export const changeLayoutAction = layout => ({
  type: types.CHANGE_LAYOUT,
  layout
});

export const changeDirectionAction = direction => ({
  type: types.CHANGE_DIRECTION,
  direction
});

export const playTransitionAction = isLoaded => ({
  type: types.LOAD_PAGE,
  isLoaded
});
