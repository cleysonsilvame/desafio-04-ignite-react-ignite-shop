import { styled } from '..'

export const CartButton = styled('button', {
  position: 'relative',
  padding: '0.75rem',
  backgroundColor: '$green500',
  color: '$white',
  borderRadius: 6,
  border: 0,
  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBox: 'content-box',
  span: {
    position: 'absolute',
    top: -8,
    right: -8,
    lineHeight: 1,
    width: 20,
    padding: '0.2rem',

    backgroundColor: '$green300',
    color: '$white',
    fontWeight: 'bold',
    
    borderRadius: '50%',
    outline: '2px solid $gray900',
   
  },

  variants: {
    color: {
      green: {
        backgroundColor: '$green500',
        color: '$white',
      },
      gray: { backgroundColor: '$gray800', color: '#8D8D99' },
    },
    size: {
      small: {
        padding: '0.5rem',
      },
      medium: {
        padding: '0.75rem',
      },
    },
  },
})
