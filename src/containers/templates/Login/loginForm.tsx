/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from 'react';
import Label from '../../atoms/label/Label';
import style from '../../../styles/loginForm.module.scss';
import InputField from '../../atoms/inputField/InputField';
import Button from '../../atoms/button/Button';
import { colors } from '@/assets/colors';
import Textline from '../../atoms/textLine/textline';
import { INPUT_TYPES, LABELS, MESSAGES, PLACEHOLDER } from '@/constants';
import FormLabel from '@/containers/atoms/formLabel/FormLabel';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { userLogin } from '../../../services/api/userService';
import GoogleAuthenticate from '../../molecules/authWithGoogle/googleAuth';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import { useRouter } from 'next/router';
import { readUserFromToken } from '@/utils/tokens';
import { UserProps } from '@/interfaces/userProps';
import Image from 'next/image';
import logo from '@/assets/icons/kb-logo.png';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const store = useContext<StoreContextState>(StoreContext);
  const [, setUser] = store.user;
  const setToken = store.setTokens;

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    try {
      const response = await userLogin(email, password);
      if (response.data) {
        const data = response.data;
        const { accessToken, refreshToken, accessTokenExpiresAt } = data;
        const user: UserProps | null = readUserFromToken(accessToken);
        if (user) {
          setUser(user);
          setToken(accessToken, new Date(accessTokenExpiresAt), refreshToken);
          toast.success(MESSAGES.LOGIN_SUCCESSFULLY);
          router.push('/landing');
        }
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.errorMessage?.message ||
          MESSAGES.ERROR_WHILE_LOGING_IN
      );
    }
  };
  return (
    <form onSubmit={(event) => handleSubmit(event, email, password)}>
      <div className={style.container}>
        <div className={style.login__box}>
          <div className={style.illustration__wrapper}>
            <img
              src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
              alt={''}
            />
          </div>
          <div className={style.form}>
            <Image src={logo} alt={'LOGO'} width={80}></Image>
            <Label label={LABELS.SLOGAN} />
            <GoogleAuthenticate />
            <Textline />
            <InputField
              placeholder={PLACEHOLDER.EMAIL}
              type={INPUT_TYPES.EMAIL}
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <InputField
              placeholder={PLACEHOLDER.PASSWORD}
              type={INPUT_TYPES.PASSWORD}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              label={LABELS.SIGN_IN}
              backgroundColor={colors.bg.Java}
              fontSize="1rem"
              textColor={colors.common.white}
            />
            <Link href="/forgotPassword" className={style.link}>
              <FormLabel label={LABELS.FORGOT_PASSWORD} />
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
