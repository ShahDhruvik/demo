import InfoBox from '@/components/infoBox'
import { TableStates } from '@/types/common'
import { PackageData } from '@/types/package'
import { INFOBOXES, splitDescription } from '@/utils/constants'
import { Divider, Fade, Tooltip } from '@mui/material'
import React from 'react'

type Props = {
  entity: PackageData
}

const PackageView = ({ entity }: Props) => {
  console.log(entity)

  return (
    <div className='px-5 flex flex-col gap-5 '>
      <div className=' grid grid-cols-auto-fit gap-5'>
        <InfoBox
          type={INFOBOXES.DEFAULT}
          title={'Title'}
          info={<p className='px-2 py-1'>{entity.title}</p>}
          number={1}
        />
        <InfoBox
          type={INFOBOXES.DEFAULT}
          title={'Price'}
          info={<p className='px-2 py-1'>{entity.price}</p>}
          number={2}
        />
        <InfoBox
          type={INFOBOXES.DEFAULT}
          title={'Discount'}
          info={<p className='px-2 py-1'>{entity.discount}</p>}
          number={3}
        />
        <InfoBox
          type={INFOBOXES.DEFAULT}
          title={'Description'}
          info={
            <Tooltip title={entity.description} arrow>
              <p className='px-2 py-1 cursor-pointer'>{splitDescription(entity.description, 20)}</p>
            </Tooltip>
          }
          number={4}
        />
        <InfoBox
          type={INFOBOXES.DEFAULT}
          title={'Active'}
          info={<p className='px-2 py-1'>{entity.isActive ? 'Yes' : 'No'}</p>}
          number={4}
        />
        <InfoBox
          type={INFOBOXES.DEFAULT}
          title={'Type'}
          info={
            <div>
              {entity.isParent && !entity.isPremium && <p className='px-2 py-1'>{'Parent'}</p>}
              {!entity.isParent && entity.isPremium && <p className='px-2 py-1'>{'Premium'}</p>}
              {entity.isPremium && entity.isParent && (
                <p className='px-2 py-1'>{'Premium & Parent'}</p>
              )}
              {entity.isInternal && <p className='px-2 py-1'>{'Internal'}</p>}
            </div>
          }
          number={4}
        />
      </div>
      <div className='grid grid-cols-auto-fit gap-5'>
        <InfoBox type={INFOBOXES.MULTI} title={'Tags'} info={null} number={3} rows={entity.tag} />
        <InfoBox
          type={INFOBOXES.MULTI}
          title={'Points'}
          info={null}
          number={3}
          rows={entity.points}
        />
        {entity.packages.length !== 0 && (
          <InfoBox
            type={INFOBOXES.MULTI}
            title={'Packages'}
            info={null}
            number={3}
            rows={entity.packages}
            fieldName='title'
          />
        )}
      </div>
    </div>
  )
}

export default PackageView
