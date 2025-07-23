import React from 'react'

const SubsTableItem = ({ email, deleteEmails, mongoID }) => {
    return (
        <tr className='bg-white border-b text-left text-sm sm:text-base'>

            {/* Email Cell */}
            <th
                scope='row'
                className='px-4 py-3 sm:px-6 sm:py-4 font-medium text-gray-800 whitespace-normal max-w-[200px] break-words'
            >
                {email ? email : "No Email"}
            </th>

            {/* Delete Action */}
            <td
                className='px-4 py-3 sm:px-6 sm:py-4 text-red-600 cursor-pointer'
                onClick={() => deleteEmails(mongoID)}
            >
                x
            </td>
        </tr>
    )
}

export default SubsTableItem
