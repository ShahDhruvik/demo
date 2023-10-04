import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COMMON_PATH } from '../../../paths'
import { useAuth } from '../../../context/AuthContext'
import logo from '@/assets/images/logo.webp'
import { useForm } from 'react-hook-form'
import TxtInput from '@/components/TxtInput'
import { txtFieldValidation } from '@/utils/form.validation'
import { Button } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import '@/styles/swipper-login.css'
import LogSlider1 from '@/assets/images/logSlider1.jpg'
import LogSlider2 from '@/assets/images/logoSlider2.jpg'
import LogSlider3 from '@/assets/images/logoSlider3.jpg'
interface Props {}

const LogIn = ({}: Props) => {
  const { addStorage } = useAuth()
  const nav = useNavigate()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  return (
    <section>
      <div className=' min-h-screen p-10  flex items-center justify-center bg-[#93A5CF]'>
        <div className='g-6 flex h-full flex-wrap items-center justify-center'>
          <div className='w-full'>
            <div className='block rounded-lg bg-white-main shadow-2xl '>
              <div className='g-0  lg:flex lg:flex-wrap lg:flex-row-reverse'>
                <div className='px-4 md:px-0 lg:w-6/12 flex flex-col justify-center items-center '>
                  <div className='md:mx-6 md:p-12'>
                    <div className='text-center'>
                      <img className='mx-auto w-20' src={logo} alt='logo' />
                      <h4 className='mb-5   text-4xl font-semibold'> Oppchar </h4>
                    </div>

                    <form>
                      <div className='relative mb-4' data-te-input-wrapper-init>
                        <TxtInput
                          control={control}
                          name='email'
                          handleChange={() => {}}
                          placeholder='Enter email'
                          validation={txtFieldValidation(true, 'Email')}
                          sx={{ minWidth: 300 }}
                        />
                      </div>

                      <div className='relative mb-4' data-te-input-wrapper-init>
                        <TxtInput
                          control={control}
                          name='password'
                          handleChange={() => {}}
                          placeholder='Enter password'
                          validation={txtFieldValidation(true, 'Password')}
                        />
                      </div>

                      <div className='mb-12 pb-1 pt-1 text-center flex flex-col gap-2'>
                        <Button color='mPink' sx={{ minWidth: '100%' }}>
                          Log In
                        </Button>

                        <Link to='/' className='underline text-darkBlue-main'>
                          Forgot password?
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='flex items-center rounded-b-lg lg:w-6/12 lg:rounded-l-lg lg:rounded-br-none bg-darkBlue-main'>
                  <div className='px-4 py-6 text-white md:mx-6 md:p-12 flex flex-col items-center'>
                    <h4 className='mb-6 text-xl font-semibold text-white-main'>
                      We are more than just a company
                    </h4>
                    <p className='text-sm text-white-main mb-6'>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.
                    </p>
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      slidesPerView={1}
                      scrollbar={{ draggable: true }}
                      autoplay={{ delay: 2000 }}
                      className='bg-pink-light max-w-xs lg:max-w-sm xl:max-w-md aspect-[4/3] '
                    >
                      <SwiperSlide>
                        <div className='flex justify-center items-center max-w-md aspect-square object-contain'>
                          <img src={LogSlider1} alt='' className='' />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className='flex justify-center items-center max-w-md aspect-square object-contain'>
                          <img src={LogSlider2} alt='' className='' />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className='flex justify-center items-center max-w-md aspect-square object-contain'>
                          <img src={LogSlider3} alt='' className='' />
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogIn
