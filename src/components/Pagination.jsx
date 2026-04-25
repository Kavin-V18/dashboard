

export default function Pagination({ total, page, setPage }) {
    const pages = Math.ceil(total / 6);
    return (
        <div className="text-center ">
            <button className="bg-black text-white p-1 rounded-xl m-1 hover:text-rose-600 " disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
            {/* {[...Array(pages)].map((_, i) => (<button className="" key={i} onClick={() => setPage(i + 1)}>{i + 1}</button>))}  */} 
            <span className="font-semibold"> Page {page} / {Math.ceil(pages)} </span>
            <button className="bg-black text-white p-1 rounded-xl m-1 hover:text-rose-600" disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
        </div>);
}






