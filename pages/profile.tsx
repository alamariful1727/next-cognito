import { withSSRContext } from 'aws-amplify';
import { GetServerSideProps } from 'next';
import SEO from '../components/SEO';
import { IUser } from '../types';

type props = {
  user: IUser;
};

const Profile = ({ user }: props) => {
  return (
    <div className="space-y-3">
      <SEO siteTitle="Profile" description="User profile." />
      <h1 className="text-2xl text-gray-800 font-semibold">Profile</h1>
      <p className="font-semibold">Hello, {user.given_name + ' ' + user.family_name}</p>
      <div className="space-y-1">
        <h2>
          <span className="font-semibold">ID :</span> {user.sub}
        </h2>
        <h2>
          <span className="font-semibold">Email :</span> {user.email}
        </h2>
        <h2>
          <span className="font-semibold">Role :</span> {user.role}
        </h2>
      </div>
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
