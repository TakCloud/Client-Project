import initialState from './initialState';
import { FETCH_USERCAMPAIGNS, FETCH_USERDETAILS, FETCH_USERTEMPLATES, FETCH_USERTOTALMETRICS } from '../actions/fetchUserData';

export function userProfile(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERDETAILS: {
      return { ...state, userDetails: action.userDetails };
    }
    default:
      return state;
  }
}

export function userCampaigns(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERCAMPAIGNS: {
      return { ...state, campaigns: action.campaigns };
    }
    default:
      return state;
  }
}

export function userTemplates(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERTEMPLATES: {
      return { ...state, templates: action.templates };
    }
    default:
      return state;
  }
}

export function userTotalMetrics(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERTOTALMETRICS: {
      return { ...state, totalMetrics: action.totalMetrics };
    }
    default:
      return state;
  }
}

export default {
  userProfile,
  userCampaigns,
  userTemplates,
  userTotalMetrics,
};
