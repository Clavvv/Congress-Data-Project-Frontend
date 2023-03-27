import React from 'react'



export default function MyApp() {

    const fetchDataPreview = async () => {
        try {
            const res= await fetch('/api/getGeoJsonTest')
            const data= await res.json()
            console.log(data)

        } catch (error) {
            console.error('Error', error)
        }
    }








    return (
        <div className='flex h-screen w-screen'>
            <div className='h-full w-full'>
                <button onClick= {fetchDataPreview}>Get Data</button>
                <table className='mx-auto my-20 border border-slate-500 border-collapse'>
                    <thead className='border border-separate border-slate-500'>
                        <tr>
                            <th className='border border-separate border-slate-500 p-2'>Company</th>
                            <th className='border border-collapse border-slate-500 p-2'>Contact</th>
                            <th className='border border-collapse border-slate-500 p-2'>Country</th>
                        </tr>
                    </thead>
                    <tbody className='border border-separate border-slate-500'>
                        <tr>
                            <td className='border border-collapse border-slate-500 p-2'>Company A</td>
                            <td className='border border-collapse border-slate-500 p-2'>Maria A</td>
                            <td className='border border-collapse border-slate-500 p-2'>Germany</td>
                        </tr>
                        <tr>
                            <td className='border border-collapse border-slate-500 p-2'>Company B</td>
                            <td className='border border-collapse border-slate-500 p-2'>Francisco Chang</td>
                            <td className='border border-collapse border-slate-500 p-2'>Mexico</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
}