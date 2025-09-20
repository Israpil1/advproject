'use client'

import { useState } from 'react'

interface Event {
  id: number
  title: string
  date: Date
  description?: string
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [showEventForm, setShowEventForm] = useState(false)
  const [newEventTitle, setNewEventTitle] = useState('')

  // Получаем первый день месяца и количество дней
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // Переключение месяцев
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Добавление события
  const addEvent = () => {
    if (newEventTitle.trim() && selectedDate) {
      setEvents([...events, {
        id: Date.now(),
        title: newEventTitle,
        date: selectedDate
      }])
      setNewEventTitle('')
      setShowEventForm(false)
    }
  }

  // Получение событий на выбранную дату
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  // Генерация дней календаря
  const renderCalendarDays = () => {
    const days = []
    const today = new Date()

    // Пустые ячейки в начале
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 border"></div>)
    }

    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString()
      const dateEvents = getEventsForDate(date)

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`
            h-12 border p-1 cursor-pointer hover:bg-gray-50 transition-colors
            ${isToday ? 'bg-blue-100 font-bold' : ''}
            ${isSelected ? 'bg-blue-200 ring-2 ring-blue-400' : ''}
            ${dateEvents.length > 0 ? 'bg-green-50' : ''}
          `}
        >
          <div className="text-sm font-medium">{day}</div>
          {dateEvents.length > 0 && (
            <div className="text-xs text-green-600 truncate">
              {dateEvents.length} событий
            </div>
          )}
        </div>
      )
    }

    return days
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      {/* Заголовок календаря */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800">
          {currentDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
        </h2>
        
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>

      {/* Дни недели */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Сетка календаря */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

      {/* Форма добавления события */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">
            События на {selectedDate.toLocaleDateString('ru-RU')}
          </h3>
          
          {getEventsForDate(selectedDate).length > 0 ? (
            <ul className="mb-4">
              {getEventsForDate(selectedDate).map(event => (
                <li key={event.id} className="bg-white p-2 rounded mb-1 shadow-sm">
                  {event.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mb-4">Нет событий на эту дату</p>
          )}

          {showEventForm ? (
            <div className="flex space-x-2">
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Название события"
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={addEvent}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Добавить
              </button>
              <button
                onClick={() => setShowEventForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Отмена
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowEventForm(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Добавить событие
            </button>
          )}
        </div>
      )}

      {!selectedDate && (
        <div className="mt-4 text-center text-gray-500">
          Выберите дату для добавления событий
        </div>
      )}
    </div>
  )
}