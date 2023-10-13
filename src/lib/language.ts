import { LoadingState, ShowToastFunction } from "@/types/common";
import { LANGUAGE_PATH, DEF_PATHS } from "@/utils/endPoints";
import axiosInstance from "../axiosInstance";

export const dropdownLanguage = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
) => {
    try {
        loading({ isLoading: true, isPage: false });
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${LANGUAGE_PATH.DROPDOWN}`, {});
        if (res.data.success) {
            return res.data.data;
        } else {
            return [];
        }
    } catch (error: any) {
        console.log(error);
        if (error.response.status === 404) {
            return [];
        } else {
            toast('error', error.response.statusText);
        }
    } finally {
        loading({ isLoading: false, isPage: false });
    }
};