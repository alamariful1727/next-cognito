export const App_Title = 'Next Cognito';
export const App_Description = 'Next.js (TYPESCRIPT) with AWS Cognito.';
export const Social = {
  linkedin: 'https://www.linkedin.com/in/alamariful1727',
  github: 'https://github.com/alamariful1727',
  facebook: 'https://www.facebook.com/alamariful1727',
  twitter: 'https://twitter.com/alamariful1727',
};
export const Profile_Image_URL =
  'https://media-exp1.licdn.com/dms/image/C5103AQHt5Y4HxV3bRg/profile-displayphoto-shrink_200_200/0/1540822950782?e=1630540800&v=beta&t=PJgEjJxThgXtBAPNnU62Ufx9AgLwgaWLAFbEJVTVIag';

export const config = {
  cognito: {
    REGION: 'us-east-1',
    USER_POOL_ID: process.env.NEXT_PUBLIC_TYPHOON_USER_POOL_ID!,
    APP_CLIENT_ID: process.env.NEXT_PUBLIC_TYPHOON_APP_CLIENT_ID!,
    IDENTITY_POOL_ID: process.env.NEXT_PUBLIC_TYPHOON_IDENTITY_POOL_ID!,
    IDENTITY_POOL_REGION: 'us-east-1',
  },
  S3: {
    file: {
      bucket: 'typhoon-metadata', //REQUIRED -  Amazon S3 bucket name
      region: 'us-east-1', //OPTIONAL -  Amazon service region
    },
    video: {
      bucket: 'typhoon-vod-source-15xjror2ibab8', //REQUIRED -  Amazon S3 bucket name
      region: 'us-east-1', //OPTIONAL -  Amazon service region
    },
  },
};

export const API_ENDPOINT_LAMBDA = 'https://3098knjw3d.execute-api.us-east-1.amazonaws.com/v1';
export const s3FileUrl = 'https://typhoon-metadata.s3.amazonaws.com/';
export const s3ResourceUrl = 'https://typhoon-resource.s3.amazonaws.com';
