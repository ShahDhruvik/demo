import { HandleControls, LoadingState, NotFoundState, ShowToastFunction, } from "@/types/common"
import { StateFields } from "@/types/location"
import { COMMON_MESSAGE } from "@/utils/commonMessages"
import axiosInstance from '../../axiosInstance'
import { STATE_PATH, DEF_PATHS } from "@/utils/endPoints"
import { TABLES } from "@/utils/constants"

const createState = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    formData: StateFields,
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const data = {
            name: formData.name,
            shortName: formData.shortName,
            cities: formData.cities,
            countryId: formData.countryId._id
        };
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${STATE_PATH.CREATE}`, data);
        if (res.data.success) {
            toast('success', COMMON_MESSAGE.Success);
            return res;
        } else {
            toast('error', res.data.message);
        }
    } catch (error: any) {
        console.log(error)
        toast("error", error.message);
    } finally {
        loading({ isLoading: false, isPage: false });
    }
}
const getState = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    notFound: NotFoundState['setNotFound'],
    notFoundArray: NotFoundState['notFound'],
    handleControls: HandleControls,
) => {
    try {
        loading({ isLoading: true, isPage: false });
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${STATE_PATH.GET}`, handleControls);
        if (res.data.success) {
            if (res.data.data.records.length === 0) {
                notFound([...notFoundArray, TABLES.STATE]);
            } else {
                notFound([]);
            }
            return res.data.data;
        } else {
            notFound([...notFoundArray, TABLES.STATE]);
        }
    } catch (error: any) {
        console.log(error);
        if (error.response.status === 404) {
            notFound([...notFoundArray, TABLES.STATE]);
        } else {
            toast('error', error.response.statusText);
        }
    } finally {
        loading({ isLoading: false, isPage: false });
    }
};
const editState = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    formData: StateFields,
    id: string
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const data = {
            name: formData.name,
            shortName: formData.shortName,
            countryId: formData.countryId._id
        };
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${STATE_PATH.EDIT}/${id}`, data);
        if (res.data.success) {
            toast('success', COMMON_MESSAGE.Updated);
            return res;
        } else {
            toast('error', res.data.message);
        }
    } catch (error: any) {
        console.log(error)
        toast("error", error.message);
    } finally {
        loading({ isLoading: false, isPage: false });
    }
}
const inactiveState = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    id: string,
    active: boolean
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${STATE_PATH.INACTIVE}/${id}`, { isActive: active });
        if (res.data.success) {
            toast('success', active ? COMMON_MESSAGE.Inactived : COMMON_MESSAGE.Activated);
        }
        return res.data.success;
    } catch (error: any) {
        console.log(error);
        if (error.response.status === 400) {
            toast('info', error.response.data.message);
        } else {
            toast('error', error.response.statusText);
        }
    } finally {
        loading({ isLoading: false, isPage: false })
    }
};
const deleteState = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    id: string,
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${STATE_PATH.DELETE}/${id}`);
        if (res.data.success) {
            toast('success', COMMON_MESSAGE.Deleted);
        }
        return res.data.success;
    } catch (error: any) {
        console.log(error);
        toast('error', error.message);
    } finally {
        loading({ isLoading: true, isPage: false })
    }
};
const dropdownState = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    countryId: string
) => {
    try {
        loading({ isLoading: true, isPage: false });
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${STATE_PATH.GET}/${countryId}`, {});
        if (res.data.success) {
            return res.data.data.records;
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


export { createState, editState, inactiveState, deleteState, getState, dropdownState }