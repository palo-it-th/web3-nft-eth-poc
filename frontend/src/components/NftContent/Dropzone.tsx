import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropzoneProps {
  onAddImageHandler: (image: File) => void
}

const Dropzone = ({ onAddImageHandler }: DropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: files => onAddImageHandler(files[0]),
  })

  const baseStyle = useMemo(
    () => ({
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      marginTop: '30px',
    }),
    [],
  )

  const style = useMemo(
    () => ({
      ...baseStyle,
    }),
    [baseStyle],
  )

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <p>Drag&drop the image here, or click to select an image</p>
    </div>
  )
}

export default Dropzone
