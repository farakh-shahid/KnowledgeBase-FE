import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { LABELS, MESSAGES } from '@/constants';
import { colors } from '@/assets/colors';
import Button from '@/containers/atoms/button/Button';
import { googleSignin } from '../../../services/api/userService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const GoogleAuthenticate = () => {
  const router = useRouter();
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const tokens = await googleSignin({ code });
        if (tokens?.data) {
          router.push('/');
          toast.success(MESSAGES.LOGIN_SUCCESSFULLY);
        }
      } catch (error: any) {
        toast.error(
          error?.data?.errorMessage || MESSAGES.ERROR_WHILE_LOGING_IN
        );
      }
    },
    flow: 'auth-code',
  });

  return (
    <Button
      label={LABELS.GOOGLE}
      backgroundColor={colors.common.white}
      textColor={colors.text.button}
      fontSize="0.9rem"
      border
      icon
      onClick={googleLogin}
    />
  );
};

export default GoogleAuthenticate;
