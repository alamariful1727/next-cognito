export type userRoleType = 'ADMIN' | 'FILMMAKER';

export interface IUser {
  username: string;
  sub: string;
  given_name: string;
  family_name: string;
  email: string;
  email_verified: boolean;
  role: userRoleType[];
}

export type categoryTypes =
  | 'documentaries'
  | 'comedy'
  | 'horror'
  | 'womenInFilm'
  | 'drama'
  | 'episodic'
  | 'reality'
  | 'educational'
  | 'controversial'
  | 'student'
  | 'musicVideo'
  | 'shorts';
export type ratingTypes = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';

//* Movie
export interface IStandAloneMovie {
  id: number;
  title: string;
  description: string;
  videoDuration: string;
  category: categoryTypes;
  ratings: ratingTypes;
  castAndCrew: string;
  searchableTitle: string;
  searchableDescription: string;
  searchableCastAndCrew: string;
  isFeatured: boolean;
  isActive: boolean;
  isEpisodic: boolean;
  isPaid: boolean;
  price: number;
  isRentable: boolean;
  rentalPrice: number;
  rentalDays: number;
  banner?: string;
  subtitle?: string;
  thumbnail?: string;
  trailer?: string;
  dashUrl?: string;
  hlsUrl?: string;
  mp4Urls?: string[];
  srcVideo?: string;
  seasonID?: string;
  filmaker?: {
    sub: string;
    email_verified: string;
    given_name: string;
    family_name: string;
    email: string;
  };
  uploader: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStandAloneMovieStep1 {
  title: IStandAloneMovie['title'];
  description: IStandAloneMovie['description'];
  videoDuration: IStandAloneMovie['videoDuration'];
  ratings: IStandAloneMovie['ratings'];
  category: IStandAloneMovie['category'];
  castAndCrew: IStandAloneMovie['castAndCrew'];
  isPaid: IStandAloneMovie['isPaid'];
  price: IStandAloneMovie['price'];
  isRentable: IStandAloneMovie['isRentable'];
  rentalPrice: IStandAloneMovie['rentalPrice'];
  rentalDays: IStandAloneMovie['rentalDays'];
  searchableTitle: IStandAloneMovie['searchableTitle'];
  searchableDescription: IStandAloneMovie['searchableDescription'];
  searchableCastAndCrew: IStandAloneMovie['searchableCastAndCrew'];
}

export interface IStandAloneMovieStep2 {
  banner: string;
  thumbnail: string;
  subtitle?: IStandAloneMovie['subtitle'];
}

export interface IStandAloneMovieStep3 {
  trailer?: IStandAloneMovie['trailer'];
}

//* Season
export interface ISeason {
  id: number;
  title: string;
  description: string;
  category: categoryTypes;
  ratings: ratingTypes;
  castAndCrew: string;
  searchableTitle: string;
  searchableDescription: string;
  searchableCastAndCrew: string;
  banner: string;
  thumbnail: string;
  trailer: string;
  isPaid: boolean;
  price: number;
  isRentable: boolean;
  rentalPrice: number;
  rentalDays: number;
  isActive: boolean;
  isFeatured: boolean;
  uploader: string;
  filmaker?: {
    sub: string;
    email_verified: string;
    given_name: string;
    family_name: string;
    email: string;
  };
  episodes: string[] | IStandAloneMovie[];
  createdAt: string;
  updatedAt: string;
}

export interface ISeasonStep1 {
  title: ISeason['title'];
  description: ISeason['description'];
  castAndCrew: ISeason['castAndCrew'];
  banner: ISeason['banner'];
  thumbnail: ISeason['thumbnail'];
  trailer: ISeason['trailer'];
  isPaid: ISeason['isPaid'];
  price: ISeason['price'];
  isRentable: ISeason['isRentable'];
  rentalPrice: ISeason['rentalPrice'];
  rentalDays: ISeason['rentalDays'];
  ratings: ISeason['ratings'];
  category: ISeason['category'];
  searchableTitle: ISeason['searchableTitle'];
  searchableDescription: ISeason['searchableDescription'];
  searchableCastAndCrew: ISeason['searchableCastAndCrew'];
}

//* Featured Contents
export interface IFeaturedContents {
  id: number;
  type: 'movie' | 'season';
  title: string;
  description: string;
  banner: string;
  isPaid: boolean;
  price: number;
  isRentable: boolean;
  rentalPrice: number;
  rentalDays: number;
  isEpisodic?: boolean;
}

export interface IUploadForms {
  stepsLength: number;
  currentStep: number;
  title: string;
  subpath: 'stand-alone' | 'episodic';
}

//* My List : Movie
export interface IMyListMovies {
  userID: IUser['sub'];
  movies: {
    movieId: IStandAloneMovie['id'];
    isRented: boolean;
    startDate: string;
    expiryDate: string;
    details: IStandAloneMovie;
  }[];
}
export interface IMovieStripePayment {
  userId: IUser['sub'];
  movieId: IStandAloneMovie['id'];
  isRentable: boolean;
}
export interface IAddMovieToMyList {
  userId: IUser['sub'];
  movieId: IStandAloneMovie['id'];
  isPaid?: boolean;
  isRented?: boolean;
  paymentId?: string;
  paymentIntentId?: string;
}
export interface IDeleteMovieFromMyList {
  userId: IUser['sub'];
  movieId: IStandAloneMovie['id'];
}

//* My List : Season
export interface IMyListSeasons {
  userID: IUser['sub'];
  seasons: {
    seasonId: ISeason['id'];
    isRented: boolean;
    startDate: string;
    expiryDate: string;
    details: ISeason;
  }[];
}
export interface ISeasonStripePayment {
  userId: IUser['sub'];
  seasonId: ISeason['id'];
  isRentable: boolean;
}
export interface IAddSeasonToMyList {
  userId: IUser['sub'];
  seasonId: ISeason['id'];
  isPaid?: boolean;
  isRented?: boolean;
  paymentId?: string;
  paymentIntentId?: string;
}
export interface IDeleteSeasonFromMyList {
  userId: IUser['sub'];
  seasonId: ISeason['id'];
}

//* Theater Event
export interface IEvent {
  id: number;
  title: string;
  description: string;
  banner: string;
  schedule: number;
  price: number;
  isActive: boolean;
  isFinished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateEvent extends Pick<IEvent, 'title' | 'description' | 'price'> {
  schedule: string;
}

export interface IUpdateEventData extends Pick<IEvent, 'title' | 'description' | 'price'> {
  schedule: string;
}

export interface IUpdateEventRequest extends Pick<IEvent, 'title' | 'description' | 'schedule' | 'price' | 'banner'> {}

export interface IStreamEventRequest {
  id: IEvent['id'];
  isActive?: IEvent['isActive'];
  isFinished?: IEvent['isFinished'];
}

//* Theater Event's Ticket
export interface ITicket {
  id: number;
  eventId: IEvent['id'];
  userId: IUser['sub'];
  paymentId: string;
  paymentIntentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTicket extends Pick<ITicket, 'eventId' | 'userId' | 'paymentId' | 'paymentIntentId'> {}

//* Contact Us
export interface IContactUsData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

//* Contact Us
export interface ITransactionLogData {
  id: string;
  title: string;
  type: string;
  email: string;
  name: string;
  eventId?: string;
  seasonId?: string;
  movieId?: string;
  ref_id: string;
  price: string;
  groups: any[];
  paymentStatus: string;
  userId: string;
  clientSecret: string;
  createdAt: string;
  updatedAt: string;
}
