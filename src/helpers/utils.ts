import * as moment from "moment";

import {ReviewInterface} from "./types";

interface ExtendInterface {
  <T>(state: T, newStateValue: T): T;
}

export const extend: ExtendInterface = (state, newStateValue) => {
  return Object.assign({}, state, newStateValue);
};

export const getLeftColumnReviews = (reviews: Array<ReviewInterface>): Array<ReviewInterface> => {
  const sliceIndex = Math.ceil(reviews.length / 2);
  return reviews.slice(0, sliceIndex);
};

export const getRightColumnReviews = (reviews: Array<ReviewInterface>): Array<ReviewInterface> => {
  const sliceIndex = Math.ceil(reviews.length / 2);
  return reviews.slice(sliceIndex, reviews.length);
};

export const getRatingLevel = (rating: number): string => {
  if (rating >= 0 && rating < 3) {
    return `Bad`;
  } else if (rating >= 3 && rating < 5) {
    return `Normal`;
  } else if (rating >= 5 && rating < 8) {
    return `Good`;
  } else if (rating >= 8 && rating < 10) {
    return `Very good`;
  } else if (rating === 10) {
    return `Awesome`;
  } else {
    return `Not rated`;
  }
};

export const getRunTimeFormat = (runTime: number): string => {
  const duration = moment.duration(runTime, `minutes`);
  return `${duration.get(`hours`)}h ${duration.get(`minutes`)}m`;
};

export const getReviewFormatDate = (date: string): string => {
  return moment(date).format(`MMMM D, YYYY`);
};

export const convertDateToISO = (date: string): string => {
  return moment(date).toISOString();
};

export const getTimeLeft = (totalTime: number, currentTime: number): string => {
  const duration = moment.duration(totalTime, `seconds`).subtract(moment.duration(currentTime, `seconds`));

  return moment.utc(duration.asMilliseconds()).format(`H:mm:ss`);
};

export const getFormatRating = (rating: number): string => {
  return (rating % 1 !== 0) ? rating.toString().split(`.`).join(`,`) : `${rating.toString()},0`;
};
