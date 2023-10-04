import { useSvgImport } from '../hooks/useSvgImport'

interface IProps {
  iconName: string
  wrapperStyle?: string
  svgProp?: React.SVGProps<SVGSVGElement>
}

function FetchSvg(props: IProps) {
  const { iconName, wrapperStyle, svgProp } = props
  const { loading, SvgIcon } = useSvgImport(iconName)

  return (
    <>
      {loading && <div className='rounded-full bg-slate-400 animate-pulse h-6 w-6'></div>}
      {SvgIcon ? (
        <div className={wrapperStyle}>
          <SvgIcon {...svgProp} />
        </div>
      ) : (
        <p>Invalid path</p>
      )}
    </>
  )
}

export default FetchSvg
