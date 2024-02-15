import style from "@/styles/TagListItem.module.scss";
interface TagListItemProps {
  value: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}
export default function TagListItem(props: TagListItemProps) {
  return (
    <div className={style.top__tag__item} onClick={props.onClick}>
      <>
        <span>#</span>
        {props.value}
      </>
    </div>
  );
}
