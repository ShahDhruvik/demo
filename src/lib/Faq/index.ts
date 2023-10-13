import { HandleControls, LoadingState, NotFoundState, ShowToastFunction } from '@/types/common'
import axiosInstance from '../../axiosInstance'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { FAQ } from '@/utils/endPoints'
import { FaqFormFields } from '@/types/faqTypes'

export const createFaq = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  handleClose: () => void,
  formData: FaqFormFields,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const data = {
      question: formData.question,
      answer: formData.answer,
    }
    const res = await axiosInstance.post(FAQ.create, data)

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

export const getAllFaqs = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  notFound: NotFoundState['setNotFound'],
  handleControls: HandleControls,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.post(FAQ.getAll, handleControls)
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

export const editFaq = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  handleClose: () => void,
  formData: FaqFormFields,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const data = {
      question: formData.question,
      answer: formData.answer,
    }
    const res = await axiosInstance.put(`${FAQ.edit}${id}`, data)
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

export const deleteFaq = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(`${FAQ.delete}${id}`)
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

export const inActiveFaq = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  isActive: boolean,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(`${FAQ.inActive}${id}`, {
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
