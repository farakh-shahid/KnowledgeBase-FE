import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import style from '@/styles/UserEdit.module.scss';
import InputField from '@/containers/atoms/inputField/InputField';
import UserAvatar from '@/containers/atoms/userAvatar/UserAvatar';
import { FormData } from '@/interfaces/inputFieldProps';
import { updateUser, getUser } from '@/services/api/userService';
import {
  getProfileAvatar,
  INPUT_TYPES,
  MESSAGES,
  PLACEHOLDER,
} from '@/constants';
import { colors } from '@/assets/colors';
import Button from '@/containers/atoms/button/Button';
import { toast } from 'react-toastify';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from 'fireBaseConfiguration';
import {
  handleSelectedFile,
  uploadImageAndGetDownloadURL,
} from '@/utils/functions';

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  picture: '',
};
const EditProfile = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState('');
  const [check, setCheck] = useState(false);
  const store = useContext<StoreContextState>(StoreContext);

  const [user, setUser] = store.user;
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      let updatedFormData = { ...formData };
      if (imageFile) {
        const download = await uploadImageAndGetDownloadURL(imageFile);
        if (download) {
          updatedFormData = { ...formData, picture: download };
          updateUserInDatabase(updatedFormData);
        }
      } else {
        updateUserInDatabase(updatedFormData);
      }
    } catch (error: any) {
      toast.error(error?.message || MESSAGES.COULD_NOT_UPDATE_PROFILE);
    }
  };

  const updateUserInDatabase = async (updatedFormData: any) => {
    const res = await updateUser(user?.id as string, updatedFormData);
    if (res.data) {
      toast.success(MESSAGES.PROFILE_UPDATED);
      setCheck(!check);
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await getUser(user?.id as string);
      if (res.data) {
        setFormData(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUserInfo();
  }, [user?.id as string, check]);

  const { firstName, lastName, email, picture } = formData;
  return (
    <div className={style.user__block}>
      <div className={style.user__input__fields}>
        <div className={style.user__input__fields}>
          <label className={style.label__align}>First Name</label>
          <InputField
            placeholder={PLACEHOLDER.FIRSTNAME}
            type={INPUT_TYPES.TEXT}
            required
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.user__input__fields}>
          <label className={style.label__align}>Last Name</label>
          <InputField
            placeholder={PLACEHOLDER.LASTNAME}
            type={INPUT_TYPES.TEXT}
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.user__input__fields}>
          <label className={style.label__align}>Email</label>
          <InputField
            placeholder={PLACEHOLDER.EMAIL}
            type={INPUT_TYPES.EMAIL}
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.user__input__fields}>
          <label>Profile Image</label>
          <div className={style.row}>
            <div className={style.user__avatar}>
              <UserAvatar
                size={40}
                iconSize={40}
                onClick={() => {}}
                avatar_url={picture || getProfileAvatar(firstName)}
              />
            </div>
            <div className={style.file__field}>
              <InputField
                placeholder={''}
                type={INPUT_TYPES.FILE}
                name="picture"
                accept=".png, .jpg, .jpeg"
                onChange={(files) =>
                  handleSelectedFile(files.target.files, setImageFile)
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className={style.button}>
        <Button
          label="Save Profile Information"
          backgroundColor={colors.bg.Java}
          fontSize="1rem"
          textColor={colors.common.white}
          onClick={() => {
            updateProfile();
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
