import { IMAGE_SIZE, MESSAGES, options } from '@/constants';
import { toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from 'fireBaseConfiguration';

export const parseDate = (dateString: string | undefined): string => {
  const date = new Date(dateString ?? '');
  return date.toLocaleDateString('en-Us', options);
};

export const createUrl = (type: string, args: string[]): string => {
  return `${process.env.BASE_URL}${type}/${args.join('/')}`;
};

export const handleSelectedFile = async (
  files: any,
  setCover: React.Dispatch<React.SetStateAction<File | undefined>>
) => {
  if (files && files[0].size < IMAGE_SIZE) {
    const url = await uploadImageAndGetDownloadURL(files[0]);
    if (url) {
      toast.success(MESSAGES.IMAGE_UPLOADED, { autoClose: 2000 });
      setCover(files[0]);
    }
  } else {
    toast.error(MESSAGES.FILE_SIZE_EXCEED);
  }
};

export const uploadImageAndGetDownloadURL = async (
  imageSource: string | File
) => {
  let file: File;

  if (typeof imageSource === 'string') {
    const mimeType = imageSource.split(';')[0].split(':')[1];
    const byteString = atob(imageSource.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: mimeType });
    file = new File([blob], 'image.jpg', { type: mimeType });
  } else {
    file = imageSource;
  }

  const storageRef = ref(storage, `image/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Handle state changes if needed
      },
      (error) => {
        reject(error?.message || MESSAGES.CANNOT_UPLOAD_PICTURE);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

export const calulateReadTime = (content: string) => {
  const wordsPerMinute = 225;
  const contentLength = content?.trim().split(/\s+/).length;
  const readTime = Math.ceil((contentLength as number) / wordsPerMinute);
  return readTime;
};

export const capitalizeName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};
