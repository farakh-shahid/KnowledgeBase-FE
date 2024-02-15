import { SearchOptions } from "@/constants/menuOptions/MenuOptions";
import ListItem from "@/containers/atoms/listItem/ListItem";
import React from "react";
export const SearchStyle: React.CSSProperties = {
  height: "40vh",
  width: "15vw",
};
const SearchListItem = () => {
  return (
    <div>
      {SearchOptions.map((value, index) => {
        return <ListItem option={value} key={index} />;
      })}
    </div>
  );
};

export default SearchListItem;
