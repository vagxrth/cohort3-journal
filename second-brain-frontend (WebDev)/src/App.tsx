import { ContentPage } from "./components/ContentPage"
import { Sidebar } from "./components/Sidebar"

function App() {

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <ContentPage />
    </div>
  )
}

export default App
