import Link from 'next/link'

import { Children } from '../types/children'

type NavProps = {
  link: string
  label: string
  isOpenInNewTab?: boolean
}

export const Nav = ({ link, label, isOpenInNewTab = false }: NavProps) => {
  return (
    <div className='group text-sm'>
      <Link href={link}>
        <a
          className='group-hover:text-sky-600 flex items-center space-x-1 transition duration-200 ease-in-out'
          target={isOpenInNewTab ? '_blank' : ''}
        >
          <span className='font-semibold'>{label}</span>
        </a>
      </Link>
    </div>
  )
}

const Header = ({ children }: Children) => {
  const colors: string[] = [
    'red',
    'green',
    'blue',
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'orange',
    'amber',
    'yellow',
    'lime',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
  ]

  const getRandomIndex = (): number => {
    return Math.floor(Math.random() * colors.length)
  }

  const getRandomColor = () => {
    return {
      from: colors[getRandomIndex()],
      via: colors[getRandomIndex()],
      to: colors[getRandomIndex()],
    }
  }

  const chosen = getRandomColor()

  return (
    <div
      className={`flex flex-col space-y-3 text-center selection:bg-sky-600 selection:text-gray-800 bg-gradient-to-br from-${chosen.from}-400 via-${chosen.via}-500 to-${chosen.to}-600 w-fit mx-auto text-transparent bg-clip-text animate-gradient-x`}
    >
      {children}
    </div>
  )
}

export default Header
