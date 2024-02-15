import React, { useEffect, useRef, useState } from "react";
import style from "@/styles/Tags.module.scss";
import { TagsProps } from "@/interfaces/TagsPros";
import { createLabel, getLabels } from "@/services/api/labelService";
import { TagProps } from "@/interfaces/tagProps";
import { MESSAGES, PLACEHOLDER } from "@/constants";
import { CategoriesProps } from "@/interfaces/categoriesProps";
import TagListItem from "@/containers/atoms/tagListItem/TagListItem";

const Tags = ({ tags, setTags }: TagsProps) => {
  const [topTags, setToptags] = useState<TagProps[]>([]);
  const [isDropDown, setDropDown] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const popUpRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = React.useMemo(() => {
    return topTags.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
  }, [value]);

  const handleKeyDown = async (evt: any) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      var tag = value.trim();
      createTag(tag);
    }
  };
  const createTag = async (title: string) => {
    if (value && tags.length <= 3) {
      try {
        const res = await createLabel({ title: title, type: "CATEGORY" });
        if (res.data) setTags([...tags, res.data]);
      } catch (error) {}
      setValue("");
      setError("");
    } else {
      setError(MESSAGES.TAG_ERROR);
      setValue("");
    }
  };
  const handleChange = (evt: any) => {
    setValue(evt.target.value);
  };

  const handleDelete = (item: string) => {
    setTags(tags.filter((i: TagProps) => i.id !== item));
  };
  const handleFocus = () => {
      setDropDown(true);
      setTimeout(() => {
        getTopLabels();
      }, 1000);
  };
  const handleItemCLick = (item: TagProps) => {
    if (tags.length > 3) {
      setError(MESSAGES.TAG_ERROR);
    } else {
      setTags([...tags, item]);
      setValue("");
    }
  };
  const getTopLabels = async () => {
    try {
      const res = await getLabels();
      if (res.data) setToptags(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    document.body.addEventListener("click", listenToClick);
    return () => {
      document.body.removeEventListener("click", listenToClick);
    };
  }, []);

  const listenToClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement | HTMLInputElement;
    if (
      popUpRef.current &&
      !popUpRef.current.contains(target) &&
      !inputRef.current?.contains(target)
    ) {
      setDropDown(false);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {tags.map((item, index) => (
          <div className={style.tag__item} key={index}>
            <>
              {item.title}
              <button
                type='button'
                className={style.button}
                onClick={() => handleDelete(item.id)}
              >
                &times;
              </button>
            </>
          </div>
        ))}
        <input
          className={style.input}
          placeholder={PLACEHOLDER.ADD_TAGS}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onFocus={handleFocus}
          ref={inputRef}
        />
      </div>
      {isDropDown && (
        <div className={style.dd__wrapper} ref={popUpRef}>
          <p className={style.top__tags}>Top Tags</p>
          <hr />
          {filteredItems.length > 0 ? (
            filteredItems.map((tag) => {
              return (
                <TagListItem
                  onClick={() => {
                    handleItemCLick(tag);
                  }}
                  value={tag.title}
                  key={tag.id}
                />
              );
            })
          ) : (
            <TagListItem
              onClick={() => {
                createTag(value);
              }}
              value={value}
            />
          )}
        </div>
      )}
      {error.length > 0 && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default Tags;
