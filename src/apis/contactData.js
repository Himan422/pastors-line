import instance from "./intercepter";

export const getContactData = async () => {
  try {
    const res = await instance.get(
      `${process.env.REACT_APP_API_BASE_URL}api/contacts.json?companyId=171`
    );
    if (res.status === 200) return res.data;
    else return [];
  } catch {
    return [];
  }
};
