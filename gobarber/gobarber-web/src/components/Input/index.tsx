import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'

import { StyledIconProps } from '@styled-icons/styled-icon'

import { useField } from '@unform/core'

import * as S from './styled'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon: React.ComponentType<StyledIconProps>
  containerStyle?: object
}

const Input: React.FC<InputProps> = ({
  containerStyle = {},
  name,
  icon: Icon,
  ...rest
}) => {
  const [isFocus, setIsFocus] = useState(false)
  const [isField, setIsField] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleInputFocus = useCallback(() => {
    setIsFocus(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocus(false)

    setIsField(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <S.InputWrapper
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocus}
      isField={isField}
    >
      {Icon && <Icon size={20} />}
      <S.Content
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error && (
        <S.ErrorWrapper title={error}>
          <S.ErrorIcon />
        </S.ErrorWrapper>
      )}
    </S.InputWrapper>
  )
}

export default Input
