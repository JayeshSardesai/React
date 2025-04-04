import React from 'react'

const page = ({ params }) => {
    let lang = ["Python", "Java", "C", "CPP"]
    if (lang.includes(params.slug)) {
        return (
            <div>
                This is blog:{params.slug}
            </div>
        )
    } else {
        return (
            <div>
                Post not found
            </div>
        )
    }
}

export default page
