import { HandleControls, LoadingState, NotFoundState, ShowToastFunction } from '@/types/common'
import axiosInstance from '../../axiosInstance'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { FAQ } from '@/utils/endPoints'
import { FaqFormFields } from '@/types/faqTypes'
import { TABLES } from '@/utils/constants'

export const createFaq = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
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

export const getAllFaqs = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  notFound: NotFoundState['setNotFound'],
  notFoundArray: NotFoundState['notFound'],
  handleControls: HandleControls,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.post(FAQ.getAll, handleControls)
    if (res.data.success) {
      if (res.data.data.records.length === 0) {
        notFound([...notFoundArray, TABLES.FAQ])
      } else {
        notFound([])
      }
      return res.data.data
    } else {
      notFound([...notFoundArray, TABLES.FAQ])
    }
  } catch (error) {
    console.log(error)
    if (error.response.status === 404) {
      notFound([...notFoundArray, TABLES.FAQ])
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const editFaq = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
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

export const deleteFaq = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(`${FAQ.delete}${id}`)
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

export const inActiveFaq = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: string,
  active: boolean,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(`${FAQ.inActive}${id}`, { isActive: active })
    if (res.data.success) {
      toast('success', active ? COMMON_MESSAGE.Inactived : COMMON_MESSAGE.Activated)
    } else {
      toast('info', res.data.message)
    }
    return res.data.success
  } catch (error) {
    console.log(error)
    toast('error', error.message)
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}
