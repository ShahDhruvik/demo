import { HandleControls, LoadingState, NotFoundState, ShowToastFunction, } from "@/types/common"
import { COMMON_MESSAGE } from "@/utils/commonMessages"
import { DEF_PATHS, PACKAGE_PATH, TNC_PATH } from "@/utils/endPoints"
import { TABLES, } from "@/utils/constants"
import { PackageFields } from "@/types/package"
import axiosInstance from "../axiosInstance"
import { TNCFields } from "@/types/termsAndCondition"
const createTNC = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    formData: TNCFields,
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const data = {
            name: formData.name._id,
            countryIds: formData.countryIds.map(x => { return x._id }),
            effectiveDate: formData.effectiveDate?.toISOString(),
            revisionDate: formData.revisionDate?.toISOString(),
            image: '',
            header: formData.header,
            revisionVersion: formData.revisionVersion,
            description: formData.description
        };
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${TNC_PATH.CREATE}`, data);
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

const getTNC = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    notFound: NotFoundState['setNotFound'],
    notFoundArray: NotFoundState['notFound'],
    handleControls: HandleControls,
) => {
    try {
        loading({ isLoading: true, isPage: false });
        const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${TNC_PATH.GET}`, handleControls);
        if (res.data.success) {
            if (res.data.data.records.length === 0) {
                notFound([...notFoundArray, TABLES.PACKAGE]);
            } else {
                notFound([]);
            }
            return res.data.data;
        } else {
            notFound([...notFoundArray, TABLES.PACKAGE]);
        }
    } catch (error: any) {
        console.log(error);
        if (error.response.status === 404) {
            notFound([...notFoundArray, TABLES.PACKAGE]);
        } else {
            toast('error', error.response.statusText);
        }
    } finally {
        loading({ isLoading: false, isPage: false });
    }
};


const inactiveTNC = async (
    loading: LoadingState['setLoading'],
    toast: ShowToastFunction,
    id: string,
    active: boolean
) => {
    try {
        loading({ isLoading: true, isPage: false })
        const res = await axiosInstance.put(`${DEF_PATHS.COMMON}${TNC_PATH.INACTIVE}/${id}`, { isActive: active });
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


// const dropdownPackage = async (
//     loading: LoadingState['setLoading'],
//     toast: ShowToastFunction,
//     type: any
// ) => {
//     try {
//         loading({ isLoading: true, isPage: false });
//         const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${PACKAGE_PATH.DROPDOWN}`, type);
//         if (res.data.success) {
//             return res.data.data.records;
//         } else {
//             return [];
//         }
//     } catch (error: any) {
//         console.log(error);
//         if (error.response.status === 404) {
//             return [];
//         } else {
//             toast('error', error.response.statusText);
//         }
//     } finally {
//         loading({ isLoading: false, isPage: false });
//     }
// };


export { createTNC, inactiveTNC, getTNC, }