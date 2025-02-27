import './App.css'
import Header from './components/Header'
import ContactList from './components/ContactList'
import ContactDetail from './components/ContactDetail'
import contacts from './data/contacts.json'

function App() {


    const pinnedContact = contacts[0];

    return (
        <div className="app">
            <Header />
            <div className="app-container">
                <aside className="sidebar">
                    <ContactDetail contact={pinnedContact} />
                </aside>
                <main className="main-content">
                    <ContactList contacts={contacts} />
                </main>
            </div>
        </div>
    )
}

export default App