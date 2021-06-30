import Amplify from 'aws-amplify';
import { config } from '@/config/index';

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: config.cognito.IDENTITY_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: config.cognito.REGION,

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: config.cognito.IDENTITY_POOL_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: config.cognito.USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    authenticationFlowType: 'USER_SRP_AUTH',
  },
  Storage: {
    AWSS3: {
      bucket: config.S3.file.bucket,
      region: config.S3.file.region,
    },
  },
  ssr: true,
});

Amplify.configure({
  Storage: {
    AWSS3: {
      bucket: config.S3.video.bucket,
      region: config.S3.video.region,
    },
  },
});

// Amplify.Logger.LOG_LEVEL = 'DEBUG';
