import RTEInput from '@/components/RTEInput'
import InfoBox from '@/components/infoBox'
import { TNCData } from '@/types/termsAndCondition'
import { INFOBOXES, formatDate, splitDescription } from '@/utils/constants'
import { FormLabel, Tooltip } from '@mui/material'
import { divide } from 'lodash'
import RichTextEditor from 'react-rte'

type Props = {
  entity: TNCData
}

const TncView = ({ entity }: Props) => {
  return (
    <div className='px-5 flex flex-col gap-5 '>
      <div className=' grid grid-cols-auto-fit gap-5'>
        <InfoBox
          type={INFOBOXES.DEFAULT}
          title={'Name'}
          info={<p className='px-2 py-1'>{entity.name}</p>}
        />
        <InfoBox
          type={INFOBOXES.DEFAULT}
          title={'Revision Date'}
          info={<p className='px-2 py-1'>{formatDate(entity.revisionDate)}</p>}
        />
        <InfoBox
          type={INFOBOXES.DEFAULT}
          title={'Effective Date'}
          info={<p className='px-2 py-1'>{formatDate(entity.effectiveDate)}</p>}
        />
        <InfoBox
          type={INFOBOXES.DEFAULT}
          title={'Revision Version'}
          info={
            <Tooltip title={entity.description} arrow>
              <p className='px-2 py-1 cursor-pointer'>
                {splitDescription(entity.revisionVersion, 20)}
              </p>
            </Tooltip>
          }
        />
        <InfoBox
          type={INFOBOXES.DEFAULT}
          title={'Active'}
          info={<p className='px-2 py-1'>{entity.isActive ? 'Yes' : 'No'}</p>}
          number={5}
        />
      </div>
      <div className='grid grid-cols-auto-fit gap-5'>
        <InfoBox
          type={INFOBOXES.MULTI}
          title={'Countries'}
          info={null}
          number={3}
          rows={entity.countries}
          fieldName='name'
        />
      </div>
      <div className=' flex flex-col gap-5'>
        {entity.subheaders.map((x) => {
          return (
            <InfoBox
              type={INFOBOXES.DEFAULT}
              title={x.title}
              info={
                <div className='flex'>
                  <RichTextEditor
                    value={RichTextEditor.createValueFromString(x.description, 'html')}
                    readOnly={true}
                    className='flex-1'
                  />
                </div>
              }
            />
          )
        })}
      </div>
    </div>
  )
}

export default TncView
