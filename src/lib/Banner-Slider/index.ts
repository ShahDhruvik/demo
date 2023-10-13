import {
  HandleControls,
  LoadingState,
  NotFoundState,
  ShowToastFunction,
  ToastType,
} from '@/types/common'
import axiosInstance from '../../../axiosInstance'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { BANNER_SLIDER, FAQ } from '@/utils/endPoints'
import { TOAST_TYPES } from '@/utils/constants'
import { BannerSliderFormFields } from '@/types/bannerSlider'

export const createBannerSlider = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  handleClose: () => void,
  formData: BannerSliderFormFields,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const data = {
      title: formData.title,
      image: formData.image,
    }
    const res = await axiosInstance.post(BANNER_SLIDER.create, data)

    if (res.data.success) {
      handleClose()
      toast('success', COMMON_MESSAGE.Success)
    }
    return res.data.success
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
  handleControls: HandleControls,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.post(BANNER_SLIDER.getAll, handleControls)
    if (res.data.success) {
      notFound(['true'])
      return res.data.data
    } else {
      notFound(['false'])
    }
  } catch (error) {
    console.log(error)
    toast('error', error.message)
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const editBannerSlider = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  handleClose: () => void,
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
      handleClose()
      toast('success', COMMON_MESSAGE.Success)
    }
    return res.data.success
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
      toast('success', COMMON_MESSAGE.Success)
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
  isActive: boolean,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(`${BANNER_SLIDER.inActive}${id}`, {
      isActive,
    })
    if (res.data.success) {
      toast('success', COMMON_MESSAGE.Success)
    }
    return res.data.success
  } catch (error) {
    console.log(error)
    toast('error', error.message)
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}
