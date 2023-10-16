import { HandleControls, LoadingState, NotFoundState, ShowToastFunction } from '@/types/common'
import axiosInstance from '../../axiosInstance'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { QNA } from '@/utils/endPoints'
import { QnaFormFields } from '@/types/questionAnswerTypes'
import { TABLES } from '@/utils/constants'

export const createQna = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  // handleClose: () => void,
  formData: any,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.post(QNA.create, { records: formData })
    if (res.data.success) {
      toast('success', COMMON_MESSAGE.Success)
      return res
    } else {
      toast('error', res.data.message)
    }
    // if (res.data.success) {
    //   handleClose()
    //   toast('success', COMMON_MESSAGE.Success)
    // }
    // return res.data.success
  } catch (error) {
    console.log(error)
    toast('error', error.message)
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const getAllQnas = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  notFound: NotFoundState['setNotFound'],
  notFoundArray: NotFoundState['notFound'],
  handleControls: HandleControls,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.post(QNA.getAll, handleControls)
    // if (res.data.success) {
    //   notFound(['true'])
    //   return res.data.data
    // } else {
    //   notFound(['false'])
    // }
    if (res.data.success) {
      if (res.data.data.records.length === 0) {
        notFound([...notFoundArray, TABLES.QUESTION_ANSWER])
      } else {
        notFound([])
      }
      return res.data.data
    } else {
      notFound([...notFoundArray, TABLES.QUESTION_ANSWER])
    }
  } catch (error) {
    console.log(error)
    if (error.response.status === 404) {
      notFound([...notFoundArray, TABLES.QUESTION_ANSWER])
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export const editQna = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  handleClose: () => void,
  formData: QnaFormFields,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(`${QNA.edit}${id}`, formData)
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

export const deleteQna = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(`${QNA.delete}${id}`)
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

export const inActiveQna = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  isActive: boolean,
  id: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(`${QNA.inActive}${id}`, {
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

export const getAllTreatmentPlan = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  notFound: NotFoundState['setNotFound'],
  handleControls: HandleControls,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.post(QNA.treatmentPlan, handleControls)
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
