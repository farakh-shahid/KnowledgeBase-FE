import { EmailProps } from "@/interfaces/emailProps";
import axios from "axios";
import { PATH } from "../apiRoutes/routeConstant";
export interface InviteRequest {
  emails: EmailProps[];
}

export const inviteUsers = async (emails: InviteRequest) => {
  return await axios.post(
    `${process.env.BASE_URL}${PATH.INVITE_USERS}`,
    emails
  );
};
export const decodeHash = async (buffer: string) => {
  return await axios.get(
    `${process.env.BASE_URL}${PATH.INVITE_USERS}/${buffer}`
  );
};
