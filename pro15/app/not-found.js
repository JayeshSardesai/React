import React from 'react'

const NotFound = () => {
    return (
        <main className="grid min-h-screen place-items-center bg-black px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-7xl">
                    Page not found
                </h1>
                <p className="mt-6 text-lg text-gray-400 sm:text-xl">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
            </div>
        </main>
    )
}

export default NotFound
