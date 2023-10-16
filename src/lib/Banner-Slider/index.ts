import {
  HandleControls,
  LoadingState,
  NotFoundState,
  ShowToastFunction,
  ToastType,
} from '@/types/common'
import axiosInstance from '../../axiosInstance'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { BANNER_SLIDER } from '@/utils/endPoints'
import { BannerSliderFormFields } from '@/types/bannerSlider'
import { TABLES } from '@/utils/constants'

export const createBannerSlider = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: BannerSliderFormFields,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const data = {
      title: formData.title,
      image: String(formData.image),
    }
    const res = await axiosInstance.post(BANNER_SLIDER.create, data)
    if (res.data.success) {
      toast('success', COMMON_MESSAGE.Success)
      return res
    } else {
      toast('error', res.data.message)
    }
  } catch (error) {
    console.log(error)
    toast('error', error.message)
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const getAllBannerSliders = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  notFound: NotFoundState['setNotFound'],
  notFoundArray: NotFoundState['notFound'],
  handleControls: HandleControls,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.post(BANNER_SLIDER.getAll, handleControls)
    if (res.data.success) {
      if (res.data.data.records.length === 0) {
        notFound([...notFoundArray, TABLES.BANNER_SLIDER])
      } else {
        notFound([])
      }
      return res.data.data
    } else {
      notFound([...notFoundArray, TABLES.BANNER_SLIDER])
    }
  } catch (error) {
    console.log(error)
    if (error.response.status === 404) {
      notFound([...notFoundArray, TABLES.BANNER_SLIDER])
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const editBannerSlider = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: BannerSliderFormFields,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const data = {
      title: formData.title,
      image: formData.image,
    }
    const res = await axiosInstance.put(`${BANNER_SLIDER.edit}${id}`, data)
    if (res.data.success) {
      toast('success', COMMON_MESSAGE.Updated)
      return res
    } else {
      toast('error', res.data.message)
    }
  } catch (error) {
    console.log(error)
    toast('error', error.message)
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const deleteBannerSlider = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(`${BANNER_SLIDER.delete}${id}`)
    if (res.data.success) {
      toast('success', COMMON_MESSAGE.Deleted)
    }
    return res.data.success
  } catch (error) {
    console.log(error)
    toast('error', error.message)
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const inActiveBannerSlider = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: string,
  active: boolean,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(`${BANNER_SLIDER.inActive}${id}`, { isActive: active })
    if (res.data.success) {
      toast('success', active ? COMMON_MESSAGE.Inactived : COMMON_MESSAGE.Activated)
    } else {
      toast('info', res.data.message)
    }
    return res.data.success
  } catch (error) {
    console.log(error)
    if (error.response.status === 400) {
      toast('info', error.response.statusText)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}
