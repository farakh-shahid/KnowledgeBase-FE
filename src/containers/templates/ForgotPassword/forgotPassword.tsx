/* eslint-disable @next/next/no-img-element */
import React from "react";
import Label from "../../atoms/label/Label";
import style from "../../../styles/loginForm.module.scss";
import InputField from "../../atoms/inputField/InputField";
import Button from "../../atoms/button/Button";
import { colors } from "@/assets/colors";
import { INPUT_TYPES, LABELS, PLACEHOLDER } from "@/constants";
import FormLabel from "@/containers/atoms/formLabel/FormLabel";
import Link from "next/link";
import CardHeading from "@/containers/atoms/cardHeading/CardHeading";
const ForgotPasswordForm = () => {
  return (
    <div className={style.container}>
      <div className={style.login__box}>
        <div className={style.illustration__wrapper}>
          <img
            src='https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700'
            alt={""}
          />
        </div>
        <div className={style.form}>
          <CardHeading heading={LABELS.RESET_PASSWORD} />
          <Label label={LABELS.SLOGAN} />
          <FormLabel
            label={LABELS.RESET}
            fontSize='0.9rem'
            color={colors.common.lightGrey}
          />
          <InputField
            placeholder={PLACEHOLDER.EMAIL}
            type={INPUT_TYPES.EMAIL}
          />
          <Button
            label={LABELS.SEND_RESET_EMAIL}
            backgroundColor={colors.bg.Java}
            fontSize='1rem'
            textColor={colors.common.white}
          />
          <Link href='/login' className={style.link}>
            <FormLabel label={LABELS.BACK_TO_LOGIN} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
