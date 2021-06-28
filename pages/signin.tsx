import { useState } from 'react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { emailRegex, lowercaseRegex, uppercaseRegex, numericRegex, specialCharRegex } from '../utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Auth } from 'aws-amplify';
import SEO from '../components/SEO';
import TyphoonBackdrop from '../components/TyphoonBackdrop';
import TyphoonToaster from '../components/TyphoonToaster';
import TextField from '@material-ui/core/TextField/TextField';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { IUser } from '../types';

const validationSchema = yup.object().shape({
  email: yup.string().required('Required').matches(emailRegex, 'Invalid email format'),
  password: yup
    .string()
    .required('Required')
    .matches(lowercaseRegex, 'one lowercase required!')
    .matches(uppercaseRegex, 'one uppercase required!')
    .matches(numericRegex, 'one number required!')
    .matches(specialCharRegex, 'one special character required!')
    .min(8, 'Minimum 8 characters required!'),
});

interface IData {
  email: IUser['email'];
  password: string;
}

const SignIn = () => {
  const router = useRouter();

  const [cognitoError, setCognitoError] = useState<string>();
  const [showVerifyLink, setShowVerifyLink] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    setCognitoError(undefined);
    try {
      await Auth.signIn(data.email, data.password);
      TyphoonToaster('Successfully login.', 'success');
      router.push('/profile');
    } catch (error) {
      console.log('error', error);
      setCognitoError(error.message ? error.message : error);
      if (error.code && error.code === 'UserNotConfirmedException') {
        setShowVerifyLink(true);
      }
    }
  });

  return (
    <div>
      <SEO siteTitle="Sign In" />
      <TyphoonBackdrop open={isSubmitting} />
      <div className="max-w-md mx-auto">
        <h1 className="text-gray-800 text-2xl font-semibold mb-5">Sign In</h1>
        <form onSubmit={onSubmit} className="border-2 border-gray-800 rounded-md space-y-5 p-6 sm:p-10">
          <div>
            <TextField
              fullWidth
              type="email"
              placeholder="Email"
              label="Email"
              {...register('email')}
              error={!!errors.email}
            />
            {errors.email && <p className="text-red-500 text-xs italic font-medium mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              label="Password"
              {...register('password')}
              error={!!errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password ? (
              <p className="text-red-500 text-xs italic font-medium mt-1">{errors.password.message}</p>
            ) : (
              <p className="text-gray-600 text-xs italic font-medium mt-1">
                Password should contain lowercase, uppercase, number & special characters.
              </p>
            )}
          </div>
          {cognitoError && <p className="text-red-500 text-xs italic font-medium ">{cognitoError}</p>}
          {showVerifyLink && (
            <p className="text-red-500 text-xs italic font-medium ">Sorry, your account is not verified yet.</p>
          )}
          <button type="submit" className="w-full border font-medium text-white bg-gray-800 rounded-md py-3">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
