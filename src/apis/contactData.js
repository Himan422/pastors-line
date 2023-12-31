import Axios from "axios";
import instance from "./intercepter";

let ourRequest = Axios.CancelToken.source();
export const getContactData = async ({
  query = "",
  page = "",
  countryId = "",
  setLoading,
}) => {
  try {
    setTimeout(() => {
      setLoading(true);
    }, 0);

    // to cancel previous request
    if (ourRequest) {
      ourRequest.cancel();
    }
    ourRequest = Axios.CancelToken.source();
    const res = await instance.get(
      `${process.env.REACT_APP_API_BASE_URL}api/contacts.json?companyId=171${
        query ? "&query=" + query : ""
      }${page ? "&page=" + page : ""}${
        countryId ? "&countryId=" + countryId : ""
      }`,
      { cancelToken: ourRequest.token }
    );
    setLoading(false);
    if (res.status === 200) {
      return res.data;
    } else return [];
  } catch {
    setLoading(false);
    return [];
  }
};
