'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  id?: string
  name?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
}

export function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = 'Seleccionar...',
  className = ''
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const selectRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(opt => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && optionsRef.current) {
      const highlightedElement = optionsRef.current.children[highlightedIndex] as HTMLElement
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  }, [highlightedIndex, isOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setIsOpen(true)
        setHighlightedIndex(0)
      }
      return
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < options.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0)
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0) {
          onChange(options[highlightedIndex].value)
          setIsOpen(false)
        }
        break
    }
  }

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div ref={selectRef} className={`relative ${className}`}>
      {/* Hidden native select for form compatibility */}
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {/* Custom Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          w-full px-3 py-2 text-left
          bg-input border border-input rounded-lg
          text-foreground placeholder:text-muted-foreground
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
          transition-all duration-200
          flex items-center justify-between
          hover:bg-accent/50
          ${isOpen ? 'ring-2 ring-ring ring-offset-2 ring-offset-background' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selectedOption ? 'text-foreground text-sm' : 'text-muted-foreground text-sm'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div 
          ref={optionsRef}
          className="absolute z-50 w-full mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95"
          role="listbox"
        >
          <div className="max-h-60 overflow-y-auto py-1">
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`
                  w-full px-3 py-2.5 text-left
                  flex items-center justify-between
                  transition-colors duration-150
                  ${value === option.value ? 'bg-accent text-accent-foreground' : 'text-foreground'}
                  ${highlightedIndex === index ? 'bg-accent/50' : ''}
                  hover:bg-accent/70
                `}
                role="option"
                aria-selected={value === option.value}
              >
                <span className="text-sm">{option.label}</span>
                {value === option.value && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
