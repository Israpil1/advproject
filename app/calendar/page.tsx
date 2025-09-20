import Calendar from '@/components/Calendar'
// или import SimpleCalendar from '@/components/SimpleCalendar'

export default function CalendarPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Календарь событий</h1>
      <Calendar />
      {/* или <SimpleCalendar /> */}
    </div>
  )
}