import { HandleControls, LoadingState, NotFoundState, ShowToastFunction } from '@/types/common'
import axiosInstance from '../axiosInstance'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { DOMAIN } from '@/utils/endPoints'
import { DomainFormFields } from '@/types/domain'
import { TABLES } from '@/utils/constants'

export const createDomain = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: DomainFormFields,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const data = {
      title: formData.title,
      description: formData.description,
    }
    const res = await axiosInstance.post(DOMAIN.create, data)

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

export const getAllDomains = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  notFound: NotFoundState['setNotFound'],
  notFoundArray: NotFoundState['notFound'],
  handleControls: HandleControls,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.post(DOMAIN.getAll, handleControls)
    if (res.data.success) {
      if (res.data.data.records.length === 0) {
        notFound([...notFoundArray, TABLES.DOMAIN])
      } else {
        notFound([])
      }
      return res.data.data
    } else {
      notFound([...notFoundArray, TABLES.DOMAIN])
    }
  } catch (error) {
    console.log(error)
    if (error.response.status === 404) {
      notFound([...notFoundArray, TABLES.DOMAIN])
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const editDomain = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: DomainFormFields,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const data = {
      title: formData.title,
      description: formData.description,
    }
    const res = await axiosInstance.put(`${DOMAIN.edit}${id}`, data)
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

export const inActiveDomain = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: string,
  active: boolean,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(`${DOMAIN.inActive}${id}`, { isActive: active })
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
