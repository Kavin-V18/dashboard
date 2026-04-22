

export default function Pagination({ total, page, setPage }) {
    const pages = Math.ceil(total / 6);
    return (
        <div className="text-center ">
            <button className="bg-blue-200 p-2 rounded-[50px] hover:bg-blue-300 font-medium" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
            {[...Array(pages)].map((_, i) => (<button className="bg-blue-200 p-2 rounded-[50px] hover:bg-blue-300 font-medium " key={i} onClick={() => setPage(i + 1)}>{i + 1}</button>))}
            <button className="bg-blue-200 p-2 rounded-[50px] hover:bg-blue-300 font-medium" disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
        </div>);
}






