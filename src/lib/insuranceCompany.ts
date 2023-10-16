import { HandleControls, LoadingState, NotFoundState, ShowToastFunction } from '@/types/common'
import { CityFields, PincodeFields } from '@/types/location'
import { COMMON_MESSAGE } from '@/utils/commonMessages'
import { INSURANCE_COMPANY_PATH, DEF_PATHS, PINCODE_PATH } from '@/utils/endPoints'
import { TABLES } from '@/utils/constants'
import axiosInstance from '../axiosInstance'
import { acDefaultValue } from '@/utils/form.validation'
import { Plans, insuranceCompanyFields } from '@/types/insuranceCompany'

const createInsuranceCompany = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  formData: insuranceCompanyFields,
) => {
  try {
    loading({ isLoading: true, isPage: false })

    let a = []
    a.push(formData.plans)

    const transformedPlans = a.map((plan) => ({
      ...plan,
      coverageType: plan?.coverageType?.label,
    }))

    const data: any = {
      name: formData.name,
      addressLineOne: formData.addressLineOne,
      addressLineTwo: formData.addressLineTwo,
      countryId: formData.countryId._id,
      stateId: formData.stateId._id,
      cityId: formData.cityId._id,
      pinCodeId: formData.pinCodeId._id,
      plans: formData.plans,
      description: formData.description,
      contact: formData.contact,
      logo: formData.logo,
      website: formData.website,
      fax: formData.fax,
      phone: formData.phone,
      email: formData.email,
    }
    console.log(data, 'llll')

    const res = await axiosInstance.post(
      `${DEF_PATHS.COMMON}${INSURANCE_COMPANY_PATH.CREATE}`,
      data,
    )
    if (res.data.success) {
      toast('success', COMMON_MESSAGE.Success)
      return res
    } else {
      toast('error', res.data.message)
    }
  } catch (error: any) {
    console.log(error)
    toast('error', error.message)
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

const getInsuranceCompany = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  notFound: NotFoundState['setNotFound'],
  notFoundArray: NotFoundState['notFound'],
  handleControls: HandleControls,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.post(
      `${DEF_PATHS.COMMON}${INSURANCE_COMPANY_PATH.GET}`,
      handleControls,
    )
    if (res.data.success) {
      if (res.data.data.records.length === 0) {
        notFound([...notFoundArray, TABLES.INSURANCE_COMPANY])
      } else {
        notFound([])
      }
      return res.data.data
    } else {
      notFound([...notFoundArray, TABLES.INSURANCE_COMPANY])
    }
  } catch (error: any) {
    console.log(error)
    if (error.response.status === 404) {
      notFound([...notFoundArray, TABLES.INSURANCE_COMPANY])
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

const inactiveInsuranceCompany = async (
  loading: LoadingState['setLoading'],
  toast: ShowToastFunction,
  id: string,
  active: boolean,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.put(
      `${DEF_PATHS.COMMON}${INSURANCE_COMPANY_PATH.INACTIVE}/${id}`,
      { isActive: active },
    )
    if (res.data.success) {
      toast('success', active ? COMMON_MESSAGE.Inactived : COMMON_MESSAGE.Activated)
    } else {
      toast('info', res.data.message)
    }
    return res.data.success
  } catch (error: any) {
    if (error.response.status === 400) {
      toast('info', error.response.statusText)
    } else {
      toast('error', error.response.statusText)
    }
  } finally {
    loading({ isLoading: true, isPage: false })
  }
}

const dropdownPincode = async (
  loading: LoadingState['setLoading'],
  snack: ShowToastFunction,
  cityId: string,
) => {
  try {
    loading({ isLoading: true, isPage: false })
    const res = await axiosInstance.post(`${DEF_PATHS.COMMON}${PINCODE_PATH.GET}/${cityId}`, {})
    if (res.data.success) {
      return res.data.data.records
    } else {
      return []
    }
  } catch (error: any) {
    console.log(error)
    snack('error', error.message)
  } finally {
    loading({ isLoading: false, isPage: false })
  }
}

export { createInsuranceCompany, inactiveInsuranceCompany, getInsuranceCompany, dropdownPincode }
