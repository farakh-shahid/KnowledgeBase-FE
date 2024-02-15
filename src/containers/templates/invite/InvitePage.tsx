/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Label from "../../atoms/label/Label";
import style from "../../../styles/loginForm.module.scss";
import Button from "../../atoms/button/Button";
import { colors } from "@/assets/colors";
import { LABELS } from "@/constants";
import FormLabel from "@/containers/atoms/formLabel/FormLabel";
import InviteInputField from "@/containers/molecules/inviteField/InviteInputField";
import { inviteUsers } from "../../../services/api/inviteService";
import { toast } from "react-toastify";
import { MESSAGES } from "@/constants";
import CardHeading from "@/containers/atoms/cardHeading/CardHeading";
import { EmailProps } from "@/interfaces/emailProps";

const InvitePage = () => {
  const [emails, setEmails] = useState<EmailProps[]>([]);

  const inviteUserByEmail = async (event: any) => {
    try {
      const requestPayload = { emails };
      const response = await inviteUsers(requestPayload);
      toast.success(response?.data?.message);
      setEmails([]);
    } catch (error: any) {
      toast.error(error?.response?.data?.errorMessage || MESSAGES.INVITE_FAILD);
    }
  };
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
          <CardHeading heading={LABELS.INVITE_PEOPLE} />
          <Label label={LABELS.SLOGAN} />
          <FormLabel
            label={LABELS.INVITE}
            fontSize='0.9rem'
            color={colors.common.lightGrey}
          />
          <InviteInputField emails={emails} setEmails={setEmails} />
          <Button
            label={LABELS.SEND_INVITES}
            backgroundColor={colors.bg.Java}
            fontSize='1rem'
            textColor={colors.common.white}
            onClick={(event: any) => inviteUserByEmail(event)}
          />
        </div>
      </div>
    </div>
  );
};

export default InvitePage;
