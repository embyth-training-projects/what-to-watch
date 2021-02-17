import NameSpace from "../name-space";

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;

export const getIsAuthorizationError = (state) => state[NameSpace.USER].isAuthorizationError;

export const getUserInfo = (state) => state[NameSpace.USER].userInfo;
