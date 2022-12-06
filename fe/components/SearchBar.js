
const SearchBar = (props) => {

    const { onChange, onKeyUp, text, setText, type ='text', placeholder = 'Search and press Enter', hasQuery, push, className="py-3 pl-2" } = props

    return (
        <div className={className}>
            <div className="relative max-w-xs">
                <label htmlFor="hs-table-search" className="sr-only">
                    Search
                </label>
                <input
                    placeholder={placeholder}
                    autoComplete="off"
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    type={type}
                    name="hs-table-search"
                    id="hs-table-search"
                    className="block w-full p-3 pl-10 text-sm border border-indigo-500 rounded-md focus:border-indigo-800 outline-none"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                        className="h-3.5 w-3.5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </div>
            </div>
            <div>
                {text !== '' ? (
                    <div className="mt-3">
                        Results for : {text}
                        {hasQuery && (
                            <button className="btn btn-secondary"
                                onClick={() => {
                                    setText('')
                                    if(push) push()
                                }}
                            >
                                Close
                            </button>
                        )}
                    </div>
                ) : ''}
            </div>
        </div>
    )
}

export default SearchBar