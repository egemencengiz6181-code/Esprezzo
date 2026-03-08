import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

/**
 * ThemeToggle – pill-style dark / light slider button.
 *
 * Props:
 *   transparent  {boolean}  – when true (navbar over hero) use frosted border styling
 *   className    {string}   – extra Tailwind classes
 */
export default function ThemeToggle({ transparent = false, className = '' }) {
  const { isLight, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={isLight ? 'Karanlık moda geç' : 'Aydınlık moda geç'}
      title={isLight ? 'Dark mode' : 'Light mode'}
      className={[
        'relative flex items-center rounded-full p-1 border transition-all duration-300',
        'hover:border-espresso-red group',
        transparent
          ? 'border-white/30 bg-white/5 hover:bg-white/10'
          : 'border-espresso-border bg-espresso-dark',
        className,
      ].join(' ')}
    >
      {/* Sliding highlight pill */}
      <span
        className={[
          'absolute inset-y-1 left-1 w-6 rounded-full bg-espresso-red',
          'transition-transform duration-300 ease-out',
          isLight ? 'translate-x-0' : 'translate-x-6',
        ].join(' ')}
      />

      {/* Sun icon – left slot */}
      <span className="relative z-10 w-6 h-5 flex items-center justify-center">
        <Sun
          size={13}
          className={[
            'transition-colors duration-300',
            isLight
              ? 'text-white'
              : 'text-espresso-muted group-hover:text-espresso-ivory',
          ].join(' ')}
        />
      </span>

      {/* Moon icon – right slot */}
      <span className="relative z-10 w-6 h-5 flex items-center justify-center">
        <Moon
          size={13}
          className={[
            'transition-colors duration-300',
            !isLight
              ? 'text-white'
              : 'text-espresso-muted group-hover:text-espresso-ivory',
          ].join(' ')}
        />
      </span>
    </button>
  )
}
