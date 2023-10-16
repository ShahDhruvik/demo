import { Controller, Control } from 'react-hook-form'
import RichTextEditor, { ToolbarConfig } from 'react-rte'
import createEditorState from 'react-rte'
import Editor from 'react-rte'
import '@/styles/textEditor.css'
type Props = {
  name: string
  control: Control<any> | undefined
}

const RTEInput = ({ name, control }: Props) => {
  const toolbarConfig: ToolbarConfig = {
    display: [
      'INLINE_STYLE_BUTTONS',
      'BLOCK_TYPE_BUTTONS',
      'LINK_BUTTONS',
      'BLOCK_TYPE_DROPDOWN',
      'HISTORY_BUTTONS',
    ],
    INLINE_STYLE_BUTTONS: [
      { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: 'Normal', style: 'unstyled' },
      { label: 'Heading Large', style: 'header-one' },
      { label: 'Heading Medium', style: 'header-two' },
      { label: 'Heading Small', style: 'header-three' },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: 'UL', style: 'unordered-list-item' },
      { label: 'OL', style: 'ordered-list-item' },
    ],
    BLOCK_ALIGNMENT_BUTTONS: [],
    extraProps: {},
  }
  function blockStyleFn(contentBlock) {
    const type = contentBlock.getType()
    console.log(type)
    if (type === 'header-one') {
      return 'h1-style'
    } else if (type === 'header-two') {
      return 'h2-style'
    } else if (type === 'header-three') {
      return 'h3-style'
    } else if (type === 'code-block') {
      return 'block-style'
    }
    return ''
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Editor
          value={field.value}
          onChange={field.onChange}
          className='min-h-[300px] max-w-[930px]'
          placeholder={'Description'}
          blockStyleFn={blockStyleFn}
          // toolbarConfig={toolbarConfig}
        />
      )}
      rules={{ required: 'Enter Description' }}
    />
  )
}

export default RTEInput
