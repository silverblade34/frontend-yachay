'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

interface DatePickerProps {
  id?: string
  name?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minYear?: number
  maxYear?: number
}

export function DatePicker({
  id,
  name,
  value,
  onChange,
  placeholder = 'DD / MM / AAAA',
  className = '',
  minYear = 1900,
  maxYear = new Date().getFullYear()
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [displayDate, setDisplayDate] = useState(new Date())
  const [inputValue, setInputValue] = useState('')
  const [showYearPicker, setShowYearPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value) {
      const date = new Date(value + 'T00:00:00')
      const formatted = formatDateForInput(date)
      setInputValue(formatted)
      setDisplayDate(date)
    }
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowYearPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const formatDateForInput = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day.toString().padStart(2, '0')} / ${month.toString().padStart(2, '0')} / ${year}`
  }

  const parseInputDate = (input: string) => {
    // Remove extra spaces and split
    const cleaned = input.replace(/\s+/g, '')
    const parts = cleaned.split('/')
    
    if (parts.length === 3) {
      const day = parseInt(parts[0])
      const month = parseInt(parts[1])
      const year = parseInt(parts[2])
      
      // Validate
      if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= minYear && year <= maxYear) {
        const date = new Date(year, month - 1, day)
        // Check if date is valid (handles invalid dates like Feb 30)
        if (date.getDate() === day && date.getMonth() === month - 1) {
          return date
        }
      }
    }
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Auto-add slashes
    value = value.replace(/[^\d]/g, '')
    if (value.length >= 2) {
      value = value.slice(0, 2) + ' / ' + value.slice(2)
    }
    if (value.length >= 7) {
      value = value.slice(0, 7) + ' / ' + value.slice(7, 11)
    }
    
    setInputValue(value)
    
    // Try to parse complete date
    const parsedDate = parseInputDate(value)
    if (parsedDate) {
      const formattedDate = `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`
      onChange(formattedDate)
      setDisplayDate(parsedDate)
    }
  }

  const handleInputBlur = () => {
    if (value) {
      const date = new Date(value + 'T00:00:00')
      setInputValue(formatDateForInput(date))
    } else if (inputValue) {
      // Try one more time to parse
      const parsedDate = parseInputDate(inputValue)
      if (!parsedDate) {
        setInputValue('') // Clear invalid input
      }
    }
  }

  const months = [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun',
    'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
  ]

  const daysOfWeek = ['D', 'L', 'M', 'X', 'J', 'V', 'S']

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    setDisplayDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const handleNextMonth = () => {
    setDisplayDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  const handleYearChange = (year: number) => {
    setDisplayDate(prev => {
      const newDate = new Date(prev)
      newDate.setFullYear(year)
      return newDate
    })
    setShowYearPicker(false)
  }

  const handleDateClick = (day: number) => {
    const year = displayDate.getFullYear()
    const month = displayDate.getMonth()
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onChange(formattedDate)
    setIsOpen(false)
  }

  const renderYearPicker = () => {
    const currentYear = displayDate.getFullYear()
    const years = []
    
    for (let year = maxYear; year >= minYear; year--) {
      years.push(year)
    }

    return (
      <div className="p-4 w-[320px]">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => setShowYearPicker(false)}
            className="text-sm text-primary hover:underline"
          >
            ← Volver
          </button>
          <div className="font-semibold text-sm">Seleccionar año</div>
          <div className="w-16"></div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto">
          {years.map(year => (
            <button
              key={year}
              type="button"
              onClick={() => handleYearChange(year)}
              className={`
                py-2 px-3 rounded-md text-sm transition-all
                ${year === currentYear 
                  ? 'bg-primary text-primary-foreground font-bold' 
                  : 'hover:bg-accent text-foreground'
                }
              `}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderCalendar = () => {
    const year = displayDate.getFullYear()
    const month = displayDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const today = new Date()
    const selectedDate = value ? new Date(value + 'T00:00:00') : null

    const days = []
    
    // Previous month days
    const prevMonthDays = getDaysInMonth(year, month - 1)
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      })
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      
      const isSelected = selectedDate &&
        day === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear()

      days.push({
        day,
        isCurrentMonth: true,
        isToday,
        isSelected
      })
    }

    // Next month days
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false
      })
    }

    return days
  }

  return (
    <div ref={pickerRef} className={`relative ${className}`}>
      {/* Hidden native input for form compatibility */}
      <input
        type="date"
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Custom Date Input */}
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          maxLength={14}
          className={`
            w-full pl-10 pr-3 py-2
            bg-input border border-input rounded-lg
            text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
            transition-all duration-200
            hover:bg-accent/50 text-sm
          `}
        />
      </div>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
          {showYearPicker ? renderYearPicker() : (
            <div className="p-4 w-[320px]">
              {/* Month/Year Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-accent rounded-md transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <button
                  type="button"
                  onClick={() => setShowYearPicker(true)}
                  className="font-semibold text-sm hover:text-primary transition-colors"
                >
                  {months[displayDate.getMonth()]} {displayDate.getFullYear()}
                </button>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-accent rounded-md transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map(day => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar().map((dayInfo, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => dayInfo.isCurrentMonth && handleDateClick(dayInfo.day)}
                    disabled={!dayInfo.isCurrentMonth}
                    className={`
                      aspect-square flex items-center justify-center
                      text-sm rounded-md transition-all duration-150
                      ${!dayInfo.isCurrentMonth && 'text-muted-foreground/30 cursor-not-allowed'}
                      ${dayInfo.isCurrentMonth && !dayInfo.isSelected && 'hover:bg-accent text-foreground'}
                      ${dayInfo.isToday && !dayInfo.isSelected && 'bg-accent/50 font-semibold'}
                      ${dayInfo.isSelected && 'bg-primary text-primary-foreground font-bold'}
                    `}
                  >
                    {dayInfo.day}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
