import { useRouter } from "next/router";
/* eslint-disable @next/next/no-img-element */
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Label from '../../atoms/label/Label';
import style from '../../../styles/loginForm.module.scss';
import Logo from '../../atoms/logo/Logo';
import InputField from '../../atoms/inputField/InputField';
import Button from '../../atoms/button/Button';
import { colors } from '@/assets/colors';
import Textline from '../../atoms/textLine/textline';
import FormLabel from '../../atoms/formLabel/FormLabel';
import Link from 'next/link';
import { INPUT_TYPES, LABELS, MESSAGES, PLACEHOLDER } from '@/constants';
import { FormData } from '@/interfaces/inputFieldProps';
import { userSignUp } from '../../../services/api/userService';
import { toast } from 'react-toastify';
import GoogleAuthenticate from '../../molecules/authWithGoogle/googleAuth';
import CardHeading from '@/containers/atoms/cardHeading/CardHeading';

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = ({ hashed }: { hashed: string }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error(MESSAGES.PASSWORD_NOT_MATCHED);
      return;
    }
    try {
      const response = await userSignUp(hashed, formData);
      if (response.data) {
        toast.success(MESSAGES.USER_REGISTERED_SUCCESSFULLY);
        router.push("/login");
        setFormData(initialFormData);
      }
    } catch (error: any) {
      toast.warn(error?.response?.data?.errorMessage || MESSAGES.SIGN_UP_ERROR);
    }
  };
  const { firstName, lastName, email, password, confirmPassword } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.container}>
        <div className={style.login__box}>
          <div className={style.illustration__wrapper}>
            <img
              src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
              alt={''}
            />
          </div>
          <div className={style.form}>
            <CardHeading heading={LABELS.WELCOME} />
            <Label label={LABELS.SLOGAN} />
            <GoogleAuthenticate />
            <Textline />
            <InputField
              placeholder={PLACEHOLDER.FIRSTNAME}
              type={INPUT_TYPES.TEXT}
              required
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
            />
            <InputField
              placeholder={PLACEHOLDER.LASTNAME}
              type={INPUT_TYPES.TEXT}
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
            />
            <InputField
              placeholder={hashed}
              type={INPUT_TYPES.EMAIL}
              name='email'
              value={hashed}
              onChange={handleInputChange}
              disabled
            />
            <InputField
              placeholder={PLACEHOLDER.PASSWORD}
              type={INPUT_TYPES.PASSWORD}
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <InputField
              placeholder={PLACEHOLDER.CONFIRM_PASSWORD}
              type={INPUT_TYPES.PASSWORD}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <Button
              label={LABELS.SIGNUP}
              backgroundColor={colors.bg.Java}
              fontSize="1rem"
              textColor={colors.common.white}
            />
            <Link href="/login" className={style.link}>
              <FormLabel label={LABELS.ALREADY_HAVE_ACCOUNT} />
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
