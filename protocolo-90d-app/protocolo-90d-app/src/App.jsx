import { useState } from 'react'
import TodayScreen from './components/TodayScreen.jsx'
import DashboardScreen from './components/DashboardScreen.jsx'
import ExportScreen from './components/ExportScreen.jsx'
import SettingsScreen from './components/SettingsScreen.jsx'
import NavBar from './components/NavBar.jsx'

export default function App() {
  const [tab, setTab] = useState('hoje')

  return (
    <div className="min-h-screen bg-bg text-ink">
      {tab === 'hoje' && <TodayScreen />}
      {tab === 'painel' && <DashboardScreen />}
      {tab === 'exportar' && <ExportScreen />}
      {tab === 'definicoes' && <SettingsScreen />}

      <NavBar active={tab} onChange={setTab} />
    </div>
  )
}
