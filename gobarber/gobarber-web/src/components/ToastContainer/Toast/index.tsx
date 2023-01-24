import React, { useEffect } from 'react'
import { AlertCircle, Info, Check } from '@styled-icons/feather'

import * as S from './styled'

import { useToast, ToastMessage } from '../../../hooks/toast'

interface ToastProps {
  toast: ToastMessage
  style: object
}

const icons = {
  info: <Info size={20} />,
  error: <AlertCircle size={20} />,
  sucess: <Check size={20} />,
}

const Toast: React.FC<ToastProps> = ({ toast, style }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, toast.id])

  return (
    <S.Toast type={toast.type} hasdescription={Number(!!toast.description)} style={style}>
      {icons[toast.type || 'info']}

      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(toast.id)}>
        <S.QuitIcon />
      </button>
    </S.Toast>
  )
}

export default Toast
