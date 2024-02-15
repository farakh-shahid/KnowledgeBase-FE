import 'react-quill/dist/quill.snow.css';
import Header from '@/containers/organisms/header/Header';
import styles from '@/styles/TopicPage.module.scss';
import CardHeading from '@/containers/atoms/cardHeading/CardHeading';
import UserAvatar from '@/containers/atoms/userAvatar/UserAvatar';
import Label from '@/containers/atoms/label/Label';
import Divider from '@/containers/atoms/divider/Divider';
import { useState, useEffect, useContext } from 'react';
import Terms from '@/containers/organisms/terms/Terms';
import {
  getLinked,
  getTopic,
  updateAsked,
  updateTopic,
} from '@/services/api/topicService';
import { toast } from 'react-toastify';
import { getProfileAvatar, IMAGE_REGEX, LABELS, MESSAGES } from '@/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { createReation } from '@/services/api/likeService';
import { StoreContext, StoreContextState } from '@/contextStore/storeProvider';
import { ContentDto } from '@/interfaces/contentDto';
import { createContent } from '@/services/api/contetService';
import { QuestionProps } from '@/interfaces/questionProps';
import { Answer } from '@/containers/organisms/answer/Answer';
import QuillToolbar, {
  formats,
  modules,
} from '@/containers/organisms/quillToolBar/QuillToolBar';
import Switch from '@/containers/molecules/switch/Switch';
import { QuestionCard } from '@/containers/organisms/questionCard/QuestionCard';
import { QuestionDto } from '@/interfaces/QuestionDto';
import TopOfLineCard from '@/containers/molecules/toOfLineCard/TopOfLineCard';
import TopOfLineCardSkelton from '@/containers/skeltons/TopOfLineSkelton';
import SubHeading from '@/containers/atoms/subHeading/SubHEading';
import { uploadImageAndGetDownloadURL } from '@/utils/functions';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Index = () => {
  const router = useRouter();
  const store = useContext<StoreContextState>(StoreContext);
  const [user] = store.user;
  const [contentValue, setContentValue] = useState('');
  const [topicId, setTopicId] = useState<string>('');
  const [data, setData] = useState<QuestionProps | undefined>();
  const [like, setLike] = useState<boolean>(false);
  const [asked, setAsked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contentLoad, setContentload] = useState(false);
  const [linked, setLinked] = useState<QuestionDto[] | null>(null);
  const getTopicInfo = async (id: string = '') => {
    setLoading(true);
    try {
      const targetId = id ? id : topicId;
      const res = await getTopic(targetId);
      if (res.data) {
        setData(res.data);
        setLike(res.data?.likes?.includes(user?.id ?? '') || false);
        setAsked(res.data?.asked?.includes(user?.id ?? ''));
        setLoading(false);
      }
    } catch (error) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };
  const getLinkedQuestions = async (id: string) => {
    try {
      const res = await getLinked(id);
      if (res.data) setLinked(res.data);
    } catch (error) {}
  };
  const getTopicById = async (id: string = '') => {
    try {
      const targetId = id ? id : topicId;
      const res = await getTopic(targetId);
      if (res.data) {
        setData(res.data);
      }
    } catch (error) {
      toast.error(MESSAGES.ERROR_WHILE_LOADING_DATA);
    }
  };
  useEffect(() => {
    const getData = async () => {
      if (router.isReady) {
        const id = router.query.id;
        if (!id) return null;
        setTopicId(id as string);
        getTopicInfo(id as string);
        getLinkedQuestions(id as string);
      }
    };
    getData();
  }, [router.query.id]);

  const { author, likes, contents } = data || {};
  const { author: contentAuthor } = contents?.[0] || {};
  const userName = `${contentAuthor?.firstName} ${contentAuthor?.lastName}`;

  const ContentToCreate: ContentDto = {
    description: contentValue,
    authorId: user?.id as string,
    topicId,
    readTime: 1,
  };

  const toggleAsked = async () => {
    try {
      setAsked(!asked);
      const res = await updateAsked(topicId);
      if (typeof res.data === 'boolean' && asked === res.data) {
        setAsked(res.data);
      }
    } catch (error) {
      setAsked(asked);
      toast.error('Unable to post asked status.');
    }
  };
  const toggleLike = async () => {
    setLike(!like);
    try {
      const res = await createReation({
        type: 'QUESTION',
        targetId: topicId,
        userId: user?.id,
      });
      if (res.data.id) {
        const updatedlikes = [...(data?.likes as string[]), res.data.userId];
        const updatedTopic = await updateTopic(
          { likes: updatedlikes },
          topicId
        );
        if (updatedTopic.data) {
          getTopicById();
        }
      } else {
        setLike(false);
        const updatedlikes = likes?.filter((value) => {
          return value !== user?.id;
        });
        const updatedTopic = await updateTopic(
          { likes: updatedlikes },
          topicId
        );
        if (updatedTopic.data) {
          getTopicById();
        }
      }
    } catch (error) {
      setLike(false);
      toast.error('Error while reacting to the topic');
    }
  };

  const handlePostFeedback = async () => {
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
    ContentToCreate.description = updatedContentValue;
    try {
      setContentload(true);
      const res = await createContent(ContentToCreate);
      if (res.data) {
        toast.success(MESSAGES.FEEDBACK_SUBMITTED);
        setContentValue('');
        getTopicById();
        setContentload(false);
      }
    } catch (error) {
      toast.error(MESSAGES.ERROR);
    }
  };
  return (
    <>
      <Header />
      <div className={styles.grid__container}>
        <div className={styles.grid__left__panel}>
          <div className={styles.card}>
            <QuestionCard
              question={data}
              like={like}
              toggleLike={toggleLike}
              loading={loading}
            />
            {!loading && (
              <div>
                <Divider />
                {data?.contents?.length ? (
                  <>
                    <h3
                      className={`${styles.question__heading} ${styles.answer__border}`}
                    >
                      {data.contents.length} Answer
                    </h3>
                    <Divider />
                    {data.contents.map((answer) => (
                      <Answer {...answer} key={answer.id} />
                    ))}
                  </>
                ) : (
                  <>
                    <p>{LABELS.NO_ANSWERS}</p>
                    <Divider />
                  </>
                )}
                <CardHeading heading={LABELS.GIVE_FEEDBACK} />
                <>
                  <div className={styles.quill}>
                    <QuillToolbar />
                    <ReactQuill
                      theme="snow"
                      value={contentValue}
                      onChange={setContentValue}
                      modules={modules}
                      formats={formats}
                      className={styles.quill}
                    />
                  </div>
                  <div className={styles.feedback__contaier}>
                    <button
                      className={styles.button__outlined}
                      onClick={handlePostFeedback}
                      disabled={contentLoad}
                    >
                      {LABELS.POST_FEEDBACK}
                    </button>
                    <Terms />
                  </div>
                </>
              </div>
            )}
          </div>
        </div>
        <div className={styles.grid__right__panel}>
          <div className={styles.right__panel}>
            <div className={styles.toggle}>
              <p>Was this question asked in an interview?</p>
              <Switch
                isToggled={asked}
                onToggle={() => {
                  toggleAsked();
                }}
              />
              {asked ? <label>Yes</label> : <label>No</label>}
            </div>

            <div className={styles.asked__by}>
              <p className={styles.user__name}>{LABELS.ASKED_BY}</p>
              <UserAvatar
                size={45}
                iconSize={40}
                onClick={() => {}}
                avatar_url={author?.picture}
              />
              <p className={styles.user__name}>{author?.firstName}</p>
              <Label label="44 Followers" />
            </div>
            <div className={styles.answered__by}>
              <p>{LABELS.ANSWERED_BY}</p>
              <UserAvatar
                size={45}
                iconSize={40}
                onClick={() => {}}
                avatar_url={author?.picture || getProfileAvatar(userName)}
              />
            </div>
            <div>
              <SubHeading value="Linked" />
              {!linked ? (
                <>
                  {Array.from(Array(3)).map((loader) => (
                    <TopOfLineCardSkelton key={loader} />
                  ))}
                </>
              ) : linked?.length ? (
                linked.map((topic: JSX.IntrinsicAttributes & QuestionDto) => {
                  return <TopOfLineCard {...topic} key={topic.id} />;
                })
              ) : (
                []
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
