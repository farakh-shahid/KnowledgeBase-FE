export const setData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const getData = (key: string) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data;
  }
};
export const clearData = () => {
  localStorage.clear();
};
