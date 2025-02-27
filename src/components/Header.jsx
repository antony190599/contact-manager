export default function Header() {
    return (
        <header className="app-header">
            <div className="header-content">
                <h1>Contact Manager</h1>
                <nav>
                    <ul>
                        <li><a href="#contactos">Contactos</a></li>
                        <li><a href="#favoritos">Favoritos</a></li>
                        <li><a href="#nuevo">Nuevo</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}