import 'react-quill/dist/quill.snow.css';
import React, { useContext, useState } from 'react';
import styles from '@/styles/AskPage.module.scss';
import Button from '@/containers/atoms/button/Button';
import { colors } from '@/assets/colors';
import Header from '@/containers/organisms/header/Header';
import Tags from '@/containers/molecules/tags/Tags';
import FilePicker from '@/containers/atoms/filePicker/FilePicker';
import { TagProps } from '@/interfaces/tagProps';
import { createTopic } from '@/services/api/topicService';
import { toast } from 'react-toastify';
import { QuestionDto } from '@/interfaces/QuestionDto';
import { useRouter } from 'next/navigation';
import { IMAGE_REGEX, LABELS, MESSAGES, PLACEHOLDER } from '@/constants';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from 'fireBaseConfiguration';
import QuillToolbar, {
  formats,
  modules,
} from '@/containers/organisms/quillToolBar/QuillToolBar';
import dynamic from 'next/dynamic';
import {
  handleSelectedFile,
  uploadImageAndGetDownloadURL,
} from '@/utils/functions';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AskPage = () => {
  let QuestionData: QuestionDto = {
    title: '',
    description: '',
    tags: [],
    authorId: '',
    categories: [],
    picture: '',
    tenantId: '',
  };
  const store = useContext<StoreContextState>(StoreContext);
  const [user, setUser] = store.user;
  const [contentValue, setContentvalue] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<TagProps[]>([]);
  const [cover, setCover] = useState<File | undefined>(undefined);
  const [coverUrl, setCoverUrl] = useState<string | null>();
  const router = useRouter();

  const toastify = (message: string) => {
    return toast.error(message, { toastId: 'empty-fields' });
  };

  const isValidData = () => {
    if (title.length === 0) toastify(MESSAGES.TITLE_EMPTY);
    else if (contentValue.length === 0) toastify(MESSAGES.CONTENT_EMPTY);
    else return true;
  };

  const submitHandler = async () => {
    let downloadURL: string | undefined;
    if (cover) {
      try {
        downloadURL = await uploadImageAndGetDownloadURL(cover);
      } catch (error: any) {
        return;
      }
    }
    createTopicRequest(downloadURL);
  };

  const createTopicRequest = async (downloadURL: any) => {
    if (isValidData()) {
      let Tags = tags.map((value) => value.id);
      QuestionData.title = title;
      QuestionData.description = contentValue;
      QuestionData.tags = Tags;
      QuestionData.picture = downloadURL;
      QuestionData.authorId = user?.id;
      QuestionData.tenantId = user?.tenantId;

      const regex = IMAGE_REGEX;
      const imageSources = [];
      let match;
      while ((match = regex.exec(contentValue)) !== null) {
        imageSources.push(match[1]);
      }
      const uploadPromises = imageSources.map((imageSource) => {
        if (imageSource.startsWith('data:image/')) {
          return uploadImageAndGetDownloadURL(imageSource).then(
            (downloadURL) => {
              return downloadURL;
            }
          );
        } else {
          return Promise.resolve(imageSource);
        }
      });

      const downloadURLs = await Promise.all(uploadPromises);
      let updatedContentValue = contentValue;
      let index = 0;
      while ((match = regex.exec(contentValue)) !== null) {
        const imageSource = match[1];
        if (
          imageSource.startsWith('data:image/') &&
          index < downloadURLs.length
        ) {
          updatedContentValue = updatedContentValue.replace(
            imageSource,
            downloadURLs[index]
          );
          index++;
        }
      }
      QuestionData.description = updatedContentValue;
      try {
        const res = await createTopic(QuestionData);
        if (res.data) {
          toast.success(MESSAGES.TOPIC_CREATED);
          setTimeout(() => {
            router.back();
          }, 200);
        }
      } catch (error: any) {
        toastify(error?.response?.data?.message);
      }
    }
  };
  const removeCover = () => {
    if (coverUrl) {
      const storageRef = ref(storage, coverUrl);
      const deletionPromise = deleteObject(storageRef);

      Promise.all([deletionPromise])
        .then(() => {
          setCover(undefined);
          setCoverUrl(null);
        })
        .catch((error) => {
          toast.error(MESSAGES.FAILE_TO_REMOVE);
        });
    }
  };

  React.useEffect(() => {
    if (cover) {
      uploadImageAndGetDownloadURL(cover)
        .then((downloadURL) => {
          setCoverUrl(downloadURL);
        })
        .catch((error: any) => {
          toast.error(error);
        });
    }
  }, [cover]);

  return (
    <>
      <div className={styles.container}>
        <Header showInputSearch={true} />

        <div className={styles.form}>
          <div className={styles.cover__layout}>
            {coverUrl && (
              <div className={styles.cover__layout}>
                <img
                  src={coverUrl}
                  alt="Cover picture"
                  className={styles.cover_image}
                />
                <Button
                  label="Remove"
                  width="30%"
                  backgroundColor={colors.bg.red}
                  textColor={colors.common.white}
                  onClick={removeCover}
                />
              </div>
            )}

            <FilePicker
              coverUrl={coverUrl}
              onChange={(files: { target: { files: any } }) =>
                handleSelectedFile(files.target.files, setCover)
              }
            />
          </div>
          <textarea
            placeholder={LABELS.NEW_POST}
            className={styles.text__area}
            value={title}
            minLength={100}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <Tags tags={tags} setTags={setTags} />
          <div className={styles.quill}>
            <QuillToolbar />
            <ReactQuill
              theme="snow"
              value={contentValue}
              onChange={setContentvalue}
              placeholder={PLACEHOLDER.WRITE_SOMETHING}
              modules={modules}
              formats={formats}
              className={styles.quill}
            />
          </div>
          <Button
            label="Publish"
            width="30%"
            backgroundColor={colors.bg.Java}
            textColor={colors.common.white}
            onClick={submitHandler}
          />
        </div>
      </div>
    </>
  );
};

export default AskPage;
