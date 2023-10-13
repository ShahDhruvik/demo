import { HandleControls, LoadingState, NotFoundState, ShowToastFunction, } from "@/types/common"
import { CityFields } from "@/types/location"
import { COMMON_MESSAGE } from "@/utils/commonMessages"
import { CITY_PATH, DEF_PATHS } from "@/utils/endPoints"
import { TABLES } from "@/utils/constants"
import axiosInstance from "../axiosInstance"

const createCity = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    formData: CityFields,
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const data = {
            name: formData.name,
            shortName: formData.shortName,
            stateId: formData.stateId._id,
            pinCodes: formData.pinCodes
        };
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${CITY_PATH.CREATE}`, data);
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
const getCity = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    notFound: NotFoundState['setNotFound'],
    notFoundArray: NotFoundState['notFound'],
    handleControls: HandleControls,
) => {
    try {
        loading({ isLoading: true, isPage: false });
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${CITY_PATH.GET}`, handleControls);
        if (res.data.success) {
            if (res.data.data.records.length === 0) {
                notFound([...notFoundArray, TABLES.CITY]);
            } else {
                notFound([]);
            }
            return res.data.data;
        } else {
            notFound([...notFoundArray, TABLES.CITY]);
        }

    } catch (error: any) {
        console.log(error);
        if (error.response.status === 404) {
            notFound([...notFoundArray, TABLES.CITY]);
        } else {
            toast('error', error.response.statusText);
        }
    } finally {
        loading({ isLoading: false, isPage: false });
    }
};
const editCity = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    formData: CityFields,
    id: string
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const data = {
            name: formData.name,
            shortName: formData.shortName,
            stateId: formData.stateId._id
        };
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${CITY_PATH.EDIT}/${id}`, data);
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
const inactiveCity = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    id: string,
    active: boolean
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${CITY_PATH.INACTIVE}/${id}`, { isActive: active });
        if (res.data.success) {
            toast('success', active ? COMMON_MESSAGE.Inactived : COMMON_MESSAGE.Activated);
        } else {
            toast('info', res.data.message);

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
const deleteCity = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    id: string,
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${CITY_PATH.DELETE}/${id}`);
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
const dropdownCity = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    stateId: string
) => {
    try {
        loading({ isLoading: true, isPage: false });
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${CITY_PATH.GET}/${stateId}`, {});
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

export { createCity, editCity, inactiveCity, deleteCity, getCity, dropdownCity }