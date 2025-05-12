import React, { useState } from "react"
function RowData(props) {
    const { data, deleteFun ,index, returnData } = props

    const editarEmpleado = () => {
        returnData(data)
    }
    
    const eliminarEmpleado = () => {
        deleteFun(data)
    }

    return (
        <>
            <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {data.nombre}
                </th>
                <td class="px-6 py-4">
                    {data.edad}
                </td>
                <td class="px-6 py-4">
                    {data.pais}
                </td>
                <td class="px-6 py-4">
                    {data.cargo}
                </td>
                <td class="px-6 py-4">
                    {data.anios}
                </td>
                <td class="px-6 py-4">
                    <button href="#" onClick={editarEmpleado} class="font-medium text-green-600 mr-3 hover:underline hover:cursor-pointer">Edit</button>
                    <button href="#" onClick={eliminarEmpleado} class="font-medium text-red-400 ml-3 hover:underline hover:cursor-pointer">Delete</button>
                </td>
            </tr>
        </>
    )
}


export default React.memo(RowData);
// export default RowData;