import { InfoBoxes } from '@/types/common'
import { INFOBOXES } from '@/utils/constants'
import { Divider } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  type: InfoBoxes
  title: ReactNode | string
  info: ReactNode | string
  number?: number
  rows?: any[]
  fieldName?: string
}

const InfoBox = ({ type, title, info, number, rows, fieldName }: Props) => {
  switch (type) {
    case INFOBOXES.DEFAULT:
      return (
        <div className='flex shadow-box-out  max-w-xs'>
          <div className='bg-lightGreen-main px-7 flex items-center justify-center'>
            <p className='text-xl text-white-main font-semibold'>{number}</p>
          </div>
          <div className='flex-1 bg-[#F8F9FF]'>
            <h4 className='px-2 py-1  text-lg  tracking-wider font-bold '>{title}</h4>
            <Divider />
            {info}
          </div>
        </div>
      )
      break
    case INFOBOXES.MULTI:
      return (
        <div className='shadow-box-out'>
          <div>
            <h4 className='px-2 py-1 text-lg tracking-wider font-bold  text-white-main bg-lightGreen-main  '>
              {title}
            </h4>
            <Divider />
            <ul className='list-disc list-inside min-h-[144px] max-h-36 overflow-y-scroll scrollBar py-1'>
              {rows &&
                rows.map((x) => {
                  return (
                    <div>
                      <li className='px-2 py-1  '>{fieldName ? x[fieldName] : x}</li>
                      <Divider />
                    </div>
                  )
                })}
            </ul>
          </div>
        </div>
      )
      break

    default:
      break
  }
}

export default InfoBox
