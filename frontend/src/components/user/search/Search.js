import './search.css'

export const Search = ()=>{
    return (
        <div className="search">
            <td><input type="text" className="searchTerm" placeholder="What are you looking for?" /></td> 
            <td>
                <img className="searchButton" src="https://cdn-icons.flaticon.com/png/512/2811/premium/2811806.png?token=exp=1659001698~hmac=0c368b3b443cd2d1cd9201fe87d599da" alt=""/>
            </td>
        </div>
    )
}