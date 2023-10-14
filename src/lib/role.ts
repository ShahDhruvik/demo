import { HandleControls, LoadingState, NotFoundState, ShowToastFunction, } from "@/types/common"
import { CountryFields } from "@/types/location"
import { COMMON_MESSAGE } from "@/utils/commonMessages"
import { VITE_APP_API_URL } from "@/utils/envVariables"
import { ROLE_PATH, DEF_PATHS } from "@/utils/endPoints"
import { TABLES } from "@/utils/constants"
import axiosInstance from "../axiosInstance"
import { acDefaultValue } from "@/utils/form.validation"
import { RoleFields } from "@/types/role"
const createRole = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    formData: RoleFields,
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const data = {
            name: formData.name,
            permissions: formData.permission
        }
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${ROLE_PATH.CREATE}`, data);
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

const getRole = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    notFound: NotFoundState['setNotFound'],
    notFoundArray: NotFoundState['notFound'],
    handleControls: HandleControls,
) => {
    try {
        loading({ isLoading: true, isPage: false });
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${ROLE_PATH.GET}`, handleControls);
        if (res.data.success) {
            if (res.data.data.records.length === 0) {
                notFound([...notFoundArray, TABLES.ROLE]);
            } else {
                notFound([]);
            }
            return res.data.data;
        } else {
            notFound([...notFoundArray, TABLES.ROLE]);
        }
    } catch (error: any) {
        console.log(error);
        if (error.response.status === 404) {
            notFound([...notFoundArray, TABLES.ROLE]);
        } else {
            toast('error', error.response.statusText);
        }
    } finally {
        loading({ isLoading: false, isPage: false });
    }
};

const editRole = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    formData: RoleFields,
    id: string
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const data = {
            name: formData.name,
            permissions: formData.permission
        }
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${ROLE_PATH.EDIT}/${id}`, data);
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
const inactiveRole = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    id: string,
    active: boolean
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${ROLE_PATH.INACTIVE}/${id}`, { isActive: active });
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

const deleteRole = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    id: string,
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${ROLE_PATH.DELETE}/${id}`);
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
const dropdownRole = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
) => {
    try {
        loading({ isLoading: true, isPage: false });
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${ROLE_PATH.DROPDOWN}`, {});
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


export { createRole, editRole, inactiveRole, deleteRole, getRole, dropdownRole }