import instance from "./intercepter";

export const getContactData = async ({
  query = "",
  page = "",
  countryId = "",
}) => {
  try {
    const res = await instance.get(
      `${process.env.REACT_APP_API_BASE_URL}api/contacts.json?companyId=171${
        query ? "?query=" + query : ""
      }${page ? "&page=" + page : ""}${
        countryId ? "&countryId=" + countryId : ""
      }`
    );
    if (res.status === 200) return res.data;
    else return [];
  } catch {
    return [];
  }
};
