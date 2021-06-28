import { withSSRContext } from 'aws-amplify';
import { GetServerSideProps } from 'next';
import SEO from '../components/SEO';
import { IUser } from '../types';

type props = {
  user: IUser;
};

const Profile = ({ user }: props) => {
  return (
    <div>
      <SEO siteTitle="Profile" />
      <h1>Hello {user.email} from SSR route!</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { Auth } = withSSRContext({ req });
  try {
    const res = await Auth.currentAuthenticatedUser();
    const role = res.signInUserSession.idToken.payload['cognito:groups'] || [];

    const user = {
      username: res.username,
      email: res.attributes.email,
      email_verified: res.attributes.email_verified,
      family_name: res.attributes.family_name,
      given_name: res.attributes.given_name,
      sub: res.attributes.sub,
      role,
    };

    return {
      props: {
        user,
      },
    };
  } catch (err) {
    // ? AUTH: server-side
    res.writeHead(302, { Location: '/' });
    res.end();
  }
  return { props: {} };
};

export default Profile;
