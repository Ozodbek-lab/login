import React from 'react'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
    <header>
        <h1>hello</h1>
    </header>
    <main>
        <Outlet />
    </main>
    <footer>
        <p>Footer content</p>
    </footer>
    </>
  )
}

export default MainLayout