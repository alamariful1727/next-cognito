import { categoryTypes, ratingTypes } from '@/types/index';

// all regex
export const emailRegex = /^([a-z\d._-]+)@([a-z\d_-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i;
export const lowercaseRegex = /(?=.*[a-z])/;
export const uppercaseRegex = /(?=.*[A-Z])/;
export const numericRegex = /(?=.*[0-9])/;
export const specialCharRegex = /(?=.*[\^$*.[\]{}()?“!@#%&/,><’:;|_~`/-])/;

export const MovieCategoryNames: {
  [key in categoryTypes]: string;
} = {
  comedy: 'Comedy',
  controversial: 'Controversial',
  documentaries: 'Documentaries',
  drama: 'Drama',
  educational: 'Educational',
  episodic: 'Episodic',
  horror: 'Horror',
  musicVideo: 'Music Video',
  reality: 'Reality',
  shorts: 'Shorts',
  student: 'Student',
  womenInFilm: 'Women In Film',
};

export const MovieRatingNames: {
  [key in ratingTypes]: string;
} = {
  G: 'General Audience',
  PG: 'Parental Guidance Suggested',
  'PG-13': 'Parents Strongly Cautioned',
  R: 'Restricted',
  'NC-17': 'No One 17 and Under Admitted',
};
