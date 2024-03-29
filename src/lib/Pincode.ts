import { HandleControls, LoadingState, NotFoundState, ShowToastFunction, } from "@/types/common"
import { CityFields, PincodeFields } from "@/types/location"
import { COMMON_MESSAGE } from "@/utils/commonMessages"
import { PINCODE_PATH, DEF_PATHS } from "@/utils/endPoints"
import { TABLES } from "@/utils/constants"
import axiosInstance from "../axiosInstance"
import { acDefaultValue } from "@/utils/form.validation"

const createPincode = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    formData: PincodeFields,
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const data: any = {
            value: formData.value,
            isAvailable: formData.isAvailable,
            cityId: formData.cityId._id,
            primaryLanguage: formData.primaryLan._id
        };
        if (formData.thirdLan._id !== acDefaultValue._id) {
            data.thirdLanguage = formData.thirdLan._id
        }
        if (formData.secondaryLan._id !== acDefaultValue._id) {
            data.secondLanguage = formData.secondaryLan._id
        }
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${PINCODE_PATH.CREATE}`, data);
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
const getPincode = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    notFound: NotFoundState['setNotFound'],
    notFoundArray: NotFoundState['notFound'],
    handleControls: HandleControls,
) => {
    try {
        loading({ isLoading: true, isPage: false });
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${PINCODE_PATH.GET}`, handleControls);
        if (res.data.success) {
            if (res.data.data.records.length === 0) {
                notFound([...notFoundArray, TABLES.PINCODE]);
            } else {
                notFound([]);
            }
            return res.data.data;
        } else {
            notFound([...notFoundArray, TABLES.PINCODE]);
        }

    } catch (error: any) {
        console.log(error);
        if (error.response.status === 404) {
            notFound([...notFoundArray, TABLES.PINCODE]);
        } else {
            toast('error', error.response.statusText);
        }
    } finally {
        loading({ isLoading: false, isPage: false });
    }
};
const editPincode = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    formData: PincodeFields,
    id: string
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const data: any = {
            value: formData.value,
            isAvailable: formData.isAvailable,
            cityId: formData.cityId._id,
            primaryLanguage: formData.primaryLan._id
        };
        if (formData.thirdLan._id !== acDefaultValue._id) {
            data.thirdLanguage = formData.thirdLan._id
        }
        if (formData.secondaryLan._id !== acDefaultValue._id) {
            data.secondLanguage = formData.secondaryLan._id
        }
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${PINCODE_PATH.EDIT}/${id}`, data);
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
const inactivePincode = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    id: string,
    active: boolean
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${PINCODE_PATH.INACTIVE}/${id}`, { isActive: active });
        if (res.data.success) {
            toast('success', active ? COMMON_MESSAGE.Inactived : COMMON_MESSAGE.Activated);
        } else {
            toast('info', res.data.message);

        }
        return res.data.success;
    } catch (error: any) {
        if (error.response.status === 400) {
            toast('info', error.response.statusText);
        } else {
            toast('error', error.response.statusText);
        }
    } finally {
        loading({ isLoading: true, isPage: false })
    }
};
const deletePincode = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    id: string,
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${PINCODE_PATH.DELETE}/${id}`);
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
// const dropdownPincode = async (
//     loading: LoadingState['setLoading'],
//     snack: ShowToastFunction,
//     stateId: string
// ) => {
//     try {
//         loading({ isLoading: true, isPage: false });
//         const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${PINCODE_PATH.GET}/${stateId}`, {});
//         if (res.data.success) {
//             return res.data.data.records;
//         } else {
//             return [];
//         }
//     } catch (error: any) {
//         console.log(error);
//         snack('error', error.message);
//     } finally {
//         loading({ isLoading: false, isPage: false });
//     }
// };

export { createPincode, editPincode, inactivePincode, deletePincode, getPincode }